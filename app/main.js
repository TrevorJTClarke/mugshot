'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var gulp  = require('gulp');
var fs    = require('fs');
var spawn = require('child_process').spawn;
var paths = require('../app/core/util/paths');
require('require-dir')('../app/core/tasks', { recurse: true });

// var env = require('./vendor/electron_boilerplate/env_config');
var devHelper = require('./vendor/electron_boilerplate/dev_helper');
var windowStateKeeper = require('./vendor/electron_boilerplate/window_state');
var ipc = require('ipc');

var mainWindow;

// Preserver of the window size and position between app launches.
var mainWindowState = windowStateKeeper('main', {
  width: 500,
  height: 400
});

// ipc.on('FILE:DROPPED', function(e, arg) {
//   console.log('FILE:DROPPED MAIN Thread', arg); // prints "pong"
// });

ipc.on('URLTEST', function(e, arg) {
  console.log('URLTEST', arg);

  // TODO: setup a test button
  gulp.run('reference');
});

app.on('ready', function() {

  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height
  });

  if (mainWindowState.isMaximized) {
    mainWindow.maximize();
  }

  mainWindow.loadUrl('file://' + __dirname + '/app.html');

  // TODO: env isnt loading the settings
  // if (env.name === 'development') {
  //     devHelper.setDevMenu();
  //     // mainWindow.openDevTools();
  // }

  mainWindow.on('close', function() {
    mainWindowState.saveState(mainWindow);
  });
});

app.on('window-all-closed', function() {
  app.quit();
});
