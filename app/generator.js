var fs = require('fs');
var dir = require('./core/dirConfig');
var paths = require('./core/paths')(dir.dirname);
var config = require('./config/activeProject');
var system = require('system');
var casper = require('casper').create({
  // Options here
  // http://casperjs.readthedocs.org/en/latest/modules/casper.html#index-1
});

// viewport map
var viewportMap = ['Desktop', 'Tablet', 'Mobile'];

function Generator() {

  this.activeSelectors = [];
  this.captureHistory = [];

  /*
   * Image Path Naming convention
   * query string (strip extra chars) + _ + viewport dimensions + _ + batch
   *
   * Example Image Paths
   * /reference/:projectId/bodyheadernav_1024-768_0.png
   * /compare/:projectId/bodyheadernav_1024-768_1.png
   * /compare/:projectId/bodyheadernav_1024-768_1_diff.png
   *
   */
  this.getNamingConvention = function(query, width, height, batch) {
    var charName = query.replace(/[^a-zA-Z\d]/g, '');
    batch = batch || 0;

    return charName + '_' + width + '-' + height + '_' + batch + '.png';
  };

  /**
   * Historical Meta Data
   */
  this.captureMetaData = function(name, query, width, height, batch) {
    var shortName = name.split('_')[0];
    var viewport;

    // set viewport norm, based on width
    if (width < 768) { viewport = viewportMap[2]; }

    if (width >= 768 && width < 1024) { viewport = viewportMap[1]; }

    if (width >= 1024) { viewport = viewportMap[0]; }

    // format the data for storing
    return {
      batch: batch || 0,
      name: shortName,
      source: name,
      timestamp: (+new Date),
      type: dir.type,
      viewport: viewport,
      query: query,
      meta: system.os
    };
  };

  // Sets all active cookies into phantom
  this.setCookies = function() {
    if (!config.cookies) { return; }

    var cookies = config.cookies;
    for (var i = 0; i < cookies.length; i++) {
      if (cookies[i].active) {
        var bool = phantom.addCookie({
          name: cookies[i].name,
          value: cookies[i].value,
          domain: cookies[i].path
        });
      }
    }
  };

  // Sets all selectors for hidden/remove types
  this.setSelectors = function() {
    var _this = this;
    if (!config.selectors) { return; }

    function evalHideRemove(type, item) {
      casper.evaluate(function(item) {
        Array.prototype.forEach.call(document.querySelectorAll(item), function(s, j) {
          if (type === 'hide') {
            s.style.visibility = 'hidden';
          } else {
            s.style.display = 'none';
          }
        });
      }, item);
    }

    config.selectors.map(function(obj, idx) {
      if (obj.active) {
        if (obj.type === 'container') {
          _this.activeSelectors.push(obj.query);
        } else {
          evalHideRemove(obj.type, obj);
        }
      }
    });
  };

  // returns only active viewports
  this.getViewports = function() {
    var final = [];

    config.viewports.map(function(obj) {
      if (obj.active) {
        final.push(obj);
      }
    });

    return final;
  };

  // opens the url, waits for events, loops through viewports
  this.run = function() {
    var _this = this;
    var consoleBuffer = '';
    var scriptTimeout = 20000;
    var activeViewports = this.getViewports();

    // Start with cookies first (yep, dessert before dinner)
    this.setCookies();

    // Listen for any errors/infos
    casper.on('remote.message', function(message) {
      this.echo(message);
      consoleBuffer = consoleBuffer + '\n' + message;
    });

    // load er up!
    casper.start();

    // loop through all viewports
    casper.each(activeViewports, function(casper, vp, vIdx) {
      var w = parseInt(vp.width, 10) || 1024;
      var h = parseInt(vp.height, 10) || 768;

      // set the browser window dimensions
      this.then(function() {
        this.viewport(w, h);
      });

      // Open the website
      this.thenOpen(config.meta.url, function() {

        // if we have a SPA event, wait until its fired
        casper.waitFor(
          function() { //test
            if (!config.meta.readyEvent) { return true; }

            var regExReadyFlag = new RegExp(config.meta.readyEvent, 'i');
            return consoleBuffer.search(regExReadyFlag) >= 0;
          },

          function() {//on done
            consoleBuffer = '';
            casper.echo('Ready event received.');
          },

          function() {
            casper.echo('ERROR: casper timeout.');
          },

          scriptTimeout
        );

        // if theres a standard delay time, do it
        casper.wait(config.meta.delay || 1);

      });

      casper.then(function() {
        this.echo('Opened: ' + config.meta.url, 'info');
      });

      // start the final process inside this viewport
      this.then(function() {
        this.echo('Screenshots ' + config.id + ' (' + w + 'x' + h + ')', 'info');

        // quick selector setup
        _this.setSelectors();

        // Process the active selector containers and Screenshot them!
        if (_this.activeSelectors.length > 0) {
          _this.activeSelectors.map(function(query, i) {
            // get nice name
            var name = _this.getNamingConvention(query, w, h, config.currentBatch);
            var filePath = paths[dir.type] + '/' + config.id + '/' + name;

            // store the meta data of the image
            var fileData = _this.captureMetaData(name, query, w, h, config.currentBatch);

            // can cache this update locally, then save at the end of processing
            _this.captureHistory.unshift(fileData);

            casper.captureSelector(filePath, query);
          });
        }

      });

    });
  };

  return this;
}

// Setup the Generator!
var G = new Generator();

function getJsonFile(path, type) {
  var file;

  try {
    file = fs.read(path, 'utf8');
  } catch (e) {
    // We dont have it, return OKAY
    return type || {};
  }

  return JSON.parse(file);
}

// Store the Historical data captured
function complete() {
  var filePath = paths.base + 'projects/' + config.id + '_history.json';
  var historyData = getJsonFile(filePath, []);
  var updatedHistory = G.captureHistory.concat(historyData);

  // save as an individual file
  fs.write(filePath, JSON.stringify(updatedHistory), 'w');
  console.log('Updated Project History file.');
}

// Add all config and FNs into casper
G.run();

// Kick this thing off
casper.run(function() {
  complete();
  this.exit();
});
