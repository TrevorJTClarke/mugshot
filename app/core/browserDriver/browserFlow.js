/**
 * Browser flow
 * the process of controlling the flow of automated browsers/devices
 */
var fs = require('fs');
var Q = require('q');
var RunnerStack = require('./runnerStack');
var Devices = require('./devices');

var browserFlow = function() {

  /**
   * RUNNNNNNNNNNNNN
   * Enqueue all promises for each capture combination, report progress
   * See https://www.npmjs.com/package/q#using-q-promise
   */
  this.start = function(data) {
    var allPromises = [];
    var project = data.project;

    for (var i = 0; i < project.viewports.length; i++) {
      var view = project.viewports[i];
      var deviceData = Devices.getByName(view.name);

      // TODO: enqueue all the things
      var rn = new RunnerStack();
      var runnerItem = rn.start('chrome', deviceData, data);
      allPromises.push(runnerItem);
    }

    // this is TEMP
    Q.all(allPromises);


    // return Q.promise(function(resolve, reject, notify) {
    //
    // });
  };

  return this;

};

module.exports = browserFlow();
