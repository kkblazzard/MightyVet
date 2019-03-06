const Models=require('./models');
const Users = Models.user;
const Meetings = Models.meeting;
module.exports={
    userAll: (req, res)=>Users
        .find().then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),
    userNew: (req, res) => {
        console.log("entered new controller", req.body);
        Users
        .create(req.body)
        .then(anew=>console.log("created in controller",anew)|| res.json(anew))
        .catch(err=>console.log(err) || res.json(err))
    },
    userRemove: (req, res) => Users
        .findByIdAndDelete(req.params.id)
        .then(deleted=>console.log("deleted") ||res.json(deleted))
        .catch(err=>console.log(err) || res.json(err)),
    userDetails:(req, res) => Users
        .findById(req.params.id)
        .then(one=>console.log(one) || res.json(one))
        .catch(err=>console.log(err) || res.json(err)),
    userUpdate: (req, res) => Users
        .findByIdAndUpdate(req.params.id,req.body,{new: true})
        .then(updated =>console.log("updated",updated)||res.json(updated))
        .catch(err=>console.log(err) || res.json(err)),
    userLogin: (req, res) => Users
        .findOne({username:req.body.username}, (err, user) => {
            if (err) {
                res.json(err);
            }
            else if (user == null){
                console.log("user not found");
                res.json({"error": "User Name/ Password mismatch."})
            }
            else {
                console.log("User name found");
                user.verifyPassword(req.body.password, function(err, isMatch){
                    if (err){
                        console.log(err);
                        res.json(err);
                    }
                    else if(isMatch){
                        console.log('matched successfully', isMatch);
                        res.json(user);
                    }
                    else{
                        console.log('invalid', isMatch)
                        res.json({"error": "User Name/ Password mismatch."});
                    }
                });
            }
        })
}