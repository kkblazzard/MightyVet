var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/MightyVet', function(err){
        console.log("Connected to DB");
        if(err){console.log(err);
        }
});
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
        speaker: {type: SpeakerSchema},
        video_link: {type: String},
        quiz: [QuestionSchema]
}, {timestamps:true})

module.exports=mongoose.model('webinar', WebinarSchema);