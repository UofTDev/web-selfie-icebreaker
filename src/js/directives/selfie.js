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
                var $el = angular.element('<input type="file" accept="image/*;capture=camera" />');

                $el.on('change', function () {
                    var file = $el[0].files[0];

                    if (typeof file === 'undefined') {
                        return;
                    }

                    var reader = new FileReader();
                    reader.onload = function (e) {
                        scope.$eval(attrs.selfie, {data: e.target.result});
                    };
                    reader.readAsDataURL(file);
                });

                $el[0].click();
            });
        }
    };
}

module.exports = SelfieDirective;
