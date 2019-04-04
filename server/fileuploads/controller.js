const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('./fileuploadservice');

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
  })

const speakerSingleUpload = speakerUpload.single('image')

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
  })

const webinarSingleUpload = webinarUpload.single('image')

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
  })

const userSingleUpload = userUpload.single('image')

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
})

const partnerSingleUpload = partnerUpload.single('image')
    
module.exports = {
  speakerImageUpload(req, res) {
      speakerSingleUpload(req, res, function(err, data) {
        if (err) {
          return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
        }
        console.log(res)
        return res.json({'imageUrl': req.file.location});
      });
  },
  webinarImageUpload(req, res) {
      webinarSingleUpload(req, res, function(err, data) {
        if (err) {
          return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
        }
        console.log(res)
        return res.json({'imageUrl': req.file.location});
      });
  },
  userImageUpload(req, res) {
      userSingleUpload(req, res, function(err, data) {
        if (err) {
          return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
        }
        console.log(res)
        return res.json({'imageUrl': req.file.location});
      });
  },
  partnerImageUpload(req, res) {
    partnerSingleUpload(req, res, function(err, data) {
      if (err) {
        return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
      }
      console.log(res)
      return res.json({'imageUrl': req.file.location});
    });
  }
}