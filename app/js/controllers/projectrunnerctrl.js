MUG.controller('ProjectRunnerCtrl',
['$rootScope', '$scope', '$timeout', '$stateParams', 'Projects',
function($rootScope, $scope, $timeout, $stateParams, Projects) {
  $scope.processing = false;
  $scope.hasSettings = true; // TODO: make this real
  $scope.hasReference = true; // TODO: make this real
  $scope.activeFilter = 'All';
  $scope.batchItems = [];
  $scope.activeData = {};
  $scope.currentBatch = $rootScope.project.currentBatch || 0;
  $scope.progress = {
    percent: 0
  };

  // Set the active data based on currentBatch
  $scope.activeData = ($rootScope.project && $rootScope.project.batchHistory) ? $rootScope.project.batchHistory[$scope.currentBatch] : null;

  // Puts data into sorted sections
  function processBatch(allData) {
    if (!allData || allData.length < 1) {
      $scope.hasReference = false;
      return [];
    }

    var formatted = [{ type: 'success', items: []}, { type: 'warning', items: []}, { type: 'error', items: []}];

    function placeItem(item) {

      // Keep things organizes with preset priority
      if (item.status) {
        var target = 0;

        switch (item.status) {
          case 'warning':
            target = 1;
            break;
          case 'failed':
            target = 2;
            break;
        }

        formatted[target].items.unshift(item);
      }
    }

    allData.map(function(obj, idx) {
      if (obj.batch === $scope.currentBatch) {
        placeItem(obj);
      }
    });

    return formatted;
  }

  // TODO:
  // * Progress Bar
  //   * Listen to Progress event
  // * Intro
  //   * see last run (if any)
  //   * start new run
  //   * start reference
  // * Stats (pass/fail)

  $scope.changeFilter = function(type) {
    $scope.activeFilter = type;
  };

  // grab all the runner test data
  var historyData = Projects.getTypeById($stateParams.id, 'history');

  // Store the processed data into the batch data
  $scope.batchItems = processBatch(historyData);

  // Fire off the viewer
  $scope.previewBatch = function(items) {
    $rootScope.$emit('MODAL:OPEN', { type: 'batch', items: items, project: $rootScope.project });
  };

  // TODO: finish
  // Fire off a new test!!
  $scope.runNewTest = function() {
    $scope.processing = true;

    $timeout(function() {
      $scope.progress.percent = 12;
    }, 200);

    $timeout(function() {
      $scope.progress.percent = 56;
    }, 700);

    $timeout(function() {
      $scope.progress.percent = 93;
    }, 1800);

    $timeout(function() {
      $scope.processing = false;
    }, 2000);
  };

  $rootScope.$on('RUNNER:PROGRESS:UPDATE', function(e, args) {
    if (!args) {return;}

    // update the progress!
    $scope.progress.percent = parseInt(args.percent, 10);
  });

}]);
