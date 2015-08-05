var fs = require('fs');
var AWS = require('./vendor/core/aws');

MUG.factory('Projects',
['$q',
function($q) {
  // Config the main paths
  var projectsPath = __dirname + '/projects.json';
  var projectFilesPath = __dirname + '/projects/';

  // Creates a UUID of the specified length
  function createUUID(s) {
    var n;
    if (typeof s == 'number' && s === parseInt(s, 10)) {
      s = Array(s + 1).join('x');
    }

    return s.replace(/x/g, function() {
      var n = Math.round(Math.random() * 61) + 48;
      n = n > 57 ? (n + 7 > 90 ? n + 13 : n + 7) : n;
      return String.fromCharCode(n);
    });
  }

  // Creates a JSON object for a baseline new project
  function createDummyProject(total) {
    total = total || 0;
    var projectId = createUUID(12);
    return {
      id: projectId,
      title: 'Project ' + (parseInt(total, 10) + 1),
      timestamp: (+new Date),
      totals: {
        success: null,
        warning: null,
        error: null,
        views: 0
      }
    };
  }

  // Sets up the needed base data for storing an individual project
  function createDummyProjectFile(options) {
    var projectId = createUUID(12);
    return {
      batchHistory: {},
      currentBatch: null,
      currentReference: null,
      id: options.id,
      title: options.title,
      timestamp: options.timestamp,
      viewports: [],
      selectors: [],
      cookies: [],
      meta: {
        url: null,
        readyEvent: null,
        delay: null,
        misMatchThreshold: null
      }
    };
  }

  // Grabs JSON file and appropriately handles errors
  function getJsonFile(path, type) {
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
  }

  return {

    getAll: function() {
      return getJsonFile(projectsPath, []);
    },

    getById: function(id) {
      return getJsonFile(projectFilesPath + id + '.json');
    },

    getTypeById: function(id, type) {
      return getJsonFile(projectFilesPath + id + '_' + type + '.json', []);
    },

    /**
     * validates the project, makes sure all settings are setup and valid
     */
    validate: function(project) {
      var cookies = project.cookies;
      var viewports = project.viewports;
      var selectors = project.selectors;
      var title = project.title;
      var url = project.meta.url;
      var bool = true;

      // verify all defaults are setup
      if (!viewports || !selectors || !title || !url || viewports.length < 1 || selectors.length < 1) {
        return false;
      }

      // If we have viewports, verify they're setup right
      if (viewports) {
        viewports.map(function(obj, idx) {
          if (!obj.width || !obj.height || !obj.name) {
            bool = false;
          }
        });
      }

      // If we have selectors, verify they're setup right
      if (selectors) {
        selectors.map(function(obj, idx) {
          if (!obj.query || !obj.type) {
            bool = false;
          }
        });
      }

      // If we have cookies, verify they're setup right
      if (cookies) {
        cookies.map(function(obj, idx) {
          if (!obj.name || !obj.path || !obj.value) {
            bool = false;
          }
        });
      }

      // default to true
      return bool;
    },

    /**
     * creates a new project, and returns the data in a promise
     */
    createNew: function() {
      var dfd = $q.defer();
      var allProjects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
      var newProjectData = createDummyProject(allProjects.length);
      var newProjectFile = createDummyProjectFile(newProjectData);

      allProjects.unshift(newProjectData);

      // save the data to the projects list
      fs.writeFile(projectsPath, JSON.stringify(allProjects), function(err) {
        if (err) {
          dfd.reject(err);
          return;
        }

        // save as an individual file
        fs.writeFile(projectFilesPath + newProjectData.id + '.json', JSON.stringify(newProjectFile), function(err) {
          if (err) {
            dfd.reject(err);
            return;
          }

          // save as an individual file
          fs.writeFile(projectFilesPath + newProjectData.id + '_history.json', JSON.stringify([]), function(err) {
            if (err) {
              dfd.reject(err);
              return;
            }

            // redirect user to the settings page
            dfd.resolve(newProjectData);
          });
        });
      });

      return dfd.promise;
    },

    // save to file and lists, return list data
    save: function(projectData) {
      var dfd = $q.defer();
      var allProjects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

      // Update the listing data
      allProjects.map(function(obj, idx) {
        if (obj.id === projectData.id) {
          allProjects[idx].title = projectData.title;
          allProjects[idx].timestamp = (+new Date);
        }
      });

      // save as an individual file
      fs.writeFile(projectFilesPath + projectData.id + '.json', JSON.stringify(projectData), function(err) {
        if (err) {
          dfd.reject(err);
          return;
        }

        // update the listing data
        fs.writeFile(projectsPath, JSON.stringify(allProjects), function(err) {
          if (err) {
            dfd.reject(err);
            return;
          }

          // return the listing data, so we can update the sidepanel
          dfd.resolve(projectData);
        });
      });

      return dfd.promise;
    },

    // TODO: should remove images upon delete?
    // Removes a single project by ID
    remove: function(id) {
      var dfd = $q.defer();
      var allProjects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

      // Update the listing data
      allProjects.map(function(obj, idx) {
        if (obj.id === id) {
          allProjects.splice(idx, 1);
        }
      });

      // Remove the project file
      fs.unlink(projectFilesPath + id + '.json', function(err) {
        if (err) {
          dfd.reject(err);
          return;
        }

        // Remove the project history file
        fs.unlink(projectFilesPath + id + '_history.json', function(err) {
          if (err) {
            dfd.reject(err);
            return;
          }

          // update the listing data
          fs.writeFile(projectsPath, JSON.stringify(allProjects), function(err) {
            if (err) {
              dfd.reject(err);
              return;
            }

            // return
            dfd.resolve();
          });
        });
      });

      return dfd.promise;
    },

    /**
     * removes all stored history for a project
     */
    clearHistory: function(project) {
      var dfd = $q.defer();
      var mainProjects = getJsonFile(projectsPath, []);

      // Update the project data to reflect no history
      project.currentBatch = null;
      project.currentReference = null;
      project.batchHistory = {};

      // update the current project to have no batchHistory
      mainProjects.map(function(obj, idx) {
        if (obj.id === project.id) {
          mainProjects[idx].totals.success = 0;
          mainProjects[idx].totals.warning = 0;
          mainProjects[idx].totals.error = 0;
          mainProjects[idx].totals.views = 0;
        }
      });

      // save the data to the projects list
      fs.writeFile(projectFilesPath + project.id + '_history.json', JSON.stringify([]), function(err) {
        if (err) {
          dfd.reject(err);
          return;
        }

        // save the data to the id project
        fs.writeFile(projectFilesPath + project.id + '.json', JSON.stringify(project), function(err) {
          if (err) {
            dfd.reject(err);
            return;
          }

          // update the data on the projects list
          fs.writeFile(projectsPath, JSON.stringify(mainProjects), function(err) {
            if (err) {
              dfd.reject(err);
              return;
            }

            // redirect user to the settings page
            dfd.resolve();
          });
        });
      });

      return dfd.promise;
    },

    /**
     * pass in a projectId, then it will read the project and its current batch of files to upload
     * once complete, it will clean out any local screens and replace with aws resources
     */
    sync: function(id) {
      if (!id) {return;}

      var _this = this;
      var d = $q.defer();
      var project = this.getById(id);
      var projectFiles = this.getTypeById(id, 'history');
      var readyFiles = [];

      // pull out files that are already inside aws, prep for upload
      for (var i = 0; i < projectFiles.length; i++) {
        var tmpFile = projectFiles[i];
        if (tmpFile.source.search('amazon') === -1) {
          var src = tmpFile.source;
          var type = tmpFile.type;
          var path = __dirname + '/screens/' + type + '/' + project.id + '/' + src;
          readyFiles.push({ key: type + '/' + src, path: path });
        }
      }

      // upload files
      AWS.init()
        .upload(readyFiles, project.id)
        .then(function(res) {
          console.log('AWS:res', res);

          // do post-process action
          _this.cleanAfterSync(project, res).then(d.resolve, d.reject);
        }, function(err) {
          d.reject(err);
        });

      return d.promise;
    },

    /**
     * clean local images, update history with aws resources, returns the updates
     */
    cleanAfterSync: function (project, newRefs) {
      console.log('starting cleanAfterSync', project.id);

      // TODO:
      // loop through new files
      //    update history ref
      //    remove local file
      // save history & project
      // upload updated history & project
      // return

      // add project files to the upload readiness
      // readyFiles.push({ key: project.id, path: __dirname + '/projects/' + project.id + '.json' });
      // readyFiles.push({ key: project.id + '_history', path: __dirname + '/projects/' + project.id + '_history.json' });

    }

  };
}]);

// var file = __dirname + '/screens/compare/1KNspdPuCeJm/detailwrapper_1440-1224_1_diff.png';
// console.log('filessss', file);
// AWS.init().upload('1KNspdPuCeJm/compare', file);
