/**
 * Modal
 * Builds a modal for image viewing and comparing
 *
 * @usage
 * <modal></modal>
 */
MUG.directive('modal',
['$timeout', '$compile', '$rootScope',
function($timeout, $compile, $rootScope) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'modal.html',
    scope: {
      // autoPlay: '=',
      // doesContinue: '@',
      // slideInterval: '@',
      // showPager: '@',
      // pagerClick: '&',
      // disableScroll: '@',
      // onSlideChanged: '&',
      // activeSlide: '=?'
    },
    controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {

      // $rootScope.$on('slideBox.nextSlide', function() {
      //   slider.next();
      // });
      //
      // $scope.$on('slideBox.nextSlide', function() {
      //   slider.next();
      // });
      //
      // $scope.$on('slideBox.prevSlide', function() {
      //   slider.prev();
      // });
      //
      // $scope.$on('slideBox.setSlide', function(e, index) {
      //   slider.slide(index);
      // });
      //
      // //Exposed for testing
      // this.__slider = slider;
      //
      // $scope.$on('$destroy', function() {
      //   slider.kill();
      // });
      //
      // this.slidesCount = function() {
      //   return slider.slidesCount();
      // };
      //
      // this.onPagerClick = function(index) {
      //   $scope.pagerClick({index: index});
      //   slider.slide(index);
      // };
      //
      // $timeout(function() {
      //   slider.load();
      // });
    }],

    link: function($scope, $element, $attr) {

    }
  };
}]);
