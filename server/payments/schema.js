var mongoose = require('mongoose');

var DonerSchema = new mongoose.Schema({
        name: {
                type: String,
                required: [true, "Please enter a first name."],
                minlength: [2, "First name must be 2 characters or longer."]
        },
        email: {
                type: String,
                required: [true, "Please enter an email."],
        },
        address: {
                type:String,
        },
        
        city: {
                type:String
        },
        state: {
                type: String, 
                minlength: 2,
                maxlength: 2,
                required: [true, "Please select a state."]
        },
        Zip: {
                Type:String,
        },
        amount: {
                type: Number,
        }
}, {timestamps:true})


module.exports = DonerSchema;