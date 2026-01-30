const ScanHistory = require('../models/ScanHistory');

// Save a new scan to history
exports.saveScan = async (req, res) => {
  try {
    const { image, thumbnail, analysis, hint } = req.body;

    if (!image || !analysis) {
      return res.status(400).json({
        success: false,
        message: 'Image and analysis data are required',
      });
    }

    const scanHistory = new ScanHistory({
      user: req.user._id,
      image,
      thumbnail: thumbnail || image, // Use full image if no thumbnail provided
      analysis,
      hint: hint || '',
    });

    await scanHistory.save();

    res.status(201).json({
      success: true,
      message: 'Scan saved to history',
      data: scanHistory,
    });
  } catch (error) {
    console.error('Error saving scan history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save scan history',
      error: error.message,
    });
  }
};

// Get all scans for the current user
exports.getScanHistory = async (req, res) => {
  try {
    const { page = 1, limit = 20, startDate, endDate } = req.query;

    const query = { user: req.user._id };

    // Date filtering
    if (startDate || endDate) {
      query.scannedAt = {};
      if (startDate) query.scannedAt.$gte = new Date(startDate);
      if (endDate) query.scannedAt.$lte = new Date(endDate);
    }

    const scans = await ScanHistory.find(query)
      .sort({ scannedAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select('-image') // Exclude full image for list view, use thumbnail
      .lean();

    const total = await ScanHistory.countDocuments(query);

    res.json({
      success: true,
      data: scans,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching scan history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch scan history',
      error: error.message,
    });
  }
};

// Get a single scan with full image
exports.getScanById = async (req, res) => {
  try {
    const { id } = req.params;

    const scan = await ScanHistory.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: 'Scan not found',
      });
    }

    res.json({
      success: true,
      data: scan,
    });
  } catch (error) {
    console.error('Error fetching scan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch scan',
      error: error.message,
    });
  }
};

// Delete a scan from history
exports.deleteScan = async (req, res) => {
  try {
    const { id } = req.params;

    const scan = await ScanHistory.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: 'Scan not found',
      });
    }

    res.json({
      success: true,
      message: 'Scan deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting scan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete scan',
      error: error.message,
    });
  }
};

// Update scan (e.g., mark as added to meal)
exports.updateScan = async (req, res) => {
  try {
    const { id } = req.params;
    const { addedToMeal, mealType } = req.body;

    const scan = await ScanHistory.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { addedToMeal, mealType },
      { new: true }
    );

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: 'Scan not found',
      });
    }

    res.json({
      success: true,
      message: 'Scan updated successfully',
      data: scan,
    });
  } catch (error) {
    console.error('Error updating scan:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update scan',
      error: error.message,
    });
  }
};

// Get scan statistics
exports.getScanStats = async (req, res) => {
  try {
    const stats = await ScanHistory.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: null,
          totalScans: { $sum: 1 },
          avgCalories: { $avg: '$analysis.calories' },
          avgProtein: { $avg: '$analysis.protein' },
          avgCarbs: { $avg: '$analysis.carbs' },
          avgFat: { $avg: '$analysis.fat' },
          healthyCount: {
            $sum: { $cond: ['$analysis.isHealthy', 1, 0] },
          },
        },
      },
    ]);

    const categoryStats = await ScanHistory.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: '$analysis.foodCategory',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      success: true,
      data: {
        overview: stats[0] || {
          totalScans: 0,
          avgCalories: 0,
          avgProtein: 0,
          avgCarbs: 0,
          avgFat: 0,
          healthyCount: 0,
        },
        topCategories: categoryStats,
      },
    });
  } catch (error) {
    console.error('Error fetching scan stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch scan statistics',
      error: error.message,
    });
  }
};
