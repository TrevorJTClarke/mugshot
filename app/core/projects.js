var fs    = require('fs');
var paths = require('./paths')(__dirname);
var pfs   = require('./promisefs');

function projects() {

  this.getById = function(projectId) {
    var projectPath = paths.getProjectConfig(projectId);

    return pfs.getFileJson(projectPath);
  };

  this.getPathForId = function(projectId) {
    return paths.getProjectConfig(projectId);
  };

  this.saveProject = function(projectId, projectData) {
    var projectPath = paths.getProjectConfig(projectId);

    return pfs.write(projectPath, projectData);
  };

  this.history = {

    cache: [],

    addItem: function(data) {
      this.cache.unshift(data);
    },

    get: function(projectId) {
      var historyPath = paths.getProjectConfig(projectId, 'history');

      return pfs.getFileJson(historyPath);
    },

    save: function(projectId) {
      var historyPath = paths.getProjectConfig(projectId, 'history');
      var historyData = this.cache;
      var previousHistory = this.get(projectId);

      // append new history to old
      var finalHistory = historyData.concat(previousHistory);

      this.cache = [];

      return pfs.write(historyPath, finalHistory);
    }

  };

  return this;
}

module.exports = projects();
