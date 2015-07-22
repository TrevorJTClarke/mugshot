var fs = require('fs');

MUG.factory('Compare',
['$q', 'Config',
function($q, Config) {
  // Config the main paths
  var referencePath = __dirname + 'screens/reference/';
  var comparePath = __dirname + 'screens/compare/';

  function compareSingle(a, b) {
    var dfd = $q.defer();
    var output = {};

    // Apply Main Compare Config
    resemble.outputSettings(Config.Compare);

    // Run the compare function, return the diff data
    resemble(a)
      .compareTo(b)
      .onComplete(function(diffData) {
        output.report = JSON.stringify(diffData);
        output.src = diffData.getImageDataUrl();

        dfd.resolve(output);
      });

    return dfd.promise;
  };

  return {

    /**
     * Compares two images and returns all data with an image of changes
     */
    runSingle: compareSingle
  };
}]);
