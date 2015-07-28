var fs = require('fs');
var BW = require('browser-window');
var $q = require('q');
var async = require('async');
var paths = require('./paths')(__dirname);
var resemble = require('node-resemble-js');
var progress = require('./progress');
var statusTypes = ['passed', 'warning', 'failed'];
var fileDirPrefix = __dirname + '/';
var imagePrefix = 'data:image/png;base64,';
var resembleConfig = {
  errorColor: {
    red: 255,
    green: 0,
    blue: 255
  },
  errorType: 'flat',
  transparency: 1,
  largeImageThreshold: 0
};

// async helper
function readAsync(file, callback) {
  fs.readFile(fileDirPrefix + file, 'base64', callback);
}

// readfile helper
function getJsonFile(path, type) {
  var file;

  try {
    file = fs.readFileSync(path, 'utf8');
  } catch (e) {
    // We dont have it, return OKAY
    return type || {};
  }

  return JSON.parse(file);
}

function compare() {

  this.loadedHistory = [];

  this.extractCurrentBatch = function(projectId, batchId) {
    var allHistory = getJsonFile(paths.projects + '/' + projectId + '_history.json', []);
    var slimHistory = [];

    allHistory.map(function(item, i) {
      if (item.batch === batchId) {
        slimHistory.unshift(item);
      }
    });

    return slimHistory;
  };

  // updates the history data
  this.writeDiffHistory = function(project, cb) {
    var historyPath = paths.projects + '/' + project.id + '_history.json';

    // Write the updated history to file
    fs.writeFile(historyPath, JSON.stringify(this.loadedHistory), function(err) {
      if (err) {
        console.log(err);
        return;
      }

      // success
      if (cb) {
        cb();
      }
    });
  };

  // updates the history data
  this.cacheDiffHistory = function(diffData, compare, cb) {
    var status = this.getStatus(diffData);

    this.loadedHistory.map(function(item, i) {
      if (item.source === compare.source) {
        this.loadedHistory[i].timestamp = (+new Date);
        this.loadedHistory[i].status = status;
        this.loadedHistory[i].report = {
          analysis: diffData.analysisTime,
          sameSize: diffData.isSameDimensions,
          diff: diffData.misMatchPercentage
        };
      }
    });

    // success
    if (cb) {
      cb();
    }
  };

  // compares a single image with its reference
  this.runSingle = function(compareData, projectData, callback) {
    var _this = this;
    var aPath = fileDirPrefix + '../screens/compare/' + projectData.id + '/' + compareData.source;
    var bPath = fileDirPrefix + '../screens/reference/' + projectData.id + '/' + compareData.source.replace(projectData.currentBatch + '.png', projectData.currentReference + '.png');
    var diffPath = fileDirPrefix + '../screens/compare/' + projectData.id + '/' + compareData.source.replace('.png', '_diff.png');

    // Apply Main Compare Config
    resemble.outputSettings(resembleConfig);

    // Run the compare function, return the diff data
    resemble(aPath)
      .compareTo(bPath)
      .onComplete(function(diffData) {

        // save this to a file
        diffData.getDiffImage()
          .pack()
          .pipe(fs.createWriteStream(diffPath));

        progress.emit('Comparing Capture Data', 1);

        // update the history cache
        _this.cacheDiffHistory(diffData, compareData, callback);
      });
  };

  // loop through current batch and compare against currentReference
  this.runBatch = function(project, done) {
    var _this = this;
    var historyPath = paths.projects + '/' + project.id + '_history.json';
    var compareBatch = this.extractCurrentBatch(project.id, project.currentBatch);

    // reset, so we have a clean start
    this.loadedHistory = [];
    this.loadedHistory = getJsonFile(historyPath, []);

    // Run through the current batch
    async.each(compareBatch, function(obj, callback) {
      _this.runSingle(obj, project, callback);
    },

    function(err) {
      if (err) {
        BW.getFocusedWindow().webContents.send('RUNNER:FAILED');
        console.log('err', err);
      }

      console.log('Finished Batch');
      _this.writeDiffHistory(project, done);
    });
  };

  this.getStatus = function(data) {
    var misMatchValue = parseFloat(data.misMatchPercentage);

    // lowest tolerance
    if (misMatchValue < 0.1) {

      // Warn that dimensions are difference
      if (data.isSameDimensions === false) {
        return statusTypes[1];
      } else {
        return statusTypes[0];
      }
    }

    // warning tolerance
    if (misMatchValue > 0.1 && misMatchValue < 2) {
      return statusTypes[1];
    }

    // error tolerance reached
    return statusTypes[2];
  };

  return this;
}

module.exports = compare();
