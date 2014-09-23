var angular = require('angular');

require('angular-animate');

module.exports = angular.module('icebreaker', ['ngAnimate'])
    .directive('selfie', require('./directives/selfie'))
    .controller('AppCtrl', require('./controllers/app'))
    .controller('GalleryCtrl', require('./controllers/gallery'));
