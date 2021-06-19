/* eslint-disable consistent-return */

const {
  PutObjectCommand,
  ListObjectsCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');

const apiConfig = require('../api/apiConfig');
const { makeDirectoryPath, makeFilePath } = require('./helpers');

// const { ReadStream } = require('fs');

const s3Client = require('../api/AwsS3Client');
const AwsObject = require('./AwsObject');

const fs = require('fs');

class CloudManager {
  userId;

  constructor(userId) {
    this.userId = userId;
  }

  localRootDirInfoCloudPath() {
    return `${this.userId}/__data.json`;
  }

  getUserLocalDir = async () => {
    try {
      const getLocalDir = new GetObjectCommand({
        Bucket: apiConfig.aws.bucket,
        Key: this.localRootDirInfoCloudPath(),
      });
      const results = await s3Client.send(getLocalDir);

      const localDirInfo = JSON.parse(
        JSON.stringify(results.Body)
      );
      console.info(localDirInfo);

      return localDirInfo.localRootDir;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  createLocalDirInfo = async (localRootDir) => {
    try {
      const localDirInfo = new AwsObject(
        this.userId,
        '__data.json',
        JSON.stringify({ localRootDir })
      );
      const results = await s3Client.send(new PutObjectCommand(localDirInfo));

      console.info(
        `Successfully created ${localDirInfo.Key} and uploaded it to ${localDirInfo.Bucket}/${localDirInfo.Key}`
      );

      console.info(results);
      return results;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  listUserSpace = async (directoryPath = '') => {
    try {
      const path = makeDirectoryPath(this.userId, directoryPath);

      const results = await s3Client.send(
        new ListObjectsCommand({ Bucket: apiConfig.aws.bucket, Prefix: path })
      );

      console.info(results.Contents);
      return results;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  uploadFile = async (file) => {
    try {
      const fileStream = fs.createReadStream(file.path);
      fileStream.on('error', function(err) {
        console.error('File Error', err);
      });

      const awsFileObject = new AwsObject(
        this.userId,
        file.name,
        fileStream
      );
      const results = await s3Client.send(new PutObjectCommand(awsFileObject));

      console.info(
        `Successfully created ${awsFileObject.Key} and uploaded it to ${awsFileObject.Bucket}/${awsFileObject.Key}`
      );

      console.info(results);
      return results;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  deleteFile = async (filename) => {
    try {
      const results = await s3Client.send(new DeleteObjectCommand({
        Bucket: apiConfig.aws.bucket,
        Key: makeFilePath(this.userId, 'TestingSync.rtf', ''),
      }));

      // console.log(makeFilePath(this.userId, filename, ''))

      console.info(
        `Successfully deleted 1 file from the bucket`
      );

      console.info(results);
      return results;
    } catch (err) {
      console.error(err);
      return err;
    }
  };
}

module.exports = CloudManager;
