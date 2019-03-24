var mongoose=require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

mongoose.connect('mongodb://localhost:27017/MightyVet', function(err){
        console.log("Connected to DB");
        if(err){console.log(err);
        }
});

var userSchema = new mongoose.Schema({
        firstName: {
                type: String,
                required: [true, "Please enter a first name."],
                minlength: [2, "First name must be 2 characters or longer."]
        },
        
        lastName: {
                type: String,
                required: [true, "Please enter a last name."],
                minlength: [2, "Last name must be 2 characters or longer."]
        },

        email: {
                type: String,
                required: [true, "Please enter an email."],
                unique: [true, "This email address is already in use."]
        },

        password: {
                type: String, 
                required:[true, "Please enter a password"], 
                minlength:[3, "password must be 3 characters or longer"],
                bcrypt: true 
        },

        title: {type: String}, //job titles

        location: {type: String},

        description: {type: String},

        picture:{type: String},

        accreditations: {type:[String]},  //list of accreditation ids

        mentor_id: {type:String}

}, {timestamps:true})

userSchema.plugin(uniqueValidator);
userSchema.plugin(require('mongoose-bcrypt'));
module.exports=mongoose.model('user', userSchema);