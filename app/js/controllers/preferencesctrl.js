var fs = require('fs');
var AWS = require('./vendor/core/aws');

MUG.controller('PreferencesCtrl',
['$rootScope', '$scope', '$state', 'Projects',
function($rootScope, $scope, $state, Projects) {
  $scope.awsConfig = {
    autosync: true,
    bucket: '',
    accessKeyId: '',
    secretAccessKey: ''
  };

  // grab settings real quick
  $scope.awsConfig = AWS.getConfig();

  $scope.save = function() {
    // save the AWS config
    AWS.setConfig($scope.awsConfig);
  };

  $scope.syncNow = function() {
    Projects.syncProject();
  };

}]);
