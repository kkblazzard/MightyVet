const Mentees=require('./models');
const Users=require('../users/models');

module.exports={
    menteeAll: (req, res)=>Mentees
        .find({approval: true}).then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),
    menteeApprovals: (req, res)=>Mentees
        .find({approval: false}).then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),
    menteeNew: (req, res) => {
        console.log("entered new controller", req.body);
        var id = req.body.user_id;
        delete req.body.user_id;
        Users.findById(id)
        .then(user => {
            req.body.user = user;
            console.log(req.body);
            Mentees
            .create(req.body)
            .then(mentee=>{
                console.log("created in controller", mentee)|| res.json(mentee)
                Users.findByIdAndUpdate(id,{mentor_id: mentor._id},{runValidators:true})
                .then(data => console.log("User mentor_id successfully updated:", data))
                .catch(err=>console.log(err)|| res.json(err))
            })
            .catch(err=>console.log(err) || res.json(err))
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
    .findByIdAndUpdate({_id: req.params.id, "mentees.id":req.body.mentee_id},{$set:{"mentees.$.approval":true}},{new: true})
    .then(updated =>console.log("approved",updated)||res.json(updated))
    .catch(err=>console.log(err) || res.json(err)),

    declineMentee: (req, res) => Mentees
    .findByIdAndUpdate(req.params.id, {$pull: {mentees: req.body.mentee_id}})
    .then(updated =>console.log("decline",updated)||res.json(updated))
    .catch(err=>console.log(err) || res.json(err)),
}