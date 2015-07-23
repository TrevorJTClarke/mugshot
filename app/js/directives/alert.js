/**
 * alert
 * a directive for handling all alerts and notices for a user
 *
 * USE:
 * <alert></alert>
 *
 * $rootScope.$broadcast('ALERT:FIRE', { title: "Hey there, Im a message!!", dur: 5, type: "info", icon: "info", callback: function(){} });
 *
 * TYPES:
 * - info, success, warning, error
 *
 * OPTIONS:
 * - title: the contents of the message, (TODO: can be html or simple text)
 * - callback: a function to fire on action taken on message
 * - dur: the timeout of the message, in seconds
 * - type: see above types
 * - icon: no default, see https://octicons.github.com/ for options
 */
MUG.directive('alert',
['$rootScope', '$timeout', '$compile', '$templateCache',
function($rootScope, $timeout, $compile, $templateCache) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="alert-parent"></div>',
    scope: {},
    link: function(scope, el, attrs, ctrl) {
      var alertTemplate = $templateCache.get('alert.html');
      var _el = angular.element(el);
      var timer;
      var duration = 5000;
      var previousId = '';
      var alertActive = 'alert-active';
      var alertVisible = 'alert-visible';

      function showMessage(data) {
        var _id = (+new Date());
        var newBody = data.title;
        var newIcn = (data.icon) ? data.icon : null;
        var $tmpScope = $rootScope.$new(true);

        // setup simple scope for only this alert item
        $tmpScope.alert = {};
        $tmpScope.alert.id = _id;
        $tmpScope.alert.icon = (data.icon) ? data.icon : null;
        $tmpScope.alert.type = (data.type) ? data.type : 'info';
        $tmpScope.alert.title = data.title;
        $tmpScope.alert.action = (!data.callback) ? null : function() {
          var actionEl = this.id;
          data.callback();
          clearEl(this);
        };

        var alertEl = $compile(alertTemplate)($tmpScope);

        // set a unique id
        alertEl[0].id = _id;
        previousId = _id;

        // throw into dom, then show in view, start timer
        _el.append(alertEl);
        alertEl.addClass(alertActive);

        // show
        $timeout(function() {
          alertEl.addClass(alertVisible);
        }, 20);

        timer = $timeout(function() {
          clearEl(alertEl);
        }, duration);
      }

      function clearEl(elem) {
        if (!elem && previousId) {
          elem = angular.element(document.getElementById(previousId));
        } else if (!elem) {
          return;
        } else if (elem) {
          elem = angular.element(elem);
        }

        elem.removeClass(alertVisible);
        $timeout(function() {
          elem.remove();
        }, 300);
      }

      $rootScope.$on('ALERT:FIRE', function(e, data) {
        if (!data.title) { return; }

        window.clearTimeout(timer);
        clearEl();

        if (data.dur) {
          duration = data.dur * 1000;
        }

        showMessage(data);
      });
    }
  };
}]);
