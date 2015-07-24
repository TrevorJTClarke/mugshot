var fs = require('fs');
var dir = require('./core/dirConfig');
var paths = require('./core/paths')(dir.dirname);
var config = require('./config/activeProject');

var casper = require('casper').create({
  // clientScripts: ["jquery.js"] // this could be nice for loading external resources from local
});

function Generator() {

  this.activeSelectors = [];

  // TODO: Process
  // - loop viewports
  //    - load url
  //    - run hide selector
  //    - run remove selector
  //    - loop through container selectors
  //    - store data
  //
  console.log('helllooo');

  // Sets all active cookies into phantom
  this.setCookies = function() {
    if (!config.cookies) { return; }

    var cookies = config.cookies;
    for (var i = 0; i < cookies.length; i++) {
      if (cookies[i].active) {
        var bool = phantom.addCookie(cookies[i]);
      }
    }
  };

  // Sets all selectors for hidden/remove types
  this.setSelectors = function() {
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
          this.activeSelectors.push(obj.query);
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
  }

  // opens the url, waits for events, loops through viewports
  this.run = function() {
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

      // set the browser window dimensions
      this.then(function() {
        var w = parseInt(vp.width, 10) || 1024;
        var h = parseInt(vp.height, 10) || 768;

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

      // TODO: line up other methods
      // this.then(function() {
      //
      //   this.echo('Screenshots for ' + vp.name + ' (' + vp.width || vp.viewport.width + 'x' + vp.height || vp.viewport.height + ')', 'info');

    });
  };

  return this;
}

Generator();
