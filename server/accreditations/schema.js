var mongoose = require('mongoose')

var AccreditationSchema = new mongoose.Schema({
        user: {type : mongoose.Schema.ObjectId, 
                ref : 'user'}, 
        webinar_id: {type : mongoose.Schema.ObjectId, 
                ref : 'webinar'}, 
        credit_received: {type: Boolean, default:false}
}, {timestamps:true})

module.exports = AccreditationSchema;