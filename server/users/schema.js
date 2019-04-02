var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var AccreditationSchema = require('../accreditations/schema');
var UserSchema = new mongoose.Schema({
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
                required: [true, "Please enter a password."], 
                minlength: [3, "Your password must be 3 characters or longer."],
                bcrypt: true 
        },

        title: {
                type: String,
                required:[true, "Please choose a job title."]
        }, //job titles custom choice validation

        org: {
                type: String,
                required: [true, "Please enter your organization."]
        },

        state: {
                type: String, 
                length: 2,
                required: [true, "Please select a state."]
        },

        picture: {type: String},

        accreditations: {type: [AccreditationSchema]},  //list of accreditation ids

        mentors: {type: [String]}, //list of mentor ids

        mentor_id: {type: String} //mentor application and info

}, {timestamps:true})

UserSchema.plugin(uniqueValidator);
UserSchema.plugin(require('mongoose-bcrypt'));

module.exports = UserSchema;