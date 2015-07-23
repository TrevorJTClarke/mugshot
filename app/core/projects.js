var gulp  = require('gulp');
var fs    = require('fs');
var spawn = require('child_process').spawn;
var paths = require('./paths')(__dirname);

function projects() {

  this.getById = function(projectId) {
    var file;
    var projectPath = paths.getProjectConfig(projectId);
    console.log('projectPath', projectPath);

    try {
      file = fs.readFileSync(projectPath, 'utf8');
    } catch (e) {
      // couldn't find file
      if (e.code === 'ENOENT') {
        return {};
      } else {
        throw e;
      }
    }

    return JSON.parse(file);
  }

  return this;
}

module.exports = projects();
