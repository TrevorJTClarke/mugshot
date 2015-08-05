/**
 * AWS Module for project sync
 */
var q = require('q');
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

  this.instance = {};
  this.config = {};

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
  this.init = function() {
    var config = this.getConfig();

    // store the instance
    this.instance = new AWS.S3(config);

    return this;
  };

  /**
   * pass in current batch of files to upload
   */
  this.upload = function(files, folder) {
    if (!files) { throw new Error('Files required!'); }

    var _this = this;

    function createFileUpload(file) {
      var dfd = q.defer();
      var params = {};

      // setup base params
      params.ACL = 'public-read';
      params.Bucket = _this.config.bucket;
      params.Key = (folder) ? folder + '/' + file.key : file.key;
      params.Body = fs.createReadStream(file.path);

      _this.instance.upload(params, function(err, data) {
        if (err) {
          dfd.reject(err);
        } else {
          dfd.resolve(data.Location);
        }
      });

      return dfd.promise;
    }

    // Setup files into promises
    var promiseFiles = [];
    files.map(function(file, idx) {
      var promFile = createFileUpload(file);
      promiseFiles.push(promFile);
    });

    // process all the files, then return the upload refs
    return q.all(promiseFiles);
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

AwsPublicProto.prototype.init = function() {
  var s3Temp = new AwsProto();
  return s3Temp.init();
};

module.exports = new AwsPublicProto();
