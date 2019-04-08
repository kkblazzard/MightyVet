var mongoose = require('mongoose')

var MenteeSchema = new mongoose.Schema({
    user: {type : mongoose.Schema.ObjectId, 
        ref : 'user'}, 
    meetings: {type : mongoose.Schema.ObjectId, 
        ref : 'meeting'},
    approval: Boolean, //mentor approval
});

module.exports = MenteeSchema;