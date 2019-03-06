var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/MightyVet', function(err){
        console.log("Connected to DB");
        if(err){console.log(err);
        }
});

var meetingSchema = new mongoose.Schema({
        mentor: userSchema,
        mentee: userSchema,
        date: Date,
        time: String,
}, {timestamps:true})

module.exports={
        meeting: mongoose.model('meeting', meetingSchema)
};