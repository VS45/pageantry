
var admin = require("firebase-admin");

var serviceAccount = require("../gboko-market-key.json");

const BUCKET='gboko-market.appspot.com';
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket:BUCKET,
});
const bucket=admin.storage().bucket();
const uploadImage=(req,res,next)=>{
    if(!req.file) return next();
    const image=req.file;
    console.log(image.size);
    if(image.size<1000*1024){
        console.log("the file name is "+image.originalname);
        const filename=Date.now()+"_"+image.originalname.split(".").pop();
        const file=bucket.file(filename);
    
        const stream=file.createWriteStream({
            metadata:{
                contentType:image.mimetype,
            }
        });
        stream.on("error",(e)=>{
            console.error(e);
        });
        stream.on("finish",async ()=>{
           await file.makePublic();
    
           req.file.firebaseUrl=`https://storage.googleapis.com/${BUCKET}/${filename}`
           next();
        })
    
        stream.end(image.buffer);
    }else{
        res.render('error',{error:'File Size must be less than 1Mb',title:'error',path:'/error'})
    }
    
}
module.exports=uploadImage;