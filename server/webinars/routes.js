const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/webinars', controller.webinarAll)
    .get('/api/webinars/featured', controller.webinarFeatured)
    .get('/api/webinars/search', controller.webinarSearch)
    .post('/api/webinars', controller.webinarNew)
    .get('/api/webinars/:id', controller.webinarDetails)
    .put('/api/webinars/:id', controller.webinarUpdate)
    .put('/api/webinars/signup/:id', controller.signUp)
    .delete('/api/webinars/:id', controller.webinarRemove)
}