const Donor=require('./models');
// import {secrets} from ('../');
module.exports={
    donorAdd: (req, res) => {
    var doner = new Donor(req.body);
    doner.save()
    .then(data=>console.log("donor added to db", data) || res.json(data))
    .catch(err => console.log(err) || res.json(err))
    },
    donorAll: (req, res)=> Donor
        .find()
        .then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),
    donorRemove: (req, res) => Donors
        .findByIdAndDelete(req.params.id)
        .then(deleted=>console.log("donor deleted") ||res.json(deleted))
        .catch(err=>console.log(err) || res.json(err)),
    donorDetails: (req, res) => Doners
        .findById(req.params.id)
        .then(one=>console.log(one) || res.json(one))
        .catch(err=>console.log(err) || res.json(err)),
    donerUpdate: (req, res) => Doners
        .findByIdAndUpdate(req.params.id,req.body,{new: true})
        .then(updated =>console.log("updated",updated)||res.json(updated))
        .catch(err=>console.log(err) || res.json(err)),
    donorPayments: (req, res) => {
        console.log("payment controller hit",req.body);
        // var stripe = require("stripe")(secrets.pubKey);
        // stripe.charges.create({
        // amount: 2000,
        // currency: "usd",
        // source: "tok_amex", // obtained with Stripe.js
        // description: "Charge for jenny.rosen@example.com"
        // }, function(err, charge) {
        // // asynchronously called
        // });
        console.log("donor payment charge var from stripe", charge)
        // .then(payment=>console.log("paid", payment || res.json(payment))
        // .catch(err=>console.log("payment errors", err) || res.json(err)),
    },
}