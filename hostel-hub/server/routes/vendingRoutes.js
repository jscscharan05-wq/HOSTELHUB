const express = require('express');
const router = express.Router();
const vendingController = require('../controllers/vendingController');

// Vending Endpoints
router.get('/vending/floors/:floorId/items', vendingController.getVendingItemsByFloor);
router.post('/vending/reports', vendingController.reportVendingIssue);

// Floor Appliance Endpoints
router.get('/floors/:floorId/appliances', vendingController.getAppliancesByFloor);
router.post('/floors/:floorId/appliances/:applianceId/report', vendingController.reportApplianceIssue);

module.exports = router;