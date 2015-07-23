var fs = require('fs');
var dir = require('./core/dirConfig');
var paths = require('./core/paths')(dir.dirname);
var activeProject = require('./config/activeProject');

function Generator() {

  console.log('helllooo', JSON.stringify(activeProject));

}

Generator();
