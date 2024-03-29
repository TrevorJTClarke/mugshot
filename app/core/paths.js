var fs = require('fs');

function pathsModule(_dirname) {

  var paths = {};

  // MAIN PATH
  paths.base            = _dirname + '/';
  paths.dirname         = _dirname;

  // SCREEN PATHS
  paths.screens         = paths.base + 'screens/';
  paths.reference       = paths.screens + 'reference';
  paths.compare         = paths.screens + 'compare';

  // ETC PATHS
  paths.core            = paths.base + 'core';
  paths.dirConfig       = paths.core + '/dirConfig.json';
  paths.activeProject   = paths.base + 'config/activeProject.json';
  paths.appConfig       = paths.base + 'config/mugConfig.json';
  paths.projects        = paths.base + '../projects';
  paths.projectsConfig  = paths.base + 'projects.json';

  /**
   * returns the path for screens to be read/write
   * @param  {String} type      either reference or compare
   * @param  {String} projectId the UUID of the project
   * @return {String}           the full path uri
   */
  paths.getScreenPath = function(type, projectId) {
    return paths[type] + '/' + projectId;
  };

  paths.getProjectConfig = function(projectId) {
    return paths.projects + '/' + projectId + '.json';
  }

  return paths;

}

module.exports = pathsModule;
