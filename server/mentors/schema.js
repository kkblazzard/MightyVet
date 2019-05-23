var mongoose = require('mongoose');

var SupportSchema = new mongoose.Schema({
    business: {type: Boolean},
    communication: {type: Boolean},
    mental_health: {type: Boolean},
    well_being: {type: Boolean},
    university_life: {type: Boolean},
    career_path: {type: Boolean},
    technical_advice: {type: Boolean}
})
var MentorSchema = new mongoose.Schema({
    user: {type : mongoose.Schema.ObjectId, 
        ref : 'user'}, 
    resume: {type: String,
            required: [true, "Please enter your resume."],
            minlength: [2, "Your resume must be at least 2 characters long."],
            maxlength: [400, "Your resume must be at most 400 characters long."]
    }, 
    support: {
        type: {
                business: {type: Boolean},
                communication: {type: Boolean},
                mental_health: {type: Boolean},
                well_being: {type: Boolean},
                university_life: {type: Boolean},
                career_path: {type: Boolean},
        },
        required: true,
    },
    approval: {type: Boolean,
            default: false}, //admin approval
    mentees: [{type : mongoose.Schema.ObjectId, 
        ref : 'mentee'}], //array of mentees
    availabilities: [{type : mongoose.Schema.ObjectId, 
        ref : 'meeting'}], //holds an array of dates and arrays of time
}, {timestamps:true})

module.exports = MentorSchema;