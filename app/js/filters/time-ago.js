MUG.filter('timeAgo',
['nowTime', 'timeAgo',
function (nowTime, timeAgo) {
  return function (value) {
    var fromTime = timeAgo.parse(value);
    var diff = nowTime.getTime() - fromTime;
    return timeAgo.inWords(diff);
  };
}]);
