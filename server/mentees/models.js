var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/MightyVet', function(err){
        console.log("Connected to DB");
        if(err){console.log(err);
        }
});

var MenteeSchema = new mongoose.Schema({
        mentee: {user:String, approval: Boolean}, //user id and mentor approval
}, {timestamps:true})

module.exports=mongoose.model('mentee', MenteeSchema);