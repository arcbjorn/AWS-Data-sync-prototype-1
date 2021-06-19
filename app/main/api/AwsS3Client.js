/* eslint-disable @typescript-eslint/no-non-null-assertion */

const { S3Client } = require('@aws-sdk/client-s3');
const apiConfig = require('./apiConfig');

const s3Client = new S3Client({
  credentials: {
    accessKeyId: apiConfig.aws.accessKeyId,
    secretAccessKey: apiConfig.aws.secretAccessKey,
  },
  region: apiConfig.aws.region,
});

module.exports = s3Client;
