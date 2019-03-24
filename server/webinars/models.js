var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/MightyVet', function(err){
        console.log("Connected to DB");
        if(err){console.log(err);
        }
});

var QuestionSchema = new mongoose.Schema({
        question:{type:String},
        right_answer:{type:String},
        wrong_answers:{type:[String]}
}, {timestamps:true})

var QuizSchema = new mongoose.Schema({
        questions: [QuestionSchema],
}, {timestamps:true})

var WebinarSchema = new mongoose.Schema({
        title: {type: String},
        description: {type: String},
        learnings: {type: String},
        speaker_id: {type: String},
        video_link: {type: String},
        quiz: {type: QuizSchema}
}, {timestamps:true})

module.exports=mongoose.model('webinar', WebinarSchema);