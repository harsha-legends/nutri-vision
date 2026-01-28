const Water = require('../models/Water');

// Log water intake (add or update for a day)
exports.logWater = async (req, res) => {
  try {
    const { date, glasses } = req.body;
    if (!date || typeof glasses !== 'number') {
      return res.status(400).json({ success: false, message: 'Date and glasses required' });
    }
    const day = new Date(date); day.setHours(0,0,0,0);
    const water = await Water.findOneAndUpdate(
      { user: req.user.id, date: day },
      { $set: { glasses } },
      { upsert: true, new: true }
    );
    res.json({ success: true, data: water });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get water intake for a date or range
exports.getWater = async (req, res) => {
  try {
    const { date, startDate, endDate } = req.query;
    let query = { user: req.user.id };
    if (date) {
      const day = new Date(date); day.setHours(0,0,0,0);
      query.date = day;
    } else if (startDate && endDate) {
      const start = new Date(startDate); start.setHours(0,0,0,0);
      const end = new Date(endDate); end.setHours(23,59,59,999);
      query.date = { $gte: start, $lte: end };
    }
    const waterLogs = await Water.find(query).sort({ date: 1 });
    res.json({ success: true, data: waterLogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
