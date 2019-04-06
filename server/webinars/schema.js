var mongoose = require('mongoose');

var SpeakerSchema = require('../speakers/schema')
var QuestionSchema = new mongoose.Schema({
        question:{type:String},
        right_answer:{type:String},
        wrong_answers:{type:[String]}
}, {timestamps:true})

var WebinarSchema = new mongoose.Schema({
        title: {
                type: String,
                required: [true, "Please enter a title."],
                minlength: [true, "The title must be at least 5 characters long."]
        },
        type: {
                type: String,
        }, //Live or Video

        datetime: {type: Date}
        ,
        description: {
                type: String,
                required: [true, "Please enter a description."],
                minlength: [true, "The description must be at least 10 characters long."]
        },
        users: {type: [String]}  //list of user ids
        ,
        speaker: {
                type: SpeakerSchema,
                required: [true, "Please choose a speaker or create a new one."]
        },
        img: {
                type: String,
                required: [true, "Please upload a picture."]
        },
        webinar_link: {
                type: String,
                required: [true, "Please enter the link for the video."]
        },
        quiz: {
                type: [QuestionSchema],
                minlength: [3, "Your quiz should have at least 3 questions."]
        }
}, {timestamps:true})

module.exports = WebinarSchema;