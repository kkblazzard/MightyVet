var mongoose = require('mongoose');
var MeetingSchema = new mongoose.Schema({
    mentor: {
        type : mongoose.Schema.ObjectId, 
        ref : 'mentor',
        required: true
    },
    mentee: {
        type : mongoose.Schema.ObjectId, 
        ref : 'user'
    },
    datetime: {
        type: Date,
        required: [true, "Please enter a valid time."]
    },
}, {timestamps:true})

MeetingSchema.pre('validate', function(next) {
    var that = this;
    const Meetings = require('./models');
    const Users = require('../users/models')
    var before = new Date(this.datetime).setHours(new Date(this.datetime).getHours()-1);
    var after = new Date(this.datetime).setHours(new Date(this.datetime).getHours()+1)
    Users.findOne({mentor_id: that.mentor})
    .catch(err => next(new Error("Something went wrong")))
    .then(user => {
        Meetings.find({$or: [{mentor: that.mentor}, {mentee: user._id}], datetime: {$gt: before, $lt: after}})
        .catch(err => next(new Error("Something went wrong")))
        .then(meetings => {
            if(meetings.length){
                console.warn('Meetings:', meetings);
                that.invalidate("datetime", "You are already booked for another meeting at this time.");
                next();
            }
            else{
                next();
            }
        })
    })
});
module.exports = MeetingSchema;