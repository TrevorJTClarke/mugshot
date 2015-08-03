MUG.config(
['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  // Routes
  // /
  // /projects
  // /projects/:id/runner
  // /projects/:id/history
  // /projects/:id/settings

  $stateProvider

  /**
   * Base Route
   */
  .state('main', {
    url: '/',
    templateUrl: 'main.html'
  })
  .state('preferences', {
    url: '/preferences',
    templateUrl: 'preferences.html'
  })

  /**
   * Project Routes
   */
  .state('projects', {
    url: '/projects/:id',
    templateUrl: 'projects.html',
    controller: 'ProjectCtrl'
  })
  .state('projects.settings', {
    url: '/settings',
    templateUrl: 'projects.settings.html',
    controller: 'ProjectSettingsCtrl'
  })
  .state('projects.runner', {
    url: '/runner',
    templateUrl: 'projects.runner.html',
    controller: 'ProjectRunnerCtrl'
  })
  .state('projects.history', {
    url: '/history',
    templateUrl: 'projects.history.html',
    controller: 'ProjectHistoryCtrl'
  })

  /**
   * Static Routes
   */

  // .state('main.404', {
  //     url: "/404",
  //     templateUrl: "templates/404.html",
  //     isExternal: true
  // })

  // End of the world
  ;

  // url re-routing
  // $urlRouterProvider
  //   .when('/projects', '/')
  //   .when('/projects/', '/');

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

}]);
