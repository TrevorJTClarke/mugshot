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
   * TODO: setup array uploads
   */
  this.upload = function(folder, files) {
    if (!folder || !files) { throw new Error('Folder Name and File required!'); }

    var _this = this;

    function createFileUpload(file) {
      var dfd = q.defer();
      var params = {};
      var fileName = file.split('/');

      // setup base params
      params.ACL = 'public-read';
      params.Bucket = _this.config.bucket;
      params.Key = folder + '/' + fileName[fileName.length - 1];
      params.Body = fs.createReadStream(file);

      _this.instance.upload(params, function(err, data) {
        if (err) {
          console.log('Error uploading data: ', err);
          dfd.reject(err);
        } else {
          console.log('Successfully uploaded ', data);
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

    // .spread(function() {
    //   return arguments; // is this needed?
    // });
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
