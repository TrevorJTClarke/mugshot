var path = require('path');
var fs = require('fs');

var paths = {};

// MUG MODULE PATH
paths.mug                           = __dirname;

// SERVER PID PATH
paths.serverPidFile                 = paths.mug + '/server.pid';

// BITMAPS PATHS
paths.screens                       = paths.mug + '/screens';
paths.bitmapsReference              = paths.screens + '/reference';
paths.bitmapsTest                   = paths.screens + '/current';

// BACKSTOP CONFIG PATH
paths.mugConfigFileName             = path.join(paths.mug, '../..', 'mug.json');

// COMPARE PATHS
paths.comparePath                   = paths.mug + '/compare';
paths.compareConfigFileName         = paths.comparePath + '/config.json';
paths.compareReportURL              = 'http://localhost:3737/compare/';

// CAPTURE CONFIG PATHS
paths.capture                       = paths.mug + '/capture';
paths.captureConfigFileName         = paths.capture + '/config.json';
paths.captureConfigFileNameCache    = paths.capture + '/.config.json.cache';
paths.captureConfigFileNameDefault  = paths.capture + '/config.default.json';

// ACTIVE CAPTURE CONFIG PATH
paths.activeCaptureConfigPath       = '';

if (!fs.existsSync(paths.mugConfigFileName)) {
  console.log('\nTo run your own tests create a config here...\n ==> ' + paths.mugConfigFileName);
  console.log('\nRun `$ gulp genConfig` to generate a config template file in this location.\n');
  paths.activeCaptureConfigPath = paths.captureConfigFileNameDefault;
} else {
  console.log('\nConfig loaded.\n');
  paths.activeCaptureConfigPath = paths.mugConfigFileName;
}

module.exports = paths;
