/**
 * Promise FS
 */
var fs = require('fs');
var Q = require('q');

var PromiseFS = function() {

  this.write = function(filePath, data) {
    var _q = Q.defer();

    fs.writeFile(filePath, JSON.stringify(data), function(err) {
      if (err) {
        _q.reject(err);
        return;
      }

      _q.resolve();
    });

    return _q.promise;
  };

  this.remove = function(path) {
    var _q = $q.defer();

    fs.unlink(path, function(err) {
      if (err) {
        _q.reject(err);
        return;
      }

      _q.resolve();
    });

    return _q.promise;
  };

  // Grabs JSON file and appropriately handles errors
  this.getFileJson = function(path, type) {
    var file;

    try {
      file = fs.readFileSync(path, 'utf8');
    } catch (e) {
      // couldn't find file
      if (e.code === 'ENOENT') {
        return type || {};
      } else {
        throw e;
      }
    }

    return JSON.parse(file);
  };

  // // remove all files in directory
  // function removeAllInDirectory(dirPath) {
  //   try {
  //     var files = fs.readdirSync(dirPath);
  //   } catch (e) { return; }
  //
  //   if (files.length > 0)
  //     for (var i = 0; i < files.length; i++) {
  //       var filePath = path.join(dirPath, files[i]);
  //
  //       if (fs.statSync(filePath).isFile()) {
  //         fs.unlinkSync(filePath);
  //       } else {
  //         rmDir(filePath);
  //       }
  //     }
  // };

  return this;

};

module.exports = PromiseFS();
