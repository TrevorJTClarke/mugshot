'use strict';

var fs = require('fs');
var app = require('app');
var ipc = require('ipc');
var gulp  = require('gulp');
var BrowserWindow = require('browser-window');
var paths = require('../app/core/paths')(__dirname);
var screener = require('../app/core/screencap');
var compare = require('../app/core/compare');
var windowStateKeeper = require('./vendor/electron_boilerplate/window_state');

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
  height: 575
});

// wait for the runner events
ipc.on('RUNNER:FIRE', function(e, args) {
  if (!args || !args.type) { return; }

  var method = (args.type === 'reference') ? 'createReference' : 'createCompare';
  console.log('RUNNER:FIRE', args);

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
      compare.runBatch(args.projectId, res.currentBatch);
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
    'max-width': 1450,
    'max-height': 1000,
    frame: false
  });

  if (mainWindowState.isMaximized) {
    mainWindow.maximize();
  }

  mainWindow.loadUrl('file://' + __dirname + '/app.html');

  // TODO: env isnt loading the settings
  // if (env.name === 'development') {
  //     devHelper.setDevMenu();
  // mainWindow.openDevTools();
  // }

  mainWindow.on('close', function() {
    mainWindowState.saveState(mainWindow);
  });

});

app.on('window-all-closed', function() {
  app.quit();
});
