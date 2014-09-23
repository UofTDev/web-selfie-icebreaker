var config = require('../config');
var socket = require('../socket');

function GalleryCtrl ($scope) {
    var vm      = this;
    var rows    = 4;
    var columns = 5;

    vm.url     = config.url;
    vm.images  = [];

    // Tell the socket we're a gallery, and listen for new selfies being taken!
    socket.emit('isGallery', true);
    socket.on('selfie', function (data) {
        vm.images.push(data.image);
        vm.images = vm.images.splice(rows * columns * -1);
        $scope.$apply();
    });

    // When the window is resized, we should calculate the images' new w/h
    angular.element(window).on('resize', function () {
        setSizes();
        $scope.$apply();
    });

    /**
     * Update the row sizes based on the window size.
     */
    function setSizes () {
        vm.width  = Math.round(100 / rows);
        vm.height = Math.round(window.innerHeight / rows);
    }

    setSizes();
}

GalleryCtrl.$inject = ['$scope'];

module.exports = GalleryCtrl;