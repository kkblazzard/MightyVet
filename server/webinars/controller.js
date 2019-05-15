const Webinars=require('./models');
const Speakers=require('../speakers/models');
const Users = require('../users/models');
module.exports={
    webinarAll: (req, res)  =>
        Webinars
        .find()
        .sort('-createdAt')
        .populate('speaker')
        .then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),
    webinarFeatured: (req, res) =>
        Webinars
        .find()
        .sort('-createdAt')
        .limit(4)    
        .then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),
    webinarNew: (req, res) => {
        console.log("entered new controller", req.body);
        Webinars
        .create(req.body)
        .then(anew => {
            console.log("created in controller",anew)|| res.json(anew)
            Speakers.findByIdAndUpdate(req.body.speaker,{$push: { webinars: anew._id}
            })
            .then(Speakers => console.log("Succesfully updated speaker webinars", speaker))
            .catch(err=>console.log(err)|| res.json(err))
        })
        .catch(err=>console.log(err) || res.json(err))
    },
    webinarSearch: (req, res) => {
        date = new Date();
        date = date.setHours(date.getHours()-2);
        Webinars
        .find({
            $or:[ //don't post live webinars that have past
                {type: "Video"},
                {   
                    type: "Live", 
                    datetime: { $gte: date }
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
        .then(deleted=> {
            console.log("deleted", deleted);
            Users.updateMany({}, {$pull: {accreditations: {webinar:deleted._id}}})
            .populate({path: "accreditations"})
            .then(update => {
                console.log("updated", update);
                res.json(deleted)
            })
            .catch(err=>console.log(err) || res.json(err))
        })
        .catch(err=>console.log(err) || res.json(err)),

    webinarDetails:(req, res) => Webinars
        .findById(req.params.id)
        .populate('speaker')
        .populate('users')
        .then(one=>console.log(one) || res.json(one))
        .catch(err=>console.log(err) || res.json(err)),

    webinarUpdate: (req, res) => Webinars
        .findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators: true})
        .then(updated =>console.log("updated",updated)||res.json(updated))
        .catch(err=>console.log(err) || res.json(err)),

    signUp: (req, res) => Webinars
        .findByIdAndUpdate(req.params.id, {$push:{users : req.body.accreditation_id}},{new: true})
        .then(updated => {
            console.log("updated",updated);
            Users.findByIdAndUpdate(req.body.user_id, {$push:{accreditations: req.body.accreditation_id}})
            .then(update => console.log("updated",update)||res.json(update))
            .catch(err=>console.log(err) || res.json(err))
        })
        .catch(err=>console.log(err) || res.json(err)),

    webinarFind: (req, res)  =>
        Webinars
        .find({title:req.body.title})
        .sort('-createdAt')
        // .populate('speaker')
        .then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),
}