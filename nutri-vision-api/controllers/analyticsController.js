const Meal = require('../models/Meal');
const Goal = require('../models/Goal');

// @desc    Get weekly analytics
// @route   GET /api/analytics/weekly
exports.getWeeklyAnalytics = async (req, res) => {
  try {
    const today = new Date();
    const weekAgo = new Date(today); weekAgo.setDate(weekAgo.getDate() - 7);

    const meals = await Meal.find({ user: req.user.id, date: { $gte: weekAgo, $lte: today } });

    const dailyData = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date(today); date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dailyData[dateStr] = { date: dateStr, calories: 0, protein: 0, carbs: 0, fat: 0, mealCount: 0 };
    }

    meals.forEach(meal => {
      const dateStr = meal.date.toISOString().split('T')[0];
      if (dailyData[dateStr]) {
        dailyData[dateStr].calories += meal.nutritionConsumed.calories;
        dailyData[dateStr].protein += meal.nutritionConsumed.protein;
        dailyData[dateStr].carbs += meal.nutritionConsumed.carbohydrates;
        dailyData[dateStr].fat += meal.nutritionConsumed.fat;
        dailyData[dateStr].mealCount++;
      }
    });

    const chartData = Object.values(dailyData).reverse();
    const avgCalories = chartData.reduce((sum, d) => sum + d.calories, 0) / 7;

    res.json({
      success: true,
      data: {
        chartData,
        averages: {
          calories: Math.round(avgCalories),
          protein: Math.round(chartData.reduce((sum, d) => sum + d.protein, 0) / 7 * 10) / 10,
          carbs: Math.round(chartData.reduce((sum, d) => sum + d.carbs, 0) / 7 * 10) / 10,
          fat: Math.round(chartData.reduce((sum, d) => sum + d.fat, 0) / 7 * 10) / 10
        },
        totalMeals: meals.length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get monthly analytics
// @route   GET /api/analytics/monthly
exports.getMonthlyAnalytics = async (req, res) => {
  try {
    const { month, year } = req.query;
    const targetMonth = month ? parseInt(month) - 1 : new Date().getMonth();
    const targetYear = year ? parseInt(year) : new Date().getFullYear();

    const startDate = new Date(targetYear, targetMonth, 1);
    const endDate = new Date(targetYear, targetMonth + 1, 0, 23, 59, 59);

    const meals = await Meal.find({ user: req.user.id, date: { $gte: startDate, $lte: endDate } });

    const totals = {
      calories: meals.reduce((sum, m) => sum + m.nutritionConsumed.calories, 0),
      protein: meals.reduce((sum, m) => sum + m.nutritionConsumed.protein, 0),
      carbs: meals.reduce((sum, m) => sum + m.nutritionConsumed.carbohydrates, 0),
      fat: meals.reduce((sum, m) => sum + m.nutritionConsumed.fat, 0),
      mealCount: meals.length
    };

    res.json({
      success: true,
      data: {
        month: targetMonth + 1,
        year: targetYear,
        totals,
        dailyAverage: {
          calories: Math.round(totals.calories / endDate.getDate()),
          protein: Math.round(totals.protein / endDate.getDate() * 10) / 10,
          carbs: Math.round(totals.carbs / endDate.getDate() * 10) / 10,
          fat: Math.round(totals.fat / endDate.getDate() * 10) / 10
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get goal progress analytics
// @route   GET /api/analytics/goals
exports.getGoalAnalytics = async (req, res) => {
  try {
    const goal = await Goal.findOne({ user: req.user.id, isActive: true });
    if (!goal) return res.status(404).json({ success: false, message: 'No active goal found' });

    const today = new Date(); today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);

    const todayMeals = await Meal.find({ user: req.user.id, date: { $gte: today, $lt: tomorrow } });

    const consumed = {
      calories: todayMeals.reduce((sum, m) => sum + m.nutritionConsumed.calories, 0),
      protein: todayMeals.reduce((sum, m) => sum + m.nutritionConsumed.protein, 0),
      carbs: todayMeals.reduce((sum, m) => sum + m.nutritionConsumed.carbohydrates, 0),
      fat: todayMeals.reduce((sum, m) => sum + m.nutritionConsumed.fat, 0)
    };

    const progress = {
      calories: { target: goal.dailyCalories, consumed: consumed.calories, remaining: goal.dailyCalories - consumed.calories, percentage: Math.min(100, Math.round((consumed.calories / goal.dailyCalories) * 100)) },
      protein: { target: goal.dailyProtein, consumed: consumed.protein, remaining: goal.dailyProtein - consumed.protein, percentage: Math.min(100, Math.round((consumed.protein / goal.dailyProtein) * 100)) },
      carbs: { target: goal.dailyCarbs, consumed: consumed.carbs, remaining: goal.dailyCarbs - consumed.carbs, percentage: Math.min(100, Math.round((consumed.carbs / goal.dailyCarbs) * 100)) },
      fat: { target: goal.dailyFat, consumed: consumed.fat, remaining: goal.dailyFat - consumed.fat, percentage: Math.min(100, Math.round((consumed.fat / goal.dailyFat) * 100)) }
    };

    res.json({
      success: true,
      data: {
        goal: { type: goal.goalType, targetWeight: goal.targetWeight, startDate: goal.startDate, targetDate: goal.targetDate },
        todayProgress: progress,
        historicalProgress: goal.progress.slice(-30)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get macro breakdown
// @route   GET /api/analytics/macros
exports.getMacroBreakdown = async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const endDate = new Date();
    const startDate = new Date(); startDate.setDate(startDate.getDate() - parseInt(days));

    const meals = await Meal.find({ user: req.user.id, date: { $gte: startDate, $lte: endDate } });

    const totals = {
      protein: meals.reduce((sum, m) => sum + m.nutritionConsumed.protein, 0),
      carbs: meals.reduce((sum, m) => sum + m.nutritionConsumed.carbohydrates, 0),
      fat: meals.reduce((sum, m) => sum + m.nutritionConsumed.fat, 0)
    };
    const totalMacros = totals.protein + totals.carbs + totals.fat;

    res.json({
      success: true,
      data: {
        totals,
        percentages: {
          protein: totalMacros > 0 ? Math.round((totals.protein / totalMacros) * 100) : 0,
          carbs: totalMacros > 0 ? Math.round((totals.carbs / totalMacros) * 100) : 0,
          fat: totalMacros > 0 ? Math.round((totals.fat / totalMacros) * 100) : 0
        },
        caloriesFromMacros: { protein: totals.protein * 4, carbs: totals.carbs * 4, fat: totals.fat * 9 }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
