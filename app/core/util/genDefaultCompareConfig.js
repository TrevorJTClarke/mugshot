var fs = require('fs');
var paths = require('./paths');

var configPath = paths.compareConfigFileName.replace('util/../../', '');
var configDefault = {
  testPairs: []
};

var genDefaultCompareConfig = function() {
  fs.writeFileSync(configPath, JSON.stringify(configDefault, null, 2));
};

module.exports = genDefaultCompareConfig;
