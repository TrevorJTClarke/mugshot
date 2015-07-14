'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var gulp  = require('gulp');
var fs    = require('fs');
var spawn = require('child_process').spawn;
// var paths = require('../util/paths');

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
  var casperProcess = (process.platform === 'win32' ? 'casperjs.cmd' : 'casperjs');
  console.log('casperProcess', casperProcess);
  var casperArgs = ['capture/genBitmaps.js', '--ssl-protocol=any'];
  var casperChild = spawn(casperProcess, casperArgs);

  casperChild.stdout.on('data', function(data) {
    console.log('CasperJS:', data.toString().slice(0, -1)); // Remove \n
  });

  casperChild.on('close', function(code) {
    var success = code === 0; // Will be 1 in the event of failure
    var result = (success) ? 'Bitmap file generation completed.' : 'Testing script failed with code: ' + code;

    console.log('\n' + result);

    //exit if there was some kind of failure in the casperChild process
    if (code != 0) {
      console.log('\nLooks like an error occured. You may want to try running `$ gulp echo`. This will echo the requested test URL output to the console. You can check this output to verify that the file requested is indeed being received in the expected format.');
      return false;
    };

    // var resultConfig = JSON.parse(fs.readFileSync(paths.compareConfigFileName, 'utf8'));
    // if (genReferenceMode || !resultConfig.testPairs || resultConfig.testPairs.length == 0) {
    //   console.log('\nRun `$ gulp test` to generate diff report.\n')
    // } else {
    //   gulp.run('report');
    // }

  });
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
