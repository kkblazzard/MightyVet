const Meetings=require('./models');
const Mentors = require('../mentors/models');
const Users = require('../users/models');
module.exports={
    meetingAll: (req, res)=>Meetings
        .find().then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),

    meetingNew: (req, res) => {
        console.log("entered new controller", req.body);
        Meetings
        .create(req.body)
        .then(allnew=>{
            console.log("created in controller",allnew);
            Mentors.findByIdAndUpdate(req.body[0].mentor, {$addToSet:{availabilities: {$each: allnew.map(x => {return x._id})}}}, {new: true})
            .then(updated => console.log("pushed to mentor", updated) || res.json(allnew))
            .catch(err=>console.log(err) || res.json(err))
        })
        .catch(err=>console.log(err) || res.json(err))
    },
    meetingUpdate: (req, res) => Meetings
        .findByIdAndUpdate(req.params.id,req.body,{new: true})
        .then(updated =>console.log("updated",updated)||res.json(updated))
        .catch(err=>console.log(err) || res.json(err)),
        
    meetingRemove: (req, res) => Meetings
        .findByIdAndDelete(req.params.id)
        .then(deleted=>{
            if(deleted.mentee){
                Users.findByIdAndUpdate(deleted.mentee, {$pull: {meetings: deleted._id}})
                .then()
                .catch(err=>console.log(err) || res.json(err));
            }
            Mentors.findByIdAndUpdate(deleted.mentor, {$pull: {availabilities: deleted._id}})
            .then(() => {console.log('deleted', deleted) || res.json(deleted)})
            .catch(err=>console.log(err) || res.json(err));
            })
        .catch(err=>console.log(err) || res.json(err)),

    mentorMeetings:(req, res) => Meetings
        .find({mentor: req.params.id})
        .then(meetings=>console.log(meetings) || res.json(meetings))
        .catch(err=>console.log(err) || res.json(err)),
        
    menteeMeetings:(req,res)=> Meetings
        .find({mentee: req.params.id})
        .then(meetings=>console.log(meetings) || res.json(meetings))
        .catch(err=>console.log(err) || res.json(err)),

    meetingSignUp: (req, res) => {
        Meetings.findById(req.params.id)
        .then(meeting => {
            var before = new Date(meeting.datetime).setHours(new Date(meeting.datetime).getHours()-1);
            var after = new Date(meeting.datetime).setHours(new Date(meeting.datetime).getHours()+1)
            Meetings.find({$or:[{mentee: req.body.mentee, datetime: {$gt: before, $lt: after}}, {mentor: req.body.mentor, datetime: {$gt: before, $lt: after}}]})
            .then(data => {
                if(data.length){
                    res.json( {"errors": { "datetime": {"message": "You are already signed up for a meeting at this time."},  "_id": req.params.id}})
                }
                else{
                    Meetings.findByIdAndUpdate(meeting.id, {mentee: req.body.mentee}, {new: true})
                    .then(updated => {
                        console.log("updated",updated);
                        Users.findByIdAndUpdate(req.body.mentee, {$push: {meetings: updated._id}}, {new: true})
                        .then(() => res.json(updated))
                        .catch(err=>console.log(err) || res.json(err))
                    })
                    .catch(err=>console.log(err) || res.json(err))
                }
            })
            .catch(err=>console.log(err) || res.json(err))
        })
        .catch(err=>console.log(err) || res.json(err))
    },
    cancelMeeting: (req, res) => Meetings
    .findByIdAndUpdate(req.params.id,{mentee: null},{new: true})
    .then(updated => {
        console.log("updated",updated);
        Users.findByIdAndUpdate(req.body.mentee, {$pull: {meetings: updated._id}}, {new: true})
        .then(() => res.json(updated))
        .catch(err=>console.log(err) || res.json(err))
    })
    .catch(err=>console.log(err) || res.json(err))
}