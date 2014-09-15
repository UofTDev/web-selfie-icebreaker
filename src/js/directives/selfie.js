var angular = require('angular');

/**
 * Simple attribute directive. When the element is clicked, the user will be
 * prompted for file (camera) input. When that is provided, the data given in
 * "selfie" will be evaluated, with "data" being the file data given.
 *
 * @returns {{}}
 * @constructor
 */
function SelfieDirective() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                var $el = angular.element('<input type="file" accept="image/*;capture=camera">');

                $el.on('change', function () {
                    var files = $el.get(0).files();

                    if (files.length > 0) {
                        scope.$eval(attrs.selfie, {data: files[0]});
                    }
                });
            });
        }
    };
}

module.exports = SelfieDirective;
