MUG.controller('ProjectSettingsCtrl',
['$rootScope', '$scope', 'Projects',
function($rootScope, $scope, Projects) {
  $scope.master = {};
  angular.copy($rootScope.project, $scope.master);

  // TODO: setup validations
  // save the current project
  $scope.save = function() {
    Projects.save($rootScope.project)
      .then(function(res) {
        $rootScope.$emit('SIDEPANEL:UPDATE', res);
      },

      function(err) {
        console.log('err', err);
      });
  };

  // revert the current project
  $scope.cancelSave = function() {
    var sure = confirm('Are you sure you want to clear all your changes?');
    if (sure) {
      angular.copy($scope.master, $rootScope.project);
    }
  };

  $scope.deleteProject = function() {
    var sure = confirm('Are you sure you want to delete this project?');
    if (sure) {
      // TODO: setup delet of project file and remove from project lists
      console.log('TODO: DELETE FN');
    }
  }

}]);
