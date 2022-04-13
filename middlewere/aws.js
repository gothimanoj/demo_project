const AWS = require('aws-sdk');
const fs = require('fs')

 
module.exports={
    aws:async(req,res,next)=>{
    
     try{
const s3 = new  AWS.S3({
    accessKeyId:process.env.S3_ACCESS_KEY,
    secretAccessKey:process.env.S3_SERECT_ACCESS_KEY
});
const filename = req.file.filename;
 
const params = {
    Bucket: "profilepictureupload",
    Body:fs.createReadStream(req.file.path),
    Key:`${filename}`
}

const result= await s3.upload(params).promise()

const url = s3.getSignedUrl('putObject', {
    Bucket: "profilepictureupload",
    Key:`${filename}`
}) 
req.url =url;
next();
    

     }catch(err){
         console.log(err);
  res.json({
      msg:"server not found"
  })
     }
 }
}
 