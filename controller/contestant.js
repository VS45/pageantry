const { read } = require("fs");
const contestant = require("../model/contestant");

exports.getAddContestant=(req,res,next)=>{
    res.render('admin/addcontestant',{title:'Add Contestant',path:'/'});
}
exports.postContestant=async(req,res,next)=>{
const {name,stagename,phone,address,contestantNumber}=req.body
const file = req.file;
    if (file) {
        const imageUrl = file.firebaseUrl;
try{ 
const result=await contestant.create({
    name,stagename,phone,address,contestantNumber,imageUrl
})
res.redirect('/');
}catch(err){
res.render('error',{error:err,title:'Error Page',path:'/error'})
}
 }
}
exports.getContestant=async(req,res,next)=>{
 const id=req.params.id
 try{ 
   const mycontestant=await contestant.findById(id);
   res.render('admin/votecontestant',{title:'Vote Contestant',path:'/contestan',contestant:mycontestant}) 
 }catch(err){
    console.log(err)
 }
}

exports.getContestants=async(req,res,next)=>{
    try{
const contestants=await contestant.find();

res.render('admin/viewcontestants',{title:'All Contestant',path:'/',contestants:contestants})
    }catch(err){
        res.render('error',{error:err,title:'Error Page',path:'/error'})
    }
}