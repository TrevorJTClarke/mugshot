MUG.config(
['$stateProvider', '$urlRouterProvider', '$locationProvider',
function($stateProvider, $urlRouterProvider, $locationProvider) {
  // removes the stupid /# from url
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider

  /**
   * Base Route
   */
  .state('main', {
    url: '/',
    templateUrl: 'project-settings.html'
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
  // .when('/dumb', '/dumb/thing');

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
}]);
