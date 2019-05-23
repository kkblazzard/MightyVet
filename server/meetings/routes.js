const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/meetings', controller.meetingAll)
    .post('/api/meetings/:id', controller.meetingNew)
    .get('/api/meetings/mentor/:id', controller.mentorMeetings)
    .get('/api/meetings/mentee/:id', controller.menteeMeetings)
    .put('/api/meetings/:id', controller.meetingUpdate)
    .put('/api/meetings/changetime/:id', controller.updateTime)
    .put('/api/meetings/signup/:id', controller.meetingSignUp)
    .put('/api/meetings/cancel/:id', controller.cancelMeeting)
    .delete('/api/meetings/:id', controller.meetingRemove)
}