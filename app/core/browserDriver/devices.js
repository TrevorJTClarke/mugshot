/**
 * Devices
 * The complete list of devices available to test screenshots
 */

var desktop = [
  { name: 'Desktop - Extra Large', width: 2880, height: 1800, ratio: 2 },
  { name: 'Desktop - Large', width: 1920, height: 1080, ratio: 1 },
  { name: 'Desktop', width: 1440, height: 900, ratio: 1 },
  { name: 'Desktop', width: 1366, height: 768, ratio: 1 },
  { name: 'Desktop', width: 1280, height: 800, ratio: 1 }
];

var tablet = [
  { name: 'Tablet - Portrait', width: 768, height: 1024, ratio: 1 },
  { name: 'Tablet - Landscape', width: 1024, height: 768, ratio: 1 }
];

var mobile = [
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

var devices = {
  desktop: desktop,
  tablet: tablet,
  mobile: mobile
};

var Devices = function() {
  return {

    /**
     * get the types of devices available
     * @return {Array}
     */
    getTypes: function() {
      return ['desktop', 'tablet', 'mobile'];
    },

    /**
     * get the list of devices for the specified type
     * @param  {String} type - narrows down the list to just the type needed
     * @return {Array}
     * @Options see @method 'getTypes'
     */
    getAllByType: function(type) {
      return devices[type];
    },

    /**
     * get a single device by type and id
     * @param  {String} type - type of device
     * @param  {Number} id   which device to return
     * @return {Object}      the device properties
     */
    getDevice: function(type, id) {
      return devices[type][id];
    }

  };
};

module.exports = Devices();
