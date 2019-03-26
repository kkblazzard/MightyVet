var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/MightyVet', function(err){
        console.log("Connected to DB");
        if(err){console.log(err);
        }
});

var PartnerSchema = new mongoose.Schema({
        name: String,
        img: String, 
        link: String, 
}, {timestamps:true})

module.exports=mongoose.model('partners', PartnerSchema);