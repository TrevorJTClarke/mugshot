var ipc = require('ipc');

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

    // reset just the stats
    $scope.activeData = {};
    $scope.activeData.success = 0;
    $scope.activeData.warning = 0;
    $scope.activeData.error = 0;
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
        $scope.activeData[formatted[target].type] = $scope.activeData[formatted[target].type] + 1;
      }
    }

    allData.map(function(obj, idx) {
      if (obj.batch === $scope.currentBatch) {
        placeItem(obj);
      }
    });

    return formatted;
  }

  function setupCurrentBatch() {
    // grab all the runner test data
    var historyData = Projects.getTypeById($stateParams.id, 'history');

    // Store the processed data into the batch data
    $scope.batchItems = processBatch(historyData);
  }

  setupCurrentBatch();

  // TODO:
  // * Intro
  //   * see last run (if any)
  //   * start new run
  //   * start reference

  // Fire off the viewer
  $scope.previewBatch = function(items) {
    $rootScope.$emit('MODAL:OPEN', { type: 'batch', items: items, project: $rootScope.project });
  };

  // Fire off a new test!!
  $scope.newCompare = function() {
    $scope.processing = true;
    ipc.send('RUNNER:FIRE', { type: 'compare', projectId: $rootScope.project.id });
  };

  // setup new reference
  $scope.newReference = function() {
    $scope.processing = true;
    ipc.send('RUNNER:FIRE', { type: 'reference', projectId: $rootScope.project.id });
  };

  function runnerEvents(args) {
    if (!args || !args.msg || !args.percent) {return;}

    // Write the progress to UI
    $scope.progress.percent = parseInt(args.percent, 10);
    $scope.progress.title = (args.msg) ? args.msg : $scope.progress.title;
  }

  function runnerComplete() {
    setupCurrentBatch();
    $scope.processing = false;
  }

  function runnerFailed(reason) {
    console.log('RUNNER:FAILED reason', reason);
    $scope.processing = false;
  }

  ipc.on('RUNNER:PROGRESS', runnerEvents);
  ipc.on('RUNNER:COMPLETE', runnerComplete);
  ipc.on('RUNNER:FAILED', runnerFailed);

}]);
