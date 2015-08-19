/**
 * Wicker
 *
 * Useful for creating canvas instances
 */
var Wicker = function() {

  // Only stores the current instance
  this.instance = null;

  /**
   * builds a new canvas element, with specified options
   * @param  {Object} options any items to add to the canvas
   * @return {Object}         returns newly created canvas
   */
  this.new = function(options, parent) {
    var cv = document.createElement('canvas');

    // apply options quickly, #noRegretsNoChecks
    if (options) {
      for (var key in options) {
        cv[key] = options[key];
      }
    }

    // Store for later internal use
    this.instance = cv;

    // if (parent) {
    //   document.querySelector(parent).appendChild(cv);
    //   console.log('parent', parent);
    // } else {
    //   document.body.appendChild(cv);
    // }

    if (!options) {
      this.fitToParent();
    }

    return cv;
  };

  this.createRect = function(options) {
    var rect = this.instance.getContext('2d');

    rect.beginPath();
    rect.rect(options.position.x, options.position.y, options.position.w, options.position.h);
    rect.fillStyle = options.background || '#FFF';
    rect.fill();

    return this;
  };

  this.fitToParent = function() {
    // Make it visually fill the positioned parent
    this.instance.style.width = '100%';
    this.instance.style.height = '100%';

    // ...then set the internal size to match
    this.instance.width  = this.instance.offsetWidth;
    this.instance.height = this.instance.offsetHeight;
  };

  return this;
};

var Helpers = function() {

  this.rand = function(bottom, top) {
    if (bottom === 0 && top === 0) { return 0; }

    top = top || 10;
    bottom = bottom || 1;
    return (Math.floor(Math.random() * 10) + bottom) / top;
  };

  this.getColor = function(isFirst, bottom, top) {
    var h = this.rand(bottom, top);

    if (!isFirst) {
      if (this.rand() % this.rand() / 4 == 0) {
        return 'rgba(255, 0, 255, ' + Math.max(Math.min(h - 0.3, 0.9), 0.05) + ')';
      } else {
        return 'rgba(160, 160, 160, ' + Math.max(Math.min(h - 0.3, 0.4), 0.05) + ')';
      }
    } else {
      return 'rgba(200, 200, 200, ' + h + ')';
    }
  };

  return this;
};

var BrowserScan = function() {

  // internals
  this.Wicker = Wicker;
  this.Helpers = Helpers;

  this.instance = null;
  this.main = { w: 250, h: 205 };
  this.size = 3;
  this.offset = 200;
  this.totalRows = Math.round(this.main.h / this.size);
  this.totalCols = Math.round(this.main.w / this.size);
  this.previousData = null;

  this.init = function(element) {
    var _this = this;
    var W = new this.Wicker();
    this.W = W;

    this.instance = W.new({ width: _this.main.w, height: _this.main.h }, element);
    return this;
  };

  this.clear = function() {
    var context = this.instance.getContext('2d');
    context.clearRect(0, 0, this.main.w, this.main.h);
  };

  this.drawSet = function(data, current, isFirst) {
    var _this = this;
    var total = data.length;

    for (var row = 0; row < total; row++) {
      var x = (isFirst) ? row * _this.size : current * _this.size;
      var y = (isFirst) ? current * _this.size : row * _this.size;
      var compare = (isFirst) ? (x < _this.main.w - 10 && y < _this.main.h - 32) : (x < _this.main.w - 44 && y < _this.main.h - 32);

      if (compare) {
        _this.W.createRect({
          position: { x: x + 11, y: y + 25, w: _this.size, h: _this.size },
          background: data[current][row]
        });
      }
    }
  };

  this.animate = function(type, timeOffset, cb) {
    var _this = this;
    var inc = 0;
    this.dataSet1 = (this.dataSet1) ? this.dataSet1 : _this.getRandomData(true);
    this.previousData = this.dataSet1;
    this.dataSet2 = (this.dataSet2) ? this.dataSet2 : _this.getRandomData(false);
    timeOffset = timeOffset || 1;
    type = type || 0;

    function animateControl() {
      var __this = _this;
      var timey = setTimeout(function() {
        var total = (type === 0) ? _this.totalRows : _this.totalCols;
        if (inc >= total) {
          window.clearTimeout(timey);

          if (cb) {
            cb();
          }

          return;
        }

        requestAnimFrame(function() {
          if (type === 1) {
            _this.drawSet(_this.dataSet2, inc, false);
          } else {
            _this.drawSet(_this.dataSet1, inc, true);
          }

          inc++;
          animateControl();
        });
      }, timeOffset);
    }

    // Kick this thing off!
    animateControl();
  };

  // Dont follow this logic, just believe :)
  this.getRandomData = function(isFirst) {
    var _this = this;
    var dataSet = [];
    var cluster = [];
    var clusterTotal = this.totalRows;
    var H = new this.Helpers();

    // setup clumper
    for (var i = 0; i < clusterTotal; i++) {
      if (i < 1 || i > clusterTotal - 1) {
        cluster.push(0);
      } else {
        if (i % 3 === 0) {
          cluster.push(0);
        } else {
          cluster.push(H.rand(i % 2) * 10);
        }
      }
    }

    var cl = 0;
    var horizOffset = Math.floor(Math.random() * 77) + 78;
    var vertOffset = Math.floor(Math.random() * 17) + 18;

    for (var r = 0; r <= _this.totalRows; r++) {
      horizOffset = (f % vertOffset === 0 && f > 25) ? Math.floor(Math.random() * 13) + 15 : horizOffset;
      vertOffset = (f % vertOffset === 0 && f > 7) ? Math.floor(Math.random() * 12) + 13 : vertOffset;

      for (var c = 0; c <= _this.totalCols; c++) {
        var f = (isFirst) ? r : c;
        var s = (isFirst) ? c : r;
        var gate;
        var clr;
        cl = (cl >= cluster.length - 1) ? 0 : cl;
        cl++;

        if (isFirst) {
          if (f % vertOffset === 0 || (f - 1) % vertOffset === 0 || (f + 1) % vertOffset === 0 && s % horizOffset !== 0 && f > 6) {
            clr = H.getColor(true, 0, 0);
          } else if (s % horizOffset === 0 || (s - 1) % horizOffset === 0 && f > 6) {
            clr = H.getColor(true, 0, 0);
          } else if (s < 6 || s > _this.totalCols || f === 6 || f === 7) {
            clr = H.getColor(true, 0, 0);
          } else {
            gate = cluster[cl];
            clr = H.getColor(isFirst, gate, Math.max(gate + 2, 10));
          }
        } else {
          if (_this.previousData) {
            var tmpPrevItem = (_this.previousData && _this.previousData[s] && _this.previousData[s][f][0]) ? _this.previousData[s][f][0].split(',')[3].trim().replace(')', '') : null;
            tmpPrevItem = parseFloat(tmpPrevItem, 10);

            if (tmpPrevItem === 0 || tmpPrevItem === NaN) {
              clr = H.getColor(true, 0, 0);
            } else {
              var low = H.rand();
              var high = H.rand(low, low + 5);
              if (f > 6 && ((s % horizOffset < high && s % horizOffset > low) || (s - 1 % horizOffset < high && s - 1 % horizOffset > low) || (s - 2 % horizOffset < high && s - 2 % horizOffset > low))) { //f % vertOffset === 0 || (f - 1) % vertOffset === 0 || (f + 1) % vertOffset === 0 && s % horizOffset !== 0 &&
                clr = 'rgba(255, 0, 255, ' + Math.max(Math.min(H.rand(), 0.6), -0.9) + ')';
              } else if (s % horizOffset === 0 || (s - 1) % horizOffset === 0 && f > 6) {
                clr = H.getColor(true, 0, 0);
              } else {
                gate = cluster[cl];
                clr = H.getColor(isFirst, gate, Math.max(gate + 3, 10));
              }
            }
          }
        }

        dataSet[f] = dataSet[f] || [];
        dataSet[f][s] = dataSet[f][s] || [];
        dataSet[f][s].push(clr);
      }
    }

    return dataSet;
  };

  this.drawBrowser = function() {
    var context = this.instance.getContext('2d');
    var rectWidth = this.main.w - 12;
    var rectHeight = this.main.h - 8;
    var rectX = 5;
    var rectY = 5;
    var cornerRadius = 5;
    var defaultColor = 'white';
    var grey = 'rgb(160, 160, 160)';

    context.beginPath();
    context.strokeStyle = grey;
    context.moveTo(rectX + cornerRadius, rectY);
    context.lineTo(rectX + rectWidth - cornerRadius, rectY);
    context.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + cornerRadius, cornerRadius);
    context.lineTo(rectX + rectWidth, rectY + rectHeight - cornerRadius);
    context.arcTo(rectX + rectWidth, rectY + rectHeight, rectX + rectWidth - cornerRadius, rectY + rectHeight, cornerRadius);
    context.lineTo(rectX + cornerRadius, rectY + rectHeight);
    context.arcTo(rectX, rectY + rectHeight, rectX, rectY + rectHeight - cornerRadius, cornerRadius);
    context.lineTo(rectX, rectY + cornerRadius);
    context.arcTo(rectX, rectY, rectX + cornerRadius, rectY, cornerRadius);
    context.lineWidth = 5;
    context.stroke();
    this.W.createRect({
      position: { x: rectX, y: rectY, w: rectWidth, h: 20 },
      background: grey
    });
    this.W.createRect({
      position: { x: rectWidth * 0.40, y: rectY + 5, w: rectWidth * 0.60, h: 10 },
      background: defaultColor
    });

    context.beginPath();
    context.arc(rectX + 10, rectY + 10, 4, 0, 2 * Math.PI, false);
    context.fillStyle = defaultColor;
    context.fill();
    context.beginPath();
    context.arc(rectX + 22, rectY + 10, 4, 0, 2 * Math.PI, false);
    context.fillStyle = defaultColor;
    context.fill();
    context.beginPath();
    context.arc(rectX + 34, rectY + 10, 4, 0, 2 * Math.PI, false);
    context.fillStyle = defaultColor;
    context.fill();
  };

  this.resetBrowser = function() {
    var _this = this;

    this.W.createRect({
      position: { x: 8, y: 25, w: _this.main.w - 19, h: _this.main.h - 31 },
      background: 'white'
    });
  };

  return this;
};

window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

module.exports = {
  Wicker: Wicker,
  Browser: BrowserScan
};
