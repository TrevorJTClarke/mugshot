'use strict';

var fs = require('fs');
var app = require('app');
var ipc = require('ipc');
var gulp  = require('gulp');
var BrowserWindow = require('browser-window');
var paths = require('../app/core/paths')(__dirname);
var screener = require('../app/core/screencap');
var compare = require('../app/core/compare');
var test = require('../app/core/selenium-test');
var windowStateKeeper = require('./vendor/core/window_state');
var windowMenus = require('./vendor/core/menus');

// adds gulp tasks available
require('require-dir')(paths.core, { recurse: true }); //paths.core

// TODO: assess these
// var env = require('./vendor/electron_boilerplate/env_config');
// var devHelper = require('./vendor/electron_boilerplate/dev_helper');

// silly global vars...
var mainWindow;

// Preserver of the window size and position between app launches.
var mainWindowState = windowStateKeeper('main', {
  width: 900,
  height: 575,
});

// wait for the runner events
ipc.on('RUNNER:FIRE', function(e, args) {
  if (!args || !args.type) { return; }

  var method = (args.type === 'reference') ? 'createReference' : 'createCompare';

  // Store the __dirname so the CHILDPROCESS can use
  fs.writeFile(paths.dirConfig, JSON.stringify({ dirname: paths.dirname, type: args.type }));

  // start the Screenshot process
  screener[method](args.projectId, function(err, res) {
    if (err) {
      console.log('err', err);
      return;
    }

    if (args.type !== 'reference') {
      console.log('Compare Diff Start', res.currentBatch);
      compare.runBatch(res, function() {
        mainWindow.webContents.send('RUNNER:COMPLETE');
      });
    } else {
      mainWindow.webContents.send('RUNNER:COMPLETE');
    }
  });
});

/**
 * Main Startup function!
 */
app.on('ready', function() {

  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    'min-width': 745,
    'min-height': 450,
    'max-width': 2550,
    'max-height': 1500,
    frame: false,
  });

  if (mainWindowState.isMaximized) {
    mainWindow.maximize();
  }

  windowMenus.setMainMenu();
  mainWindow.loadUrl('file://' + __dirname + '/app.html');

  mainWindow.openDevTools();

  // TODO: env isnt loading the settings
  // if (env.name === 'development') {
  //     devHelper.setDevMenu();
  // mainWindow.openDevTools();
  // }

  mainWindow.on('close', function() {
    mainWindowState.saveState(mainWindow);
  });

  mainWindow.on('show-settings', function(e, cmd) {
    console.log('application:show-settings', cmd);
  });

});

app.on('window-all-closed', function() {
  app.quit();
});
