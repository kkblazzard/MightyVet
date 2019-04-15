var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/MightyVet', function(err){
        console.log("Connected to DB");
        if(err){console.log(err);
        }
});

var DonerSchema = require('./schema')
module.exports=mongoose.model('doner', DonerSchema);