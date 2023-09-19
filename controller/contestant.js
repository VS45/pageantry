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
exports.getAdminVote=async(req,res,next)=>{
 const id=req.params.id
 try{ 
   const mycontestant=await contestant.findById(id);
   res.render('admin/admin-vote',{title:'Vote Contestant',path:'/contestan',contestant:mycontestant}) 
 }catch(err){
    console.log(err)
 }
}

exports.getContestants=async(req,res,next)=>{
    try{
const contestants=await contestant.find().where('status').equals('Active');
let totalVotes=0
for(let i=0;i<contestants.length;i++){
totalVotes+=contestants[i].totalVotes||0;
}
res.render('admin/viewcontestants',{title:'All Contestant',path:'/',contestants:contestants,totalVotes:totalVotes})
    }catch(err){
        res.render('error',{error:err,title:'Error Page',path:'/error'})
    }
}
exports.getAdminContestants=async(req,res,next)=>{
    try{
const contestants=await contestant.find();
let totalVotes=0
for(let i=0;i<contestants.length;i++){
totalVotes+=contestants[i].totalVotes||0;
}
res.render('admin/contestants',{title:'All Contestant',path:'/',contestants:contestants,totalVotes:totalVotes})
    }catch(err){
        res.render('error',{error:err,title:'Error Page',path:'/error'})
    }
}
exports.getEdit=async(req,res,next)=>{
    const id=req.params.id
    try{ 
      const mycontestant=await contestant.findById(id);
      res.render('admin/edit',{title:'Vote Contestant',path:'/contestan',contestant:mycontestant}) 
    }catch(err){
       console.log(err)
    }
   }
   exports.updateContestant=async(req,res,next)=>{
    const {id,status}=req.body
    try{ 
   const result=await contestant.findById(id);
   result.status=status;
   await result.save();
    res.redirect('/admin-contestants');
    }catch(err){
    res.render('error',{error:err,title:'Error Page',path:'/error'})
    }
    }