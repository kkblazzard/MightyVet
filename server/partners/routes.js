const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/partners', controller.partnerAll)
    .post('/api/partners', controller.partnerNew)
    .get('/api/partners/:id', controller.partnerDetails)
    .put('/api/partners/:id', controller.partnerUpdate)
    .delete('/api/partners/:id', controller.partnerRemove)
}