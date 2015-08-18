var fs = require('fs');
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var firefox = require('selenium-webdriver/firefox');
var path = require('chromedriver').path;
var until = require('selenium-webdriver').until;
var By = require('selenium-webdriver').By;
var easyimg = require('easyimage');

var browsers = [
  'chrome',
  'firefox',
  'internet explorer'
];

var commonBrowserViewports = [
  { name: 'Desktop - Extra Large', width: 2880, height: 1800, ratio: 2 },
  { name: 'Desktop - Large', width: 1920, height: 1080, ratio: 1 },
  { name: 'Desktop', width: 1440, height: 900, ratio: 1 },
  { name: 'Desktop', width: 1366, height: 768, ratio: 1 },
  { name: 'Desktop', width: 1280, height: 800, ratio: 1 },
  { name: 'Tablet - Portrait', width: 768, height: 1024, ratio: 1 },
  { name: 'Tablet - Landscape', width: 1024, height: 768, ratio: 1 }
];

var emulatorDeviceList = [
  { name: 'Amazon Kindle Fire HDX', width: 2560, height: 1600, ratio: 2 },
  { name: 'Apple iPad', width: 1024, height: 768, ratio: 2 },
  { name: 'Apple iPad Mini', width: 1024, height: 768, ratio: 1 },
  { name: 'Apple iPhone 4', width: 320, height: 480, ratio: 2 },
  { name: 'Apple iPhone 5', width: 320, height: 568, ratio: 2 },
  { name: 'Apple iPhone 6', width: 375, height: 667, ratio: 2 },
  { name: 'Apple iPhone 6 Plus', width: 414, height: 736, ratio: 3 },
  { name: 'BlackBerry PlayBook', width: 1024, height: 600, ratio: 1 },
  { name: 'BlackBerry Z30', width: 360, height: 640, ratio: 2 },
  { name: 'Google Nexus 10', width: 1280, height: 800, ratio: 2 },
  { name: 'Google Nexus 4', width: 384, height: 640, ratio: 2 },
  { name: 'Google Nexus 5', width: 360, height: 640, ratio: 3 },
  { name: 'Google Nexus 6', width: 412, height: 732, ratio: 3.5 },
  { name: 'Google Nexus 7', width: 960, height: 600, ratio: 2 },
  { name: 'LG Optimus L70', width: 384, height: 640, ratio: 1.2 },
  { name: 'Laptop with HiDPI screen', width: 1440, height: 900, ratio: 2 },
  { name: 'Laptop with MDPI screen', width: 1280, height: 800, ratio: 1 },
  { name: 'Laptop with touch', width: 1280, height: 950, ratio: 1 },
  { name: 'Nokia Lumia 520', width: 320, height: 533, ratio: 1.4 },
  { name: 'Nokia N9', width: 360, height: 640, ratio: 1 },
  { name: 'Samsung Galaxy Note 3', width: 360, height: 640, ratio: 3 },
  { name: 'Samsung Galaxy Note II', width: 360, height: 640, ratio: 2 },
  { name: 'Samsung Galaxy S III', width: 360, height: 640, ratio: 2 },
  { name: 'Samsung Galaxy S4', width: 360, height: 640, ratio: 3 }
];

var activeDevice = emulatorDeviceList[6];
activeDevice.ratio = 2;

var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .setChromeOptions(new chrome.Options()
    .setMobileEmulation({ deviceName: activeDevice.name })
  )
  .build();

driver.get('http://www.google.com');

// driver.manage().window().setSize(280, 580);
// driver.manage().window().setPosition(0, 200);

var element = driver.findElement(webdriver.By.name('q'));
element.sendKeys('Cheese!');
element.submit();

driver.getTitle().then(function(title) {
  console.log('Page title is: ' + title);
});

driver.wait(function() {
  return driver.getTitle().then(function(title) {
    return title.toLowerCase().lastIndexOf('cheese!', 0) === 0;
  });
}, 3500);

setTimeout(function() {
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

  driver.quit();
}, 5000);
