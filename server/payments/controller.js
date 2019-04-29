module.exports= (req, res) => {
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