/**
 * Browser flow
 * the process of controlling the flow of automated browsers/devices
 */
var fs = require('fs');
var Q = require('q');
var SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;
var chrome = require('selenium-webdriver/chrome');
var chromepath = require('chromedriver').path;
var firefox = require('selenium-webdriver/firefox');
var webdriver = require('selenium-webdriver');
var until = webdriver.until;
var By = webdriver.By;
var RunnerStack = require('./runnerStack');
var Devices = require('./devices');
console.log('chrome, chromepath', chrome, chromepath);

// Combines all browsers, viewport sizes, and urls into a singular list
function formatProjectData(project) {
  var strategies = {};

  // Loop through viewports, grab device info
  for (var v = 0; v < project.viewports.length; v++) {
    var viewport = project.viewports[v];
    var device = Devices.getByName(viewport.name);

    // Loop through urls
    for (var u = 0; u < project.urls.length; u++) {
      var url = project.urls[u];

      // Loop through browsers
      for (var i = 0; i < project.browsers.length; i++) {
        var browser = (device && device.type && device.type !== 'desktop') ? 'chrome' : project.browsers[i];
        var tmpName = project.urls[u].toLowerCase() + device.name.toLowerCase() + browser + '';
        var stratData = {
          browser: browser,
          device: device,
          url: url
        };

        strategies[tmpName] = stratData;
      }
    }
  }

  // convert from obj to array
  var finalArray = [];
  for (var k in strategies) {
      finalArray.push(strategies[k]);
  }

  // let the module use a better formatted array
  return finalArray;
}


var browserFlow = function(data) {
  var _z = Q.defer();

  // TODO: goals:
  // - set the device,browser,url,cookies
  // - wait till all cookies are there, then refresh
  // - queue the rest (window size, elements, etc)
  /**
   * RUNNNNNNNNNNNNN
   * Enqueue all promises for each capture combination, report progress
   * See https://www.npmjs.com/package/q#using-q-promise
   */
  var _this = this;
  var project = data.project;

  if (!project.urls || project.urls.length < 1) {
    _z.reject("Please specify urls in project configuration!");
    return;
  }

  // make sure there are browsers
  if (!project.browsers || project.browsers.length < 1) {
    project.browsers = [];
    project.browsers.push('chrome');
  }

  var captureSchema = formatProjectData(project);
  console.log('captureSchema', captureSchema.length, '\n\n');

  for (var i = 0; i < captureSchema.length; i++) {
    (function(n) {
      var service = null;
      var driver;
      var schema = captureSchema[n];
  console.log('here', n, '\n', schema);
      // if (schema.browser === 'chrome') { return; }
      var flow = new webdriver.promise.ControlFlow()
          .on('uncaughtException', function(e) {
            console.log('uncaughtException in flow %d: %s', n, e);
          });

      // Only chrome needs this extra config
      if (schema.browser && schema.browser === 'chrome') {
        service = new chrome.ServiceBuilder(chromepath).build();
        chrome.setDefaultService(service);
        console.log('chrome');
      }

      // setup based on device
      if (schema.device.emulate && schema.device.emulate === true) {
        console.log('schema.browser EMULATE', schema.device.name);
        driver = new webdriver.Builder()
          .forBrowser(schema.browser)
          .setChromeOptions(
            new chrome.Options()
            .setMobileEmulation({
              deviceName: schema.device.name
            })
          )
          .setControlFlow(flow)
          .build();
      } else {
        console.log('schema.browser', schema.browser);
        driver = new webdriver.Builder()
          .forBrowser(schema.browser)
          .setControlFlow(flow)
          .build();
      }

      driver.get(schema.url);
      driver.manage().window().setSize(schema.device.width, schema.device.height);

      // set all cookies
      var cookies = project.cookies || [];
      for (var ck = 0; ck < cookies.length; ck++) {
        var cookie = cookies[ck];

        if (cookie && cookie.active === true) {
          driver.manage().addCookie(cookie.name, cookie.value, '', cookie.path);
        }
      }

      // refresh with the cookies in place
      driver.get(schema.url);

      driver.quit();
    })(i);
  }

  return _z.promise;

};

module.exports = browserFlow;
