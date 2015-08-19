/**
 * Browser flow
 * the process of controlling the flow of automated browser, basically the meat of the selenium runner
 */
var fs = require('fs');
var Q = require('q');
var webdriver = require('selenium-webdriver');
var SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;
var chrome = require('selenium-webdriver/chrome');
var firefox = require('selenium-webdriver/firefox');
var chromepath = require('chromedriver').path;
var until = require('selenium-webdriver').until;
var By = require('selenium-webdriver').By;
var Projects = require('../projects');
var Browsers = require('./browsers');
var Devices = require('./devices');

var browserFlow = function() {

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

    if (width >= 768 && width <= 1024) { viewport = viewportMap[1]; }

    if (width > 1024) { viewport = viewportMap[0]; }

    // format the data for storing
    return {
      batch: batch || 0,
      name: shortName,
      source: name,
      timestamp: (+new Date),
      type: dir.type,
      viewport: viewport,
      query: query,
      meta: system.os,
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
          domain: cookies[i].path,
        });
      }
    }
  };

  // Sets all selectors for hidden/remove types
  this.setSelectors = function() {
    var _this = this;
    if (!config.selectors) { return; }

    // reset, so we dont multiply like cray cray
    this.activeSelectors = [];

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

  /**
   * the main instance of the selenium driver
   */
  this.Stack = function () {

    this.loopDevices = function() {

    };

    this.loopCookies = function() {

    };

    return this;
  };

  /**
   * RUNNNNNNNNNNNNN
   */
  this.start = function(cwd) {
    var _d = Q.defer();

    var activeDevice = Devices.getDevice('mobile', 6);
    activeDevice.ratio = 2;

    var service = new chrome.ServiceBuilder(chromepath).build();
    chrome.setDefaultService(service);

    this.driver = new webdriver.Builder()
      .forBrowser(Browsers.chrome)
      .setChromeOptions(new chrome.Options()
        .setMobileEmulation({ deviceName: activeDevice.name })
      )
      .build();
    this.driver.get('http://www.google.com');

    var element = this.driver.findElement(webdriver.By.name('q'));
    element.sendKeys('Cheese!');
    element.submit();

    this.driver.getTitle().then(function(title) {
      console.log('Page title is: ' + title);
    });

    this.driver.wait(function() {
      return this.driver.getTitle().then(function(title) {
        return title.toLowerCase().lastIndexOf('cheese!', 0) === 0;
      });
    }, 3500);

    this.finish();

    return _d.promise;
  };

  this.finish = function() {
    this.driver.quit();
  };

  return this;

};

module.exports = browserFlow();
