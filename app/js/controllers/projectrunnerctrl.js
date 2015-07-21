MUG.controller('ProjectRunnerCtrl',
['$rootScope', '$scope', 'Projects',
function($rootScope, $scope, Projects) {
  $scope.activeFilter = 'all';

  $scope.changeFilter = function(type) {
    $scope.activeFilter = type;
  };

  // Allow the child views to bind to same scope
  // $rootScope.project = Projects.getById($stateParams.id);

}]);
