const Food = require('../models/Food');

// @desc    Get all foods with filters
// @route   GET /api/foods
exports.getFoods = async (req, res) => {
  try {
    const { category, subCategory, search, page = 1, limit = 20, sort = '-createdAt', isPopular, minCalories, maxCalories } = req.query;
    const query = {};

    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;
    if (isPopular === 'true') query.isPopular = true;
    if (minCalories || maxCalories) {
      query['nutrition.calories'] = {};
      if (minCalories) query['nutrition.calories'].$gte = Number(minCalories);
      if (maxCalories) query['nutrition.calories'].$lte = Number(maxCalories);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { nameHindi: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const startIndex = (Number(page) - 1) * Number(limit);
    const total = await Food.countDocuments(query);
    const foods = await Food.find(query).sort(sort).skip(startIndex).limit(Number(limit));

    res.json({
      success: true,
      count: foods.length,
      total,
      pages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      data: foods
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single food
// @route   GET /api/foods/:id
exports.getFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ success: false, message: 'Food not found' });
    res.json({ success: true, data: food });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get food categories
// @route   GET /api/foods/categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Food.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 }, subCategories: { $addToSet: '$subCategory' } } },
      { $project: { category: '$_id', count: 1, subCategories: { $filter: { input: '$subCategories', as: 'sub', cond: { $ne: ['$$sub', ''] } } }, _id: 0 } },
      { $sort: { category: 1 } }
    ]);
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get popular foods
// @route   GET /api/foods/popular
exports.getPopularFoods = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const foods = await Food.find({ isPopular: true }).limit(Number(limit)).sort('-healthScore');
    res.json({ success: true, count: foods.length, data: foods });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Search foods
// @route   GET /api/foods/search
exports.searchFoods = async (req, res) => {
  try {
    const { q, limit = 20 } = req.query;
    if (!q) return res.status(400).json({ success: false, message: 'Please provide a search query' });

    const foods = await Food.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { nameHindi: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ]
    }).limit(Number(limit));

    res.json({ success: true, count: foods.length, data: foods });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get food by barcode
// @route   GET /api/foods/barcode/:code
exports.getFoodByBarcode = async (req, res) => {
  try {
    const food = await Food.findOne({ barcode: req.params.code });
    if (!food) return res.status(404).json({ success: false, message: 'Food not found with this barcode' });
    res.json({ success: true, data: food });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
