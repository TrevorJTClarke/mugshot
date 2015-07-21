MUG.run(['$rootScope', '$http',
function($rootScope, $http) {

  // headers
  var $common = $http.defaults.headers.common;
  $common['Content-Type'] = 'application/json';

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    console.log('$stateChangeError', error);
  });

}]);
