MUG.controller('ProjectSettingsCtrl',
['$rootScope', '$scope', '$state', 'Projects',
function($rootScope, $scope, $state, Projects) {
  $scope.master = {};
  angular.copy($rootScope.project, $scope.master);

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

}]);
