var fs    = require('fs');
var spawn = require('child_process').spawn;
var paths = require('./paths')(__dirname);
var projects = require('./projects');

function screenCap() {

  this.captureType = '';

  this.createReference = function(projectId) {
    var _this = this;
    var currentProject = projects.getById(projectId);
    this.captureType = 'reference';

    // Save the current state, so generator can pick up needed data
    fs.writeFile(paths.activeProject.replace('core/config', 'core/../config'), JSON.stringify(currentProject), function(err) {
      if (err) {
        console.log('\n' + err);
        return false;
      }

      // start the child process
      _this.captureStart(currentProject);
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
      };

      _this.captureEnd(projectData);
    });
  };

  this.captureEnd = function() {

    // TODO:
    // capture screens
    // save in history
    // update batchHistory
    // update timestamp
    // update currentReference
  };

  return this;
}

module.exports = screenCap();
