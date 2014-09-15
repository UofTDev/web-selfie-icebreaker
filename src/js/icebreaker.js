var angular = require('angular');

require('angular-animate');

module.exports = angular.module('beam', ['ngAnimate'])
    .directive('selfie', require('./directives/selfie'))
    .controller('AppCtrl', require('./controllers/app'));
