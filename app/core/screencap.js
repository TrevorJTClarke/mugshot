var fs    = require('fs');
var spawn = require('child_process').spawn;
var paths = require('./paths')(__dirname);
var projects = require('./projects');

function screenCap() {

  this.captureType = '';
  this.cb = null;

  this.createReference = function(projectId, cb) {
    this.captureType = 'reference';
    this.cb = cb;
    var currentProject = projects.getById(projectId);

    // quick minor updates
    currentProject.currentBatch = (typeof currentProject.currentBatch === undefined) ? 0 : parseInt(currentProject.currentBatch, 10) + 1;
    currentProject.currentReference = currentProject.currentBatch;

    this.captureSetup(currentProject);
  };

  this.createCompare = function(projectId, cb) {
    this.captureType = 'compare';
    this.cb = cb;
    var currentProject = projects.getById(projectId);

    // quick minor updates
    currentProject.currentBatch = (currentProject.currentBatch) ? currentProject.currentBatch + 1 : 0;

    this.captureSetup(currentProject);
  };

  this.captureSetup = function(projectData) {
    var _this = this;

    // final minor updates
    projectData.timestamp = (+new Date);

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
    var _this = this;
    console.log('captureEnd');

    // clean up dirConfig
    fs.writeFile(paths.dirConfig.replace('core/core/', 'core/'), JSON.stringify({ dirname: __dirname, type: '' }));

    // reset the activeProject file
    fs.writeFile(paths.activeProject.replace('core/config', 'core/../config'), JSON.stringify({}), function(err) {
      if (err) {
        console.log(err);
        return;
      }

      // update the cli
      console.log('Cleaned All Temp Files');
      _this.cb(null, data);
    });
  };

  return this;
}

module.exports = screenCap();
