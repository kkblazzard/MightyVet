const Mentors = require('./models');
const Mentees = require('../mentees/models');
const Users = require('../users/models');
const Meetings = require('../meetings/models');
module.exports={
    mentorAll: (req, res)=>Mentors
        .find({approval: true})
        .populate('user')
        .then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),
    mentorApprovals: (req, res)=>Mentors
        .find({approval: false})
        .populate('user')
        .then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),
    mentorNew: (req, res) => {
        console.log("entered new controller", req.body);
        Mentors
        .create(req.body)
        .then(mentor=>{
            console.log("created in controller", mentor)|| res.json(mentor)
            Users.findByIdAndUpdate(req.body.user,{mentor_id: mentor._id})
            .then(data => console.log("User mentor_id successfully updated:", data))
            .catch(err=>console.log(err)|| res.json(err))
        })
        .catch(err=>console.log(err) || res.json(err))
    },
    mentorRemove: (req, res) => Mentors
        .findById(req.params.id)
        .populate({path: "mentees", populate: {path: "user"}})
        .then( mentor => {
            Users.findByIdAndUpdate(mentor.user, {$set: {mentor_id:null}, $pull: {meetings: {mentor: mentor._id}}})
            .populate({path: "meetings"})
            .then(user=> {
                console.log("deleted", user)
                Meetings.deleteMany({mentor: mentor._id})
                .then(meetings => {
                    console.log("deleted", meetings);
                    Users.updateMany({},{$pull: {mentors: {mentor: mentor._id}}})
                    .populate({path: "mentors"})
                    .then(users => {
                        console.log("updated", users)
                        Mentees.deleteMany({mentor: mentor._id})
                        .then(mentees => {
                            console.log("updated", mentees)
                            Mentors.findByIdAndDelete(req.params.id)
                            .then(deleted=>console.log("deleted") ||res.json(deleted))
                            .catch(err=>console.log(err) || res.json(err))
                        })
                        .catch(err=>console.log(err) || res.json(err));
                    })
                    .catch(err=>console.log(err) || res.json(err));
                })
                .catch(err=>console.log(err) || res.json(err));
            })
            .catch(err=>console.log(err) || res.json(err));
        })
        .catch(err => console.log(err) || res.json(err)),
    mentorDetails:(req, res) => Mentors
        .findById(req.params.id)
        .populate([{path: 'user', select: '-password'},{path:'mentees'},{path:'availabilities', populate: {path: 'mentee', select: '-password'}}])
        .then(one=>console.log(one) || res.json(one))
        .catch(err=>console.log(err) || res.json(err)),
    signUp: (req, res) => Mentors
    .findByIdAndUpdate(req.params.id,{$push: {mentees: req.body._id}},{new: true})
    .then(mentor => console.log(mentor) || res.json(mentor))
    .catch(err=>console.log(err) || res.json(err)),
    mentorUpdate: (req, res) => Mentors
        .findByIdAndUpdate(req.params.id,req.body,{new: true})
        .then(updated =>console.log("updated",updated)||res.json(updated))
        .catch(err=>console.log(err) || res.json(err))
}