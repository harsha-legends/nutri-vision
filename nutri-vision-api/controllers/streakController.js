const Meal = require('../models/Meal');

// Calculate user streaks (current, longest)
exports.getStreak = async (req, res) => {
  try {
    const meals = await Meal.find({ user: req.user.id }).sort({ date: 1 });
    if (!meals.length) return res.json({ success: true, data: { currentStreak: 0, longestStreak: 0, badges: [] } });
    // Build a set of unique meal days
  const days = [...new Set(meals.map(m => m.date.toISOString().slice(0,10)))].sort((a, b) => new Date(a) - new Date(b));
    let currentStreak = 1, longestStreak = 1, streak = 1;
    for (let i = 1; i < days.length; i++) {
      const prev = new Date(days[i-1]);
      const curr = new Date(days[i]);
      const diff = (curr - prev) / (1000*60*60*24);
      if (diff === 1) {
        streak++;
        if (streak > longestStreak) longestStreak = streak;
      } else if (diff > 1) {
        streak = 1;
      }
    }
    currentStreak = streak;
    // Example badges
    const badges = [];
    if (longestStreak >= 7) badges.push('7-day streak');
    if (longestStreak >= 30) badges.push('30-day streak');
    if (longestStreak >= 100) badges.push('100-day streak');
    res.json({ success: true, data: { currentStreak, longestStreak, badges } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
