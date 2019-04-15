var mongoose = require('mongoose');

var MentorSchema = new mongoose.Schema({
        user: {type : mongoose.Schema.ObjectId, 
            ref : 'user'}, 
        resume: {type: String,
                required: [true, "Please enter your resume."],
                // minlength: [100, "Your resume must be at least 100 characters long."],
                // maxlength: [400, "Your resume must be at most 400 characters long."]
        }, 
        approval: {type: Boolean,
                default: false}, //admin approval
        mentees: [{type : mongoose.Schema.ObjectId, 
            ref : 'mentee'}], //array of mentees
        availabilities: [{type : mongoose.Schema.ObjectId, 
            ref : 'meeting'}] //holds an array of dates and arrays of time
}, {timestamps:true})

module.exports = MentorSchema;