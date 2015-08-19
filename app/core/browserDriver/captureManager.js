
var easyimg = require('easyimage');
var Devices = require('./devices');
var Browsers = require('./browsers');

var activeDevice = Devices.getDevice('mobile', 6);
activeDevice.ratio = 2;


  console.log('activeDevice.name: ', activeDevice.name);
  driver.takeScreenshot().then(function(image, err) {
    fs.writeFile('out.png', image, 'base64', function(err, data) {
      console.log(err);

      easyimg.info('out.png').then(function(file) {
        // console.log(file);
        easyimg.rescrop({
          src: file.name,
          dst: './cropped.png',
          width: file.width / activeDevice.ratio,
          height: file.height / activeDevice.ratio,
          cropwidth: activeDevice.width,
          cropheight: activeDevice.height,
          x: 0,
          y: 0,
          gravity: 'NorthWest'
        }).then(function(image) {
          console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
        },

        function (err) {
          console.log(err);
        });
      }, function (err) {
        console.log(err);
      });
    });
  });
