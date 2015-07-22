var fs = require('fs');
var async = require('async');

MUG.factory('Compare',
['$q', 'Config',
function($q, Config) {
  // Config vars
  var fileDirPrefix = __dirname + '/';
  var imagePrefix = 'data:image/png;base64,';
  var statusTypes = ['passed', 'warning', 'failed'];

  // async helper
  function readAsync(file, callback) {
    fs.readFile(fileDirPrefix + file, 'base64', callback);
  }

  function compareSingle(a, b) {
    var dfd = $q.defer();
    var output = {};

    // Apply Main Compare Config
    resemble.outputSettings(Config.Compare);

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

          dfd.resolve(output);
        });
    });

    return dfd.promise;
  };

  return {

    /**
     * Compares two images and returns all data with an image of changes
     */
    runSingle: compareSingle,

    /**
     * returns the type of pass/warn/fail status
     */
    getStatus: function(data) {
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
    }

  };
}]);
