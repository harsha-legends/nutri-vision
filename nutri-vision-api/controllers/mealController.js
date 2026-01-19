const Meal = require('../models/Meal');
const Food = require('../models/Food');

// @desc    Log a meal
// @route   POST /api/meals
exports.logMeal = async (req, res) => {
  try {
    const { foodId, mealType, quantity = 1, servingSize, date, notes, isScanned, scannedImage } = req.body;

    const food = await Food.findById(foodId);
    if (!food) return res.status(404).json({ success: false, message: 'Food not found' });

    const multiplier = (quantity * (servingSize?.amount || 100)) / 100;
    const nutritionConsumed = {
      calories: Math.round(food.nutrition.calories * multiplier),
      protein: Math.round(food.nutrition.protein * multiplier * 10) / 10,
      carbohydrates: Math.round(food.nutrition.carbohydrates * multiplier * 10) / 10,
      fat: Math.round(food.nutrition.fat * multiplier * 10) / 10,
      fiber: Math.round(food.nutrition.fiber * multiplier * 10) / 10,
      sugar: Math.round(food.nutrition.sugar * multiplier * 10) / 10,
      sodium: Math.round(food.nutrition.sodium * multiplier)
    };

    const meal = await Meal.create({
      user: req.user.id,
      food: foodId,
      mealType,
      quantity,
      servingSize: servingSize || food.servingSize,
      date: date || new Date(),
      nutritionConsumed,
      notes,
      isScanned,
      scannedImage
    });

    await meal.populate('food', 'name image category nutrition');
    res.status(201).json({ success: true, data: meal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get meals for a date
// @route   GET /api/meals
exports.getMeals = async (req, res) => {
  try {
    const { date, startDate, endDate, mealType } = req.query;
    const query = { user: req.user.id };

    if (date) {
      const dayStart = new Date(date); dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date); dayEnd.setHours(23, 59, 59, 999);
      query.date = { $gte: dayStart, $lte: dayEnd };
    } else if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (mealType) query.mealType = mealType;

    const meals = await Meal.find(query).populate('food', 'name image category nutrition servingSize').sort({ date: -1, mealType: 1 });

    const groupedMeals = { breakfast: [], lunch: [], dinner: [], snack: [] };
    const totals = { calories: 0, protein: 0, carbohydrates: 0, fat: 0, fiber: 0 };

    meals.forEach(meal => {
      groupedMeals[meal.mealType].push(meal);
      totals.calories += meal.nutritionConsumed.calories;
      totals.protein += meal.nutritionConsumed.protein;
      totals.carbohydrates += meal.nutritionConsumed.carbohydrates;
      totals.fat += meal.nutritionConsumed.fat;
      totals.fiber += meal.nutritionConsumed.fiber;
    });

    res.json({ success: true, count: meals.length, totals, data: groupedMeals, allMeals: meals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single meal
// @route   GET /api/meals/:id
exports.getMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id).populate('food');
    if (!meal) return res.status(404).json({ success: false, message: 'Meal not found' });
    if (meal.user.toString() !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });
    res.json({ success: true, data: meal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update meal
// @route   PUT /api/meals/:id
exports.updateMeal = async (req, res) => {
  try {
    let meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ success: false, message: 'Meal not found' });
    if (meal.user.toString() !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });

    const { quantity, servingSize } = req.body;
    if (quantity || servingSize) {
      const food = await Food.findById(meal.food);
      const newQty = quantity || meal.quantity;
      const newServing = servingSize || meal.servingSize;
      const multiplier = (newQty * newServing.amount) / 100;
      req.body.nutritionConsumed = {
        calories: Math.round(food.nutrition.calories * multiplier),
        protein: Math.round(food.nutrition.protein * multiplier * 10) / 10,
        carbohydrates: Math.round(food.nutrition.carbohydrates * multiplier * 10) / 10,
        fat: Math.round(food.nutrition.fat * multiplier * 10) / 10,
        fiber: Math.round(food.nutrition.fiber * multiplier * 10) / 10,
        sugar: Math.round(food.nutrition.sugar * multiplier * 10) / 10,
        sodium: Math.round(food.nutrition.sodium * multiplier)
      };
    }

    meal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('food', 'name image category nutrition');
    res.json({ success: true, data: meal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete meal
// @route   DELETE /api/meals/:id
exports.deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ success: false, message: 'Meal not found' });
    if (meal.user.toString() !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });
    await meal.deleteOne();
    res.json({ success: true, message: 'Meal deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get today's summary
// @route   GET /api/meals/today/summary
exports.getTodaySummary = async (req, res) => {
  try {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);

    const meals = await Meal.find({ user: req.user.id, date: { $gte: today, $lt: tomorrow } }).populate('food', 'name image category');

    const summary = {
      totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0, totalFiber: 0,
      mealCount: meals.length,
      byMealType: { breakfast: { count: 0, calories: 0 }, lunch: { count: 0, calories: 0 }, dinner: { count: 0, calories: 0 }, snack: { count: 0, calories: 0 } }
    };

    meals.forEach(meal => {
      summary.totalCalories += meal.nutritionConsumed.calories;
      summary.totalProtein += meal.nutritionConsumed.protein;
      summary.totalCarbs += meal.nutritionConsumed.carbohydrates;
      summary.totalFat += meal.nutritionConsumed.fat;
      summary.totalFiber += meal.nutritionConsumed.fiber;
      summary.byMealType[meal.mealType].count++;
      summary.byMealType[meal.mealType].calories += meal.nutritionConsumed.calories;
    });

    res.json({ success: true, data: summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
