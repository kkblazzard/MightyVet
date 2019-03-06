const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/meetings', controller.meetingAll)
    .post('/api/meetings', controller.meetingNew)
    .get('/api/meetings/:id', controller.meetingDetails)
    .put('/api/meetings/:id', controller.meetingUpdate)
    .delete('/api/meetings/:id', controller.meetingRemove)
}