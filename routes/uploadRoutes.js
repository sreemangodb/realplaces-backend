const express = require('express');
const router = express.Router();
const { uploadSingle, uploadMultiple } = require('../config/multerConfig');
const path = require('path');
const fs = require('fs');
const config = require("../config/config")

// Function to create upload directory if not exists
const createUploadsDir = () => {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
};

// Upload single image route
router.post('/', (req, res) => {
    uploadSingle(req, res, (err) => {
        if (err) {
            res.status(400).json({ message: err });
        } else {
            if (req.file == undefined) {
                res.status(400).json({ message: 'No file selected!' });
            } else {
                res.status(200).json({
                    message: 'File uploaded successfully!',
                    imageUrl: `${config.base_url}/uploads/${req.file.filename}`
                });
            }
        }
    });
});

// Upload multiple images route
router.post('/multiple', (req, res) => {
    createUploadsDir(); // Ensure upload directory exists
    uploadMultiple(req, res, (err) => {
        if (err) {
            res.status(400).json({ message: err });
        } else {
            if (req.files.length === 0) {
                res.status(400).json({ message: 'No files selected!' });
            } else {
                const fileUrls = req.files.map(file => `${config.base_url}/uploads/${file.filename}`);
                res.status(200).json({
                    message: 'Files uploaded successfully!',
                    imageUrls: fileUrls
                });
            }
        }
    });
});

module.exports = router;
