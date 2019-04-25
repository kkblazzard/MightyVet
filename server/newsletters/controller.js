const Newsletters=require('./models');

module.exports={
    newsletterAll: (req, res) =>
        Newsletters
        .find()
        .then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),

    newsletterNew: (req, res) => {
        console.log("entered new controller", req.body);
        Newsletters.create(req.body)
        .then(anew=>console.log("created in controller", anew) || res.json(anew))
        .catch(err=> console.log(err) || res.json(err))
    },
    newsletterRemove: (req, res) => Newsletters
        .findOneAndDelete({email:req.params.email})
        .then(deleted=>console.log("deleted") ||res.json(deleted))
        .catch(err=>console.log(err) || res.json(err)),

    newsletterDetails:(req, res) => Newsletters
        .findOne({email:req.params.email})
        .then(one=>console.log(one) || res.json(one))
        .catch(err=>console.log(err) || res.json(err)),

    newsletterUpdate: (req, res) => Newsletters
        .findByIdAndUpdate(req.params.id,req.body,{new: true})
        .then(updated =>console.log("updated",updated)||res.json(updated))
        .catch(err=>console.log(err) || res.json(err))
        
}