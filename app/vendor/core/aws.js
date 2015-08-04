/**
 * AWS Module for project sync
 */
var fs = require('fs');
var AWS = require('aws-sdk');
var awsConfigPath = __dirname + '/config/aws.json';

// fix the path
awsConfigPath = awsConfigPath.replace('/vendor/core', '');

// readfile helper
function getJsonFile(path, type) {
  var file;

  try {
    file = fs.readFileSync(path, 'utf8');
  } catch (e) {
    // We dont have it, return OKAY
    return type || {};
  }

  return JSON.parse(file);
}

var AwsProto = function() {

  this.config = {};
  this.projectConfig = {};

  /**
   * store the AWS credentials for later use
   */
  this.getConfig = function() {
    this.config = getJsonFile(awsConfigPath);
    return this.config;
  };

  /**
   * initialize S3 obj with config
   */
  this.initialize = function() {
    var config = this.getConfig();
    var bucketData = this.projectConfig;

    // Setup the merged config
    config.region = bucketData.region || config.region;

    return new AWS.S3(config);
  };

  /**
   * clean working directory, and update UI with aws resources
   */
  this.cleanup = function() {
    // TODO:
  };

  /**
   * read project files and its current batch of files
   */
  this.getProjectFiles = function(projectId) {
    // TODO:
  };

  /**
   * pass in a projectId, then it will read the project and its current batch of files to upload
   * once complete, it will clean out any local screens and replace with aws resources
   */
  this.upload = function(projectId) {
    // TODO:
    // - get aws config
    // - read project files
    // - initalize
    // - **create project bucket if no bucket
    // - upload files
    // - upload project files
    // - clean working directory, and update UI with aws resources
  };
};

var AwsPublicProto = function() {

  /**
   * store the AWS credentials for later use
   */
  this.setConfig = function(options) {
    fs.writeFile(awsConfigPath, JSON.stringify(options), function(err) {
      if (err) {
        console.log(err);
        return false;
      }
    });
  };

  /**
   * store the AWS credentials for later use
   */
  this.getConfig = function() {
    return getJsonFile(awsConfigPath);
  };
};

AwsPublicProto.prototype.upload = function(projectId) {
  var s3Temp = new AwsProto();
  return s3Temp.upload(projectId);
};

module.exports = new AwsPublicProto();
