var mongoose = require('mongoose')

var SpeakerSchema = new mongoose.Schema({
    title: { type: String,
        required: [true, "Please enter a title."]
    },
    
    firstName: { 
        type: String,
        required: [true, "Please enter a first name."],
        minlength: [2, "The new speaker's first name should be at least 2 characters long."]
    },
    lastName: { 
        type: String,
        required: [true, "Please enter a last name."],
        minlength: [2, "The new speaker's last name should be at least 2 characters long."]
    },
    // img: { 
    //     type: String,
    //     required: [true, "Please upload an image... It may take a bit of time to load."]
    // },
    // description: { type: String,
    //     required: [true, "Please enter a description."],
    //     minlength: [2, , "The new speaker's description should be at least 2 characters long."]
    // }
}, {timestamps:true})

module.exports = SpeakerSchema;