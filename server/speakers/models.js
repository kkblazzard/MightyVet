var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/MightyVet', function(err){
        console.log("Connected to DB");
        if(err){console.log(err);
        }
});

var SpeakerSchema = new mongoose.Schema({
        firstName: String, 
        lastName: String,
        image: String, 
        webinars: [String], //array of webinar ids
}, {timestamps:true})

module.exports=mongoose.model('speaker', SpeakerSchema);