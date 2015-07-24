MUG.controller('MainCtrl',
['$rootScope', '$scope', '$state', 'Config', 'Projects',
function($rootScope, $scope, $state, Config, Projects) {
  $rootScope.currentProjectId = '';

  $scope.createNewProject = function() {
    Projects.createNew().then(function(res) {
      $rootScope.$broadcast('SIDEPANEL:NEWPROJECT', res);
      $state.go('projects.settings', { id: res.id });
    },

    function(err) {
      console.log('err', err);
    });
  };

  // $rootScope.$emit('ALERT:FIRE', {  title: 'Hey there, Im an alert!!', dur: 5, type: 'success' });
  //
  // setTimeout(function() {
  //   $rootScope.$emit('ALERT:FIRE', {  title: 'Hey there, Im an error!!', dur: 5, type: 'error', icon: 'stop' });
  // }, 3000);

}]);
