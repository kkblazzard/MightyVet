var mongoose=require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

mongoose.connect('mongodb://localhost:27017/NGOplusplusdb', function(err){
        console.log("Connected to DB");
        if(err){console.log(err);
        }
});


var userSchema = new mongoose.Schema({
        username: {
                type: String, 
                required:[true, "Please enter a User name"], 
                minlength:[3, "User Name must be 3 characters or longer"], 
                unique: [true, "That name is already used, please try another name"]
        },

        email: {type: String},

        password: {
                type: String, 
                required:[true, "Please enter a password name"], 
                minlength:[3, "password must be 3 characters or longer"],
                bcrypt: true 
        },
        certification:{type:Number},
        mentor:{type: Boolean}

}, {timestamps:true})

userSchema.plugin(uniqueValidator);
userSchema.plugin(require('mongoose-bcrypt'));
module.exports=mongoose.model('user', userSchema);