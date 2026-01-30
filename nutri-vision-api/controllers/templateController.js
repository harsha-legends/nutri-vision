const MealTemplate = require('../models/MealTemplate');

// @desc    Get all templates for a user
// @route   GET /api/templates
// @access  Private
exports.getTemplates = async (req, res) => {
  try {
    const { mealType, favorite } = req.query;
    
    const query = { user: req.user._id };
    
    if (mealType) {
      query.mealType = mealType;
    }
    
    if (favorite === 'true') {
      query.isFavorite = true;
    }
    
    const templates = await MealTemplate.find(query)
      .sort({ updatedAt: -1 })
      .lean();
    
    res.json({
      success: true,
      count: templates.length,
      templates,
    });
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch templates',
    });
  }
};

// @desc    Get single template
// @route   GET /api/templates/:id
// @access  Private
exports.getTemplate = async (req, res) => {
  try {
    const template = await MealTemplate.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    
    if (!template) {
      return res.status(404).json({
        success: false,
        error: 'Template not found',
      });
    }
    
    res.json({
      success: true,
      template,
    });
  } catch (error) {
    console.error('Error fetching template:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch template',
    });
  }
};

// @desc    Create new template
// @route   POST /api/templates
// @access  Private
exports.createTemplate = async (req, res) => {
  try {
    const { name, mealType, foods } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Template name is required',
      });
    }
    
    if (!foods || foods.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one food item is required',
      });
    }
    
    const template = await MealTemplate.create({
      user: req.user._id,
      name: name.trim(),
      mealType: mealType || 'breakfast',
      foods: foods.map(food => ({
        foodId: food.id || food.foodId,
        name: food.name,
        image: food.image,
        category: food.category,
        nutrition: food.nutrition || {},
        quantity: food.quantity || 1,
      })),
    });
    
    res.status(201).json({
      success: true,
      template,
    });
  } catch (error) {
    console.error('Error creating template:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create template',
    });
  }
};

// @desc    Update template
// @route   PUT /api/templates/:id
// @access  Private
exports.updateTemplate = async (req, res) => {
  try {
    const { name, mealType, foods, isFavorite } = req.body;
    
    let template = await MealTemplate.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    
    if (!template) {
      return res.status(404).json({
        success: false,
        error: 'Template not found',
      });
    }
    
    // Update fields
    if (name !== undefined) template.name = name.trim();
    if (mealType !== undefined) template.mealType = mealType;
    if (isFavorite !== undefined) template.isFavorite = isFavorite;
    if (foods !== undefined) {
      template.foods = foods.map(food => ({
        foodId: food.id || food.foodId,
        name: food.name,
        image: food.image,
        category: food.category,
        nutrition: food.nutrition || {},
        quantity: food.quantity || 1,
      }));
    }
    
    await template.save();
    
    res.json({
      success: true,
      template,
    });
  } catch (error) {
    console.error('Error updating template:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update template',
    });
  }
};

// @desc    Delete template
// @route   DELETE /api/templates/:id
// @access  Private
exports.deleteTemplate = async (req, res) => {
  try {
    const template = await MealTemplate.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    
    if (!template) {
      return res.status(404).json({
        success: false,
        error: 'Template not found',
      });
    }
    
    res.json({
      success: true,
      message: 'Template deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting template:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete template',
    });
  }
};

// @desc    Duplicate a template
// @route   POST /api/templates/:id/duplicate
// @access  Private
exports.duplicateTemplate = async (req, res) => {
  try {
    const originalTemplate = await MealTemplate.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    
    if (!originalTemplate) {
      return res.status(404).json({
        success: false,
        error: 'Template not found',
      });
    }
    
    const newTemplate = await MealTemplate.create({
      user: req.user._id,
      name: `${originalTemplate.name} (Copy)`,
      mealType: originalTemplate.mealType,
      foods: originalTemplate.foods,
      isFavorite: false,
    });
    
    res.status(201).json({
      success: true,
      template: newTemplate,
    });
  } catch (error) {
    console.error('Error duplicating template:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to duplicate template',
    });
  }
};

// @desc    Use a template (increment usage count and log meals)
// @route   POST /api/templates/:id/use
// @access  Private
exports.useTemplate = async (req, res) => {
  try {
    const template = await MealTemplate.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    
    if (!template) {
      return res.status(404).json({
        success: false,
        error: 'Template not found',
      });
    }
    
    // Update usage stats
    template.usageCount += 1;
    template.lastUsedAt = new Date();
    await template.save();
    
    res.json({
      success: true,
      template,
      message: 'Template used successfully',
    });
  } catch (error) {
    console.error('Error using template:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to use template',
    });
  }
};

// @desc    Toggle favorite status
// @route   PATCH /api/templates/:id/favorite
// @access  Private
exports.toggleFavorite = async (req, res) => {
  try {
    const template = await MealTemplate.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    
    if (!template) {
      return res.status(404).json({
        success: false,
        error: 'Template not found',
      });
    }
    
    template.isFavorite = !template.isFavorite;
    await template.save();
    
    res.json({
      success: true,
      template,
    });
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to toggle favorite',
    });
  }
};
