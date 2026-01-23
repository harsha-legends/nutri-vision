// Smart Meal Suggestions based on remaining calories

export const getSmartSuggestions = (remainingCalories, remainingProtein, foodDatabase) => {
  if (!foodDatabase || remainingCalories <= 0) return [];

  const suggestions = [];

  // Filter foods that fit within remaining calories (+/- 100 kcal buffer)
  const fittingFoods = foodDatabase.filter(
    (food) =>
      food.nutrition.calories <= remainingCalories + 100 &&
      food.nutrition.calories >= Math.max(remainingCalories - 200, 100)
  );

  // Prioritize high-protein foods if protein is low
  if (remainingProtein > 20) {
    const highProteinFoods = fittingFoods
      .filter((food) => food.nutrition.protein >= 15)
      .sort((a, b) => b.nutrition.protein - a.nutrition.protein)
      .slice(0, 3);
    
    suggestions.push(...highProteinFoods);
  }

  // Add variety if we don't have enough suggestions
  if (suggestions.length < 3) {
    const remainingFoods = fittingFoods
      .filter((food) => !suggestions.includes(food))
      .sort((a, b) => Math.abs(a.nutrition.calories - remainingCalories) - Math.abs(b.nutrition.calories - remainingCalories))
      .slice(0, 3 - suggestions.length);
    
    suggestions.push(...remainingFoods);
  }

  return suggestions.slice(0, 3);
};

export const getMotivationalQuote = () => {
  const quotes = [
    { text: "Every meal is a new opportunity to nourish your body.", author: "Unknown" },
    { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
    { text: "Your body is a temple, but only if you treat it as one.", author: "Astrid Alauda" },
    { text: "Eat well, live well, be well.", author: "Unknown" },
    { text: "The food you eat can be either the safest and most powerful form of medicine or the slowest form of poison.", author: "Ann Wigmore" },
    { text: "Let food be thy medicine and medicine be thy food.", author: "Hippocrates" },
    { text: "To keep the body in good health is a duty, otherwise we shall not be able to keep our mind strong and clear.", author: "Buddha" },
    { text: "Health is wealth. Make sure you invest in it daily.", author: "Unknown" },
    { text: "Your diet is a bank account. Good food choices are good investments.", author: "Bethenny Frankel" },
    { text: "A healthy outside starts from the inside.", author: "Robert Urich" },
  ];

  const today = new Date().getDate();
  return quotes[today % quotes.length];
};

export const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  if (hour < 21) return 'Good Evening';
  return 'Good Night';
};

export const getWeatherBasedSuggestions = (weather) => {
  // Simulated weather-based suggestions
  // In production, you'd fetch from weather API
  const suggestions = {
    cold: {
      message: "It's cold today! Stay warm with these comforting meals",
      foods: ['Hot Soup', 'Oatmeal', 'Hot Chocolate', 'Stew', 'Tea'],
    },
    hot: {
      message: "Beat the heat with these refreshing options",
      foods: ['Smoothie', 'Salad', 'Iced Tea', 'Fresh Juice', 'Cold Pasta'],
    },
    rainy: {
      message: "Perfect weather for comfort food",
      foods: ['Soup', 'Hot Coffee', 'Pakoras', 'Grilled Sandwich', 'Chai'],
    },
    normal: {
      message: "Great day to eat healthy!",
      foods: ['Mixed Salad', 'Grilled Chicken', 'Fresh Juice', 'Yogurt Bowl', 'Fruit Smoothie'],
    },
  };

  // Simulate weather (in production, use real weather API)
  const temp = Math.random() * 40; // 0-40°C
  
  if (temp < 15) return suggestions.cold;
  if (temp > 30) return suggestions.hot;
  return suggestions.normal;
};
