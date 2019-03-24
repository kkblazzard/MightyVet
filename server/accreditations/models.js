var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/MightyVet', function(err){
        console.log("Connected to DB");
        if(err){console.log(err);
        }
});

var AccreditationSchema = new mongoose.Schema({
        user_id: String, 
        webinar_id: String, 
        credit_received: Boolean
}, {timestamps:true})

module.exports=mongoose.model('accreditation', AccreditationSchema);