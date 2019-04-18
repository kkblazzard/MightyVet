var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});
const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/users', controller.userAll)
    .get('/api/users/excel', controller.userExcel)
    .post('/api/users/register', controller.userRegister)
    .get('/api/users/:id', controller.userDetails)
    .get('/api/users/profile', auth, controller.userProfile)
    .put('/api/users/:id', controller.userUpdate)
    .delete('/api/users/:id', controller.userRemove)
    .post('/api/users/login', controller.userLogin)
}