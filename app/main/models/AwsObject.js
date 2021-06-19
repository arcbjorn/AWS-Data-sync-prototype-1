const apiConfig = require('../api/apiConfig');
const { makeFilePath } = require('./helpers');

class AwsObject {
  Bucket;
  Key;
  Body;

  constructor(
    userId,
    name,
    file,
    cloudPath = ''
  ) {
    this.Bucket = apiConfig.aws.bucket;
    this.Key = makeFilePath(userId, name, cloudPath);
    this.Body = file;
  }
}

module.exports = AwsObject;
