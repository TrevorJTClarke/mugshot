var fs    = require('fs');
var BW = require('browser-window');
var spawn = require('child_process').spawn;
var paths = require('./paths')(__dirname);
var projects = require('./projects');
var progress = require('./progress');

function screenCap() {

  this.captureType = '';
  this.cb = null;

  this.createReference = function(projectId, cb) {
    this.captureType = 'reference';
    this.cb = cb;
    var currentProject = projects.getById(projectId);

    // quick minor updates
    currentProject.currentReference = (currentProject.currentBatch > 0 && currentProject.currentBatch > currentProject.currentReference) ? currentProject.currentBatch + 1 : (typeof currentProject.currentReference !== undefined || currentProject.currentReference === null) ? 0 : currentProject.currentReference + 1;

    this.captureSetup(currentProject);
  };

  this.createCompare = function(projectId, cb) {
    this.captureType = 'compare';
    this.cb = cb;
    var currentProject = projects.getById(projectId);

    // quick minor updates
    currentProject.currentBatch = (currentProject.currentBatch > 0 && currentProject.currentBatch > currentProject.currentReference) ? currentProject.currentBatch + 1 : currentProject.currentReference + 1;

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

  // Finds the total amount of progress events needed, so we can calculate percent
  this.setupProgress = function(project) {
    var type = this.captureType;
    var multiplier = 1;
    var viewports = project.viewports.length;
    var selectors = [];
    var containers;

    function getSelectors() {
      project.selectors.map(function(obj, idx) {
        if (obj.active) {
          if (obj.type === 'container') {
            selectors.push(obj.query);
          }
        }
      });
    }

    getSelectors();
    containers = selectors.length;

    // Formula:
    // viewports * containers ( * 2 if comparing ) + 3 (start/save/finish)
    //
    // Example:
    // 5 * 6 * 2 + 3 = 63
    if (type === 'compare') {
      multiplier = 2;
    }

    var totalEvents = (viewports * containers * multiplier) + 3;
    progress.add(totalEvents, true);
  };

  this.captureStart = function(projectData) {
    var _this = this;
    var type = this.captureType;
    var genFile = __dirname + '/generator.js';
    var casperArgs = [genFile.replace('core/', ''), '--ssl-protocol=any'];
    var casperProcess = (process.platform === 'win32' ? 'casperjs.cmd' : 'casperjs');
    var casperChild = spawn(casperProcess, casperArgs);

    // start off the progress
    this.setupProgress(projectData);

    progress.emit('Starting ' + _this.captureType + ' capture', 1);

    casperChild.stdout.on('data', function(data) {
      if (data && data.toString() && data.toString().search('PROGRESS') > -1) {
        var evData = data.toString().replace('PROGRESS:', '').split('::');
        var msg = evData[0];
        var amount = parseInt(evData[1], 10);

        progress.emit(msg, amount);
      } else {
        console.log('CHILDPROCESS: ', data.toString().slice(0, -1));
      }
    });

    casperChild.on('close', function(code) {
      var success = code === 0;
      var result = (success) ? type + ' generation completed.' : type + ' failed with code: ' + code;
      console.log('\n' + result);

      //exit if there was some kind of failure in the casperChild process
      if (code != 0) {
        BW.getFocusedWindow().webContents.send('RUNNER:FAILED', { msg: 'An Error Occurred', percent: 100 });
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
