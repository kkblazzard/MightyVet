const Users=require('./models');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    Users.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'Email not found.'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is incorrect.'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));

module.exports={
    userRegister: (req, res) => {
    var user = new Users(req.body);

    user.setPassword(req.body.password)
    user.save()
    .then(data => {
        var token;
        token = data.generateJwt();
        res.status(200);
        res.json({
            "token" : token
        });
    })
    .catch(err => console.log(err) || res.json(err))
    },
    userAll: (req, res)=> Users
        .find().then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),
    userRemove: (req, res) => Users
        .findByIdAndDelete(req.params.id)
        .then(deleted=>console.log("deleted") ||res.json(deleted))
        .catch(err=>console.log(err) || res.json(err)),
    userDetails: (req, res) => Users
        .findById(req.params.id)
        .populate('mentor_id')
        .populate('accreditations')
        .populate('accreditations.webinar')
        .then(one=>console.log(one) || res.json(one))
        .catch(err=>console.log(err) || res.json(err)),
    userUpdate: (req, res) => Users
        .findByIdAndUpdate(req.params.id,req.body,{new: true})
        .then(updated =>console.log("updated",updated)||res.json(updated))
        .catch(err=>console.log(err) || res.json(err)),
    userLogin: (req, res) => {
        passport.authenticate('local', function(err, user, info){
            var token;
            // If Passport throws/catches an error
            if (err) {
                console.log(err)
                res.status(404).json(err);
                return;
            }
            // If a user is found
            if(user){
                token = user.generateJwt();
                res.status(200);
                res.json({
                    "token" : token
                });
            } else {
            // If user is not found
                res.status(401).json(info);
            }   
        })(req, res);  
    }
          
}