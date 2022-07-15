const { timeStamp } = require('console');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const voteHistorySchema = new Schema({
   
    stagename: {
        type: String,
        required: true
    },
   amount:{
    type:Number,
    required:true
   },
    totalVotes:Number
}, {
    timestamps: true,
});

module.exports = mongoose.model('VoteHistory', voteHistorySchema);