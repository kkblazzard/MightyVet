const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/speakers', controller.speakerAll)
    .post('/api/speakers', controller.speakerNew)
    .get('/api/speakers/:id', controller.speakerDetails)
    .put('/api/speakers/:id', controller.speakerUpdate)
    .put('/api/speakers/addweb/:speaker_id/', controller.speakerWebinar)
    .delete('/api/speakers/:id', controller.speakerRemove)
}