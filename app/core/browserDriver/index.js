var fs = require('fs');
var Q = require('q');
var ProjectCache = require('./projectCache');
var browserFlow = require('./browserFlow');

var ccwd;

var browserDriver = function() {

  this.init = function(type, projectId, cwd) {
    var dfd = Q.defer();
    ccwd = cwd || ccwd;

    ProjectCache.setup(type, projectId, ccwd)
      .then(function(projectData) {

        browserFlow.start({
          cwd: ccwd,
          type: type,
          project: projectData,
          projectId: projectData.id
        });
        dfd.resolve();
      }, dfd.reject);

    return dfd.promise;
  };

  return this;

};

module.exports = browserDriver();
