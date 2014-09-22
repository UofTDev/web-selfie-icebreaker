var gulp         = require('gulp'),
    glob         = require('glob'),
    isProduction = false,
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload,
    $            = require('gulp-load-plugins')();

var globs = {
    css: 'src/css/**/*.less',
    js: 'src/js/**/*.js',
    html: 'src/**/*.html',
    images: 'src/img/**',
    misc: 'src/**/*.{ico,eot,woff,ttf,php}'
};

gulp.task('css', function() {
    gulp.src('src/css/style.less')
        .pipe($.less())
        .pipe($.autoprefixer('last 3 versions'))
        .pipe($.if(isProduction, $.minifyCss()))
        .pipe($.if(!isProduction, reload({stream: true})))
        .pipe(gulp.dest('dist/css'));
});
gulp.task('js', function () {
    gulp.src('src/js/icebreaker.js')
        .pipe($.browserify({
            insertGlobals : true,
            debug : !gulp.env.production,
            shim: {
                angular: {
                    exports: 'angular',
                    path: 'bower_components/angular/angular.js'
                },
                'angular-animate': {
                    path: 'bower_components/angular-animate/angular-animate.js',
                    exports: 'ngAnimate',
                    depends: {
                        angular: 'angular'
                    }
                }
            }
        }))
        .pipe($.if(isProduction, $.uglify()))
        .pipe(gulp.dest('dist/js'));
});
gulp.task('html', function() {
    gulp.src(globs.html)
        .pipe($.if(isProduction, $.htmlmin({collapseWhitespace: true})))
        .pipe($.if(!isProduction, reload({stream: true})))
        .pipe(gulp.dest('dist'));
});
gulp.task('images', function() {
    gulp.src(globs.images)
        .pipe($.if(isProduction, $.imagemin({
            progressive: true
        })))
        .pipe($.if(!isProduction, reload({stream: true})))
        .pipe(gulp.dest('dist/img'));
});
gulp.task('misc', function () {
    gulp.src(globs.misc).pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    for (var key in globs) {
        $.watch({glob: globs[key], name: key}, [key]);
    }
});
gulp.task('connect', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('setProduction', function() {
    isProduction = true;
});

gulp.task('spy', ['watch', 'connect']);
gulp.task('dist', ['setProduction', 'default']);
gulp.task('default', ['html', 'js', 'css', 'images', 'misc']);
