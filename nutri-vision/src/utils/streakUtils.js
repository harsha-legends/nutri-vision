// Streak and Achievement Utilities

export const calculateStreak = (mealHistory) => {
  if (!mealHistory || mealHistory.length === 0) return 0;

  let streak = 0;
  const today = new Date().toDateString();
  let currentDate = new Date();

  // Check if user logged today
  const todayLogs = mealHistory.filter(
    (meal) => new Date(meal.date).toDateString() === today
  );
  
  if (todayLogs.length === 0) return 0;

  // Count consecutive days backwards
  while (true) {
    const dateStr = currentDate.toDateString();
    const hasLog = mealHistory.some(
      (meal) => new Date(meal.date).toDateString() === dateStr
    );

    if (!hasLog) break;
    
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
};

export const getAchievements = (totals, goals, streak, mealHistory) => {
  const achievements = [];

  // Calorie achievements
  if (totals.calories >= goals.calories) {
    achievements.push({
      id: 'calorie_goal',
      title: 'Calorie Champion',
      description: 'Reached daily calorie goal',
      icon: '🎯',
      color: '#ef4444',
    });
  }

  // Protein achievements
  if (totals.protein >= goals.protein) {
    achievements.push({
      id: 'protein_power',
      title: 'Protein Power',
      description: 'Hit protein target',
      icon: '💪',
      color: '#3b82f6',
    });
  }

  // Streak achievements
  if (streak >= 7) {
    achievements.push({
      id: 'week_warrior',
      title: 'Week Warrior',
      description: '7-day logging streak',
      icon: '🔥',
      color: '#f59e0b',
    });
  }

  if (streak >= 30) {
    achievements.push({
      id: 'monthly_master',
      title: 'Monthly Master',
      description: '30-day consistency',
      icon: '👑',
      color: '#8b5cf6',
    });
  }

  // Balanced diet
  const proteinPercent = (totals.protein * 4 / totals.calories) * 100;
  const carbsPercent = (totals.carbs * 4 / totals.calories) * 100;
  const fatsPercent = (totals.fats * 9 / totals.calories) * 100;

  if (
    proteinPercent >= 25 && proteinPercent <= 35 &&
    carbsPercent >= 40 && carbsPercent <= 50 &&
    fatsPercent >= 20 && fatsPercent <= 30
  ) {
    achievements.push({
      id: 'balanced_diet',
      title: 'Balance Master',
      description: 'Perfect macro balance',
      icon: '⚖️',
      color: '#10b981',
    });
  }

  // Meal frequency
  if (mealHistory && mealHistory.length >= 5) {
    achievements.push({
      id: 'frequent_logger',
      title: 'Consistent Logger',
      description: '5+ meals logged today',
      icon: '📝',
      color: '#06b6d4',
    });
  }

  return achievements;
};

export const getMacroBalance = (totals) => {
  const totalCalories = totals.calories || 1;
  
  return {
    protein: Math.round((totals.protein * 4 / totalCalories) * 100) || 0,
    carbs: Math.round((totals.carbs * 4 / totalCalories) * 100) || 0,
    fats: Math.round((totals.fats * 9 / totalCalories) * 100) || 0,
  };
};

export const getBalanceRecommendation = (balance, totals, goals) => {
  const idealBalance = { protein: 30, carbs: 40, fats: 30 };
  const recommendations = [];

  if (balance.protein < idealBalance.protein - 5) {
    const needed = Math.round((goals.calories * (idealBalance.protein / 100) / 4) - totals.protein);
    recommendations.push(`Add ${needed}g more protein`);
  }

  if (balance.carbs > idealBalance.carbs + 5) {
    recommendations.push('Reduce carb intake slightly');
  }

  if (balance.fats < idealBalance.fats - 5) {
    recommendations.push('Include healthy fats');
  }

  return recommendations;
};
