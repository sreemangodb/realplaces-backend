const express = require("express");
const router = express.Router();
const {deleteEnquiryById, getEnquiryByEmail, postEnquiry} = require('../controllers/enquiryController')

router.post('/',getEnquiryByEmail)
router.post('/post',postEnquiry)
router.post('/delete',deleteEnquiryById)



module.exports = router;