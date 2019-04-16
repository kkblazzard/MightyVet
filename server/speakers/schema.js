var mongoose = require('mongoose')

var SpeakerSchema = new mongoose.Schema({
    title: { type: String },
    
    firstName: { 
        type: String,
        required: [true, "Please enter a last name."],
        minlength: [2, , "The new speaker's last name should be at least 2 characters long."]
    },
    lastName: { 
        type: String,
        required: [true, "Please enter a last name."],
        minlength: [2, , "The new speaker's last name should be at least 2 characters long."]
    },
    img: { 
        type: String,
    },
    description: { type: String,
        required: [true, "Please enter a description."],
        minlength: [2, , "The new speaker's description should be at least 2 characters long."]
    },
    webinars: [{type : mongoose.Schema.ObjectId, 
        ref : 'webinar'}]
}, {timestamps:true})

module.exports = SpeakerSchema;