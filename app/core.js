var remote = require('remote');
var ipc = require('ipc');
var window = remote.getCurrentWindow();

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
      window[btnArg]();
    }, false);
  }
})();

setTimeout(function() {
  ipc.send('RUNNER:FIRE', { type: 'reference', projectId: 'iHTtjKROyWpp' }); //7IEVrUlRhKTt
}, 300);
