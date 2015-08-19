var fs = require('fs');
var Q = require('q');
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var firefox = require('selenium-webdriver/firefox');
var path = require('chromedriver').path;
var until = require('selenium-webdriver').until;
var By = require('selenium-webdriver').By;
var ProjectCache = require('./projectCache');


var browserDriver = function() {

  this.project = {};
  this.projectId = '';
  this.runType = 'reference';

  this.init = function(type, projectId, cwd) {
    var dfd = Q.defer();
    var _this = this;

    ProjectCache.setup(type, projectId, cwd)
      .then(function(projectData) {
        _this.runType = type;
        _this.project = projectData;
        _this.projectId = projectData.id;

        dfd.resolve();
      }, dfd.reject);

    return dfd.promise;
  };

  this.run = function() {
    var dfd = Q.defer();

    console.log('this.project', this.project);

    return dfd.promise;
  };

  return this;

};

// var activeDevice = Devices.getDevice('mobile', 6);
// activeDevice.ratio = 2;
//
// var service = new chrome.ServiceBuilder(path).build();
// chrome.setDefaultService(service);
//
// var driver = new webdriver.Builder()
//   .forBrowser(Browsers.chrome)
//   .setChromeOptions(new chrome.Options()
//     .setMobileEmulation({ deviceName: activeDevice.name })
//   )
//   .build();
//
// driver.get('http://www.google.com');
//
// // driver.manage().window().setSize(280, 580);
// // driver.manage().window().setPosition(0, 200);
//
// var element = driver.findElement(webdriver.By.name('q'));
// element.sendKeys('Cheese!');
// element.submit();
//
// driver.getTitle().then(function(title) {
//   console.log('Page title is: ' + title);
// });
//
// driver.wait(function() {
//   return driver.getTitle().then(function(title) {
//     return title.toLowerCase().lastIndexOf('cheese!', 0) === 0;
//   });
// }, 3500);
//
// driver.quit();

module.exports = browserDriver();
