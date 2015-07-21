MUG.controller('ProjectHistoryCtrl',
['$rootScope', '$scope', '$stateParams', 'Projects',
function($rootScope, $scope, $stateParams, Projects) {
  $scope.activeFilter = 'All';
  $scope.activeFilterQuery = '';

  // Allow the child views to bind to same scope
  $scope.historyItems = Projects.getHistoryById($stateParams.id);

  $scope.changeFilter = function(type) {
    $scope.activeFilter = type;
    $scope.activeFilterQuery = (type == 'All') ? '' : type;
  };

}]);
