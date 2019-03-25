var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/MightyVet', function(err){
        console.log("Connected to DB");
        if(err){console.log(err);
        }
});
var ScheduleSchema = new mongoose.Schema({
        date: Date, //holds the date
        times: [{time:String, mentee:String}], //time holds the time in format HH:MM (30 minutes interval, adjacent intervals can't be picked)
        //mentee defaults null, once a mentee signs up holds his user_id
}, {timestamps:true})
var MentorSchema = new mongoose.Schema({
        user_id: String, 
        strengths: [String], 
        approval: Boolean,
        mentees: [String], //array of mentees
        availabilities: [ScheduleSchema] //holds an array of dates and arrays of time
}, {timestamps:true})

module.exports=mongoose.model('mentor', MentorSchema);