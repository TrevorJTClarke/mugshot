var ipc = require('ipc');

module.exports = {

  // grab test screens
  start: function(url) {
    console.log('url', url);

    // send url to back end
    ipc.send('URL:TEST', url);
  }
};
