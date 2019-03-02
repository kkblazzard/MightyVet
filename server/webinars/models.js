var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/MightyVet', function(err){
        console.log("Connected to DB");
        if(err){console.log(err);
        }
});

var WebinarSchema = new mongoose.Schema({
        title: {type: String},
        details: {type: String},
        duration: {type: String}

}, {timestamps:true})

module.exports={
        webinar: mongoose.model('webinar', WebinarSchema)
};