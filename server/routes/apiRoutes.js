const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// 1. User Location
router.post('/location', apiController.getLocation);

// 2. Crowd Data
router.get('/crowd', apiController.getCrowdData); // Intentionally GET for simple polling

// 3. Route Calculation
router.post('/route', apiController.calculateRoute);

// 4. AI Response
router.post('/ai', apiController.getAiResponse);

// 5. Combined Smart Response
router.post('/smart-route', apiController.getSmartRoute);

module.exports = router;
