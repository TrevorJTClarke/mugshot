MUG.factory('timeAgo', function () {
  var service = {};

  service.settings = {
    refreshMillis: 60000,
    allowFuture: false,
    strings: {
      prefixAgo: null,
      prefixFromNow: null,
      suffixAgo: 'ago',
      suffixFromNow: 'from now',
      seconds: 'less than a minute',
      minute: 'about a minute',
      minutes: '%d minutes',
      hour: 'about an hour',
      hours: '%d hours',
      day: 'a day',
      days: '%d days',
      month: 'about a month',
      months: '%d months',
      year: 'about a year',
      years: '%d years',
      numbers: []
    }
  };

  function trimDigits ( num ) {
      var m = num.toString().slice(0,13);
      return (m.length == 13)? parseInt(m) : num;
  }

  service.inWords = function (distanceMillis) {
    var $l = service.settings.strings;
    var prefix = $l.prefixAgo;
    var suffix = $l.suffixAgo;
    if (service.settings.allowFuture) {
      if (distanceMillis < 0) {
        prefix = $l.prefixFromNow;
        suffix = $l.suffixFromNow;
      }
    }

    var seconds = Math.abs(distanceMillis) / 1000;
    var minutes = seconds / 60;
    var hours = minutes / 60;
    var days = hours / 24;
    var years = days / 365;

    function substitute(stringOrFunction, number) {
      var string = angular.isFunction(stringOrFunction) ?
      stringOrFunction(number, distanceMillis) : stringOrFunction;
      var value = ($l.numbers && $l.numbers[number]) || number;
      return string.replace(/%d/i, value);
    }

    var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 42 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.round(days)) ||
        days < 45 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.round(days / 30)) ||
        years < 1.5 && substitute($l.year, 1) ||
        substitute($l.years, Math.round(years));

    var separator = $l.wordSeparator === undefined ? ' ' : $l.wordSeparator;
    return [prefix, words, suffix].join(separator).trim();
  };

  service.parse = function (iso8601) {
    if (angular.isNumber(iso8601)) {
      iso8601 = iso8601 + "";
      // format for correct length
      var originalTimestamp = trimDigits( iso8601 );
      return parseInt(originalTimestamp, 10);
    }
    var s = (iso8601 || '').trim();
    s = s.replace(/\.\d+/, ''); // remove milliseconds
    s = s.replace(/-/, '/').replace(/-/, '/');
    s = s.replace(/T/, ' ').replace(/Z/, ' UTC');
    s = s.replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2'); // -04:00 -> -0400
    return new Date(s);
  };

  return service;
});
