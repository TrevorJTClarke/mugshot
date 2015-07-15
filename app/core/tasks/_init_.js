var fs                      = require('fs');
var paths                   = require('../util/paths');
var genDefaultCompareConfig = require('../util/genDefaultCompareConfig');

//this is for compare/genBitmaps.js until we can pass the active location via env
var exists;
fs.exists(paths.compareConfigFileName, function(bool) {
  if (!bool) {
    console.log('No compare/config.json file exists. Creating default file.');
    fs.createReadStream(paths.activeCaptureConfigPath)
      .pipe(fs.createWriteStream(paths.captureConfigFileName));
    genDefaultCompareConfig();
  }
});
