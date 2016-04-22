/**
 * Devices
 * The complete list of devices available to test screenshots
 */

var devices = [
  { name: 'Desktop - Huge', width: 2880, height: 1800, ratio: 2, type: 'desktop' },
  { name: 'Desktop - Extra Large', width: 1920, height: 1080, ratio: 1, type: 'desktop' },
  { name: 'Desktop - Large', width: 1440, height: 900, ratio: 1, type: 'desktop' },
  { name: 'Desktop - HiDPI', width: 1366, height: 768, ratio: 1, type: 'desktop' },
  { name: 'Desktop - MDPI', width: 1280, height: 800, ratio: 1, type: 'desktop' },
  { name: 'Laptop with HiDPI screen', width: 1440, height: 900, ratio: 2, type: 'desktop' },
  { name: 'Laptop with MDPI screen', width: 1280, height: 800, ratio: 1, type: 'desktop' },
  { name: 'Laptop with touch', width: 1280, height: 950, ratio: 1, type: 'desktop' },
  { name: 'Tablet - Portrait', width: 768, height: 1024, ratio: 1, type: 'tablet' },
  { name: 'Tablet - Landscape', width: 1024, height: 768, ratio: 1, type: 'tablet' },
  { name: 'Google Nexus 10', width: 1280, height: 800, ratio: 2, type: 'tablet', emulate: true },
  { name: 'Apple iPad', width: 1024, height: 768, ratio: 2, type: 'tablet', emulate: true },
  { name: 'Apple iPad Mini', width: 1024, height: 768, ratio: 1, type: 'tablet', emulate: true },
  { name: 'BlackBerry PlayBook', width: 1024, height: 600, ratio: 1, type: 'tablet', emulate: true },
  { name: 'Amazon Kindle Fire HDX', width: 2560, height: 1600, ratio: 2, type: 'mobile', emulate: true },
  { name: 'Apple iPhone 4', width: 320, height: 480, ratio: 2, type: 'mobile', emulate: true },
  { name: 'Apple iPhone 5', width: 320, height: 568, ratio: 2, type: 'mobile', emulate: true },
  { name: 'Apple iPhone 6', width: 375, height: 667, ratio: 2, type: 'mobile', emulate: true },
  { name: 'Apple iPhone 6 Plus', width: 414, height: 736, ratio: 3, type: 'mobile', emulate: true },
  { name: 'BlackBerry Z30', width: 360, height: 640, ratio: 2, type: 'mobile', emulate: true },
  { name: 'Google Nexus 4', width: 384, height: 640, ratio: 2, type: 'mobile', emulate: true },
  { name: 'Google Nexus 5', width: 360, height: 640, ratio: 3, type: 'mobile', emulate: true },
  { name: 'Google Nexus 6', width: 412, height: 732, ratio: 3.5, type: 'mobile', emulate: true },
  { name: 'Google Nexus 7', width: 960, height: 600, ratio: 2, type: 'mobile', emulate: true },
  { name: 'LG Optimus L70', width: 384, height: 640, ratio: 1.2, type: 'mobile', emulate: true },
  { name: 'Nokia Lumia 520', width: 320, height: 533, ratio: 1.4, type: 'mobile', emulate: true },
  { name: 'Nokia N9', width: 360, height: 640, ratio: 1, type: 'mobile', emulate: true },
  { name: 'Samsung Galaxy Note 3', width: 360, height: 640, ratio: 3, type: 'mobile', emulate: true },
  { name: 'Samsung Galaxy Note II', width: 360, height: 640, ratio: 2, type: 'mobile', emulate: true },
  { name: 'Samsung Galaxy S III', width: 360, height: 640, ratio: 2, type: 'mobile', emulate: true },
  { name: 'Samsung Galaxy S4', width: 360, height: 640, ratio: 3, type: 'mobile', emulate: true }
];

var Devices = function() {
  return {

    /**
     * get the list of devices for the specified type
     * @param  {String} type - narrows down the list to just the type needed
     * @return {Array}
     *
     * Options:
     * desktop, tablet, mobile
     */
    getAllByType: function(type) {
      var typeArray = [];

      for (var i = 0; i < devices.length; i++) {
        var item = devices[i];
        if (item.type === type) {
          typeArray.push(item);
        }
      }

      return typeArray;
    },

    /**
     * get a single device by name
     * @param  {String} name - name of device
     * @return {Object}      the device properties
     */
    getByName: function(name) {
      for (var i = 0; i < devices.length; i++) {
        var item = devices[i];
        if (item.name === name) {
          return item;
        }
      }

      return null;
    }

  };
};

module.exports = Devices();
