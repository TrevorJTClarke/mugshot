var ipc = require("electron").ipcRenderer;

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

  ipc.on('NAVIGATE:TO', function(args) {
    if (!args || !args.location) {return;}

    console.log('NAVIGATE:TO', args);
    $state.go(args.location);
  });

  // USE THIS instead of $scope.$apply(); It will make the $digest errors not happen.
  $rootScope.SafeApply = function(scope, fn) {
    if (scope.$$phase || scope.$root.$$phase) {
      if (typeof fn !== 'undefined') {
        fn();
      }
    } else {
      scope.$apply(fn);
    }
  };

}]);
