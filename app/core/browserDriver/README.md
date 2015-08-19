# Runner Design

### Devices

  * Desktop
  * Tablet
  * Mobile (all provided by emulator)

### Browsers

  * Chrome
  * Firefox
  * Internet Explorer

### Options

  * Test Setup
    * Config
      * general settings
      * add browsers
      * add devices
      * add viewports
      * add selectors
      * add cookies
      * add urls (?)
    * Capture/Reference Procedure
      1. Config browser, general settings, and device
      2. Open url
      3. Set Cookies
      4. Do selector operations
          * Container, Hide, Remove
          * Wait for images to load
      5. Capture screenshot
      6. Crop/Finish screenshot
      7. End Procedure
    * Action Procedure (TODO:)
      1. Config browser and device
      2. Open url
      3. Set Cookies
      4. Map actions to promises
      5. Execute action promises
      6. Capture screenshot
      7. Crop/Finish screenshot
      8. End Procedure
  * Runs
    * Tests run in synchronous order, one after another
    * Progress is calculated by total number of runs
    * Progress is updated after the completion of each step
    *
