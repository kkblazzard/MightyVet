const Partners=require('./models');

module.exports={
    partnerAll: (req, res)=>Partners
        .find().then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),

    partnerNew: (req, res) => {
        console.log("entered new controller", req.body);
        //if tier does not exist create the tier with the partner as the only item in the array
        Partners.find({tier: req.body.tier})
            .then(tier=>{
                if(!tier.length){
                    console.log("Creating tier", req.body.tier);
                    Partners.create({tier: req.body.tier})
                    .then(anew=>{
                        console.log("created in controller", anew) || res.json(anew);           
                        Partners
                        .findByIdAndUpdate(anew._id,{$push:{partners: req.body.partner}},{runValidators: true})
                        .then(anew=>console.log("created in controller",anew.partners[anew.partners.length-1]) || res.json(anew))
                        .catch(err=> {console.log(err) || res.json(err)})
                    })
                    .catch(err=> console.log(err) || res.json(err))
                }
                else{
                    console.log("Tier does exist!");
                    Partners
                    .findOneAndUpdate({tier: req.body.tier},{$push:{partners: req.body.partner}},{runValidators: true})
                    .then(anew=>console.log("created in controller",anew.partners[anew.partners.length-1]) || res.json(anew))
                    .catch(err=> {console.log(err) || res.json(err)
                    })
                }
            })
            .catch(err=> console.log(err) || res.json(err));
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