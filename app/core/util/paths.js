var fs = require('fs');

// var path = require('path');
var paths = {};
var _dirname = '/Users/trevorclarke/github/mug/app/core/util';
var _base = '/Users/trevorclarke/github/mug/app/';

// MUG MODULE PATH
paths.base                          = _dirname + '/../';

// SERVER PID PATH
paths.serverPidFile                 = paths.base + 'server.pid';

// BITMAPS PATHS
paths.screens                       = paths.base + '../screens';
paths.bitmapsReference              = paths.screens + '/reference';
paths.bitmapsTest                   = paths.screens + '/current';

// MUG CONFIG PATH
paths.mugConfigFileName             = 'mug.json';

// COMPARE PATHS
paths.comparePath                   = paths.base + 'compare';
paths.compareConfigFileName         = paths.comparePath + '/config.json';
paths.compareReportURL              = 'http://localhost:3737/compare/';

// CAPTURE CONFIG PATHS
paths.capture                       = paths.base + 'capture';
paths.captureConfigFileName         = paths.capture + '/config.json';
paths.captureConfigFileNameCache    = paths.capture + '/.config.json.cache';
paths.captureConfigFileNameDefault  = paths.capture + '/config.default.json';

// ACTIVE CAPTURE CONFIG PATH
paths.activeCaptureConfigPath       = '';

var exist;
fs.exists(_base + paths.mugConfigFileName, function(bool) {
  exist = bool;

  if (!exist) {
    console.log('\nRun `$ gulp genConfig` to generate a config template file in this location.\n');
    paths.activeCaptureConfigPath = paths.captureConfigFileNameDefault;
  } else {
    console.log('\nConfig loaded.\n');
    paths.activeCaptureConfigPath = paths.mugConfigFileName;
  }
});

module.exports = paths;
