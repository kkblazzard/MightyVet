const controller=require('./controller');
module.exports=function(app){
    app
    .post('/api/imageupload', controller.imageUpload)
}