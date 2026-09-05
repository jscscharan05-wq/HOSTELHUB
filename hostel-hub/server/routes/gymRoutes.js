const express = require('express');
const router = express.Router();
const gymController = require('../controllers/gymController');

// Gym Services Endpoints
router.get('/gym/occupancy', gymController.getGymOccupancy);
router.post('/gym/check-in', gymController.handleCheckIn);
router.post('/gym/issues', gymController.reportGymIssue);

// Cleaning Requests Endpoint
router.post('/room/cleaning-requests', gymController.createCleaningRequest);

module.exports = router;