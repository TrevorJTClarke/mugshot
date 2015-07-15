var fs                      = require('fs');
// var fse                     = require('fs-extra');
var paths                   = require('../util/paths');
var genDefaultCompareConfig = require('../util/genDefaultCompareConfig');

//this is for compare/genBitmaps.js until we can pass the active location via env
// fse.copySync(paths.activeCaptureConfigPath, paths.captureConfigFileName);

console.log('paths.activeCaptureConfigPath', paths.activeCaptureConfigPath);
console.log('paths.captureConfigFileName', paths.captureConfigFileName);

var exists;
fs.exists(paths.compareConfigFileName, function(bool) {
  if (!bool) {
    console.log('No compare/config.json file exists. Creating default file.');
    fs.createReadStream(paths.activeCaptureConfigPath)
      .pipe(fs.createWriteStream(paths.captureConfigFileName));
    genDefaultCompareConfig();
  }
});
