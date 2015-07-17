MUG.run(['$rootScope', '$http',
function ($rootScope, $http) {
  // headers
  var $common = $http.defaults.headers.common;
  $common["Content-Type"] = "application/json";

}]);
