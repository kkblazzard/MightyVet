const Meetings=require('./models');

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
    
    meetingUpdate: (req, res) => Meetings
        .findByIdAndUpdate(req.params.id,req.body,{new: true})
        .then(updated =>console.log("updated",updated)||res.json(updated))
        .catch(err=>console.log(err) || res.json(err)),
        
    meetingRemove: (req, res) => Meetings
        .findByIdAndDelete(req.params.id)
        .then(deleted=>console.log("deleted") ||res.json(deleted))
        .catch(err=>console.log(err) || res.json(err)),

    mentorMeetings:(req, res) => Meetings
        .find({mentor: req.params.id})
        .then(meetings=>console.log(meetings) || res.json(meetings))
        .catch(err=>console.log(err) || res.json(err)),
        
    menteeMeetings:(req,res)=> Meetings
        .find({mentee: req.params.id})
        .then(meetings=>console.log(meetings) || res.json(meetings))
        .catch(err=>console.log(err) || res.json(err))


}