var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/MightyVet', function(err){
        console.log("Connected to DB");
        if(err){console.log(err);
        }
});

var PartnerSchema = new mongoose.Schema({
        name: {type: String,
                required: [true, "Please enter a name for the new partner."]
        },
        img: {type: String,
                required: [true, "Please upload an image for the new partner."]
        }, 
        link: {type: String,
                required: [true, "Please enter a link to the website of the new partner."]
        },
}, {timestamps:true})

var PartnersSchema = new mongoose.Schema({
        tier: {type: Number,
                required: true,
                min: 1,
                max: 3
        }, 
        partners: [PartnerSchema]
}, {timestamps:true})


module.exports=mongoose.model('partners', PartnersSchema);