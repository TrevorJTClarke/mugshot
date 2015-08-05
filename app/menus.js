var remote = require('remote');
var Menu = remote.require('menu');
var template = [{
  label: 'Mugshot',
  submenu: [
    { label: 'About Mugshot', command: 'application:about' },
    { label: 'Restart and Install Update', command: 'application:install-update', visible: false},
    { label: 'Check for Update', command: 'application:check-for-update', visible: false},
    { label: 'Downloading Update', enabled: false, visible: false},
    { type: 'separator' },
    { label: 'Preferences', accelerator: 'Command+,', click: function() { console.log('fired') } },
    { type: 'separator' },
    { label: 'Quit', command: 'application:quit', accelerator: 'Command+Q' }
  ]
}, {
  label: 'Edit',
  submenu: [
    { label: 'Undo', selector: 'undo:', accelerator: 'Command+Z' },
    { label: 'Redo', selector: 'redo:', accelerator: 'Shift+Command+Z' },
    { type: 'separator' },
    { label: 'Cut', selector: 'cut:', accelerator: 'Command+X' },
    { label: 'Copy', selector: 'copy:', accelerator: 'Command+C' },
    { label: 'Paste', selector: 'paste:', accelerator: 'Command+V' },
    { label: 'Select All', selector: 'selectAll:', accelerator: 'Command+A' },
  ]
}, {
  label: 'View',
  submenu: [
    { label: 'Reload', command: 'window:reload', accelerator: 'Command+R' },
    { label: 'Toggle Full Screen', command: 'window:toggle-full-screen', accelerator: 'Command+Control+F' },
    {
      label: 'Developer',
      submenu: [
        { label: 'Toggle Developer Tools', command: 'window:toggle-dev-tools', accelerator: 'Alt+Command+I' }
      ]
    }
  ]
}, {
  label: 'Window',
  submenu: [
    { label: 'Minimize', selector: 'performMiniaturize:', accelerator: 'Command+M' },
    { label: 'Zoom', selector: 'performZoom:' }
  ]
}, {
  label: 'Help',
  submenu: [
    { label: 'Report Issue', command: 'application:report-issue' }
  ]
}];



var menuBuilt = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menuBuilt);
