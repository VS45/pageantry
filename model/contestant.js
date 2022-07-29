const { timeStamp } = require('console');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contestantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    stagename: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contestantNumber: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    totalVotes:Number,
    status:{
        type:String
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Contestant', contestantSchema);