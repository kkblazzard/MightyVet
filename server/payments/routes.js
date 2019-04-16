const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/donor', controller.donorAll)
    .post('/api/donor', controller.donorAdd)
    .get('/api/donor/:id', controller.donorDetails)
    .put('/api/donor/:id', controller.donorUpdate)
    .delete('/api/donor/:id', controller.donorRemove)
    .post('/api/donor/payment',controller.donorPayments)
}