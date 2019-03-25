const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/mentorsearches', controller.mentorSearchAll)
    .post('/api/mentorsearches', controller.mentorSearchNew)
    .get('/api/mentorsearches/:id', controller.mentorSearchDetails)
    .put('/api/mentorsearches/:id', controller.mentorSearchUpdate)
    .delete('/api/mentorsearches/:id', controller.mentorSearchRemove)
}