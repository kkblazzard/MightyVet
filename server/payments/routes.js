const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/doner', controller.donerAll)
    .post('/api/doner', controller.donerAdd)
    .get('/api/doner/:id', controller.donerDetails)
    .put('/api/doner/:id', controller.donerUpdate)
    .delete('/api/doner/:id', controller.donerRemove)
    .post('/api/doner/payment',controller.donerPayments)
}