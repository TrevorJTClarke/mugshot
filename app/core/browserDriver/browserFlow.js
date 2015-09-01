/**
 * Browser flow
 * the process of controlling the flow of automated browsers/devices
 */
var fs = require('fs');
var Q = require('q');
var webdriver = require('selenium-webdriver');
var until = webdriver.until;
var By = webdriver.By;
var RunnerStack = require('./runnerStack');
var Devices = require('./devices');

var browserFlow = function(data) {
console.log('data a', data);

  this.queuedFlows = [];

  /**
   * RUNNNNNNNNNNNNN
   * Enqueue all promises for each capture combination, report progress
   * See https://www.npmjs.com/package/q#using-q-promise
   */
  (function() {
    var _this = this;
    var project = data.project;
    console.log('data', data);

    for (var i = 0; i < 3; i++) {
      (function(n) {
        var flow = new webdriver.promise.ControlFlow()
          .on('uncaughtException', function(e) {
            console.log('uncaughtException in flow %d: %s', n, e);
          });

        var driver = new webdriver.Builder()
          .forBrowser('firefox')
          .setControlFlow(flow)
          .build();

        // Position and resize window so it's easy to see them running together.
        driver.manage().window().setSize(600, 400);
        driver.manage().window().setPosition(300 * i, 400 * i);

        driver.get('http://www.google.com');
        driver.findElement(By.name('q')).sendKeys('webdriver');
        driver.findElement(By.name('btnG')).click();
        driver.wait(until.titleIs('webdriver - Google Search'), 1000);

        driver.quit();
      })(i);
    }

    // for (var i = 0; i < project.viewports.length; i++) {
    //   var view = project.viewports[i];
    //   var deviceData = Devices.getByName(view.name);
    //
    //   // TODO: enqueue all the things
    //   var rn = new RunnerStack();
    //   // var runnerItem = rn.start('chrome', deviceData, data);
    //   var runnerItem = rn.start('firefox', deviceData, data);
    // }
    //
    // // TODO: FINISH
    // Q.all(_this.queuedFlows);


    // return Q.promise(function(resolve, reject, notify) {
    //
    // });
  })();

};

module.exports = browserFlow;
