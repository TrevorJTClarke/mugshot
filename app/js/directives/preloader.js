/**
 * preloader
 * a directive for showing a preloader animation during a processing period
 *
 * USE:
 * <preloader></preloader>
 *
 * $rootScope.$broadcast('PRELOADER:ON');
 * $rootScope.$broadcast('PRELOADER:OFF');
 *
 */
var P = require('./vendor/core/preloader');

MUG.directive('preloader',
['$rootScope', '$timeout',
function($rootScope, $timeout) {
  return {
    replace: true,
    restrict: 'E',
    scope: {},
    template: '<div class="preloader"></div>',
    link: function(scope, elem, attrs, ctrl) {
      var B;
      var el;
      var timer;
      var duration = 5000;
      var loading = 'loading';

      // INIT!
      // avoid the hide/show timeline
      $timeout(function() {
        B = new P.Browser();
        B.init();

        // setup one instance of the canvas
        el = document.querySelector('.preloader');
        el.appendChild(B.instance);

        // draw browser
        B.drawBrowser();
      }, 30);

      // function showPreloader() {
      //
      //   // avoid the hide/show timeline
      //   $timeout(function() {
      //
      //     // Start animation
      //     B.animate(0, 30);
      //   }, 30);
      //
      //   $timeout(function() {
      //
      //     // // draw browser
      //     // B.drawBrowser();
      //
      //     // Start animation
      //     B.animate(1, 150);
      //
      //     // el.addClass(loading);
      //   }, 3000);
      // }

      function updatePreloader(e, args) {
        if (!args || !args.title) { return; }
        var title = args.title;
        console.log('title', title);

        // avoid the hide/show timeline
        $timeout(function() {

          // Start animation
          B.animate(0, 30);
        }, 30);
      }

      function resetPreloader() {
        el.addClass(loading);
      }

      // $rootScope.$on('PRELOADER:ON', showPreloader);
      $rootScope.$on('PRELOADER:UPDATE', updatePreloader);
      $rootScope.$on('PRELOADER:OFF', resetPreloader);
    }
  };
}]);
