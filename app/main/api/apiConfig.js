const config = {
  aws: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET,
  },
};

module.exports = config;