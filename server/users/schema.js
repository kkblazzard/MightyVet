var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
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
                validate: [function(email) {
                        return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
                }, "Please enter a valid email."],
                unique: [true, "This email address is already in use."]
        },

        password: { hash: {
                        type: String, 
                        required: [true, "Please enter a password."], 
                },
                salt: {
                        type: String, 
                        required: [true, "Please enter a password."], 
                }
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
                minlength: 2,
                maxlength: 5,
                required: [true, "Please select a state."]
        },

        picture: {type: String,
                default: "https://s3-us-west-1.amazonaws.com/mightyvet-test/images/profile_images/profile-image-placeholder.png",
                required: [true, "Please upload an image... It may take a bit of time to load."]
        },

        accreditations: [{type : mongoose.Schema.ObjectId, 
                ref : 'accreditation'}],  //list of accreditation ids

        mentors: [{type : mongoose.Schema.ObjectId, 
                ref : 'mentee'}], //list of mentor applications
                
        mentor_id: {
                type : mongoose.Schema.ObjectId, 
                ref : 'mentor'
        }, //mentor application and info
        admin: { type: Boolean,
        default: false }
}, {timestamps:true})

UserSchema.plugin(uniqueValidator);
UserSchema.methods.setPassword = function(password){
        this.password.salt = crypto.randomBytes(16).toString('hex');
        this.password.hash = crypto.pbkdf2Sync(password, this.password.salt, 1000, 64, 'sha512').toString('hex');
};
UserSchema.methods.validPassword = function(password) {
        var hash = crypto.pbkdf2Sync(password, this.password.salt, 1000, 64, 'sha512').toString('hex');
        return this.password.hash === hash;
};
UserSchema.methods.generateJwt = function() {
        var expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
      
        return jwt.sign({
                _id: this._id,
                email: this.email,
                name: this.name,
                firstName: this.firstName,
                lastName: this.lastName,
                title: this.title,
                org: this.org,
                state: this.state,
                picture: this.picture,
                admin: this.admin,
                exp: parseInt(expiry.getTime() / 1000),
        }, require('../secrets').jwt); // DO NOT KEEP YOUR SECRET IN THE CODE!
};
module.exports = UserSchema;