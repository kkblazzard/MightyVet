const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/newsletters', controller.newsletterAll)
    .post('/api/newsletters', controller.newsletterNew)
    .get('/api/newsletters/:id', controller.newsletterDetails)
    .put('/api/newsletters/:id', controller.newsletterUpdate)
    .delete('/api/newsletters/:id', controller.newsletterRemove)
}