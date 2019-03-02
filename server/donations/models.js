var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/MightyVet', function(err){
        console.log("Connected to DB");
        if(err){console.log(err);
        }
});

var DonationSchema = new mongoose.Schema({
        amount: {type: Number},
        description: {type: String},
        user: userSchema

}, {timestamps:true})

module.exports={
        donation: mongoose.model('donation', DonationSchema)
};