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

      $scope.opacityRange = {};
      $scope.opacityRange = {
        amount: 0.8,
        inverse: 0.2,
        percent: 80
      };
      console.log('$scope.opacityRange', $scope.opacityRange);
      $scope.currentIndex = 0;
      $scope.activeItem = {};
      $scope.viewer = {
        items: []
      };

      $scope.$watch('opacityRange', function(nv) {
        console.log('opacityRange', nv);
      });

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

        // Show multiple items
        if (args.type === 'batch' && args.items.length > 0) {
          $scope.activeItem = args.items[$scope.currentIndex];
          $scope.viewer = args.project || {};
          $scope.viewer.items = args.items;
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

      // Setup of left/right navigation
      $scope.modalActionNav = function(type) {
        if ($scope.viewer.items.length < 1) { return; }

        var total = $scope.viewer.items.length - 1;
        var nextIdx;

        if (type === 'right') {
          nextIdx = ($scope.currentIndex === total) ? 0 : $scope.currentIndex + 1;
        } else {
          nextIdx = ($scope.currentIndex === 0) ? total : $scope.currentIndex - 1;
        }

        $scope.activeItem = $scope.viewer.items[nextIdx];
        $scope.currentIndex = nextIdx;
      };

      // Go directly to an item
      $scope.goToIndex = function(idx) {
        $scope.activeItem = $scope.viewer.items[idx];
        $scope.currentIndex = idx;
      };

    }
  };
}]);
