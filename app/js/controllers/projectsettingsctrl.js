MUG.controller('ProjectSettingsCtrl',
['$rootScope', '$scope', '$state', 'Projects',
function($rootScope, $scope, $state, Projects) {
  var saveTimer;

  $scope.selectorTypes = ['container', 'hide', 'remove'];
  $scope.hasChanges = false;
  $scope.master = {};
  angular.copy($rootScope.project, $scope.master);

  function addNewType(type, data) {
    $rootScope.project[type].push(data);
  }

  // Watch for changes, so we can save
  $scope.$watch('project', function(nV, oV) {
    if (nV != oV) {
      $scope.hasChanges = true;

      // save the file for convenience
      $scope.save();
    }
  }, true);

  // TODO: setup validations
  // save the current project
  $scope.save = function() {
    if (saveTimer) {
      window.clearTimeout(saveTimer);
    }

    // throttle the saves, since we save on any changes
    saveTimer = setTimeout(function() {

      // Save teh projectoid
      Projects.save($rootScope.project)
        .then(function(res) {
          // Update the sidebar with changes
          $rootScope.$emit('SIDEPANEL:UPDATE', res);

          // Update the revert model
          angular.copy($rootScope.project, $scope.master);
          $scope.hasChanges = false;
        },

        function(err) {
          console.log('err', err);
        });
    }, 200);
  };

  // revert the current project
  $scope.cancelSave = function() {
    var sure = confirm('Are you sure you want to clear all your changes?');
    if (sure) {
      // put revert model into the project model
      angular.copy($scope.master, $rootScope.project);
      $scope.hasChanges = false;
    }
  };

  // delete the project, and remove from project lists, then redirect to main
  $scope.deleteProject = function() {
    var sure = confirm('Are you sure you want to delete this project?');
    if (sure) {
      var projectID = $rootScope.project.id;

      Projects.remove(projectID)
        .then(function(res) {
          $rootScope.$emit('SIDEPANEL:REMOVE', { id: projectID });
          $state.go('main');
          $rootScope.project = {};
          $scope.hasChanges = false;
        },

        function(err) {
          console.log('err', err);
        });
    }
  }

  // Adds a new viewport item
  $scope.addViewport = function() {
    var newViewport = {
      active: true,
      name: null,
      width: null,
      height: null
    };

    addNewType('viewports', newViewport);
  };

  // Adds a new selector item
  $scope.addSelector = function() {
    var newSelector = {
      active: true,
      type: 'container',
      query: null
    };

    addNewType('selectors', newSelector);
  };

  // Adds a new cookie item
  $scope.addCookie = function() {
    var newCookie = {
      active: true,
      name: null,
      value: null,
      path: null
    };

    addNewType('cookies', newCookie);
  };

  // activate a cookie/view/select
  $scope.activateType = function(type, id) {
    $rootScope.project[type][id].active = ($rootScope.project[type][id].active === true || $rootScope.project[type][id].active === 'true') ? false : true;

    // save the file for convenience
    $scope.save();
  };

  // Remove a cookie/view/select
  $scope.deleteTypeItem = function(type, id) {
    $rootScope.project[type].splice(id, 1);

    // save the file for convenience
    $scope.save();
  };

  // Removes all history data
  $scope.clearHistory = function() {
    Projects.clearHistory($rootScope.project)
      .then(function(res) {
        $rootScope.$broadcast('ALERT:FIRE', { title: "Cleared All History!", dur: 5, type: "success", icon: "history" });
      }

      , function(err) {
        $rootScope.$broadcast('ALERT:FIRE', { title: "Error Occurred! Please try again.", dur: 5, type: "error", icon: "stop" });
      });
  };

}]);
