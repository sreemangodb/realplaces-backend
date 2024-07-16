const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Function to create upload directory if not exists
const createUploadsDir = () => {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
};

// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        createUploadsDir(); // Ensure upload directory exists
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Init upload for single file
const uploadSingle = multer({
    storage: storage, // 5MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');

// Init upload for multiple files
const uploadMultiple = multer({
    storage: storage,// 5MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).array('images', 10); // Up to 10 images

module.exports = {
    uploadSingle,
    uploadMultiple
};
