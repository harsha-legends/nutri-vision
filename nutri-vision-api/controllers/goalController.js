const Goal = require('../models/Goal');

// @desc    Create goal
// @route   POST /api/goals
exports.createGoal = async (req, res) => {
  try {
    await Goal.updateMany({ user: req.user.id, isActive: true }, { isActive: false });
    const goal = await Goal.create({ user: req.user.id, ...req.body });
    res.status(201).json({ success: true, data: goal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get active goal
// @route   GET /api/goals/active
exports.getActiveGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({ user: req.user.id, isActive: true });
    if (!goal) return res.status(404).json({ success: false, message: 'No active goal found' });
    res.json({ success: true, data: goal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all goals
// @route   GET /api/goals
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort('-createdAt');
    res.json({ success: true, count: goals.length, data: goals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update goal
// @route   PUT /api/goals/:id
exports.updateGoal = async (req, res) => {
  try {
    let goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ success: false, message: 'Goal not found' });
    if (goal.user.toString() !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });

    goal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, data: goal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Log daily progress
// @route   POST /api/goals/:id/progress
exports.logProgress = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ success: false, message: 'Goal not found' });
    if (goal.user.toString() !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });

    goal.progress.push({
      date: req.body.date || new Date(),
      weight: req.body.weight,
      caloriesConsumed: req.body.caloriesConsumed,
      proteinConsumed: req.body.proteinConsumed,
      carbsConsumed: req.body.carbsConsumed,
      fatConsumed: req.body.fatConsumed,
      waterGlasses: req.body.waterGlasses,
      exerciseMinutes: req.body.exerciseMinutes,
      notes: req.body.notes
    });
    await goal.save();
    res.json({ success: true, data: goal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ success: false, message: 'Goal not found' });
    if (goal.user.toString() !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });
    await goal.deleteOne();
    res.json({ success: true, message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
