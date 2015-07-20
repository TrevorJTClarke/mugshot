var fs = require('fs');

MUG.controller('SidePanelCtrl',
['$rootScope', '$scope', '$state', 'Projects',
function($rootScope, $scope, $state, Projects) {
  $scope.projects = [];

  // grab all projects list
  $scope.projects = Projects.getAll();

  // add new project to the projects list
  $rootScope.$on('SIDEPANEL:NEWPROJECT', function(e, args) {
    if (!args || !args.id) { return; }

    $scope.projects.unshift(args);
  });

  // update the projects list
  $rootScope.$on('SIDEPANEL:UPDATE', function(e, args) {
    if (!args || !args.id) { return; }

    $scope.projects.map(function(obj, idx) {
      if (obj.id === args.id) {
        $scope.projects[idx] = args;
      }
    });
  });

  // update the projects list
  $rootScope.$on('SIDEPANEL:REMOVE', function(e, args) {
    if (!args || !args.id) { return; }

    $scope.projects.map(function(obj, idx) {
      if (obj.id === args.id) {
        $scope.projects.splice(idx, 1);
      }
    });
  });

  $scope.goToProject = function(id) {
    var type = 'settings';

    // TODO: setup to figure out if we need to go to settings, otherwise go to runner
    $state.go('projects.' + type, { id: id });
    $rootScope.currentProjectId = id;
  }

}]);
