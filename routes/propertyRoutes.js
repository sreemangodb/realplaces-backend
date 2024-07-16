const express = require("express");
const router = express.Router();
const {getTopProperty, getOnePropertyById, inecreaseViewById, createProperty, getAllProperty, districtCity,getPropertyCountByDistrictCity, getPropertiesByDateUploadAscending,getPropertiesByDistrictCityAndType } = require("../controllers/propertyController");


router.get('/',getAllProperty);
router.get('/top-projects',getTopProperty);
router.post('/',createProperty);
router.get('/district-city',districtCity);
router.post('/district-city',getPropertyCountByDistrictCity);
router.get('/property-date',getPropertiesByDateUploadAscending);
router.get('/property-list-type-location',getPropertiesByDistrictCityAndType);
router.post('/oneById',getOnePropertyById);
router.put('/increase-view',inecreaseViewById);




module.exports = router;