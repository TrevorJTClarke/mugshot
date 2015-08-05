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

      $scope.project = angular.copy($rootScope.project);
      $scope.activeOption = 'sides';
      $scope.opacityRange = {};
      $scope.currentIndex = 0;
      $scope.activeItem = {};
      $scope.compareItem = {
        a: '',
        b: '',
        c: ''
      };
      $scope.viewer = {
        items: []
      };
      $scope.opacityRange = {
        amount: 0.8,
        inverse: 0.2,
        percent: '80%'
      };

      $scope.$watch('opacityRange.amount', function(nv, ov) {
        if (nv === ov) {return;}

        // update the other values
        $scope.opacityRange.inverse = (1 - nv).toFixed(2);
        $scope.opacityRange.percent = Math.round(nv * 100) + '%';
      });

      // set the active item with correct paths
      function setActiveItem(data) {
        var imageSrc = (!data.remoteSource) ? data.source : data.remoteSource;
        $scope.compareItem.a = (!data.remoteSource) ? 'screens/reference/' + $rootScope.project.id + '/' + imageSrc.replace($rootScope.project.currentBatch + '.png', $rootScope.project.currentReference + '.png') : imageSrc;
        $scope.compareItem.b = (!data.remoteSource) ? 'screens/compare/' + $rootScope.project.id + '/' + imageSrc : imageSrc;
        $scope.compareItem.c = (!data.remoteSource) ? 'screens/compare/' + $rootScope.project.id + '/' + imageSrc.replace('.png', '_diff.png') : imageSrc;
      }

      // Choose the viewer layout
      $scope.optionMode = function(type) {
        $scope.activeOption = type;
      };

      $rootScope.$on('MODAL:CLOSE', function(e, args) {
        $scope.close();
      });

      $rootScope.$on('MODAL:OPEN', function(e, args) {
        if (!args || !args.type) { return; }

        // Make sure to reset current Index
        $scope.currentIndex = 0;
        $scope.project = angular.copy($rootScope.project);

        // Show a single item
        if (args.type === 'preview') {
          $scope.activeItem = args.item;
          $scope.viewer = args.project || {};
          $scope.viewer.items = null;
          $scope.compareItem.a = 'screens/' + $scope.activeItem.type + '/' + $rootScope.project.id + '/' + $scope.activeItem.source;
        }

        // Show multiple items
        if (args.type === 'batch' && args.items.length > 0) {
          $scope.activeItem = args.items[$scope.currentIndex];
          $scope.viewer = args.project || {};
          $scope.viewer.items = args.items;
          setActiveItem($scope.activeItem);
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
        setActiveItem($scope.activeItem);
      };

      // Go directly to an item
      $scope.goToIndex = function(idx) {
        if ($scope.currentIndex === idx) {return;}

        $scope.activeItem = $scope.viewer.items[idx];
        $scope.currentIndex = idx;
        setActiveItem($scope.activeItem);
      };

    }
  };
}]);
