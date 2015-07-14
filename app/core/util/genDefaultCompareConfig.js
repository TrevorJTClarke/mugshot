var fs = require('fs');
var paths = require('./paths');

var configDefault = {
  testPairs: []
};
console.log('paths.compareConfigFileName', paths.compareConfigFileName.replace('util/../../', ''));
fs.exists(paths.compareConfigFileName.replace('util/../../', ''), function(bool) {
  console.log('bool', bool);
});

var genDefaultCompareConfig = function() {
  fs.writeFileSync(paths.compareConfigFileName.replace('util/../../', ''), JSON.stringify(configDefault, null, 2));
};

module.exports = genDefaultCompareConfig;
