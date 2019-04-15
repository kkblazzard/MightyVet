const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/excels/users', controller.usersFile)
}