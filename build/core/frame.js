var remote = require('remote');
var ipc = require("electron").ipcRenderer;
var w = remote.getCurrentWindow();

/**
 * Quick Frame Buttons
 * Binds the upper left buttons to their default action
 */
(function() {
  var buttons = document.querySelectorAll('body [core-frame]');
  for (var i = 0; i < buttons.length; i++) {
    var btn = buttons[i];

    btn.addEventListener('click', function(e) {
      var btnArg = e.currentTarget.attributes['core-frame'].value;
      w[btnArg]();
    }, false);
  }
})();
