var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/MightyVet', function(err){
        console.log("Connected to DB");
        if(err){console.log(err);
        }
});
var UserSchema = require('../users/schema')
var MeetingSchema = require('../meetings/schema')

var MenteeSchema = new mongoose.Schema({
        user: UserSchema, 
        approval: Boolean, //mentor approval
});
var MentorSchema = new mongoose.Schema({
        user: UserSchema, 
        strengths: [String], 
        approval: {type: Boolean,
                default: false}, //admin approval
        mentees: [MenteeSchema], //array of mentees
        availabilities: [MeetingSchema] //holds an array of dates and arrays of time
}, {timestamps:true})

module.exports=mongoose.model('mentor', MentorSchema);