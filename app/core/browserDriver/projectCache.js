/**
 * Project Cache
 */
var fs = require('fs');
var Q = require('q');
var pfs   = require('../promisefs');
var Projects = require('../projects');
var Progress = require('../progress');

var appDataPath = '/app/data';
var dirConfigPath = appDataPath + '/dirConfig.json';
var activeProjectPath = appDataPath + '/activeProject.json';

var projectCache = function() {

  this.setup = function(type, projectId, cwd) {
    var _d = Q.defer();
    var currentProject = Projects.getById(projectId);
    var projectPath = Projects.getPathForId(projectId);

    // quick minor updates, based on the type
    if (type === 'reference') {
      currentProject.currentReference = (currentProject.currentBatch > 0 && currentProject.currentBatch > currentProject.currentReference) ? currentProject.currentBatch + 1 : (typeof currentProject.currentReference !== undefined || currentProject.currentReference === null) ? 0 : currentProject.currentReference + 1;
    } else {
      currentProject.currentBatch = (currentProject.currentBatch > 0 && currentProject.currentBatch > currentProject.currentReference) ? currentProject.currentBatch + 1 : currentProject.currentReference + 1;
    }

    // final minor updates
    currentProject.timestamp = (+new Date);

    // save the dirConfig with type and cwd
    fs.writeFile(cwd + dirConfigPath, JSON.stringify({ dirname: cwd, type: type }));

    // Save the current state, so generator can pick up needed data
    fs.writeFile(cwd + activeProjectPath, JSON.stringify(currentProject), function(err) {
      if (err) {
        console.log('err', err);
        _d.reject(err);
      }

      fs.writeFile(projectPath, JSON.stringify(currentProject), function(err) {
        if (err) {
          console.log('err', err);
          _d.reject(err);
        }

        // finish the setup process
        _d.resolve(currentProject);
      });
    });

    return _d.promise;
  };

  // clears all locally cached project data
  this.reset = function(cwd) {

    // clean up dirConfig
    fs.writeFile(cwd + dirConfigPath, JSON.stringify({ dirname: __dirname, type: '' }));

    // reset the activeProject file
    fs.writeFile(cwd + activeProjectPath, JSON.stringify({}), function(err) {
      if (err) {
        console.log(err);
        return;
      }

      // update the cli
      console.log('Cleaned All Temp Files');
    });
  };

  return this;

};

module.exports = projectCache();
