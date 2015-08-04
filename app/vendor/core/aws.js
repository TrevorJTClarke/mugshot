/**
 * AWS Module for project sync
 */
var fs = require('fs');
var AWS = require('aws-sdk');
var awsConfigPath = __dirname + '/app/config/aws.json';

var AwsProto = function() {

  /**
   * store the AWS credentials for later use
   */
  this.getConfig = function(options) {
    // fs.writeFile(awsConfigPath, JSON.stringify(options), function(err) {
    //   if (err) {
    //     console.log(err);
    //     return false;
    //   }
    // });
  };

  /**
   * initialize S3 obj with config
   */
  this.initialize = function() {
    //
  };

  /**
   * clean working directory, and update UI with aws resources
   */
  this.cleanup = function() {
    //
  };

  /**
   * read project files and its current batch of files
   */
  this.getProjectFiles = function(projectId) {
    //
  };

  /**
   * pass in a projectId, then it will read the project and its current batch of files to upload
   * once complete, it will clean out any local screens and replace with aws resources
   */
  this.upload = function(projectId) {
    // TODO:
    // - get aws config
    // - read project files
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
};

AwsPublicProto.prototype.upload = function(projectId) {
  var s3Temp = new AwsProto();
  return s3Temp.upload(projectId);
};

// // project data:
// var pD = {
//   bucket: 'name',
//   region: '',
//   autosync: true
// };
//
// var s3 = new AWS.S3(s3.config);
// var s3bucket = new AWS.S3({ params: {Bucket: 'myBucket'} });
// s3.getObject({Bucket: 'bucket', Key: 'key'}, function(err, data) {
//   console.log(err, data);
// });
//
// var s3 = new AWS.S3();
// var params = {Bucket: 'myBucket', Key: 'myImageFile.jpg'};
// var file = require('fs').createWriteStream('/path/to/file.jpg');
// s3.getObject(params).createReadStream().pipe(file);
//
// // Load the AWS SDK for Node.js
// var AWS = require('aws-sdk');
//
// /**
//  * Don't hard-code your credentials!
//  * Export the following environment variables instead:
//  *
//  * export AWS_ACCESS_KEY_ID='AKID'
//  * export AWS_SECRET_ACCESS_KEY='SECRET'
//  */
//
// // Set your region for future requests.
// AWS.config.region = 'us-west-2';
//
// // Create a bucket using bound parameters and put something in it.
// // Make sure to change the bucket name from "myBucket" to something unique.
// var s3bucket = new AWS.S3({params: {Bucket: 'myBucket'}});
// s3bucket.createBucket(function() {
//   var params = {Key: 'myKey', Body: 'Hello!'};
//   s3bucket.upload(params, function(err, data) {
//     if (err) {
//       console.log("Error uploading data: ", err);
//     } else {
//       console.log("Successfully uploaded data to myBucket/myKey");
//     }
//   });
// });
//
// var s3 = new AWS.S3({params: {Bucket: 'myBucket', Key: 'myKey'}});
// s3.createBucket(function(err) {
//   if (err) { console.log("Error:", err); }
//   else {
//     s3.upload({Body: 'Hello!'}, function() {
//       console.log("Successfully uploaded data to myBucket/myKey");
//     });
//   }
// });
//
// var fs = require('fs');
// var zlib = require('zlib');
//
// var body = fs.createReadStream('bigfile').pipe(zlib.createGzip());
// var s3obj = new AWS.S3({params: {Bucket: 'myBucket', Key: 'myKey'}});
// s3obj.upload({Body: body}).
//   on('httpUploadProgress', function(evt) { console.log(evt); }).
//   send(function(err, data) { console.log(err, data) });

module.exports = new AwsPublicProto();
