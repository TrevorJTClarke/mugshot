var ipc = require('ipc');
var MUG = angular.module('mugshot', ['ui.router', 'mugtemplates']);

ipc.on('RUNNER:PROGRESS', function(e, args) {
  console.log('RUNNER:PROGRESS args', args);
});
