var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/MightyVet', function(err){
        console.log("Connected to DB");
        if(err){console.log(err);
        }
});
var MentorSchema = require('./schema')

module.exports=mongoose.model('mentor', MentorSchema);