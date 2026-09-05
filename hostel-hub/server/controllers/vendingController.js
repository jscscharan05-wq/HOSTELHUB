let vendingItems = require('../data/vendingData.json');
let appliances = require('../data/appliancesData.json');
let reports = [];

// GET /api/vending/floors/:floorId/items
exports.getVendingItemsByFloor = (req, res) => {
  const floorId = parseInt(req.params.floorId, 10);
  const items = vendingItems.filter((item) => item.floor === floorId);
  return res.status(200).json(items);
};

// POST /api/vending/reports
exports.reportVendingIssue = (req, res) => {
  const { studentId, floor, issueCategory, transactionId, description } = req.body;

  const newReport = {
    ticketId: `VEND-${Math.floor(1000 + Math.random() * 9000)}`,
    studentId,
    floor,
    issueCategory,
    transactionId,
    description,
    status: 'pending_review',
    createdAt: new Date().toISOString()
  };

  reports.push(newReport);

  return res.status(201).json({
    success: true,
    ticketId: newReport.ticketId,
    status: newReport.status,
    createdAt: newReport.createdAt
  });
};

// GET /api/floors/:floorId/appliances
exports.getAppliancesByFloor = (req, res) => {
  const floorId = parseInt(req.params.floorId, 10);
  const floorAppliances = appliances.filter((app) => app.floor === floorId);
  return res.status(200).json(floorAppliances);
};

// POST /api/floors/:floorId/appliances/:applianceId/report
exports.reportApplianceIssue = (req, res) => {
  const floorId = parseInt(req.params.floorId, 10);
  const { applianceId } = req.params;

  const appliance = appliances.find(
    (app) => app.floor === floorId && app.applianceId === applianceId
  );

  if (appliance) {
    appliance.isWorking = false;
  }

  return res.status(200).json({
    success: true,
    status: 'flagged_for_maintenance'
  });
};