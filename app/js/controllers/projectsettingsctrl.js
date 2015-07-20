MUG.controller('ProjectSettingsCtrl',
['$rootScope', '$scope', '$state', 'Projects',
function($rootScope, $scope, $state, Projects) {
  $scope.selectorTypes = ['container', 'hide', 'remove'];

  // TODO: save project upon changes to viewports/cookies??
  $scope.master = {};
  angular.copy($rootScope.project, $scope.master);

  function addNewType(type, data) {
    $rootScope.project[type].push(data);
  }

  // TODO: setup validations
  // save the current project
  $scope.save = function() {
    Projects.save($rootScope.project)
      .then(function(res) {
        // Update the sidebar with changes
        $rootScope.$emit('SIDEPANEL:UPDATE', res);

        // Update the revert model
        angular.copy($rootScope.project, $scope.master);
      },

      function(err) {
        console.log('err', err);
      });
  };

  // revert the current project
  $scope.cancelSave = function() {
    var sure = confirm('Are you sure you want to clear all your changes?');
    if (sure) {
      // put revert model into the project model
      angular.copy($scope.master, $rootScope.project);
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
        },

        function(err) {
          console.log('err', err);
        });
    }
  }

  // Adds a new viewport item
  $scope.addViewport = function() {
    var newViewport = {
      active: false,
      name: null,
      width: null,
      height: null
    };

    addNewType('viewports', newViewport);
  };

  // Adds a new selector item
  $scope.addSelector = function() {
    var newSelector = {
      active: false,
      type: null,
      query: null
    };

    addNewType('selectors', newSelector);
  };

  // Adds a new cookie item
  $scope.addCookie = function() {
    var newCookie = {
      active: false,
      name: null,
      value: null,
      path: null
    };

    addNewType('cookies', newCookie);
  };

  // TODO: setup FN for activate a cookie/view/select
  // TODO: setup FN for removing a cookie/view/select

}]);
