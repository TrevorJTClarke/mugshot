
// Node modules are required the same way as always.
// var os = require('os');
// var remote = require('remote');
//
// // var envName = window.env.name;
//
// // Browser modules are imported through new ES6 syntax.
// var urlcast = require('./core/urlcast');
//
// function clickTest() {
//   var url = document.getElementById('url').value;
//   ipc.send('URLTEST', url);
// }


/**
 * the contextmenu for right clickereeeee
 */
// var Menu = remote.require('menu');
// var MenuItem = remote.require('menu-item');
// var menu = new Menu();
// menu.append(new MenuItem({ label: 'MenuItem1', click: function() { console.log('item 1 clicked'); } }));
// menu.append(new MenuItem({ type: 'separator' }));
// menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }));
//
// window.addEventListener('contextmenu', function (e) {
//   e.preventDefault();
//   menu.popup(remote.getCurrentWindow());
// }, false);





// function clickTest() {
//   var url = document.getElementById('url').value;
//   urlcast.start(url);
//   ipc.send('URL:TEST', url);
// }

// var holder = document.getElementById('holder');
// holder.ondragover = function () {
//   this.className = 'hover';
//   return false;
// };
// holder.ondragleave = holder.ondragend = function () {
//   this.className = '';
//   return false;
// };
// holder.ondrop = function (e) {
//   this.className = '';
//   e.preventDefault();
//
//   var file = e.dataTransfer.files[0];
//   console.log("file dropped",file.path);
//   ipc.send('FILE:DROPPED', file.path);
//   // require('child_process').execFile(execPath, [file.path], {
//   //   detached: true, stdio: 'ignore'
//   // }).unref();
//   return false;
// };
