const multer = require("multer");
const path = require('path');
const mongoose = require('mongoose');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/profiles/")
    },
    filename: function (req, file, cb) {
        
        const imageId = new mongoose.Types.ObjectId();
        const ext = path.extname(file.originalname);
        cb(null, `${imageId}${ext}`);
    }
});

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("ERROR: Image only(jpeg, jpg, png)");
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

module.exports = upload;