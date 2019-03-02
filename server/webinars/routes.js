const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/webinars', controller.webinarAll)
    .post('/api/webinars', controller.webinarNew)
    .get('/api/webinars/:id', controller.webinarDetails)
    .put('/api/webinars/:id', controller.webinarUpdate)
    .delete('/api/webinars/:id', controller.webinarRemove)
}