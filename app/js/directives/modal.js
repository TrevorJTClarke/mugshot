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
    scope: {},
    link: function($scope, $element, $attr) {
      var modalActive = 'modal-open';
      var modalVisible = 'modal-visible';

      $scope.activeItem = {};
      $scope.viewer = {
        items: []
      };

      $rootScope.$on('MODAL:CLOSE', function(e, args) {
        $scope.close();
      });

      $rootScope.$on('MODAL:OPEN', function(e, args) {
        if (!args || !args.type) { return; }

        // Show a single item
        if (args.type === 'preview') {
          $scope.activeItem = args.item;
          $scope.viewer = args.project || {};
        }

        // make the modal active with data
        $element.addClass(modalActive);

        setTimeout(function() {
          $element.addClass(modalVisible);
        }, 30);
      });

      $scope.close = function() {
        $element.removeClass(modalVisible);

        setTimeout(function() {
          $element.removeClass(modalActive);
        }, 230);
      };
    }
  };
}]);
