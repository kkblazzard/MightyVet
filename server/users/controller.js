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
    Users.find({admin: true})
    .then(data => {
      var user = new Users(req.body);
      user.setPassword(req.body.password);
      if (data.length === 0){
        user.admin = true;
      }
      user.save()
      .then(data2 => {
          var token;
          token = data2.generateJwt();
          res.status(200);
          res.json({
              "token" : token
          });
      })
      .catch(err => console.log(err) || res.json(err))
    })
    .catch(err => console.log(err) || res.json(err))
    },
    userAll: (req, res)=> Users
        .find()
        .select('-password')
        .then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),
    userExcel: (req, res)=> Users
    .find()
    .select('-password')
    .select('-admin')
    .select('-_id')
    .select('-__v')
    .select('-updatedAt')
    .select('-picture')
    .populate([{path: 'mentors', populate: {path: 'mentor', populate: {path: 'user'}}}, {path: 'accreditations', populate: {path: 'webinar'}}, {path: 'mentor_id'}])
    .then(all=>console.log(all) || res.json(all))
    .catch(err=>console.log(err)|| res.json(err)),
    userRemove: (req, res) => Users
        .findByIdAndDelete(req.params.id)
        .then(deleted=>console.log("deleted") ||res.json(deleted.select("-password")))
        .catch(err=>console.log(err) || res.json(err)),
    userDetails: (req, res) => Users
        .findById(req.params.id)
        .select('-password')
        .populate('mentor_id')
        .populate('accreditations')
        .populate('accreditations.webinar')
        .then(one=>console.log(one) || res.json(one))
        .catch(err=>console.log(err) || res.json(err)),
    userUpdate: (req, res) => Users
        .findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators: true, context: 'query'})
        .then(updated =>console.log("updated",updated)||res.json(updated))
        .catch(err=>console.log(err) || res.json(err)),
    userLogin: (req, res) => {
        passport.authenticate('local', function(err, user, info){
            var token;
            // If Passport throws/catches an error
            if (err) {
                console.log(err)
                res.json(err);
                return;
            }
            // If a user is found
            if(user){
                token = user.generateJwt();
                res.json({
                    "token" : token
                });
            } else {
            // If user is not found
                res.json(info);
            }   
        })(req, res);  
    },
    updatePassword: (req, res) => {
      passport.authenticate('local', function(err, user, info){
        if (err){
          res.json(err);
        }
        if(user){
          user.setPassword(req.params.password);
          user.save();
          res.json(user);
        }
        else{
          res.json(info);
        }
      })(req, res);
    },
    userProfile: (req, res) => {

      // If no user ID exists in the JWT return a 401
      if (!req.payload._id) {
        res.status(401).json({
          "message" : "UnauthorizedError: private profile"
        });
      } else {
        // Otherwise continue
        console.log(req.payload._id);
        Users
          .findById(req.payload._id)
          .select('-password')
          .populate([{path: 'accreditations', populate: {path: 'webinar'}},{path: 'mentors', populate: [{path: 'mentor', populate: {path: 'user'}}, {path: 'meetings', populate: {path: 'mentor', populate: {path: 'user', select: '-password'}}}]},{path: 'mentor_id', populate: [{path: 'mentees', populate: {path: 'user', select: '-password'}}, {path: 'availabilities', populate: {path: 'mentee', populate: {path: 'user', select: '-password'}}}]}])
          .then(one=>console.log(one) || res.json(one))
          .catch(err=>console.log(err) || res.json(err))
      }
    },
    updateImage: (req, res) => Users
    .findByIdAndUpdate(req.params.id,{$set:{picture: req.body.img}},{new: true, runValidators: true})
    .then(updated =>console.log("updated",updated)||res.json(updated))
    .catch(err=>console.log(err) || res.json(err)),
}
// 