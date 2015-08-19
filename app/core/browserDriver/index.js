var fs = require('fs');
var Q = require('q');
var ProjectCache = require('./projectCache');
var browserFlow = require('./browserFlow');

var browserDriver = function() {

  this.project = {};
  this.projectId = '';
  this.runType = 'reference';

  this.init = function(type, projectId, cwd) {
    var dfd = Q.defer();
    var _this = this;

    ProjectCache.setup(type, projectId, cwd)
      .then(function(projectData) {
        _this.runType = type;
        _this.project = projectData;
        _this.projectId = projectData.id;

        dfd.resolve();
      }, dfd.reject);

    return dfd.promise;
  };

  this.run = function() {
    console.log('run time yo');

    return browserFlow.start();
  };

  return this;

};

module.exports = browserDriver();
