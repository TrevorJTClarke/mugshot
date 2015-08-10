var ipc = require('ipc');

MUG.controller('ProjectRunnerCtrl',
['$rootScope', '$scope', '$timeout', '$stateParams', 'Projects',
function($rootScope, $scope, $timeout, $stateParams, Projects) {
  $scope.processing = false;
  $scope.hasSettings = false;
  $scope.hasReference = false;
  $scope.hasCompare = false;
  $scope.runningType = 'reference';
  $scope.batchItems = [];
  $scope.activeData = {};
  $scope.currentBatch = $rootScope.project.currentBatch || 0;
  $scope.progress = {
    percent: 0,
    title: 'Starting'
  };

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

    $scope.hasReference = true;
    $scope.hasCompare = (formatted.length > 0);
    return formatted;
  }

  function setupCurrentBatch() {
    if ($rootScope.project.currentBatch === null) {return;}

    // grab all the runner test data
    var id = (typeof $rootScope.project.currentBatch !== undefined) ? $rootScope.project.currentBatch : 0;
    var historyData = Projects.getTypeById($stateParams.id, 'history');

    // Store the processed data into the batch data
    $scope.batchItems = processBatch(historyData);
  }

  // validation of project
  function validateProject() {
    // verify if its valid
    var isValid = Projects.validate($rootScope.project);

    // alert of invalidity
    if (!isValid) {
      $rootScope.$broadcast('ALERT:FIRE', { title: 'Please finish configuring settings!', dur: 5, type: 'error', icon: 'stop' });
    }

    return isValid;
  }

  // checks for changes and updates UI accourdingly
  function checkState() {
    $scope.hasSettings = validateProject();
    $scope.hasReference = ($rootScope.project.currentReference !== null);
    $scope.currentBatch = $rootScope.project.currentBatch;

    if ($scope.runningType === 'reference') {
      $scope.hasCompare = false;
    } else {
      $scope.hasCompare = ($rootScope.project.currentBatch !== null && $rootScope.project.currentBatch !== 0);
    }
  }

  // grab the latest data for the project
  function grabLatestData() {
    $rootScope.project = Projects.getById($rootScope.project.id, 'history');

    // Set the active data based on currentBatch
    $scope.activeData = ($rootScope.project && $rootScope.project.batchHistory) ? $rootScope.project.batchHistory[$scope.currentBatch] : null;

    $rootScope.$emit('SIDEPANEL:UPDATE', $rootScope.project);
  }

  grabLatestData();
  checkState();
  setupCurrentBatch();

  // Fire off the viewer
  $scope.previewBatch = function(items) {
    $rootScope.$emit('MODAL:OPEN', { type: 'batch', items: items, project: $rootScope.project });
  };

  // Fire off a new test!!
  $scope.newCompare = function() {
    var valid = validateProject();

    // validation pause
    if (!valid) {return;}

    $scope.runningType = 'compare';
    $scope.processing = true;

    setTimeout(function() {
      $rootScope.$emit('PRELOADER:ON');
    }, 10);

    ipc.send('RUNNER:FIRE', { type: 'compare', projectId: $rootScope.project.id });
  };

  // setup new reference
  $scope.newReference = function() {
    var valid = validateProject();

    // validation pause
    if (!valid) {return;}

    $scope.processing = true;
    $scope.runningType = 'reference';
    $scope.hasCompare = false;

    setTimeout(function() {
      $rootScope.$emit('PRELOADER:ON');
    }, 10);

    ipc.send('RUNNER:FIRE', { type: 'reference', projectId: $rootScope.project.id });
  };

  function runnerEvents(args) {
    if (!args || !args.msg || !args.percent) {return;}

    // Write the progress to UI
    $scope.progress.percent = parseInt(args.percent, 10);
    $scope.progress.title = (args.msg) ? args.msg : $scope.progress.title;

    $rootScope.$emit('PRELOADER:UPDATE', args);
  }

  // signal UI of changes
  function runnerComplete() {
    grabLatestData();
    checkState();
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
