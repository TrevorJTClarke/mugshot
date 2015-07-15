var remote = require('remote');

/**
 * Quick Frame Buttons
 * Binds the upper left buttons to their default action
 */
(function() {
  var buttons = document.querySelectorAll('body [core-frame]');
  for (var i = 0; i < buttons.length; i++) {
    var btn = buttons[i];

    btn.addEventListener('click', function(e) {
      var btnArg = e.currentTarget.attributes['core-frame'].value
      var window = remote.getCurrentWindow();
      window[btnArg]();
    }, false);
  }
})();
