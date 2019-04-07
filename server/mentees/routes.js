const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/mentees', controller.mentorAll)
    .get('/api/mentees/approvals', controller.mentorApprovals)
    .post('/api/mentees', controller.mentorNew)
    .get('/api/mentees/:id', controller.mentorDetails)
    .put('/api/mentees/:id', controller.mentorUpdate)
    .put('/api/mentees/decline_mentee/:id', controller.declineMentee)
    .put('/api/mentees/approve_mentee/:id', controller.approveMentee)
    .delete('/api/mentees/:id', controller.mentorRemove)
}