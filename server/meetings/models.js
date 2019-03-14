var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/MightyVet', function(err){
        console.log("Connected to DB");
        if(err){console.log(err);
        }
});

var meetingSchema = new mongoose.Schema({
        mentor: {type: String},
        mentee: {type: String},
        start: {type: Date},
        duration: {type:String}
}, {timestamps:true})

module.exports=mongoose.model('meeting', meetingSchema);