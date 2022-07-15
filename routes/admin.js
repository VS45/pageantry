const express=require('express');
const router=express.Router()
const uploadImage=require('../services/firebaseupload');
const contestantCtrl=require('../controller/contestant')
const voteHistoryCtrl=require('../controller/voteHistory')
const multer=require('multer');
//const isAuth=require('./isAuth');
const fileFilter=(req,file,cb)=>{
   // console.log(file.fileSize);
if(file.mimetype==="image/png"||file.mimetype==="image/jpg"||file.mimetype==="image/jpeg"){
    cb(null,true);
}else{
    cb(null,false);  
    return cb(new Error('Only .png, .jpg, .jpeg files are accepted'));
}
}

const upload=multer({
    storage:multer.memoryStorage(),
    fileFilter:fileFilter
    }) 

    router.get('/contestant',contestantCtrl.getAddContestant);  
    router.get('/contestant/:id',contestantCtrl.getContestant);  
    router.get('/:stagename/:amount/:totalVotes/:email',voteHistoryCtrl.postVotesHistory);   
    router.get('/votes-history',voteHistoryCtrl.getVotesHistory);   
    router.post('/contestant',upload.single('image'),uploadImage,contestantCtrl.postContestant);  

  module.exports=router;