const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/gymData.json');

const readData = () => {
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(rawData);
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
};

const getCongestionLevel = (occupancy) => {
  if (occupancy < 10) return 'low';
  if (occupancy <= 22) return 'moderate';
  return 'peak';
};

// 1. GET /api/gym/occupancy
exports.getGymOccupancy = (req, res) => {
  try {
    const data = readData();
    const { currentOccupancy, maxCapacity, recommendedSlots } = data.gymState;
    const congestionLevel = getCongestionLevel(currentOccupancy);

    return res.status(200).json({
      currentOccupancy,
      maxCapacity,
      congestionLevel,
      recommendedSlots
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// 2. POST /api/gym/check-in
exports.handleCheckIn = (req, res) => {
  try {
    const { studentId, action } = req.body;

    if (!studentId || !['entry', 'exit'].includes(action)) {
      return res.status(400).json({
        success: false,
        message: 'studentId and valid action (entry/exit) are required.'
      });
    }

    const data = readData();
    let current = data.gymState.currentOccupancy;

    if (action === 'entry') {
      current = Math.min(data.gymState.maxCapacity, current + 1);
    } else if (action === 'exit') {
      current = Math.max(0, current - 1);
    }

    data.gymState.currentOccupancy = current;
    writeData(data);

    const congestionLevel = getCongestionLevel(current);

    return res.status(200).json({
      success: true,
      currentOccupancy: current,
      congestionLevel
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// 3. POST /api/gym/issues
exports.reportGymIssue = (req, res) => {
  try {
    const { studentId, equipmentName, severity, note } = req.body;

    if (!studentId || !equipmentName || !severity) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const ticketId = `GYM-${Math.floor(100 + Math.random() * 900)}`;
    const newIssue = {
      ticketId,
      studentId,
      equipmentName,
      severity,
      note: note || '',
      status: 'logged',
      createdAt: new Date().toISOString()
    };

    const data = readData();
    data.issues.push(newIssue);
    writeData(data);

    return res.status(201).json({
      success: true,
      ticketId,
      status: 'logged'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// 4. POST /api/room/cleaning-requests
exports.createCleaningRequest = (req, res) => {
  try {
    const { studentId, roomNumber, floor, type, requestedSlot, serviceDetails } = req.body;

    if (!studentId || !roomNumber || !floor || !type || !requestedSlot) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const requestId = `CLN-${Math.floor(1000 + Math.random() * 9000)}`;
    const scheduledFor = new Date().toISOString();

    const newRequest = {
      requestId,
      studentId,
      roomNumber,
      floor,
      type,
      requestedSlot,
      serviceDetails: serviceDetails || '',
      status: 'scheduled',
      scheduledFor
    };

    const data = readData();
    data.cleaningRequests.push(newRequest);
    writeData(data);

    return res.status(201).json({
      success: true,
      requestId,
      status: 'scheduled',
      scheduledFor
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};