const Mentors=require('./models');

module.exports={
    mentorAll: (req, res)=>Mentors
        .find({approval: true}).then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),
    mentorApprovals: (req, res)=>Mentors
        .find({approval: false}).then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),
    mentorNew: (req, res) => {
        console.log("entered new controller", req.body);
        Mentors
        .create(req.body)
        .then(anew=>console.log("created in controller",anew)|| res.json(anew))
        .catch(err=>console.log(err) || res.json(err))
    },
    mentorRemove: (req, res) => Mentors
        .findByIdAndDelete(req.params.id)
        .then(deleted=>console.log("deleted") ||res.json(deleted))
        .catch(err=>console.log(err) || res.json(err)),

    mentorDetails:(req, res) => Mentors
        .findById(req.params.id)
        .then(one=>console.log(one) || res.json(one))
        .catch(err=>console.log(err) || res.json(err)),

    mentorUpdate: (req, res) => Mentors
        .findByIdAndUpdate(req.params.id,req.body,{new: true})
        .then(updated =>console.log("updated",updated)||res.json(updated))
        .catch(err=>console.log(err) || res.json(err)),
    
    approveMentee: (req, res) => Mentors
        .findByIdAndUpdate({_id: req.params.id, "mentees.id":req.body.mentee_id},{$set:{"mentees.$.approval":true}},{new: true})
    .then(updated =>console.log("approved",updated)||res.json(updated))
    .catch(err=>console.log(err) || res.json(err)),

    declineMentee: (req, res) => Mentors
    .findByIdAndUpdate(req.params.id, {$pull: {mentees: req.body.mentee_id}})
    .then(updated =>console.log("decline",updated)||res.json(updated))
    .catch(err=>console.log(err) || res.json(err)),
}