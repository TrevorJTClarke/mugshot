var fs = require('fs');
var $q = require('q');
var async = require('async');
var paths = require('./paths')(__dirname);
var resemble = require('node-resemble-js');
var statusTypes = ['passed', 'warning', 'failed'];
var fileDirPrefix = __dirname + '/';
var imagePrefix = 'data:image/png;base64,';

// async helper
function readAsync(file, callback) {
  fs.readFile(fileDirPrefix + file, 'base64', callback);
}

function compare() {

  this.extractCurrentBatch = function(projectId, batchId) {
    var allHistory = fs.readFile(paths.getProjectConfig(projectId), 'utf8');
    var slimHistory = [];

    console.log('paths.getProjectConfig(projectId)', paths.getProjectConfig(projectId));
  };

  this.runSingle = function(a, b, callback) {
    var dfd = $q.defer();
    var output = {};

    // Apply Main Compare Config
    resemble.outputSettings({
      errorColor: {
        red: 255,
        green: 0,
        blue: 255
      },
      errorType: 'flat',
      transparency: 1,
      largeImageThreshold: 0
    });

    // Open both files, before we are ready to process
    async.map([a, b], readAsync, function(err, results) {
      var aData = imagePrefix + results[0];
      var bData = imagePrefix + results[1];

      // Handles errors
      if (err) {
        dfd.reject(err);
      }

      // Run the compare function, return the diff data
      resemble(aData)
        .compareTo(bData)
        .ignoreColors()
        .onComplete(function(diffData) {
          output.report = diffData;
          output.src = diffData.getImageDataUrl();

          // TODO: save this to a file
          dfd.resolve(output);
        });
    });

    return dfd.promise;
  };

  // TODO:
  // - open history
  // - get reference image
  // - loop through current batch and compare against currentReference
  this.runBatch = function(projectId, batchId) {
    var compareBatch = this.extractCurrentBatch(projectId, batchId);
    console.log('batchId', batchId);
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
