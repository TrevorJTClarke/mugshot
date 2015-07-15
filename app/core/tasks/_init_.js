var fs                      = require('fs');
// var fse                     = require('fs-extra');
var paths                   = require('../util/paths');
var genDefaultCompareConfig = require('../util/genDefaultCompareConfig');

console.log('paths.activeCaptureConfigPath', paths.activeCaptureConfigPath, 'paths.captureConfigFileName',paths.captureConfigFileName);

//this is for compare/genBitmaps.js until we can pass the active location via env
// fse.copySync(paths.activeCaptureConfigPath, paths.captureConfigFileName);

var exists;
fs.exists(paths.compareConfigFileName, function(bool) {
  if (!bool) {
    console.log('No compare/config.json file exists. Creating default file.')
    genDefaultCompareConfig();
  }
});
