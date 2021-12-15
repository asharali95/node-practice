const AWS = require("aws-sdk");

const S3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
})

exports.awsImageUploader = (file) =>{
    var {mimetype, buffer, originalname} = file;
    var filename = originalname.split(".")[0];
    var awsParams = {
        Bucket: "mernpractice",
        Key: filename,
        Body: buffer,
        ContentType: mimetype
    }

    return new Promise((res,rej) =>{
        S3.upload(awsParams,(err, data) =>{
            if(err) rej(err);
            res(data)
        })
    })
}