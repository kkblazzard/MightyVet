const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/accreditations', controller.accreditationAll)
    .post('/api/accreditations', controller.accreditationNew)
    .get('/api/accreditations/:id', controller.accreditationDetails)
    .put('/api/accreditations/:id', controller.accreditationUpdate)
    .delete('/api/accreditations/:id', controller.accreditationRemove)
}