var mongoose = require('mongoose');
var UserSchema = require('../users/schema')

var MeetingSchema = new mongoose.Schema({
    mentee: UserSchema,
    datetime: {type: Date},
}, {timestamps:true})

module.exports = MeetingSchema;