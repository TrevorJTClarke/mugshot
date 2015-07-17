MUG.directive('timeAgo',
['timeAgoService', 'nowTimeService',
function (timeAgo, nowTime) {
  return {
    restrict: 'EA',
    link: function(scope, elem, attrs) {
      var fromTime;

      // Track the fromTime attribute
      attrs.$observe('fromTime', function (value) {
        fromTime = timeAgo.parse(value);
      });

      // Track changes to time difference
      scope.$watch(function () {
        return nowTime.getTime() - fromTime;
      }, function(value) {
        angular.element(elem).text(timeAgo.inWords(value));
      });
    }
  };
}]);
