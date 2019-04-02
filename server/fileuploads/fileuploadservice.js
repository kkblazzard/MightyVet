const aws = require('aws-sdk');

aws.config.update({
    // Your SECRET ACCESS KEY from AWS should go here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
    secretAccessKey: "QIHsC5gJhwpZOQ6CiwSsBJjzHE9emLFqnGfDYX5a",
    // Not working key, Your ACCESS KEY ID from AWS should go here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
    accessKeyId: "AKIAIM7O6ONKG7JGIPHA",
    region: 'us-west-1' // region of your bucket
});

const s3 = new aws.S3();

module.exports = s3;