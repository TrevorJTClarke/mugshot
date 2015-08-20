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
var runnerStack = function () {

  this.driver = null;
  this.options = null;

  // Setup the device/browser and all base settings
  this.start = function(device, options) {
    this.options = options || null;

    var service = new chrome.ServiceBuilder(chromepath).build();
    chrome.setDefaultService(service);

    this.driver = new webdriver.Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options()
        .setMobileEmulation({ deviceName: 'Apple iPhone 5' })
      )
      .build();

    console.log('STCK INIT');

    this.driver.manage().window().setSize(320, 620);
    this.driver.get('http://www.google.com/ncr');

    this.finish();
  };

  this.loopCookies = function() {
    this.driver.manage().addCookie(cookie1.name, cookie1.value);
  };

  this.loopSelectors = function() {
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
