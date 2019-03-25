const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/mentors', controller.mentorAll)
    .post('/api/mentors', controller.mentorNew)
    .get('/api/mentors/:id', controller.mentorDetails)
    .put('/api/mentors/:id', controller.mentorUpdate)
    .delete('/api/mentors/:id', controller.mentorRemove)
}