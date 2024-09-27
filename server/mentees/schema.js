var mongoose = require('mongoose')

var MenteeSchema = new mongoose.Schema({
    user: {type : mongoose.Schema.ObjectId, 
        ref : 'user' }, 
    mentor: { type: mongoose.Schema.ObjectId,
        ref: 'mentor' },
    approval: { type: Boolean, 
        default: false } //mentor approval
});

module.exports = MenteeSchema;