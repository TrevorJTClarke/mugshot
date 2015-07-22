/**
 * Modal
 * Builds a modal for image viewing and comparing
 *
 * @usage
 * <modal></modal>
 */
MUG.directive('modal',
['$timeout', '$compile', '$rootScope', 'Compare',
function($timeout, $compile, $rootScope, Compare) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'modal.html',
    scope: {},
    link: function($scope, $element, $attr) {
      var modalActive = 'modal-open';
      var modalVisible = 'modal-visible';

      // $scope.activeOption = 'overlay';
      $scope.activeOption = 'sides';
      $scope.opacityRange = {};
      $scope.currentIndex = 0;
      $scope.activeItem = {};
      $scope.compareItem = {
        b: {},
        c: {}
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

      function compareSingle(a) {
        //TODO:removethis
        var b = 'screens/compare/body_tablet_projectIdRandum_0.png';

        // var b = 'screens/compare/body_phone_projectIdRandum_0.png';

        Compare.runSingle(a, b).then(function(res) {
          console.log('res', res);

          // update view with processed image
          $scope.compareItem.b.src = b;
          $scope.compareItem.c = res;

          // update the activeItem with the processed values
          $scope.activeItem.analysis = res.report.analysisTime;
          $scope.activeItem.status = Compare.getStatus(res.report);
        },

        function(err) {
          console.log('err', err);
        });
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

        // Show a single item
        if (args.type === 'preview') {
          $scope.activeItem = args.item;
          $scope.viewer = args.project || {};
          $scope.viewer.items = null;
        }

        // Show multiple items
        if (args.type === 'batch' && args.items.length > 0) {
          $scope.activeItem = args.items[$scope.currentIndex];
          $scope.viewer = args.project || {};
          $scope.viewer.items = args.items;

          compareSingle($scope.activeItem.source);
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
        if ($scope.currentIndex === idx) {return;}

        $scope.activeItem = $scope.viewer.items[idx];
        $scope.currentIndex = idx;

        compareSingle($scope.activeItem.source);
      };

    }
  };
}]);
