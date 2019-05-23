const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('./fileuploadservice');

module.exports = {
  speakerImageUpload(req, res) {
    const speakerUpload = multer({
      storage: multerS3({
        s3: s3,
        bucket: 'mightyvet-test',
        acl: 'private',
        metadata: function (req, file, cb) {
          cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
          cb(null, "images/speaker_images/"+Date.now().toString())
        }
      })
    });

    const speakerSingleUpload = speakerUpload.single('image');

    speakerSingleUpload(req, res, function(err, data) {
      if (err) {
        return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
      }
      if (req.file){
        return res.json({'imageUrl': req.file.location});
      }
      else{
        return res.json({'errors': {'picture' : {'message': "Please upload an image before saving."}}});
      }
    });
  },
  webinarImageUpload(req, res) {
    const webinarUpload = multer({
      storage: multerS3({
        s3: s3,
        bucket: 'mightyvet-test',
        acl: 'private',
        metadata: function (req, file, cb) {
          cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
          cb(null, "images/webinar_images/"+Date.now().toString())
        }
      })
    });

  const webinarSingleUpload = webinarUpload.single('image');
    
    webinarSingleUpload(req, res, function(err, data) {
      if (err) {
        return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
      }
      if (req.file){
        return res.json({'imageUrl': req.file.location});
      }
      else{
        return res.json({'errors': {'picture' : {'message': "Please upload an image before saving."}}});
      }
    });
  },
  userImageUpload(req, res) {
    const userUpload = multer({
      storage: multerS3({
        s3: s3,
        bucket: 'mightyvet-test',
        acl: 'private',
        metadata: function (req, file, cb) {
          cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
          cb(null, "images/profile_images/"+Date.now().toString())
        }
      })
    });
  
    const userSingleUpload = userUpload.single('image');

    userSingleUpload(req, res, function(err, data) {
      if (err) {
        return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
      }
      if (req.file){
        return res.json({'imageUrl': req.file.location});
      }
      else{
        return res.json({'errors': {'picture' : {'message': "Please upload an image before saving."}}});
      }
    });
  },
  partnerImageUpload(req, res) {

    const partnerUpload = multer({
      storage: multerS3({
        s3: s3,
        bucket: 'mightyvet-test',
        acl: 'private',
        metadata: function (req, file, cb) {
          cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
          cb(null, "images/partner_images/"+Date.now().toString())
        }
      })
    });

    const partnerSingleUpload = partnerUpload.single('image');

    partnerSingleUpload(req, res, function(err, data) {
      if (err) {
        return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
      } 
      if (req.file){
        return res.json({'imageUrl': req.file.location});
      }
      else{
        return res.json({'errors': {'picture' : {'message': "Please upload an image before saving."}}});
      }
    });
  }
}