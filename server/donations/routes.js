const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/donations', controller.donationAll)
    .post('/api/donations', controller.donationNew)
    .get('/api/donations/:id', controller.donationDetails)
    .put('/api/donations/:id', controller.donationUpdate)
    .delete('/api/donations/:id', controller.donationRemove)
}