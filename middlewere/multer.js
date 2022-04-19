const multer = require('multer');
const path = require('path');
 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, './public')
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }

})

const upload = multer({ storage: storage }).single('file');

const file = async (req, res, next) => {
    upload(req, res, (err) => {
        if (err) console.log(err)
        next();

    })
}
module.exports = file;

