const Models=require('./models');
const Meetings = Models.meeting;

module.exports={
    meetingAll: (req, res)=>Meetings
        .find().then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),

    meetingNew: (req, res) => {
        console.log("entered new controller", req.body);
        Meetings
        .create(req.body)
        .then(anew=>console.log("created in controller",anew)|| res.json(anew))
        .catch(err=>console.log(err) || res.json(err))
    },

    meetingRemove: (req, res) => Meetings
        .findByIdAndDelete(req.params.id)
        .then(deleted=>console.log("deleted") ||res.json(deleted))
        .catch(err=>console.log(err) || res.json(err)),

    meetingDetails:(req, res) => Meetings
        .findById(req.params.id)
        .then(one=>console.log(one) || res.json(one))
        .catch(err=>console.log(err) || res.json(err)),

    meetingUpdate: (req, res) => Meetings
        .findByIdAndUpdate(req.params.id,req.body,{new: true})
        .then(updated =>console.log("updated",updated)||res.json(updated))
        .catch(err=>console.log(err) || res.json(err))
        
}