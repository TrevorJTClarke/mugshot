var fs = require('fs');
var AWS = require('./vendor/core/aws');

MUG.controller('PreferencesCtrl',
['$rootScope', '$scope', '$state',
function($rootScope, $scope, $state) {
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

}]);
