var mongoose = require('mongoose')

var SpeakerSchema = new mongoose.Schema({
    title: { type: String },
    
    firstName: { type: String,
        required: [true, "Please enter a last name."],
        minlength: [2, , "The new speaker's last name should be at least 2 characters long."]
    },
    lastName: { type: String,
        required: [true, "Please enter a last name."],
        minlength: [2, , "The new speaker's last name should be at least 2 characters long."]
    },
    img: { type: String,
        required: [true, "Please upload an image."]
    },
    description: { type: String,
        required: [true, "Please enter a description."],
        minlength: [10, , "The new speaker's description should be at least 10 characters long."]
    },
    webinars: [{type : mongoose.Schema.ObjectId, 
        ref : 'webinar'}]
}, {timestamps:true})

module.exports = SpeakerSchema;