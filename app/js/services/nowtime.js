MUG.factory('nowTime',
['$timeout',
function ($timeout) {
  var nowTime = Date.now();
  var updateTime = function() {
    $timeout(function() {
      nowTime = Date.now();
      updateTime();
    }, 1000);
  };
  updateTime();
  return {
    getTime: function() {
      return nowTime;
    }
  };
}]);
