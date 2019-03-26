const MentorSearches=require('./models');

module.exports={
    mentorSearchAll: (req, res)=>MentorSearches
        .find().then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),

    mentorSearchNew: (req, res) => {
        console.log("entered new controller", req.body);
        MentorSearches
        .create(req.body)
        .then(anew=>console.log("created in controller",anew)|| res.json(anew))
        .catch(err=>console.log(err) || res.json(err))
    },

    mentorSearchRemove: (req, res) => MentorSearches
        .findByIdAndDelete(req.params.id)
        .then(deleted=>console.log("deleted") ||res.json(deleted))
        .catch(err=>console.log(err) || res.json(err)),

    mentorSearchDetails:(req, res) => MentorSearches
        .findById(req.params.id)
        .then(one=>console.log(one) || res.json(one))
        .catch(err=>console.log(err) || res.json(err)),

    mentorSearchUpdate: (req, res) => MentorSearches
        .findByIdAndUpdate(req.params.id,req.body,{new: true})
        .then(updated =>console.log("updated",updated)||res.json(updated))
        .catch(err=>console.log(err) || res.json(err))
        
}