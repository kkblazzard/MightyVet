const controller=require('./controller');
module.exports=function(app){
    app
    .post('/api/speakers/imageupload', controller.speakerImageUpload)
    .post('/api/webinars/imageupload', controller.webinarImageUpload)
    .post('/api/users/imageupload', controller.userImageUpload)
}