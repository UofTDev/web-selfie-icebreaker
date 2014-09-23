var config = require('./config');
var socket = require('socket.io-client')(config.url);

/**
 * Simple decorator for socket.io that adds event queuing pending connection.
 */
function Socket () {
    var self = this;

    self.connected = false;
    self.queue = [];

    socket.on('connect', function () {
        self.connected = true;

        // Socketio seems to lose track of data if it's sent too soon. Let's
        // wait a short period.
        setTimeout(processQueue, 100);
    });

    socket.on('error', function () {
        self.connected = false;
    });

    /**
     * Emits a socket event, or queues it to be run after we connect.
     *
     * @param {string} event
     * @param {object} data
     */
    self.emit = function () {
        self.queue.push(arguments);
        processQueue();
    };

    /**
     * Attempts to run the queue of connections
     */
    function processQueue() {
        if (!self.connected) {
            return;
        }

        while (self.queue.length) {
            socket.emit.apply(socket, self.queue.pop());
        }
    }
}

Socket.prototype = socket;

module.exports = new Socket();