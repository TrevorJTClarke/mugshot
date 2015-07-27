var BW = require('browser-window');

/**
 * Progress Helper
 *
 * sample
 * 5 * 6 * 2 + 2
 */
var Progress = function() {

  this.total = 0;
  this.currentNum = 0;

  this.add = function(num, shouldReset) {
    if (shouldReset) {
      this.reset();
    }

    this.total = this.total + parseInt(num, 10);
  };

  this.reset = function() {
    this.total = 0;
  };

  this.getPercent = function(curNum) {
    var current = (typeof curNum !== undefined) ? parseInt(curNum, 10) : this.currentNum;
    return Math.round((current / this.total) * 100);
  };

  this.emit = function(msg, num) {
    this.currentNum = (typeof num !== undefined) ? this.currentNum + num : this.currentNum + 1;
    var percent = this.getPercent(this.currentNum);
    BW.getFocusedWindow().webContents.send('RUNNER:PROGRESS', { msg: msg, percent: percent });
  };

  return this;
}

module.exports = new Progress();
