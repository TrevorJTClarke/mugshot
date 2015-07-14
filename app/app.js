// Node modules are required the same way as always.
var os = require('os');

// var envName = window.env.name;

// Browser modules are imported through new ES6 syntax.
var urlcast = require('./core/urlcast');

function clickTest() {
  var url = document.getElementById('url').value;
  urlcast.start(url);
}
