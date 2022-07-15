const VoteHistory=require('../model/voteHistory');


exports.postVotesHistory=async(req,res,next)=>{
    const {stagename,amount,totalVotes,email}=req.body;
 try{
const result=await VoteHistory.create({stagename,amount,totalVotes,email})
   res.send(result); 
}catch(err){
console.log(err)
    }
}