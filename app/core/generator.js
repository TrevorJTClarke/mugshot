var fs = require('fs');
var paths = require('./paths')(__dirname);

if (typeof casper === undefined) {return;}

function Generator() {

  var activeProject = JSON.parse(fs.readFileSync(paths.activeProject, 'utf8'));

  console.log('helllooo', activeProject);
  this.getById = function(projectId) {
  }

}

// Generator();
