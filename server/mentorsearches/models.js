var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/MightyVet', function(err){
        console.log("Connected to DB");
        if(err){console.log(err);
        }
});

var MentorSearchSchema = new mongoose.Schema({ //looking for mentors
        help: [String], //areas needing help
        specific_mentor: String, //mentor_id
}, {timestamps:true})

module.exports=mongoose.model('mentorsearch', MentorSearchSchema);