const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('./fileuploadservice');

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'mightyvet-test',
      acl: 'private',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, "speaker_images/"+Date.now().toString())
      }
    })
  })

const singleUpload = upload.single('image')
    
module.exports = {
    imageUpload(req, res) {
        singleUpload(req, res, function(err, data) {
          if (err) {
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
          }
          console.log(res)
          return res.json({'imageUrl': req.file.location});
        });
    },
}