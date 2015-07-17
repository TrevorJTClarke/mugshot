/**
 * msgCenter
 * a directive for handling all message relay for a user
 *
 * USE:
 * $rootScope.$broadcast('MSGCENTER:FIRE', { msg: "Hey there, Im a message!!", dur: 5, type: "info", icon: "info", callback: function(){} });
 *
 * TYPES:
 * - DEFAULT, shows green message, used for success
 * - Warning: "warn" - shows orange message, used for errors or warnings
 * - Info: "info" - shows dark blue message, used for general things
 *
 * OPTIONS:
 * - msg: the contents of the message, (TODO: can be html or simple text)
 * - callback: a function to fire on action taken on message
 * - dur: the timeout of the message
 * - type: see above types
 * - icon: default is globe, can be set to ANY i-sprites (sprites.less)
 */
MUG.directive('msgCenter',
[ "$rootScope", "$timeout", "$compile",
function ($rootScope, $timeout, $compile) {
  return {
    scope: {},
    link: function (scope, el, attrs, ctrl) {
      var msgTemplate = '<div class="msg" ng-click="action()">'+
          '<div class="msg-icn"><i class="iw i-ICON"></i></div>'+
          '<div class="msg-cont">BODY</div>'+
          '<div class="msg-action"><i class="ib i-r-arrow"></i></div>'+
        '</div>';

      var _el = angular.element(el);
      var timer;
      var duration = 5000;
      var previousId = "";
      var defaultIcon = "info";

      scope.body = "";
      scope.callback = null;
      scope.icon = defaultIcon;
      scope.action = function(){
        var actionEl = _el.find("#" + this.id);
        scope.callback();
        clearEl( actionEl );
      };

      function showMessage ( data ){
        var _id = (+new Date());
        var newBody = data.msg;
        var newIcn = (data.icon)? data.icon : defaultIcon;

        var template = msgTemplate.replace("BODY", newBody).replace("ICON", newIcn);
        var newMessage = $compile(template)(scope);

        // set a unique id
        newMessage[0].id = _id;
        previousId = _id;

        // throw into dom, then show in view, start timer
        _el.append( newMessage );

        // remember the new el for later
        var msgEl = _el.find("#" + _id);
        changeType( msgEl, data.type );

        if(data.callback){
          msgEl.find(".msg-action").addClass("show");
        }

        // show
        $timeout(function() {
          msgEl.addClass('add');
        }, 20);

        timer = $timeout(function() {
            clearEl( msgEl );
        }, duration);
      }

      function clearEl ( elem ) {
        if(!elem && previousId){
          elem = _el.find("#" + previousId);
        } else if(!elem) { return; }

        elem.removeClass('add');
        elem.addClass('remove');
        $timeout(function(){
          angular.element(elem).remove();
        }, 300);
      }

      // set the type by a class
      function changeType ( elem, type ) {
        elem.removeClass('msg-info');
        elem.removeClass('msg-warn');

        if(type){
          elem.addClass('msg-' + type);
        }
      }

      $rootScope.$on('MSGCENTER:FIRE', function(e, data){
        if(!data.msg){ return; }
        window.clearTimeout(timer);
        clearEl();

        if(data.dur){
          duration = data.dur * 1000;
        }

        if(data.callback){
          scope.callback = data.callback;
        }

        showMessage( data );
      });
    }
  };
}]);
