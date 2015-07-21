MUG.controller('ProjectCtrl',
['$rootScope', '$scope', '$stateParams', 'Projects',
function($rootScope, $scope, $stateParams, Projects) {

  // Allow the child views to bind to same scope
  $rootScope.project = Projects.getById($stateParams.id);

}]);
