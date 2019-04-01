var mongoose = require('mongoose')

var WebinarSchema = require('../webinars/schema')

var AccreditationSchema = new mongoose.Schema({
        user_id: String, 
        webinar_id: {type: WebinarSchema}, 
        credit_received: {type: Boolean, default:false}
}, {timestamps:true})

module.exports = AccreditationSchema;