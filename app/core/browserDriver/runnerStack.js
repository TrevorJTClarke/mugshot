/**
 * Runner Stack
 * basically the meat of the selenium runner
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

/**
 * the main instance of the selenium driver
 *
 * PROCESS:
 * - Create a single instance
 * - add properties (cookies/url)
 * - capture selectors
 * - send progress
 */
var runnerStack = function() {

  var driver = null;
  this.device = null;
  this.project = null;
  this.cwd = null;
  this.type = null;
  var service = null;

  // Setup the device/browser and all base settings
  this.start = function(browser, device, options) {
    var __Z = Q.defer();
    var _this = this;
    this.browser = browser || null;
    this.device = device || null;
    this.project = options.project || null;
    this.cwd = options.cwd || null;
    this.type = options.type || null;
    console.log('HERE', device.name);

    // Only chrome needs this extra config
    if (browser === 'chrome') {
      service = new chrome.ServiceBuilder(chromepath).build();
      chrome.setDefaultService(service);
    }

    // setup based on device
    if (_this.device.emulate === true) {
      driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(
          new chrome.Options()
          .setMobileEmulation({ deviceName: _this.device.name })
        )
        .build();
    } else {
      driver = new webdriver.Builder()
        .forBrowser(browser)
        .build();
    }

    // Setup all params
    this.loadWindowSize();
    this.loadUrl();
    this.loadCookies();

    setTimeout(function() {
      console.log('kill it', driver);
      // _this.finish();
      driver.quit();
      __Z.resolve();
    }, 4000);

    return __Z.promise;
  };

  this.loadWindowSize = function() {
    var _this = this;
    var offset = (_this.device.emulate === true) ? 150 : 0;
    driver.manage().window().setSize(_this.device.width + offset, _this.device.height + offset);
  };

  // NOTE: this may need to be extended to multiple urls
  this.loadUrl = function() {
    var _this = this;
    driver.get(_this.project.meta.url);
  };

  this.loadCookies = function() {
    var cookies = this.project.cookies || [];

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];

      if (cookie && cookie.active === true) {
        driver.manage().addCookie(cookie.name, cookie.value);
        console.log('COOKIE', cookie.name, cookie.active);
      }
    }
  };

  this.loadSelectors = function() {
    // driver.findElement(By.name('q')).sendKeys('webdriver');
    // driver.findElement(By.name('btnG')).click();
  };

  this.loopCaptures = function() {

  };

  this.finish = function() {
    driver.quit();
  };

  return this;
};

module.exports = runnerStack;
