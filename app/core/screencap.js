var fs    = require('fs');
var spawn = require('child_process').spawn;
var paths = require('./paths')(__dirname);
var projects = require('./projects');

function screenCap() {

  this.captureType = '';

  this.createReference = function(projectId) {
    this.captureType = 'reference';
    var currentProject = projects.getById(projectId);

    // quick minor updates
    currentProject.currentBatch = (currentProject.currentBatch) ? currentProject.currentBatch + 1 : 0;
    currentProject.currentReference = currentProject.currentBatch;
    console.log('currentProject', JSON.stringify(currentProject));

    this.captureSetup(currentProject);
  };

  this.createCompare = function(projectId) {
    this.captureType = 'compare';
    var currentProject = projects.getById(projectId);

    // quick minor updates
    currentProject.currentBatch = (currentProject.currentBatch) ? currentProject.currentBatch + 1 : 0;

    this.captureSetup(currentProject);
  };

  this.captureSetup = function(projectData) {
    var _this = this;

    // Save the current state, so generator can pick up needed data
    fs.writeFile(paths.activeProject.replace('core/config', 'core/../config'), JSON.stringify(projectData), function(err) {
      if (err) {
        console.log('\n' + err);
        return false;
      }

      fs.writeFile(paths.projects + '/' + projectData.id + '.json', JSON.stringify(projectData), function(err) {
        if (err) {
          console.log('\n' + err);
          return false;
        }

        // start the child process
        _this.captureStart(projectData);
      });
    });
  };

  this.captureStart = function(projectData) {
    var _this = this;
    var type = this.captureType;
    var genFile = __dirname + '/generator.js';
    var casperArgs = [genFile.replace('core/', ''), '--ssl-protocol=any'];
    var casperProcess = (process.platform === 'win32' ? 'casperjs.cmd' : 'casperjs');
    var casperChild = spawn(casperProcess, casperArgs);

    casperChild.stdout.on('data', function(data) {
      console.log('CHILDPROCESS: ', data.toString().slice(0, -1));
    });

    casperChild.on('close', function(code) {
      var success = code === 0;
      var result = (success) ? type + ' generation completed.' : type + ' failed with code: ' + code;
      console.log('\n' + result);

      //exit if there was some kind of failure in the casperChild process
      if (code != 0) {
        console.log('\nLooks like an error occured. Try running `$ gulp echo`.');
        return false;
      }

      // try closing the process, and move on
      casperChild.stdin.pause();
      casperChild.kill();

      // final process
      _this.captureEnd(projectData);
    });
  };

  this.captureEnd = function(data) {
    console.log('captureEnd');

    // TODO:
    // update batchHistory
    // update timestamp
    // update currentReference
    // clean up activeProject
    // clean up dirConfig
  };

  return this;
}

module.exports = screenCap();
