![image](./resources/icon.png =250x)

Mug
==============
Mug (short for mugshot), a simple app for visual regression testing

REF: [Electron Boilerplate](https://github.com/szwacz/electron-boilerplate).  


#### Starting the app

```
npm start
```

#### Adding pure-js npm modules to your app

Remember to add your dependency to `app/package.json` file, so do:
```
cd app
npm install name_of_npm_module --save
```

#### Module loader

How about splitting your JavaScript code into modules? This project supports it by new ES6 syntax (thanks to [esperanto](https://github.com/esperantojs/esperanto)). ES6 modules are translated into AMD (RequireJS) modules. The main advantage of this setup is that you can use ES6/RequireJS for your own modules, and at the same time have normal access to node's `require()` to obtain stuff from npm.
```javascript
// Modules you write are required through new ES6 syntax
// (It will be translated into AMD definition).
import myOwnModule from './my_own_module';
// Node.js (npm) modules are required the same way as always
// (so you can still access all the goodness in npm).
var moment = require('moment');
```

# Release & Build

Builds the project into compiled files/folders, based on gulp tasks:
```
npm run build
```

To make ready for distribution installer use command:
```
npm run release
```
It will start the packaging process for operating system you are running this command on. Ready for distribution file will be outputted to `releases` directory.

## Special precautions for Windows
As installer [NSIS](http://nsis.sourceforge.net/Main_Page) is used. You have to install it (version 3.0), and add NSIS folder to PATH in Environment Variables, so it is reachable to scripts in this project (path should look something like `C:/Program Files (x86)/NSIS`).
