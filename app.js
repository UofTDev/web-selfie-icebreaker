var express = require('express');
var app     = express();
var server  = require('http').Server(app);
var io      = require('socket.io')(server);

app.use(express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.get('/gallery', function (req, res) {
    res.sendFile(__dirname + '/dist/gallery.html');
});

io.on('connection', function (socket) {
    socket.on('selfie', function (data) {
        io.to('gallery').emit('selfie', data);
    });
    socket.on('isGallery', function () {
        socket.join('gallery');
    });
});

console.log('Listening...');
server.listen(8067);