
const upload = require('./fileuploadservice')

const singleUpload = upload.single('image')

module.exports = {
    imageUpload(req, res) {
        singleUpload(req, res, function(err, data) {
          if (err) {
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
          }
          return res.json({'imageUrl': req.file.location});
        });
    },
    getSpeakerImage(req, res) {
        
    }
}