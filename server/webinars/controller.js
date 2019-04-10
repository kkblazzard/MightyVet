const Webinars=require('./models');
const Speakers=require('../speakers/models')
module.exports={
    webinarAll: (req, res)  =>
        Webinars
        .find()
        .sort('-createdAt')
        .populate('speaker')
        .then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),

    webinarNew: (req, res) => {
        console.log("entered new controller", req.body);
        Webinars
        .create(req.body)
        .then(anew => {
            console.log("created in controller",anew)|| res.json(anew)
            Speakers.findByIdAndUpdate(req.body.speaker,{$push: {_id: anew._id}})
        })
        .catch(err=>console.log(err) || res.json(err))
    },
    webinarSearch: (req, res) => {
        date = new Date();
        date = date.setHours(date.getHours()+1)
        console.log(date)
        Webinars
        .find({
            $or:[ //don't post live webinars that have past
                {type: "Video"},
                {   
                    type: "Live", 
                    datetime: { $gt: date}
                }
            ]
        })
        .sort('-createdAt')
        .populate('speaker')
        .then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err))
    },
    webinarRemove: (req, res) => Webinars
        .findByIdAndDelete(req.params.id)
        .then(deleted=>console.log("deleted") ||res.json(deleted))
        .catch(err=>console.log(err) || res.json(err)),

    webinarDetails:(req, res) => Webinars
        .findById(req.params.id)
        .populate('speaker')
        .populate('accreditation')
        .then(one=>console.log(one) || res.json(one))
        .catch(err=>console.log(err) || res.json(err)),

    webinarUpdate: (req, res) => Webinars
        .findByIdAndUpdate(req.params.id,req.body,{new: true})
        .then(updated =>console.log("updated",updated)||res.json(updated))
        .catch(err=>console.log(err) || res.json(err))
        
}