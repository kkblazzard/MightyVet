const Mentees=require('./models');
const Users=require('../users/models');
const Mentors=require('../mentors/models');

module.exports={
    menteeAll: (req, res)=>Mentees
        .find({approval: true}).then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),
    menteeNew: (req, res) => {
        console.log("entered new controller", req.body);
        Mentees    
        .create(req.body)
        .then(mentee=>{
            console.log("created in controller", mentee)|| res.json(mentee)
            Users.findByIdAndUpdate(mentee.user,{$push: {mentee: mentee._id}})
            .then(data => console.log("User mentor_id successfully updated:", data))
            .catch(err=>console.log(err)|| res.json(err))
        })
        .catch(err=>console.log(err) || res.json(err))
    },
    menteeRemove: (req, res) => Mentees
        .findByIdAndDelete(req.params.id)
        .then(deleted=>console.log("deleted") ||res.json(deleted))
        .catch(err=>console.log(err) || res.json(err)),

    menteeDetails:(req, res) => Mentees
        .findById(req.params.id)
        .then(one=>console.log(one) || res.json(one))
        .catch(err=>console.log(err) || res.json(err)),

    menteeUpdate: (req, res) => Mentees
        .findByIdAndUpdate(req.params.id,req.body,{new: true})
        .then(updated =>console.log("updated",updated)||res.json(updated))
        .catch(err=>console.log(err) || res.json(err)),
    approveMentee: (req, res) => Mentees
    .findByIdAndUpdate(req.body.mentee_id,{$set:{approval:true}},{new: true})
    .then(updated =>{
        console.log("approved",updated);
        Users.findByIdAndUpdate(updated.user, {$push:{mentors: updated._id}}, {new: true})
        .then((data) => console.log(data) || res.json(updated))
        .catch(err=>console.log(err) || res.json(err))
    })
    .catch(err=>console.log(err) || res.json(err)),
    declineMentee: (req, res) => Mentors
    .findByIdAndUpdate(req.params.id, {$pull: {mentees: req.body.mentee_id}})
    .then(updated =>{
        console.log("decline",updated);
        Mentees.findByIdAndDelete(req.body.mentee_id)
        .then(deleted=>console.log("deleted") || res.json(deleted))
        .catch(err=>console.log(err) || res.json(err))
    })
    .catch(err=>console.log(err) || res.json(err)),
}