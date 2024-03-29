var fs = require('fs');
var paths = require('../util/paths');

var bitmapsReference = paths.bitmapsReference;
var bitmapsTest = paths.bitmapsTest;
var compareConfigFileName = paths.compareConfigFileName;
var genConfigPath = paths.captureConfigFileName;
console.log('genBitmaps');

var configJSON = fs.read(genConfigPath);
var config = JSON.parse(configJSON);

var viewports = config.viewports;
var scenarios = config.scenarios || config.grabConfigs;

var compareConfig = { testPairs: [] };

var casper = require('casper').create({
  // clientScripts: ["jquery.js"] //lets try not to use this it's friggin 2015 already people...
});

casper.on('resource.received', function(resource) {
  // casper.echo(resource.url);
});

casper.on('page.error', function(msg, trace) {
  // this.echo("Remote Error >    " + msg, "error");
  // this.echo("file:     " + trace[0].file, "WARNING");
  // this.echo("line:     " + trace[0].line, "WARNING");
  // this.echo("function: " + trace[0]["function"], "WARNING");
});

casper.on('remote.message', function(message) {
  // this.echo('remote console > ' + message);
});

casper.on('resource.received', function(resource) {
  var status = resource.status;
  if (status >= 400) {
    casper.log('remote error > ' + resource.url + ' failed to load (' + status + ')', 'error');
  }
});

function capturePageSelectors(url, scenarios, viewports, bitmapsReference, bitmapsTest, isReference) {

  var screenshotNow = new Date();
  var screenshotDateTime = screenshotNow.getFullYear() + pad(screenshotNow.getMonth() + 1) + pad(screenshotNow.getDate()) + '-' + pad(screenshotNow.getHours()) + pad(screenshotNow.getMinutes()) + pad(screenshotNow.getSeconds());

  var consoleBuffer = '';
  var scriptTimeout = 20000;

  casper.on('remote.message', function(message) {
    this.echo(message);
    consoleBuffer = consoleBuffer + '\n' + message;
  });

  casper.start();

  // casper.viewport(1280,1024);

  casper.each(scenarios, function(casper, scenario, scenarioIndex) {

    // if (scenario.cookiesJsonFile && fs.isFile(scenario.cookiesJsonFile)) {
    //   var cookiesJson = fs.read(scenario.cookiesJsonFile);
    //   var cookies = JSON.parse(cookiesJson);
    //   for (var i = 0; i < cookies.length; i++) {
    //     phantom.addCookie(cookies[i]);
    //   }
    // }

    if (scenario.cookies) {
      var cookies = scenario.cookies;
      for (var i = 0; i < cookies.length; i++) {
        var bool = phantom.addCookie(cookies[i]);
        console.log('CO bool', bool);
      }
    }

    casper.each(viewports, function(casper, vp, viewportIndex) {
      this.then(function() {
        this.viewport(vp.width || vp.viewport.width, vp.height || vp.viewport.height);
      });

      this.thenOpen(scenario.url, function() {

        casper.waitFor(
          function() { //test
            if (!scenario.readyEvent) return true;
            var regExReadyFlag = new RegExp(scenario.readyEvent, 'i');
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

        casper.wait(scenario.delay || 1);

      });

      casper.then(function() {
        this.echo('Current location is ' + scenario.url, 'info');

        //var src = this.evaluate(function() {return document.body.outerHTML; });
        //this.echo(src);
      });

      this.then(function() {

        this.echo('Screenshots for ' + vp.name + ' (' + vp.width || vp.viewport.width + 'x' + vp.height || vp.viewport.height + ')', 'info');

        //HIDE SELECTORS WE WANT TO AVOID
        if (scenario.hasOwnProperty('hideSelectors')) {
          scenario.hideSelectors.forEach(function(o, i, a) {
            casper.evaluate(function(o) {
              Array.prototype.forEach.call(document.querySelectorAll(o), function(s, j) {
                s.style.visibility = 'hidden';
              });
            }, o);
          });
        }

        //REMOVE UNWANTED SELECTORS FROM RENDER TREE
        if (scenario.hasOwnProperty('removeSelectors')) {
          scenario.removeSelectors.forEach(function(o, i, a) {
            casper.evaluate(function(o) {
              Array.prototype.forEach.call(document.querySelectorAll(o), function(s, j) {
                s.style.display = 'none';
              });
            }, o);
          });
        }

        //CREATE SCREEN SHOTS AND TEST COMPARE CONFIGURATION (CONFIG FILE WILL BE SAVED WHEN THIS PROCESS RETURNS)
        // If no selectors are provided then set the default 'body'
        if (!scenario.hasOwnProperty('selectors')) {
          scenario.selectors = ['body'];
        }

        scenario.selectors.forEach(function(o, i, a) {
          var cleanedSelectorName = o.replace(/[^a-zA-Z\d]/, '');//remove anything that's not a letter or a number
          //var cleanedUrl = scenario.url.replace(/[^a-zA-Z\d]/,'');//remove anything that's not a letter or a number
          var fileName = scenarioIndex + '_' + i + '_' + cleanedSelectorName + '_' + viewportIndex + '_' + vp.name + '.png';

          var referenceFP = bitmapsReference + '/' + fileName;
          var testFP = bitmapsTest + '/' + screenshotDateTime + '/' + fileName;

          var filePath = (isReference) ? referenceFP : testFP;

          if (!isReference) {
            compareConfig.testPairs.push({
              reference: referenceFP,
              test: testFP,
              selector: o,
              fileName: fileName,
              label: scenario.label,
              misMatchThreshold: scenario.misMatchThreshold
            })
          }

          casper.captureSelector(filePath, o);

          //casper.echo('remote capture to > '+filePath,'info');

        });//end topLevelModules.forEach

      });

    });//end casper.each viewports

  });//end casper.each scenario

}

//========================
//this query should be moved to the prior process
//`isReference` could be better passed as env parameter
var exists = fs.exists(bitmapsReference);
var isReference = false;
if (!exists) {
  isReference = true;
  console.log('CREATING NEW REFERENCE FILES');
}

//========================

capturePageSelectors(
  'index.html',
  scenarios,
  viewports,
  bitmapsReference,
  bitmapsTest,
  isReference
);

casper.run(function() {
  complete();
  this.exit();
});

function complete() {
  var configData = JSON.stringify(compareConfig, null, 2);
  fs.write(compareConfigFileName, configData, 'w');
  console.log('Comparison config file updated.');
}

function pad(number) {
  var r = String(number);
  if (r.length === 1) {
    r = '0' + r;
  }

  return r;
}
