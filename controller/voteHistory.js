const VoteHistory=require('../model/voteHistory');
const Contestant=require('../model/contestant');

exports.postVotesHistory=async(req,res,next)=>{
    const {stagename,amount,totalVotes,email}=req.params;
 try{
    
const result=await VoteHistory.create({stagename,amount,totalVotes,email})
const contestant=await Contestant.findOne({stagename:stagename});
const initialVotes=contestant.totalVotes;
console.log(initialVotes);
contestant.totalVotes=+totalVotes+ +initialVotes;
const update=await contestant.save();
   res.redirect('/')
}catch(err){
console.log(err)
    }
}