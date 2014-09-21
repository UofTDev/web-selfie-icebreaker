var _       = require('lodash');
var angular = require('angular');
var options = require('../options');
var color   = require('tinycolor2');

function AppCtrl ($scope) {
    var vm = this;
    var todos = options.map(function (text) {
        return {text: text, completed: false, image: null};
    });

    vm.captureSelfie = captureSelfie;
    vm.generateTodos = generateTodos;
    vm.completed     = false;

    /**
     * Sets the view's list of todo items, sampled randomly. And goddammit
     * IntelliJ stop highlighting comments with the word "todo" in them.
     *
     * @param {number=15} number
     * @returns {{}[]}
     */
    function generateTodos (number) {
        vm.todos = _.sample(todos, number || 15);
        updateStyles();

        return vm.todos;
    }

    /**
     * Updates the page styles in accordance with the todo completion. Navbar
     * fades from red to green, and a progress bar inches across the screen.
     */
    function updateStyles () {
        var percent = _.where(vm.todos, {completed: true}).length / vm.todos.length;
        var c = color('hsv(' + Math.round(percent * 120) + ', 71, 94)');
        var background = {'background-color': '#' + c.toHex()};

        vm.styles = {
            navbar: background,
            progressBar: _.extend({width: Math.round(percent * 100) + '%'}, background)
        };
        vm.completed = percent === 1;
    }

    /**
     * Marks the todo as captured and assigns it the given data.
     *
     * @param {{}} todo
     * @param {*} data
     */
    function captureSelfie (todo, data) {
        _.extend(todo, {
            completed: true,
            image: data
        });

        updateStyles();
        $scope.$apply();
    }

    generateTodos();
}

AppCtrl.$inject = ['$scope'];

module.exports = AppCtrl;
