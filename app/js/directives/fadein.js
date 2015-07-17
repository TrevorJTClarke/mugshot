/**
 * fadeIn
 * A directive for animating in elements
 */
MUG.directive('fadeIn', [ function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var offset = parseInt(attrs.fadeIn) || 10;
            elem.addClass('fade-in');

            setTimeout(function () {
                elem.css("opacity", "1");
            }, offset);
        }
    };
}]);
