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

  this.driver = null;
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

    var flow = new webdriver.promise.ControlFlow()
        .on('uncaughtException', function(e) {
          console.log('uncaughtException in flow', e);
        });

    // Only chrome needs this extra config
    if (browser === 'chrome') {
      service = new chrome.ServiceBuilder(chromepath).build();
      chrome.setDefaultService(service);
    }

    // setup based on device
    if (_this.device.emulate === true) {
      this.driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(
          new chrome.Options()
          .setMobileEmulation({ deviceName: _this.device.name })
        )
        .setControlFlow(flow)
        .build();
    } else {
      this.driver = new webdriver.Builder()
        .forBrowser(browser)
        .setControlFlow(flow)
        .build();
    }

    // Setup all params
    this.loadWindowSize();
    this.loadUrl();
    this.loadCookies();

    // testing
    setTimeout(function() {
      console.log('end it');
      _this.driver.quit();

      setTimeout(function() {
        console.log('kill it');
        __Z.resolve();
      }, 2000);
    }, 4000);

    return __Z.promise;
  };

  this.loadWindowSize = function() {
    var _this = this;
    var offset = (_this.device.emulate === true) ? 150 : 0;

    // driver.manage().window().setPosition(300 * i, 400 * i);
    this.driver.manage().window().setSize(_this.device.width + offset, _this.device.height + offset);
  };

  // NOTE: this may need to be extended to multiple urls
  this.loadUrl = function() {
    var _this = this;
    this.driver.get(_this.project.meta.url);
  };

  this.loadCookies = function() {
    var _this = this;
    var cookies = this.project.cookies || [];

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];

      if (cookie && cookie.active === true) {
        _this.driver.manage().addCookie(cookie.name, cookie.value, null, cookie.path);
        console.log('COOKIE', cookie.name, cookie.active);
      }
    }

    console.log('cookies', _this.driver.manage().getCookies());
  };

  this.loadSelectors = function() {
    // driver.findElement(By.name('q')).sendKeys('webdriver');
    // driver.findElement(By.name('btnG')).click();
  };

  this.loopCaptures = function() {

  };

  this.finish = function() {
    this.driver.quit();
  };

  return this;
};

module.exports = runnerStack;
