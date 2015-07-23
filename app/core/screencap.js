var fs    = require('fs');
var spawn = require('child_process').spawn;
var paths = require('./paths')(__dirname);
var projects = require('./projects');

function screenCap() {

  this.captureType = '';

  this.createReference = function(projectId) {
    var currentProject = projects.getById(projectId);

    // check the current batch, and increment
    var nextBatch = (currentProject.currentBatch) ? currentProject.currentBatch + 1 : 0;
    this.captureType = 'reference';

    // start the child process
    this.captureStart(projectId, currentProject, nextBatch);
  };

  this.captureStart = function(id, projectData, batch) {
    console.log('id, projectData, batch', id, projectData, batch);

    // Save the current state, so generator can pick up needed data
    fs.writeFile(paths.activeProject, JSON.stringify(projectData), function(err) {
      if (err) {
        console.log('\n' + err);
        return false;
      }

      // // Setup the casper screen tests
      // var casperArgs = [__dirname + '/generator.js', '--ssl-protocol=any'];
      // var casperProcess = (process.platform === 'win32' ? 'casperjs.cmd' : 'casperjs');
      // var casperChild = spawn(casperProcess, casperArgs, { stdio: 'inherit' });
      // var type = this.captureType;
      // var _this = this;
      //
      // casperChild.stdout.on('data', function(data) {
      //   console.log('MUG:REPORTER:', data.toString().slice(0, -1));
      // });
      //
      // casperChild.on('close', function(code) {
      //   var success = code === 0;
      //   var result = (success) ? type + ' generation completed.' : type + ' failed with code: ' + code;
      //
      //   console.log('\n' + result);
      //
      //   //exit if there was some kind of failure in the casperChild process
      //   if (code != 0) {
      //     console.log('\nLooks like an error occured. Try running `$ gulp echo`.');
      //     return false;
      //   };
      //
      //   _this.captureEnd(id, projectData, batch);
      // });
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
