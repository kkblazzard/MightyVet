const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/newsletters', controller.newsletterAll)
    .post('/api/newsletters', controller.newsletterNew)
    .get('/api/newsletters/email/:email', controller.newsletterDetails)
    .put('/api/newsletters/:id', controller.newsletterUpdate)
    .delete('/api/newsletters/:email', controller.newsletterRemove)
}