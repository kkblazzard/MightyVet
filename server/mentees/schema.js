var mongoose = require('mongoose')

var MenteeSchema = new mongoose.Schema({
    user: {type : mongoose.Schema.ObjectId, 
        ref : 'user' }, 
    meetings: [ {type : mongoose.Schema.ObjectId, 
        ref : 'meeting' } ],
    mentor: { type: mongoose.Schema.ObjectId,
        ref: 'mentor' },
    approval: { type: Boolean, 
        default: false } //mentor approval
});

module.exports = MenteeSchema;