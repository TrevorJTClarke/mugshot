/**
 * preloader
 * a directive for showing a preloader animation during a processing period
 *
 * USE:
 * <preloader></preloader>
 *
 * $rootScope.$broadcast('PRELOADER:UPDATE', { msg: 'Opening Browser Session', percent: 37 });
 * $rootScope.$broadcast('PRELOADER:OFF');
 *
 */
var P = require('./vendor/core/preloader');

MUG.directive('preloader',
['$rootScope', '$timeout',
function($rootScope, $timeout) {
  var totalIncrement = 30;

  function calculateIncrements(project) {
    var delay = 0;
    var viewports = 0;
    var selectors = 0;
    var increment = 12;

    // get all container selectors total
    if (project.selectors && project.selectors.length > 0) {
      for (var i = 0; i < project.selectors.length; i++) {
        if (project.selectors[i] && project.selectors[i].type === 'container') {
          selectors = selectors + 1;
        }
      }
    }

    // get the viewports
    if (project.viewports && project.viewports.length > 0) {
      viewports = project.viewports.length;
    }

    // see if there is a delay
    if (project.meta && project.meta.delay) {
      delay = parseInt(project.meta.delay, 10);
    }

    // calculate a reasonable increment for the animation
    totalIncrement = (increment * (viewports * selectors)) + 30; // + delay
  }

  return {
    replace: true,
    restrict: 'E',
    scope: {},
    template: '<div class="preloader"></div>',
    link: function(scope, elem, attrs, ctrl) {
      var B;
      var el;
      var timer;
      var title;
      var previousTitle;
      var duration = 5000;
      var loading = 'loading';
      var isAnimating = false;

      // INIT!
      // avoid the ng-cloak timeline
      $timeout(function() {
        B = new P.Browser();
        B.init();

        // setup one instance of the canvas
        el = document.querySelector('.preloader');
        el.appendChild(B.instance);

        // draw browser
        B.drawBrowser();
      }, 30);

      function updatePreloader(e, args) {
        if (!args || !args.msg) { return; }

        if (args.project) {
          calculateIncrements(args.project);
        }

        // make sure we dont animate over a previous animation
        if (!isAnimating) {
          isAnimating = true;
          timer = setTimeout(function() {
            isAnimating = false;
          }, totalIncrement * 10);

          return;
        }

        title = args.msg;

        var type;

        switch (title) {
          // case 'Starting compare capture':
          //   type = 0;
          //   break;
          case 'Opening Browser Session':
            type = 0;
            break;
          case 'Capturing Screens':
            type = 1;
            break;

          // case 'Updated Project History':
          //   type = 2;
          //   break;
          // case 'Comparing Capture Data':
          //   type = 2;
          //   break;
        }

        // check that the title has changed
        if (title !== previousTitle && B && B.animate) {

          // Start animation
          B.animate(type, totalIncrement, function() {
            previousTitle = title;
          });
        }
      }

      function resetPreloader() {
        B.resetBrowser();
      }

      // $rootScope.$on('PRELOADER:ON', showPreloader);
      $rootScope.$on('PRELOADER:UPDATE', updatePreloader);
      $rootScope.$on('PRELOADER:OFF', resetPreloader);
    }
  };
}]);
