var mongoose = require('mongoose');

var MeetingSchema = new mongoose.Schema({
    mentor: {type : mongoose.Schema.ObjectId, 
        ref : 'mentor'},
    mentee: {type : mongoose.Schema.ObjectId, 
        ref : 'mentee'},
    datetime: {type: Date},
}, {timestamps:true})

module.exports = MeetingSchema;