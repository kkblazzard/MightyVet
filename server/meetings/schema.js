var mongoose = require('mongoose');
var MeetingSchema = new mongoose.Schema({
    mentor: {
        type : mongoose.Schema.ObjectId, 
        ref : 'mentor',
        required: true
    },
    mentee: {
        type : mongoose.Schema.ObjectId, 
        ref : 'user'
    },
    datetime: {
        type: Date,
        required: [true, "Please enter a valid time."]
    },
}, {timestamps:true})

module.exports = MeetingSchema;