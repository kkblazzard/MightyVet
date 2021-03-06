const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/meetings', controller.meetingAll)
    .post('/api/meetings', controller.meetingNew)
    .get('/api/meetings/mentor/:id', controller.mentorMeetings)
    .get('/api/meetings/mentee/:id', controller.menteeMeetings)
    .put('/api/meetings/:id', controller.meetingUpdate)
    .delete('/api/meetings/:id', controller.meetingRemove)
}