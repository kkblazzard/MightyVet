var mongoose=require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

mongoose.connect('mongodb://localhost:27017/MightyVet', function(err){
        console.log("Connected to DB");
        if(err){console.log(err);
        }
});

var NewsletterSchema = new mongoose.Schema({
        email: {type: String,
        validate: [function(email) {
                return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        }, "Please enter a valid email."], //email validation
        required: [true, "Please enter an email."],
        unique: true }
}, {timestamps:true})

NewsletterSchema.plugin(uniqueValidator, {message: "This email is already receiving the newsletter."});

module.exports=mongoose.model('newsletter', NewsletterSchema);