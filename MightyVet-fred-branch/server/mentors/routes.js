const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/mentors', controller.mentorAll)
    .get('/api/mentors/approvals', controller.mentorApprovals)
    .post('/api/mentors', controller.mentorNew)
    .get('/api/mentors/:id', controller.mentorDetails)
    .put('/api/mentors/:id', controller.mentorUpdate)
    .put('/api/mentors/signup/:id', controller.signUp)
    .put('/api/mentors/decline_mentee/:id', controller.declineMentee)
    .put('/api/mentors/approve_mentee/:id', controller.approveMentee)
    .delete('/api/mentors/:id', controller.mentorRemove)
}