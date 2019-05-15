const Partners=require('./models');

module.exports={
    partnerAll: (req, res)=>Partners
        .find().then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),

    partnerNew: (req, res) => {
        console.log("entered new controller", req.body);
        Partners
        .findOneAndUpdate({tier: req.body.tier},{$push:{partners: req.body.partner}},{upsert: true, runValidators: true})
        .then(anew=>console.log("created in controller",anew.partners[anew.partners.length-1]) || res.json(anew))
        .catch(err=> console.log(err) || res.json(err))
    },

    partnerRemove: (req, res) => Partners
        .findByIdAndDelete(req.params.id)
        .then(deleted=>console.log("deleted") ||res.json(deleted))
        .catch(err=>console.log(err) || res.json(err)),

    partnerDetails:(req, res) => Partners
        .findById(req.params.id)
        .then(one=>console.log(one) || res.json(one))
        .catch(err=>console.log(err) || res.json(err)),

    partnerUpdate: (req, res) => Partners
        .findByIdAndUpdate(req.params.id,req.body,{new: true})
        .then(updated =>console.log("updated",updated)||res.json(updated))
        .catch(err=>console.log(err) || res.json(err))
        
}