'use strict';

var app = require('app');
var ipc = require('ipc');
var Menu = require('menu');
var BW = require('browser-window');

function navigateTo(location) {
  BW.getFocusedWindow().webContents.send('NAVIGATE:TO', { location: location });
}

var mainMenu = [{
  label: 'Mugshot',
  submenu: [
    { label: 'About Mugshot', click: function() { console.log('TODO: About View') } },
    { label: 'Restart and Install Update', click: function() { console.log('TODO: Install Update') }, visible: false},
    { label: 'Check for Update', click: function() { console.log('TODO: Update Link') }, visible: false},
    { label: 'Downloading Update', enabled: false, visible: false},
    { type: 'separator' },
    { label: 'Preferences', accelerator: 'Command+,', click: function() { navigateTo('preferences'); console.log('TODO: Preferences fired') } },
    { type: 'separator' },
    { label: 'Quit', click: function() { console.log('TODO: Quit') }, accelerator: 'Command+Q' }
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
    // { label: 'Reload', click: function() { console.log('TODO: Reload View') }, accelerator: 'Command+R' },
    { label: 'Toggle Full Screen', click: function() { console.log('TODO: Toggle Full Screen') }, accelerator: 'Command+Control+F' }
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
    { label: 'Report Issue', click: function() { console.log('TODO: Report Issue') } }
  ]
}];

// TODO: setup dynamic menuing for show/hide
module.exports.setMainMenu = function() {
  var fullMenu = Menu.buildFromTemplate(mainMenu);
  Menu.setApplicationMenu(fullMenu);
};
