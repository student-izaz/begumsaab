const express = require('express');
const router = express.Router();


router.get('/byPrice/:price', filterByPrice);