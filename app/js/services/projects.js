var fs = require('fs');

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

  return {

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

          // redirect user to the settings page
          dfd.resolve(newProjectData);
        });
      });

      return dfd.promise;
    },

    getAll: function() {
      return JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
    },

    getById: function(id) {
      return JSON.parse(fs.readFileSync(projectFilesPath + id + '.json', 'utf8'));
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

      return dfd.promise;
    }
  };
}]);
