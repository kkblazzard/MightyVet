module.exports=function(app){
    app.post('/api/doner/payment',require('./controller'))
}