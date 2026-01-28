const Food = require('../models/Food');

// Mock image analysis: match food by keywords in imageName (simulate AI)
exports.analyzeFoodImage = async (req, res) => {
  try {
    const { image, imageName } = req.body;
    if (!image) return res.status(400).json({ success: false, message: 'Image required' });
    // For now, use imageName or fallback to 'unknown'
    let matches = [];
    if (imageName) {
      const q = imageName.toLowerCase();
      matches = await Food.find({
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { tags: { $in: [new RegExp(q, 'i')] } }
        ]
      }).limit(5);
    }
    // If no matches, return random foods
    if (!matches.length) {
      matches = await Food.aggregate([{ $sample: { size: 3 } }]);
    }
    res.json({ success: true, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
