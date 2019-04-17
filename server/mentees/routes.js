const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/mentees', controller.menteeAll)
    .post('/api/mentees', controller.menteeNew)
    .get('/api/mentees/:id', controller.menteeDetails)
    .put('/api/mentees/:id', controller.menteeUpdate)
    .put('/api/mentees/decline_mentee/:id', controller.declineMentee)
    .put('/api/mentees/approve_mentee/:id', controller.approveMentee)
    .delete('/api/mentees/:id', controller.menteeRemove)
}