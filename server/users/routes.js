const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/users', controller.userAll)
    .post('/api/users', controller.userNew)
    .get('/api/users/:id', controller.userDetails)
    .put('/api/users/:id', controller.userUpdate)
    .delete('/api/users/:id', controller.userRemove)
    .post('/api/users/login', controller.userLogin)
}