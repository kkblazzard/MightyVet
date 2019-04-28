const Doner=require('./models');
module.exports={
    donerAdd: (req, res) => {
    var doner = new Doner(req.body);
    doner.save()
    .then(data=>console.log("doner added to db", data) || res.json(data))
    .catch(err => console.log(err) || res.json(err))
    },
    donerAll: (req, res)=> Doner
        .find()
        .then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),
    donerRemove: (req, res) => Doners
        .findByIdAndDelete(req.params.id)
        .then(deleted=>console.log("doner deleted") ||res.json(deleted))
        .catch(err=>console.log(err) || res.json(err)),
    donerDetails: (req, res) => Doners
        .findById(req.params.id)
        .then(one=>console.log(one) || res.json(one))
        .catch(err=>console.log(err) || res.json(err)),
    donerUpdate: (req, res) => Doners
        .findByIdAndUpdate(req.params.id,req.body,{new: true})
        .then(updated =>console.log("updated",updated)||res.json(updated))
        .catch(err=>console.log(err) || res.json(err)),
    donerPayments: (req, res) => {
        console.log("payment controller hit",req.body);
        var stripe = require("stripe")(require('../secrets').stripeKey);
        stripe.charges.create({
            amount: req.body.amount,
            currency: 'usd',
            description: 'Donation',
            source: req.body.stripeToken.id,
          },
        function(err, charge) {
            if (err) {
                console.log("payment errors", err) || res.json(err)
            } 
            else{
                console.log("paid", charge) || res.json(charge)
            }
        })
    }
}