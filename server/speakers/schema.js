var mongoose = require('mongoose')

var SpeakerSchema = new mongoose.Schema({
    title: String,
    firstName: String, 
    lastName: String,
    img: String, 
    description: String,
}, {timestamps:true})

module.exports = SpeakerSchema;