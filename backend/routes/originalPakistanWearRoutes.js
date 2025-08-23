const express = require("express");
const router = express.Router(); 
const getOriginalPakistanWear  = require('../controllers/originalPakistanWearController');


router.get("/original-pakistani-suits", getOriginalPakistanWear );

module.exports = router;