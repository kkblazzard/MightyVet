var mongoose = require('mongoose');

var SpeakerSchema = require('../speakers/schema')
var QuestionSchema = new mongoose.Schema({
        question:{type:String},
        right_answer:{type:String},
        wrong_answers:{type:[String]}
}, {timestamps:true})

var WebinarSchema = new mongoose.Schema({
        title: {type: String},
        datetime: {type: Date},
        description: {type: String},
        users: {type: [user_id]}, //list of user ids
        speaker: {type: SpeakerSchema},
        video_link: {type: String},
        quiz: [QuestionSchema]
}, {timestamps:true})

module.exports = WebinarSchema;