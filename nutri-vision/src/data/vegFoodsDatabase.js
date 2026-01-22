// ============================================
// COMPREHENSIVE VEGETARIAN FOODS DATABASE
// ============================================

// Helper functions for nutritional calculation
const generateNutrition = (food) => ({
  calories: food.calories,
  protein: food.protein,
  carbs: food.carbs,
  fats: food.fats,
  fiber: Math.round((food.carbs * 0.1) + (Math.random() * 3)), 
  sugar: Math.round((food.carbs * 0.15) + (Math.random() * 5)), 
  sodium: Math.round(150 + (Math.random() * 200)), 
  calcium: Math.round(50 + (Math.random() * 150)), 
  iron: Math.round(1 + (Math.random() * 4)), 
  vitaminC: Math.round(5 + (Math.random() * 20)), 
});

const getHealthImpact = (calories, sugar, fats) => {
  if (calories < 150 && sugar < 5 && fats < 8) return 'Excellent';
  if (calories < 250 && sugar < 10 && fats < 15) return 'Good';
  if (calories < 350 && sugar < 20 && fats < 25) return 'Moderate';
  return 'High';
};

// ============================================
// TRADITIONAL CATEGORIES
// ============================================

// Starters & Appetizers
const starters = [
  { name: 'Samosa', image: '🥟', calories: 262, protein: 5, carbs: 32, fats: 13 },
  { name: 'Spring Roll', image: '🌯', calories: 185, protein: 4, carbs: 22, fats: 9 },
  { name: 'Paneer Tikka', image: '🧀', calories: 295, protein: 18, carbs: 8, fats: 22 },
  { name: 'Veg Cutlet', image: '🥄', calories: 224, protein: 7, carbs: 28, fats: 10 },
  { name: 'Aloo Tikki', image: '🥔', calories: 180, protein: 4, carbs: 24, fats: 8 },
  { name: 'Dhokla', image: '🟡', calories: 158, protein: 5, carbs: 25, fats: 4 },
  { name: 'Kachori', image: '🥮', calories: 235, protein: 6, carbs: 28, fats: 11 },
  { name: 'Bhel Puri', image: '🥗', calories: 165, protein: 4, carbs: 28, fats: 5 },
];

// Traditional Curries
const curries = [
  { name: 'Palak Paneer', image: '🥬', calories: 265, protein: 15, carbs: 12, fats: 18 },
  { name: 'Dal Tadka', image: '🟡', calories: 180, protein: 12, carbs: 25, fats: 5 },
  { name: 'Chana Masala', image: '🟤', calories: 210, protein: 10, carbs: 32, fats: 6 },
  { name: 'Aloo Gobi', image: '🥔', calories: 145, protein: 4, carbs: 22, fats: 5 },
  { name: 'Baingan Bharta', image: '🍆', calories: 125, protein: 3, carbs: 18, fats: 5 },
  { name: 'Bhindi Masala', image: '🌶️', calories: 135, protein: 4, carbs: 16, fats: 6 },
  { name: 'Rajma', image: '🔴', calories: 195, protein: 11, carbs: 28, fats: 5 },
  { name: 'Kadhi Pakora', image: '🟡', calories: 220, protein: 8, carbs: 24, fats: 11 },
];

// Rice & Biryani
const riceAndBiryani = [
  { name: 'Veg Biryani', image: '🍛', calories: 350, protein: 8, carbs: 58, fats: 12 },
  { name: 'Jeera Rice', image: '🍚', calories: 185, protein: 4, carbs: 38, fats: 2 },
  { name: 'Coconut Rice', image: '🥥', calories: 220, protein: 5, carbs: 42, fats: 5 },
  { name: 'Lemon Rice', image: '🍋', calories: 195, protein: 4, carbs: 40, fats: 3 },
  { name: 'Curd Rice', image: '🥛', calories: 165, protein: 6, carbs: 32, fats: 3 },
  { name: 'Pulao', image: '🍚', calories: 285, protein: 6, carbs: 52, fats: 6 },
];

// Breads & Rotis
const breads = [
  { name: 'Chapati', image: '🫓', calories: 120, protein: 3, carbs: 24, fats: 2 },
  { name: 'Naan', image: '🍞', calories: 285, protein: 8, carbs: 52, fats: 6 },
  { name: 'Paratha', image: '🫓', calories: 235, protein: 6, carbs: 35, fats: 9 },
  { name: 'Kulcha', image: '🍞', calories: 265, protein: 7, carbs: 48, fats: 6 },
  { name: 'Bhatura', image: '🍞', calories: 385, protein: 9, carbs: 58, fats: 15 },
  { name: 'Poori', image: '🟡', calories: 195, protein: 4, carbs: 28, fats: 8 },
];

// South Indian
const southIndian = [
  { name: 'Dosa', image: '🥞', calories: 168, protein: 4, carbs: 32, fats: 2 },
  { name: 'Idli', image: '⚪', calories: 58, protein: 2, carbs: 12, fats: 0.5 },
  { name: 'Uttapam', image: '🥞', calories: 192, protein: 5, carbs: 35, fats: 4 },
  { name: 'Vada', image: '🟤', calories: 85, protein: 4, carbs: 10, fats: 4 },
  { name: 'Upma', image: '🟡', calories: 158, protein: 4, carbs: 28, fats: 4 },
  { name: 'Pongal', image: '🍛', calories: 225, protein: 8, carbs: 42, fats: 4 },
];

// Street Food
const streetFood = [
  { name: 'Pani Puri', image: '💧', calories: 135, protein: 3, carbs: 24, fats: 4 },
  { name: 'Chaat', image: '🥗', calories: 185, protein: 5, carbs: 32, fats: 6 },
  { name: 'Vada Pav', image: '🥔', calories: 295, protein: 6, carbs: 48, fats: 9 },
  { name: 'Pav Bhaji', image: '🍞', calories: 385, protein: 8, carbs: 58, fats: 14 },
  { name: 'Dabeli', image: '🌭', calories: 245, protein: 5, carbs: 42, fats: 7 },
  { name: 'Misal Pav', image: '🌶️', calories: 325, protein: 12, carbs: 48, fats: 11 },
];

// Chinese & Indo-Chinese
const chinese = [
  { name: 'Veg Fried Rice', image: '🍚', calories: 285, protein: 6, carbs: 52, fats: 7 },
  { name: 'Chow Mein', image: '🍜', calories: 245, protein: 7, carbs: 42, fats: 6 },
  { name: 'Manchurian', image: '🥟', calories: 265, protein: 8, carbs: 38, fats: 9 },
  { name: 'Spring Roll', image: '🌯', calories: 185, protein: 4, carbs: 22, fats: 9 },
  { name: 'Soup', image: '🍲', calories: 65, protein: 2, carbs: 12, fats: 1 },
];

// Continental
const continental = [
  { name: 'Pasta', image: '🍝', calories: 295, protein: 8, carbs: 55, fats: 5 },
  { name: 'Sandwich', image: '🥪', calories: 245, protein: 8, carbs: 38, fats: 8 },
  { name: 'Burger', image: '🍔', calories: 385, protein: 12, carbs: 45, fats: 18 },
  { name: 'Pizza', image: '🍕', calories: 285, protein: 12, carbs: 36, fats: 11 },
  { name: 'Salad', image: '🥗', calories: 125, protein: 4, carbs: 18, fats: 5 },
];

// Desserts & Sweets
const desserts = [
  { name: 'Gulab Jamun', image: '🟤', calories: 285, protein: 4, carbs: 45, fats: 11 },
  { name: 'Rasgulla', image: '⚪', calories: 185, protein: 6, carbs: 32, fats: 4 },
  { name: 'Kheer', image: '🥛', calories: 195, protein: 5, carbs: 35, fats: 5 },
  { name: 'Halwa', image: '🟡', calories: 265, protein: 6, carbs: 42, fats: 9 },
  { name: 'Jalebi', image: '🟡', calories: 185, protein: 2, carbs: 35, fats: 5 },
  { name: 'Laddu', image: '🟡', calories: 225, protein: 4, carbs: 38, fats: 8 },
];

// Side Dishes
const sideDishes = [
  { name: 'Papad', image: '⭕', calories: 45, protein: 2, carbs: 8, fats: 1 },
  { name: 'Pickle', image: '🥒', calories: 25, protein: 0.5, carbs: 3, fats: 2 },
  { name: 'Raita', image: '🥛', calories: 65, protein: 3, carbs: 8, fats: 2 },
  { name: 'Salad', image: '🥗', calories: 45, protein: 2, carbs: 8, fats: 1 },
];

// Buffet Specials
const buffetSpecials = [
  { name: 'Thali Complete', image: '🍽️', calories: 685, protein: 22, carbs: 95, fats: 24 },
  { name: 'South Indian Combo', image: '🥞', calories: 485, protein: 14, carbs: 85, fats: 12 },
  { name: 'North Indian Combo', image: '🍛', calories: 585, protein: 18, carbs: 82, fats: 20 },
  { name: 'Gujarati Thali', image: '🟡', calories: 525, protein: 16, carbs: 78, fats: 16 },
];

// ============================================
// STATE-WISE FAMOUS CURRIES (90+ items)
// ============================================
const stateWiseCurries = [
  // PUNJABI CURRIES
  { name: 'Dal Makhani', image: '🍛', calories: 235, protein: 9, carbs: 28, fats: 11 },
  { name: 'Butter Paneer', image: '🧈', calories: 320, protein: 14, carbs: 18, fats: 22 },
  { name: 'Palak Paneer Punjab Style', image: '🥬', calories: 265, protein: 15, carbs: 12, fats: 18 },
  { name: 'Shahi Paneer', image: '👑', calories: 345, protein: 15, carbs: 16, fats: 25 },
  { name: 'Kadai Paneer', image: '🥘', calories: 295, protein: 14, carbs: 15, fats: 20 },
  { name: 'Malai Kofta', image: '⚪', calories: 385, protein: 12, carbs: 28, fats: 26 },
  { name: 'Chole Masala', image: '🟤', calories: 280, protein: 12, carbs: 45, fats: 8 },
  { name: 'Rajma Masala', image: '🔴', calories: 220, protein: 14, carbs: 38, fats: 4 },
  { name: 'Punjabi Kadhi', image: '🟡', calories: 180, protein: 8, carbs: 15, fats: 10 },
  { name: 'Sarson ka Saag', image: '🥬', calories: 165, protein: 6, carbs: 12, fats: 11 },
  
  // GUJARATI CURRIES
  { name: 'Gujarati Dal', image: '🍲', calories: 160, protein: 8, carbs: 25, fats: 4 },
  { name: 'Undhiyu', image: '🥕', calories: 195, protein: 6, carbs: 28, fats: 8 },
  { name: 'Khatta Dhokla Curry', image: '🟡', calories: 140, protein: 5, carbs: 22, fats: 4 },
  { name: 'Gujarati Kadhi', image: '🥛', calories: 120, protein: 4, carbs: 18, fats: 4 },
  { name: 'Stuffed Karela', image: '🥒', calories: 180, protein: 4, carbs: 15, fats: 12 },
  { name: 'Sev Tameta', image: '🍅', calories: 150, protein: 3, carbs: 20, fats: 7 },
  { name: 'Gujarati Sambar', image: '🟠', calories: 125, protein: 6, carbs: 18, fats: 3 },
  { name: 'Dudhi na Muthiya', image: '🟢', calories: 135, protein: 5, carbs: 20, fats: 4 },
  
  // SOUTH INDIAN CURRIES
  { name: 'Sambar Tamil Style', image: '🍛', calories: 95, protein: 5, carbs: 14, fats: 2 },
  { name: 'Rasam', image: '🍜', calories: 45, protein: 2, carbs: 8, fats: 1 },
  { name: 'Avial', image: '🥥', calories: 120, protein: 4, carbs: 16, fats: 5 },
  { name: 'Kootu', image: '🟢', calories: 110, protein: 6, carbs: 15, fats: 3 },
  { name: 'Mor Kuzhambu', image: '🥛', calories: 85, protein: 3, carbs: 12, fats: 3 },
  { name: 'Poriyal', image: '🥬', calories: 90, protein: 3, carbs: 12, fats: 4 },
  { name: 'Keerai Kootu', image: '🌿', calories: 105, protein: 5, carbs: 12, fats: 4 },
  { name: 'Vendakkai Curry', image: '🟢', calories: 130, protein: 4, carbs: 18, fats: 5 },
  { name: 'Coconut Curry', image: '🥥', calories: 145, protein: 3, carbs: 14, fats: 9 },
  { name: 'Drumstick Curry', image: '🥢', calories: 115, protein: 4, carbs: 16, fats: 4 },
  
  // BENGALI CURRIES
  { name: 'Aloo Posto', image: '🥔', calories: 185, protein: 4, carbs: 28, fats: 7 },
  { name: 'Shukto', image: '🥒', calories: 125, protein: 4, carbs: 18, fats: 5 },
  { name: 'Cholar Dal', image: '🟡', calories: 170, protein: 8, carbs: 25, fats: 5 },
  { name: 'Begun Bharta', image: '🍆', calories: 120, protein: 3, carbs: 15, fats: 6 },
  { name: 'Dhokar Dalna', image: '⚪', calories: 195, protein: 9, carbs: 22, fats: 8 },
  { name: 'Panch Phoron Dal', image: '🌿', calories: 155, protein: 7, carbs: 23, fats: 4 },
  { name: 'Alu Dum', image: '🥔', calories: 200, protein: 4, carbs: 32, fats: 7 },
  
  // MAHARASHTRIAN CURRIES
  { name: 'Usal Pav', image: '🍞', calories: 240, protein: 8, carbs: 38, fats: 8 },
  { name: 'Bharleli Vangi', image: '🍆', calories: 165, protein: 4, carbs: 22, fats: 7 },
  { name: 'Amti', image: '🟡', calories: 135, protein: 6, carbs: 20, fats: 4 },
  { name: 'Bhaaji', image: '🥬', calories: 115, protein: 3, carbs: 15, fats: 5 },
  { name: 'Zunka', image: '🟡', calories: 95, protein: 4, carbs: 12, fats: 4 },
  { name: 'Katachi Amti', image: '🟠', calories: 110, protein: 5, carbs: 16, fats: 3 },
  
  // RAJASTHANI CURRIES
  { name: 'Gatte ki Sabzi', image: '🔴', calories: 210, protein: 7, carbs: 28, fats: 8 },
  { name: 'Ker Sangri', image: '🌿', calories: 145, protein: 4, carbs: 18, fats: 6 },
  { name: 'Papad ki Sabzi', image: '⭕', calories: 125, protein: 3, carbs: 16, fats: 5 },
  { name: 'Rajasthani Kadhi', image: '🟡', calories: 165, protein: 6, carbs: 18, fats: 8 },
  { name: 'Moong Dal Halwa', image: '🟡', calories: 285, protein: 8, carbs: 45, fats: 10 },
  
  // KASHMIRI CURRIES
  { name: 'Dum Aloo', image: '🥔', calories: 220, protein: 5, carbs: 32, fats: 9 },
  { name: 'Haak', image: '🥬', calories: 95, protein: 4, carbs: 12, fats: 4 },
  { name: 'Kashmiri Rajma', image: '🔴', calories: 195, protein: 12, carbs: 28, fats: 5 },
  { name: 'Nadru Yakhni', image: '⚪', calories: 145, protein: 3, carbs: 18, fats: 6 },
  
  // KERALA CURRIES
  { name: 'Sambar Kerala Style', image: '🟠', calories: 105, protein: 6, carbs: 16, fats: 2 },
  { name: 'Olan', image: '🥥', calories: 125, protein: 4, carbs: 15, fats: 6 },
  { name: 'Theeyal', image: '🥥', calories: 155, protein: 5, carbs: 18, fats: 7 },
  { name: 'Erissery', image: '🟡', calories: 140, protein: 6, carbs: 20, fats: 5 },
  { name: 'Pulissery', image: '🟡', calories: 115, protein: 4, carbs: 16, fats: 4 },
  
  // ANDHRA CURRIES
  { name: 'Andhra Sambar', image: '🌶️', calories: 115, protein: 6, carbs: 16, fats: 3 },
  { name: 'Gutti Vankaya', image: '🍆', calories: 175, protein: 4, carbs: 22, fats: 8 },
  { name: 'Pappu', image: '🟡', calories: 135, protein: 7, carbs: 20, fats: 3 },
  { name: 'Bendakaya Curry', image: '🟢', calories: 145, protein: 4, carbs: 18, fats: 6 },
];

// ============================================
// TIFFIN CURRIES - CURRIES SPECIALLY FOR TIFFIN ITEMS (40+ items)
// ============================================
const tiffinCurries = [
  // SOUTH INDIAN TIFFIN CURRIES
  { name: 'Sambar for Dosa', image: '🍛', calories: 95, protein: 5, carbs: 14, fats: 2 },
  { name: 'Coconut Chutney', image: '🥥', calories: 65, protein: 2, carbs: 5, fats: 5 },
  { name: 'Tomato Chutney', image: '🍅', calories: 45, protein: 1, carbs: 8, fats: 1 },
  { name: 'Mint Chutney', image: '🌿', calories: 25, protein: 1, carbs: 4, fats: 1 },
  { name: 'Coriander Chutney', image: '🌿', calories: 30, protein: 1, carbs: 5, fats: 1 },
  { name: 'Peanut Chutney', image: '🥜', calories: 85, protein: 3, carbs: 6, fats: 6 },
  { name: 'Ginger Chutney', image: '🫚', calories: 35, protein: 1, carbs: 6, fats: 1 },
  { name: 'Onion Chutney', image: '🧅', calories: 55, protein: 2, carbs: 9, fats: 2 },
  { name: 'Curry Leaves Chutney', image: '🌿', calories: 40, protein: 1, carbs: 6, fats: 2 },
  { name: 'Red Chutney', image: '🌶️', calories: 50, protein: 2, carbs: 7, fats: 2 },
  { name: 'Pudina Chutney', image: '🌿', calories: 35, protein: 1, carbs: 5, fats: 2 },
  { name: 'Idli Sambar', image: '🍛', calories: 85, protein: 4, carbs: 12, fats: 2 },
  { name: 'Vada Sambar', image: '🍛', calories: 105, protein: 5, carbs: 16, fats: 3 },
  { name: 'Rasam for Tiffin', image: '🍜', calories: 45, protein: 2, carbs: 8, fats: 1 },
  { name: 'Tiffin Gothsu', image: '🍅', calories: 75, protein: 2, carbs: 12, fats: 2 },

  // NORTH INDIAN TIFFIN CURRIES
  { name: 'Aloo Bhaji for Poori', image: '🥔', calories: 165, protein: 3, carbs: 28, fats: 5 },
  { name: 'Chole for Bhature', image: '🟤', calories: 185, protein: 8, carbs: 28, fats: 5 },
  { name: 'Paneer Curry for Paratha', image: '🧀', calories: 225, protein: 12, carbs: 8, fats: 16 },
  { name: 'Dal for Chapati', image: '🟡', calories: 125, protein: 8, carbs: 18, fats: 3 },
  { name: 'Sabji for Roti', image: '🥬', calories: 95, protein: 3, carbs: 15, fats: 3 },
  { name: 'Rajma for Rice', image: '🔴', calories: 195, protein: 11, carbs: 28, fats: 5 },
  { name: 'Kadhi for Khichdi', image: '🟡', calories: 145, protein: 6, carbs: 15, fats: 8 },
  { name: 'Palak for Makki Roti', image: '🥬', calories: 115, protein: 5, carbs: 12, fats: 6 },

  // GUJARATI TIFFIN CURRIES
  { name: 'Gujarati Dal for Thepla', image: '🟡', calories: 135, protein: 6, carbs: 20, fats: 4 },
  { name: 'Dhokla Chutney', image: '🟢', calories: 45, protein: 2, carbs: 7, fats: 1 },
  { name: 'Kadhi for Khaman', image: '🟡', calories: 95, protein: 3, carbs: 12, fats: 4 },
  { name: 'Sambharo for Fafda', image: '🥒', calories: 65, protein: 2, carbs: 8, fats: 3 },
  { name: 'Aam Panna', image: '🥭', calories: 85, protein: 1, carbs: 20, fats: 0 },

  // MAHARASHTRIAN TIFFIN CURRIES
  { name: 'Usal for Misal', image: '🟤', calories: 155, protein: 7, carbs: 22, fats: 4 },
  { name: 'Bhaji for Vada Pav', image: '🥔', calories: 125, protein: 3, carbs: 18, fats: 5 },
  { name: 'Amti for Bhakri', image: '🟡', calories: 115, protein: 5, carbs: 16, fats: 3 },
  { name: 'Zunka for Bhakri', image: '🟡', calories: 85, protein: 4, carbs: 10, fats: 3 },

  // BENGALI TIFFIN CURRIES
  { name: 'Aloo Dum for Luchi', image: '🥔', calories: 175, protein: 4, carbs: 28, fats: 6 },
  { name: 'Cholar Dal for Paratha', image: '🟡', calories: 145, protein: 7, carbs: 22, fats: 4 },
  { name: 'Beguni Curry', image: '🍆', calories: 105, protein: 3, carbs: 14, fats: 4 },

  // PUNJABI TIFFIN CURRIES
  { name: 'Sarson Saag for Makki Roti', image: '🥬', calories: 145, protein: 6, carbs: 12, fats: 9 },
  { name: 'Chole for Kulcha', image: '🟤', calories: 195, protein: 9, carbs: 32, fats: 4 },
  { name: 'Dal Makhani for Naan', image: '🍛', calories: 215, protein: 8, carbs: 25, fats: 10 },
  { name: 'Palak Paneer for Roti', image: '🥬', calories: 185, protein: 11, carbs: 9, fats: 13 },

  // RAJASTHANI TIFFIN CURRIES
  { name: 'Gatte Curry for Bajra Roti', image: '🔴', calories: 175, protein: 6, carbs: 24, fats: 6 },
  { name: 'Ker Sangri for Missi Roti', image: '🌿', calories: 125, protein: 4, carbs: 16, fats: 5 },
  { name: 'Panchmel Dal for Roti', image: '🟡', calories: 155, protein: 8, carbs: 22, fats: 4 },

  // SPECIAL TIFFIN ACCOMPANIMENTS
  { name: 'Mixed Vegetable Curry', image: '🥕', calories: 135, protein: 4, carbs: 20, fats: 5 },
  { name: 'Seasonal Vegetable Curry', image: '🥬', calories: 115, protein: 3, carbs: 18, fats: 4 },
  { name: 'Dry Vegetable Sabji', image: '🥕', calories: 95, protein: 3, carbs: 14, fats: 3 }
];

// ============================================
// NEW CATEGORIES - 200+ ADDITIONAL ITEMS
// ============================================

// HEALTHY BOWLS & SALADS (40 items)
const healthyBowls = [
  { name: 'Quinoa Buddha Bowl', image: '🥗', calories: 285, protein: 12, carbs: 45, fats: 8 },
  { name: 'Mediterranean Salad', image: '🥗', calories: 195, protein: 8, carbs: 15, fats: 12 },
  { name: 'Kale Caesar Salad', image: '🥬', calories: 165, protein: 6, carbs: 12, fats: 11 },
  { name: 'Chickpea Power Bowl', image: '🟤', calories: 225, protein: 10, carbs: 32, fats: 7 },
  { name: 'Avocado Toast Bowl', image: '🥑', calories: 285, protein: 8, carbs: 25, fats: 18 },
  { name: 'Greek Orzo Salad', image: '🥗', calories: 235, protein: 9, carbs: 35, fats: 8 },
  { name: 'Rainbow Veggie Bowl', image: '🌈', calories: 175, protein: 6, carbs: 28, fats: 5 },
  { name: 'Protein Packed Salad', image: '💪', calories: 205, protein: 15, carbs: 18, fats: 9 },
  { name: 'Asian Fusion Bowl', image: '🥢', calories: 245, protein: 8, carbs: 38, fats: 7 },
  { name: 'Mexican Bean Bowl', image: '🌶️', calories: 265, protein: 12, carbs: 42, fats: 6 },
  { name: 'Moroccan Couscous Bowl', image: '🍲', calories: 255, protein: 9, carbs: 45, fats: 5 },
  { name: 'Thai Mango Salad', image: '🥭', calories: 145, protein: 3, carbs: 32, fats: 2 },
  { name: 'Italian Caprese Bowl', image: '🍅', calories: 215, protein: 12, carbs: 8, fats: 15 },
  { name: 'Nordic Grain Bowl', image: '🌾', calories: 275, protein: 11, carbs: 48, fats: 6 },
  { name: 'Middle Eastern Bowl', image: '🫘', calories: 235, protein: 10, carbs: 35, fats: 7 },
  { name: 'Superfood Green Bowl', image: '🥬', calories: 195, protein: 8, carbs: 22, fats: 9 },
  { name: 'Roasted Veggie Bowl', image: '🥕', calories: 185, protein: 6, carbs: 28, fats: 6 },
  { name: 'Lentil Power Bowl', image: '🟤', calories: 225, protein: 14, carbs: 32, fats: 5 },
  { name: 'Waldorf Salad', image: '🍎', calories: 165, protein: 4, carbs: 22, fats: 8 },
  { name: 'Spinach Strawberry Salad', image: '🍓', calories: 135, protein: 5, carbs: 18, fats: 5 },
  { name: 'Beetroot Goat Cheese Bowl', image: '🟣', calories: 205, protein: 9, carbs: 18, fats: 12 },
  { name: 'Cucumber Herb Salad', image: '🥒', calories: 95, protein: 3, carbs: 12, fats: 4 },
  { name: 'Sweet Potato Bowl', image: '🍠', calories: 245, protein: 6, carbs: 48, fats: 4 },
  { name: 'Zucchini Noodle Bowl', image: '🥒', calories: 125, protein: 5, carbs: 15, fats: 6 },
  { name: 'Cauliflower Rice Bowl', image: '🥬', calories: 155, protein: 7, carbs: 18, fats: 7 },
  { name: 'Edamame Sesame Bowl', image: '🟢', calories: 185, protein: 12, carbs: 15, fats: 8 },
  { name: 'Arugula Pear Salad', image: '🍐', calories: 145, protein: 4, carbs: 18, fats: 6 },
  { name: 'Broccoli Almond Bowl', image: '🥦', calories: 175, protein: 8, carbs: 12, fats: 11 },
  { name: 'Cabbage Slaw Bowl', image: '🥬', calories: 115, protein: 3, carbs: 16, fats: 5 },
  { name: 'Pomegranate Quinoa Bowl', image: '🍇', calories: 225, protein: 8, carbs: 42, fats: 4 },
  { name: 'Mushroom Barley Bowl', image: '🍄', calories: 195, protein: 7, carbs: 35, fats: 4 },
  { name: 'Corn Black Bean Bowl', image: '🌽', calories: 215, protein: 9, carbs: 38, fats: 4 },
  { name: 'Fennel Orange Salad', image: '🍊', calories: 125, protein: 3, carbs: 22, fats: 3 },
  { name: 'Roasted Pepper Bowl', image: '🌶️', calories: 165, protein: 5, carbs: 25, fats: 6 },
  { name: 'Watermelon Feta Salad', image: '🍉', calories: 145, protein: 6, carbs: 18, fats: 5 },
  { name: 'Brussels Sprouts Bowl', image: '🥬', calories: 155, protein: 6, carbs: 18, fats: 7 },
  { name: 'Radish Cucumber Salad', image: '🥒', calories: 85, protein: 2, carbs: 12, fats: 3 },
  { name: 'Cherry Tomato Bowl', image: '🍅', calories: 115, protein: 4, carbs: 15, fats: 5 },
  { name: 'Asparagus Lemon Bowl', image: '🥬', calories: 135, protein: 5, carbs: 12, fats: 8 },
  { name: 'Artichoke Heart Salad', image: '🌿', calories: 125, protein: 4, carbs: 14, fats: 6 }
];

// FUSION & INTERNATIONAL (50 items)
const fusionFoods = [
  { name: 'Sushi Roll Bowl', image: '🍣', calories: 225, protein: 8, carbs: 42, fats: 4 },
  { name: 'Korean Bibimbap', image: '🍚', calories: 285, protein: 12, carbs: 48, fats: 6 },
  { name: 'Japanese Ramen', image: '🍜', calories: 315, protein: 14, carbs: 52, fats: 8 },
  { name: 'Vietnamese Pho', image: '🍲', calories: 245, protein: 10, carbs: 38, fats: 6 },
  { name: 'Thai Green Curry', image: '🟢', calories: 265, protein: 8, carbs: 22, fats: 16 },
  { name: 'Mexican Quesadilla', image: '🌯', calories: 285, protein: 12, carbs: 32, fats: 12 },
  { name: 'Italian Risotto', image: '🍚', calories: 325, protein: 9, carbs: 55, fats: 8 },
  { name: 'Spanish Paella', image: '🥘', calories: 295, protein: 10, carbs: 52, fats: 6 },
  { name: 'Greek Moussaka', image: '🍆', calories: 245, protein: 11, carbs: 18, fats: 14 },
  { name: 'Turkish Dolma', image: '🌿', calories: 185, protein: 6, carbs: 28, fats: 6 },
  { name: 'Lebanese Tabbouleh', image: '🌿', calories: 145, protein: 4, carbs: 22, fats: 5 },
  { name: 'Moroccan Tagine', image: '🍲', calories: 225, protein: 8, carbs: 35, fats: 7 },
  { name: 'Ethiopian Injera', image: '🥞', calories: 165, protein: 6, carbs: 32, fats: 2 },
  { name: 'Russian Borscht', image: '🟣', calories: 125, protein: 4, carbs: 18, fats: 4 },
  { name: 'German Sauerkraut', image: '🥬', calories: 85, protein: 3, carbs: 12, fats: 3 },
  { name: 'French Ratatouille', image: '🍆', calories: 145, protein: 4, carbs: 18, fats: 6 },
  { name: 'British Shepherd Pie', image: '🥔', calories: 265, protein: 8, carbs: 35, fats: 10 },
  { name: 'American Mac Cheese', image: '🧀', calories: 325, protein: 15, carbs: 42, fats: 12 },
  { name: 'Chinese Fried Rice', image: '🍚', calories: 245, protein: 7, carbs: 45, fats: 5 },
  { name: 'Indonesian Gado Gado', image: '🥗', calories: 195, protein: 9, carbs: 22, fats: 8 },
  { name: 'Brazilian Feijoada', image: '🟤', calories: 285, protein: 12, carbs: 38, fats: 8 },
  { name: 'Peruvian Quinoa Soup', image: '🍲', calories: 175, protein: 8, carbs: 28, fats: 4 },
  { name: 'African Jollof Rice', image: '🍚', calories: 235, protein: 6, carbs: 45, fats: 4 },
  { name: 'Australian Veggie Burger', image: '🍔', calories: 295, protein: 12, carbs: 35, fats: 12 },
  { name: 'Canadian Poutine', image: '🍟', calories: 385, protein: 8, carbs: 48, fats: 18 },
  { name: 'Scandinavian Smorgasbord', image: '🥪', calories: 185, protein: 7, carbs: 22, fats: 8 },
  { name: 'Polish Pierogi', image: '🥟', calories: 225, protein: 8, carbs: 32, fats: 8 },
  { name: 'Hungarian Goulash', image: '🍲', calories: 205, protein: 7, carbs: 28, fats: 7 },
  { name: 'Irish Colcannon', image: '🥔', calories: 185, protein: 5, carbs: 32, fats: 5 },
  { name: 'Swiss Fondue', image: '🧀', calories: 315, protein: 18, carbs: 8, fats: 24 },
  { name: 'Dutch Stamppot', image: '🥔', calories: 195, protein: 6, carbs: 35, fats: 4 },
  { name: 'Belgian Waffles', image: '🧇', calories: 285, protein: 6, carbs: 42, fats: 10 },
  { name: 'Austrian Schnitzel', image: '🥄', calories: 245, protein: 8, carbs: 22, fats: 14 },
  { name: 'Portuguese Francesinha', image: '🥪', calories: 365, protein: 15, carbs: 38, fats: 18 },
  { name: 'Nordic Fish Cake', image: '🐟', calories: 165, protein: 12, carbs: 15, fats: 6 },
  { name: 'Caribbean Rice Peas', image: '🍚', calories: 225, protein: 8, carbs: 38, fats: 5 },
  { name: 'Tex Mex Burrito', image: '🌯', calories: 385, protein: 14, carbs: 52, fats: 12 },
  { name: 'Korean Kimchi', image: '🌶️', calories: 45, protein: 2, carbs: 8, fats: 1 },
  { name: 'Japanese Miso Soup', image: '🍲', calories: 85, protein: 6, carbs: 8, fats: 3 },
  { name: 'Vietnamese Spring Roll', image: '🌯', calories: 125, protein: 4, carbs: 22, fats: 3 },
  { name: 'Thai Tom Yum', image: '🍲', calories: 95, protein: 4, carbs: 12, fats: 3 },
  { name: 'Indian Fusion Curry', image: '🍛', calories: 235, protein: 9, carbs: 28, fats: 10 },
  { name: 'Mediterranean Wrap', image: '🌯', calories: 265, protein: 10, carbs: 35, fats: 9 },
  { name: 'Asian Lettuce Wrap', image: '🥬', calories: 145, protein: 6, carbs: 18, fats: 5 },
  { name: 'European Grain Bowl', image: '🌾', calories: 255, protein: 9, carbs: 45, fats: 5 },
  { name: 'Latin Rice Bowl', image: '🍚', calories: 275, protein: 8, carbs: 48, fats: 6 },
  { name: 'Middle East Mezze', image: '🫘', calories: 185, protein: 7, carbs: 22, fats: 8 },
  { name: 'African Stew', image: '🍲', calories: 205, protein: 8, carbs: 32, fats: 5 },
  { name: 'Pacific Island Bowl', image: '🥥', calories: 235, protein: 6, carbs: 42, fats: 5 },
  { name: 'Global Fusion Plate', image: '🌍', calories: 285, protein: 11, carbs: 38, fats: 9 }
];

// SMOOTHIE BOWLS & BEVERAGES (30 items)
const smoothieBowls = [
  { name: 'Acai Berry Bowl', image: '🫐', calories: 185, protein: 4, carbs: 35, fats: 5 },
  { name: 'Green Goddess Bowl', image: '🥬', calories: 165, protein: 6, carbs: 28, fats: 4 },
  { name: 'Tropical Paradise Bowl', image: '🥭', calories: 195, protein: 5, carbs: 38, fats: 3 },
  { name: 'Chocolate Protein Bowl', image: '🍫', calories: 225, protein: 12, carbs: 32, fats: 6 },
  { name: 'Berry Blast Bowl', image: '🍓', calories: 175, protein: 4, carbs: 32, fats: 4 },
  { name: 'Mango Tango Bowl', image: '🥭', calories: 155, protein: 3, carbs: 35, fats: 2 },
  { name: 'Peanut Butter Bowl', image: '🥜', calories: 285, protein: 12, carbs: 28, fats: 16 },
  { name: 'Coconut Dream Bowl', image: '🥥', calories: 205, protein: 5, carbs: 32, fats: 8 },
  { name: 'Vanilla Protein Shake', image: '🥤', calories: 165, protein: 15, carbs: 18, fats: 3 },
  { name: 'Chocolate Milkshake', image: '🥤', calories: 245, protein: 8, carbs: 38, fats: 8 },
  { name: 'Strawberry Smoothie', image: '🍓', calories: 135, protein: 4, carbs: 28, fats: 2 },
  
  // COMPREHENSIVE FRUIT JUICES (40 items)
  { name: 'Fresh Orange Juice', image: '🍊', calories: 90, protein: 1, carbs: 21, fats: 0 },
  { name: 'Apple Juice Fresh', image: '🍎', calories: 95, protein: 0, carbs: 24, fats: 0 },
  { name: 'Mango Juice Pure', image: '🥭', calories: 120, protein: 1, carbs: 28, fats: 0 },
  { name: 'Pineapple Juice', image: '🍍', calories: 105, protein: 1, carbs: 25, fats: 0 },
  { name: 'Grape Juice Red', image: '🍇', calories: 110, protein: 1, carbs: 26, fats: 0 },
  { name: 'Grape Juice Green', image: '🍏', calories: 105, protein: 1, carbs: 24, fats: 0 },
  { name: 'Watermelon Juice', image: '🍉', calories: 60, protein: 1, carbs: 14, fats: 0 },
  { name: 'Pomegranate Juice', image: '🍇', calories: 115, protein: 1, carbs: 28, fats: 0 },
  { name: 'Cranberry Juice', image: '🔴', calories: 85, protein: 0, carbs: 21, fats: 0 },
  { name: 'Blueberry Juice', image: '🫐', calories: 80, protein: 1, carbs: 19, fats: 0 },
  { name: 'Strawberry Juice', image: '🍓', calories: 75, protein: 1, carbs: 18, fats: 0 },
  { name: 'Raspberry Juice', image: '🫐', calories: 70, protein: 1, carbs: 16, fats: 0 },
  { name: 'Blackberry Juice', image: '🫐', calories: 75, protein: 1, carbs: 17, fats: 0 },
  { name: 'Cherry Juice Tart', image: '🍒', calories: 85, protein: 1, carbs: 20, fats: 0 },
  { name: 'Cherry Juice Sweet', image: '🍒', calories: 95, protein: 1, carbs: 22, fats: 0 },
  { name: 'Peach Juice Fresh', image: '🍑', calories: 85, protein: 1, carbs: 20, fats: 0 },
  { name: 'Apricot Juice', image: '🟠', calories: 80, protein: 1, carbs: 19, fats: 0 },
  { name: 'Plum Juice', image: '🟣', calories: 90, protein: 1, carbs: 21, fats: 0 },
  { name: 'Kiwi Juice', image: '🥝', calories: 85, protein: 1, carbs: 20, fats: 0 },
  { name: 'Papaya Juice', image: '🟡', calories: 95, protein: 1, carbs: 22, fats: 0 },
  { name: 'Guava Juice', image: '🟢', calories: 100, protein: 2, carbs: 23, fats: 0 },
  { name: 'Passion Fruit Juice', image: '🟡', calories: 90, protein: 2, carbs: 20, fats: 0 },
  { name: 'Lychee Juice', image: '⚪', calories: 95, protein: 1, carbs: 22, fats: 0 },
  { name: 'Dragon Fruit Juice', image: '🔴', calories: 75, protein: 1, carbs: 17, fats: 0 },
  { name: 'Star Fruit Juice', image: '⭐', calories: 65, protein: 1, carbs: 15, fats: 0 },
  { name: 'Coconut Water Fresh', image: '🥥', calories: 45, protein: 1, carbs: 9, fats: 0 },
  { name: 'Tender Coconut Water', image: '🥥', calories: 40, protein: 1, carbs: 8, fats: 0 },
  { name: 'Lime Juice Fresh', image: '🟢', calories: 25, protein: 0, carbs: 6, fats: 0 },
  { name: 'Lemon Juice Fresh', image: '🍋', calories: 30, protein: 0, carbs: 7, fats: 0 },
  { name: 'Grapefruit Juice', image: '🍊', calories: 75, protein: 1, carbs: 18, fats: 0 },
  { name: 'Tangerine Juice', image: '🍊', calories: 85, protein: 1, carbs: 20, fats: 0 },
  { name: 'Mandarin Juice', image: '🍊', calories: 80, protein: 1, carbs: 19, fats: 0 },
  { name: 'Cantaloupe Juice', image: '🍈', calories: 70, protein: 1, carbs: 16, fats: 0 },
  { name: 'Honeydew Juice', image: '🍈', calories: 75, protein: 1, carbs: 17, fats: 0 },
  { name: 'Fig Juice Fresh', image: '🟤', calories: 100, protein: 1, carbs: 24, fats: 0 },
  { name: 'Date Juice Fresh', image: '🟤', calories: 125, protein: 1, carbs: 30, fats: 0 },
  { name: 'Banana Juice', image: '🍌', calories: 110, protein: 1, carbs: 26, fats: 0 },
  { name: 'Jackfruit Juice', image: '🟡', calories: 105, protein: 1, carbs: 25, fats: 0 },
  { name: 'Custard Apple Juice', image: '🍏', calories: 115, protein: 2, carbs: 27, fats: 0 },
  { name: 'Wood Apple Juice', image: '🟤', calories: 85, protein: 1, carbs: 20, fats: 0 },
  
  // COMPREHENSIVE VEGETABLE JUICES (35 items)  
  { name: 'Carrot Juice Fresh', image: '🥕', calories: 80, protein: 2, carbs: 18, fats: 0 },
  { name: 'Beetroot Juice', image: '🟣', calories: 75, protein: 2, carbs: 16, fats: 0 },
  { name: 'Cucumber Juice', image: '🥒', calories: 35, protein: 1, carbs: 8, fats: 0 },
  { name: 'Celery Juice', image: '🌿', calories: 40, protein: 1, carbs: 9, fats: 0 },
  { name: 'Spinach Juice', image: '🥬', calories: 45, protein: 3, carbs: 8, fats: 0 },
  { name: 'Kale Juice Fresh', image: '🥬', calories: 50, protein: 3, carbs: 10, fats: 0 },
  { name: 'Lettuce Juice', image: '🥬', calories: 30, protein: 1, carbs: 6, fats: 0 },
  { name: 'Cabbage Juice', image: '🥬', calories: 40, protein: 2, carbs: 8, fats: 0 },
  { name: 'Broccoli Juice', image: '🥦', calories: 45, protein: 3, carbs: 9, fats: 0 },
  { name: 'Cauliflower Juice', image: '🥦', calories: 35, protein: 2, carbs: 7, fats: 0 },
  { name: 'Bell Pepper Juice Red', image: '🫑', calories: 50, protein: 1, carbs: 12, fats: 0 },
  { name: 'Bell Pepper Juice Yellow', image: '🟡', calories: 45, protein: 1, carbs: 11, fats: 0 },
  { name: 'Bell Pepper Juice Green', image: '🫑', calories: 40, protein: 1, carbs: 9, fats: 0 },
  { name: 'Tomato Juice Fresh', image: '🍅', calories: 35, protein: 2, carbs: 7, fats: 0 },
  { name: 'Radish Juice', image: '🔴', calories: 30, protein: 1, carbs: 6, fats: 0 },
  { name: 'Turnip Juice', image: '⚪', calories: 35, protein: 1, carbs: 8, fats: 0 },
  { name: 'Parsnip Juice', image: '🤍', calories: 65, protein: 1, carbs: 15, fats: 0 },
  { name: 'Sweet Potato Juice', image: '🟠', calories: 95, protein: 2, carbs: 22, fats: 0 },
  { name: 'Pumpkin Juice', image: '🎃', calories: 55, protein: 1, carbs: 13, fats: 0 },
  { name: 'Bottle Gourd Juice', image: '🥒', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Ridge Gourd Juice', image: '🥒', calories: 30, protein: 1, carbs: 6, fats: 0 },
  { name: 'Bitter Gourd Juice', image: '🥒', calories: 20, protein: 1, carbs: 4, fats: 0 },
  { name: 'Snake Gourd Juice', image: '🐍', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Ash Gourd Juice', image: '⚪', calories: 20, protein: 1, carbs: 4, fats: 0 },
  { name: 'Okra Juice', image: '🌶️', calories: 35, protein: 2, carbs: 7, fats: 0 },
  { name: 'Zucchini Juice', image: '🥒', calories: 30, protein: 1, carbs: 6, fats: 0 },
  { name: 'Eggplant Juice', image: '🍆', calories: 40, protein: 1, carbs: 9, fats: 0 },
  { name: 'Green Bean Juice', image: '🟢', calories: 40, protein: 2, carbs: 8, fats: 0 },
  { name: 'Pea Juice Fresh', image: '🟢', calories: 60, protein: 4, carbs: 12, fats: 0 },
  { name: 'Corn Juice Sweet', image: '🌽', calories: 85, protein: 2, carbs: 20, fats: 0 },
  { name: 'Onion Juice', image: '🧅', calories: 45, protein: 1, carbs: 10, fats: 0 },
  { name: 'Garlic Juice', image: '🧄', calories: 35, protein: 2, carbs: 7, fats: 0 },
  { name: 'Ginger Juice', image: '🫚', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Turmeric Juice', image: '🟡', calories: 30, protein: 1, carbs: 6, fats: 0 },
  { name: 'Wheatgrass Juice', image: '🌾', calories: 20, protein: 2, carbs: 4, fats: 0 },
  
  // ADDITIONAL EXOTIC FRUIT JUICES (60 items)
  { name: 'Dragon Fruit Juice', image: '🐉', calories: 85, protein: 1, carbs: 20, fats: 0 },
  { name: 'Passion Fruit Juice', image: '🟡', calories: 95, protein: 2, carbs: 22, fats: 0 },
  { name: 'Lychee Juice Fresh', image: '🍇', calories: 90, protein: 1, carbs: 21, fats: 0 },
  { name: 'Rambutan Juice', image: '🔴', calories: 85, protein: 1, carbs: 20, fats: 0 },
  { name: 'Longan Juice', image: '🟤', calories: 80, protein: 1, carbs: 19, fats: 0 },
  { name: 'Star Fruit Juice', image: '⭐', calories: 70, protein: 1, carbs: 16, fats: 0 },
  { name: 'Persimmon Juice', image: '🟠', calories: 100, protein: 1, carbs: 24, fats: 0 },
  { name: 'Durian Juice', image: '🟡', calories: 135, protein: 2, carbs: 32, fats: 1 },
  { name: 'Mangosteen Juice', image: '🟣', calories: 75, protein: 1, carbs: 18, fats: 0 },
  { name: 'Soursop Juice', image: '🟢', calories: 85, passion: 1, carbs: 20, fats: 0 },
  { name: 'Guava Juice Pink', image: '🩷', calories: 95, protein: 2, carbs: 22, fats: 0 },
  { name: 'Guava Juice White', image: '🤍', calories: 90, protein: 2, carbs: 21, fats: 0 },
  { name: 'Sapodilla Juice', image: '🟤', calories: 110, protein: 1, carbs: 26, fats: 0 },
  { name: 'Tamarind Juice Sweet', image: '🟤', calories: 75, protein: 1, carbs: 18, fats: 0 },
  { name: 'Tamarind Juice Sour', image: '🟤', calories: 65, protein: 1, carbs: 15, fats: 0 },
  { name: 'Coconut Water Fresh', image: '🥥', calories: 45, protein: 2, carbs: 9, fats: 0 },
  { name: 'Tender Coconut Juice', image: '🥥', calories: 50, protein: 2, carbs: 10, fats: 1 },
  { name: 'Elderberry Juice', image: '🫐', calories: 70, protein: 1, carbs: 16, fats: 0 },
  { name: 'Mulberry Juice', image: '🫐', calories: 75, protein: 2, carbs: 17, fats: 0 },
  { name: 'Gooseberry Juice', image: '🟢', calories: 60, protein: 1, carbs: 14, fats: 0 },
  { name: 'Currant Juice Black', image: '⚫', calories: 80, protein: 1, carbs: 19, fats: 0 },
  { name: 'Currant Juice Red', image: '🔴', calories: 75, protein: 1, carbs: 17, fats: 0 },
  { name: 'Acai Berry Juice', image: '🫐', calories: 85, protein: 1, carbs: 20, fats: 1 },
  { name: 'Goji Berry Juice', image: '🔴', calories: 90, protein: 2, carbs: 21, fats: 0 },
  { name: 'Sea Buckthorn Juice', image: '🟠', calories: 65, protein: 1, carbs: 15, fats: 0 },
  { name: 'Aronia Berry Juice', image: '⚫', calories: 70, protein: 1, carbs: 16, fats: 0 },
  { name: 'Boysenberry Juice', image: '🫐', calories: 75, protein: 1, carbs: 17, fats: 0 },
  { name: 'Cloudberry Juice', image: '🟠', calories: 80, protein: 1, carbs: 19, fats: 0 },
  { name: 'Salmonberry Juice', image: '🔴', calories: 70, protein: 1, carbs: 16, fats: 0 },
  { name: 'Huckleberry Juice', image: '🫐', calories: 75, protein: 1, carbs: 17, fats: 0 },
  { name: 'Lingonberry Juice', image: '🔴', calories: 65, protein: 0, carbs: 15, fats: 0 },
  { name: 'Marionberry Juice', image: '⚫', calories: 80, protein: 1, carbs: 18, fats: 0 },
  { name: 'Tayberry Juice', image: '🔴', calories: 75, protein: 1, carbs: 17, fats: 0 },
  { name: 'Dewberry Juice', image: '⚫', calories: 70, protein: 1, carbs: 16, fats: 0 },
  { name: 'Loganberry Juice', image: '🔴', calories: 75, protein: 1, carbs: 17, fats: 0 },
  { name: 'Serviceberry Juice', image: '🫐', calories: 80, protein: 1, carbs: 19, fats: 0 },
  { name: 'Honeyberry Juice', image: '🫐', calories: 70, protein: 1, carbs: 16, fats: 0 },
  { name: 'Jabuticaba Juice', image: '⚫', calories: 85, protein: 1, carbs: 20, fats: 0 },
  { name: 'Pitaya Juice Red', image: '🔴', calories: 80, protein: 1, carbs: 19, fats: 0 },
  { name: 'Pitaya Juice Yellow', image: '🟡', calories: 85, protein: 1, carbs: 20, fats: 0 },
  { name: 'Cherimoya Juice', image: '🟢', calories: 105, protein: 2, carbs: 25, fats: 0 },
  { name: 'Sugar Apple Juice', image: '🤍', calories: 110, protein: 2, carbs: 26, fats: 0 },
  { name: 'Breadfruit Juice', image: '🟢', calories: 95, protein: 1, carbs: 23, fats: 0 },
  { name: 'Rambai Juice', image: '🟡', calories: 75, protein: 1, carbs: 17, fats: 0 },
  { name: 'Pulasan Juice', image: '🔴', calories: 80, protein: 1, carbs: 19, fats: 0 },
  { name: 'Langsat Juice', image: '🟡', calories: 70, protein: 1, carbs: 16, fats: 0 },
  { name: 'Santol Juice', image: '🟡', calories: 85, protein: 1, carbs: 20, fats: 0 },
  { name: 'Miracle Fruit Juice', image: '🔴', calories: 60, protein: 1, carbs: 14, fats: 0 },
  { name: 'Horned Melon Juice', image: '🟡', calories: 65, protein: 1, carbs: 15, fats: 0 },
  { name: 'African Cucumber Juice', image: '🟢', calories: 70, protein: 1, carbs: 16, fats: 0 },
  { name: 'Pepino Melon Juice', image: '🟡', calories: 75, protein: 1, carbs: 17, fats: 0 },
  { name: 'Buddha Hand Juice', image: '🟡', calories: 55, protein: 1, carbs: 13, fats: 0 },
  { name: 'Finger Lime Juice', image: '🟢', calories: 40, protein: 1, carbs: 9, fats: 0 },
  { name: 'Blood Orange Juice', image: '🔴', calories: 85, protein: 1, carbs: 20, fats: 0 },
  { name: 'Bergamot Juice', image: '🟢', calories: 60, protein: 1, carbs: 14, fats: 0 },
  { name: 'Yuzu Juice', image: '🟡', calories: 50, protein: 1, carbs: 12, fats: 0 },
  { name: 'Calamansi Juice', image: '🟢', calories: 45, protein: 1, carbs: 10, fats: 0 },
  { name: 'Key Lime Juice', image: '🟢', calories: 35, protein: 0, carbs: 8, fats: 0 },
  { name: 'Meyer Lemon Juice', image: '🟡', calories: 40, protein: 1, carbs: 9, fats: 0 },
  { name: 'Ugli Fruit Juice', image: '🟠', calories: 70, protein: 1, carbs: 16, fats: 0 },
  { name: 'Pomelo Juice', image: '🟡', calories: 80, protein: 1, carbs: 19, fats: 0 },
  
  // ADDITIONAL EXOTIC VEGETABLE JUICES (50 items)
  { name: 'Purple Carrot Juice', image: '🟣', calories: 85, protein: 2, carbs: 19, fats: 0 },
  { name: 'White Carrot Juice', image: '🤍', calories: 75, protein: 2, carbs: 17, fats: 0 },
  { name: 'Yellow Carrot Juice', image: '🟡', calories: 80, protein: 2, carbs: 18, fats: 0 },
  { name: 'Purple Cabbage Juice', image: '🟣', calories: 45, protein: 2, carbs: 9, fats: 0 },
  { name: 'Napa Cabbage Juice', image: '🥬', calories: 35, protein: 1, carbs: 7, fats: 0 },
  { name: 'Bok Choy Juice', image: '🥬', calories: 40, protein: 2, carbs: 8, fats: 0 },
  { name: 'Swiss Chard Juice', image: '🍃', calories: 35, protein: 2, carbs: 7, fats: 0 },
  { name: 'Collard Greens Juice', image: '🥬', calories: 50, protein: 3, carbs: 10, fats: 0 },
  { name: 'Mustard Greens Juice', image: '🍃', calories: 45, protein: 3, carbs: 9, fats: 0 },
  { name: 'Turnip Greens Juice', image: '🍃', calories: 40, protein: 2, carbs: 8, fats: 0 },
  { name: 'Radish Greens Juice', image: '🍃', calories: 35, protein: 2, carbs: 7, fats: 0 },
  { name: 'Beet Greens Juice', image: '🍃', calories: 45, protein: 3, carbs: 9, fats: 0 },
  { name: 'Dandelion Greens Juice', image: '🍃', calories: 50, protein: 3, carbs: 10, fats: 0 },
  { name: 'Watercress Juice', image: '🌿', calories: 30, protein: 2, carbs: 5, fats: 0 },
  { name: 'Arugula Juice', image: '🌿', calories: 35, protein: 2, carbs: 6, fats: 0 },
  { name: 'Endive Juice', image: '🥬', calories: 30, protein: 1, carbs: 6, fats: 0 },
  { name: 'Radicchio Juice', image: '🟣', calories: 35, protein: 1, carbs: 7, fats: 0 },
  { name: 'Fennel Juice', image: '🤍', calories: 40, protein: 1, carbs: 9, fats: 0 },
  { name: 'Leek Juice', image: '🟢', calories: 50, protein: 1, carbs: 12, fats: 0 },
  { name: 'Scallion Juice', image: '🟢', calories: 30, protein: 1, carbs: 6, fats: 0 },
  { name: 'Shallot Juice', image: '🟣', calories: 45, protein: 1, carbs: 10, fats: 0 },
  { name: 'Purple Onion Juice', image: '🟣', calories: 50, protein: 1, carbs: 11, fats: 0 },
  { name: 'White Onion Juice', image: '🤍', calories: 45, protein: 1, carbs: 10, fats: 0 },
  { name: 'Green Onion Juice', image: '🟢', calories: 35, protein: 1, carbs: 7, fats: 0 },
  { name: 'Chives Juice', image: '🌿', calories: 25, protein: 1, carbs: 4, fats: 0 },
  { name: 'Artichoke Juice', image: '🟢', calories: 55, protein: 3, carbs: 12, fats: 0 },
  { name: 'Jerusalem Artichoke Juice', image: '🟤', calories: 65, protein: 2, carbs: 15, fats: 0 },
  { name: 'Kohlrabi Juice', image: '🟢', calories: 40, protein: 2, carbs: 8, fats: 0 },
  { name: 'Rutabaga Juice', image: '🟡', calories: 50, protein: 1, carbs: 12, fats: 0 },
  { name: 'Jicama Juice', image: '🤍', calories: 45, protein: 1, carbs: 10, fats: 0 },
  { name: 'Yacon Juice', image: '🟤', calories: 55, protein: 1, carbs: 13, fats: 0 },
  { name: 'Cassava Juice', image: '🟤', calories: 95, protein: 1, carbs: 23, fats: 0 },
  { name: 'Taro Root Juice', image: '🟤', calories: 85, protein: 2, carbs: 20, fats: 0 },
  { name: 'Purple Sweet Potato Juice', image: '🟣', calories: 100, protein: 2, carbs: 24, fats: 0 },
  { name: 'White Sweet Potato Juice', image: '🤍', calories: 95, protein: 2, carbs: 22, fats: 0 },
  { name: 'Japanese Sweet Potato Juice', image: '🟡', calories: 105, protein: 2, carbs: 25, fats: 0 },
  { name: 'Plantain Juice Green', image: '🟢', calories: 75, protein: 1, carbs: 18, fats: 0 },
  { name: 'Plantain Juice Ripe', image: '🟡', calories: 95, protein: 1, carbs: 23, fats: 0 },
  { name: 'Chayote Juice', image: '🟢', calories: 35, protein: 1, carbs: 8, fats: 0 },
  { name: 'Mirliton Juice', image: '🟢', calories: 35, protein: 1, carbs: 8, fats: 0 },
  { name: 'Water Spinach Juice', image: '🌿', calories: 30, protein: 2, carbs: 6, fats: 0 },
  { name: 'Malabar Spinach Juice', image: '🌿', calories: 35, protein: 2, carbs: 7, fats: 0 },
  { name: 'New Zealand Spinach Juice', image: '🌿', calories: 30, protein: 2, carbs: 5, fats: 0 },
  { name: 'Red Amaranth Juice', image: '🔴', calories: 40, protein: 3, carbs: 8, fats: 0 },
  { name: 'Green Amaranth Juice', image: '🟢', calories: 35, protein: 3, carbs: 7, fats: 0 },
  { name: 'Purslane Juice', image: '🌿', calories: 25, protein: 1, carbs: 4, fats: 0 },
  { name: 'Samphire Juice', image: '🌿', calories: 30, protein: 2, carbs: 5, fats: 0 },
  { name: 'Sea Beans Juice', image: '🌿', calories: 25, protein: 1, carbs: 4, fats: 0 },
  { name: 'Glasswort Juice', image: '🌿', calories: 20, protein: 1, carbs: 3, fats: 0 },
  { name: 'Lamb\'s Quarters Juice', image: '🌿', calories: 35, protein: 2, carbs: 6, fats: 0 },
  { name: 'Good King Henry Juice', image: '🌿', calories: 30, protein: 2, carbs: 5, fats: 0 },
  
  // TRADITIONAL INDIAN VEGETABLE JUICES (25 items)
  { name: 'Karela Juice Bitter', image: '🥒', calories: 18, protein: 1, carbs: 3, fats: 0 },
  { name: 'Lauki Juice Sweet', image: '🥒', calories: 22, protein: 1, carbs: 4, fats: 0 },
  { name: 'Tinda Juice', image: '🟢', calories: 28, protein: 1, carbs: 6, fats: 0 },
  { name: 'Gilki Juice', image: '🟢', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Parwal Juice', image: '🟢', calories: 30, protein: 1, carbs: 6, fats: 0 },
  { name: 'Kundru Juice', image: '🟢', calories: 28, protein: 1, carbs: 5, fats: 0 },
  { name: 'Turai Juice', image: '🥒', calories: 32, protein: 1, carbs: 7, fats: 0 },
  { name: 'Nenua Juice', image: '🥒', calories: 30, protein: 1, carbs: 6, fats: 0 },
  { name: 'Torai Juice', image: '🥒', calories: 28, protein: 1, carbs: 5, fats: 0 },
  { name: 'Bhindi Juice Raw', image: '🌶️', calories: 38, protein: 2, carbs: 8, fats: 0 },
  { name: 'Arbi Leaf Juice', image: '🍃', calories: 35, protein: 2, carbs: 7, fats: 0 },
  { name: 'Arbi Root Juice', image: '🟤', calories: 85, protein: 2, carbs: 20, fats: 0 },
  { name: 'Kachalu Juice', image: '🟤', calories: 75, protein: 2, carbs: 17, fats: 0 },
  { name: 'Jimikand Juice', image: '🟤', calories: 90, protein: 2, carbs: 21, fats: 0 },
  { name: 'Singoda Juice', image: '🤍', calories: 95, protein: 2, carbs: 23, fats: 0 },
  { name: 'Lotus Root Juice', image: '🪷', calories: 65, protein: 2, carbs: 15, fats: 0 },
  { name: 'Water Chestnut Juice', image: '⚪', calories: 55, protein: 1, carbs: 13, fats: 0 },
  { name: 'Bamboo Shoot Juice', image: '🎋', calories: 45, protein: 2, carbs: 10, fats: 0 },
  { name: 'Banana Stem Juice', image: '🍌', calories: 35, protein: 1, carbs: 8, fats: 0 },
  { name: 'Banana Flower Juice', image: '🌸', calories: 40, protein: 2, carbs: 9, fats: 0 },
  { name: 'Drumstick Pod Juice', image: '🥒', calories: 45, protein: 3, carbs: 9, fats: 0 },
  { name: 'Drumstick Leaf Juice', image: '🍃', calories: 38, protein: 4, carbs: 7, fats: 0 },
  { name: 'Agathi Leaf Juice', image: '🍃', calories: 35, protein: 3, carbs: 6, fats: 0 },
  { name: 'Agathi Flower Juice', image: '🌸', calories: 32, protein: 2, carbs: 6, fats: 0 },
  { name: 'Cluster Bean Juice', image: '🟢', calories: 42, protein: 3, carbs: 8, fats: 0 },
  
  // SUPERFOOD & ANTIOXIDANT RICH JUICES (30 items)
  { name: 'Pomegranate Arils Juice', image: '🔴', calories: 125, protein: 1, carbs: 30, fats: 0 },
  { name: 'Acai Pure Juice', image: '🫐', calories: 95, protein: 1, carbs: 22, fats: 2 },
  { name: 'Goji Berry Pure Juice', image: '🔴', calories: 100, protein: 3, carbs: 23, fats: 0 },
  { name: 'Noni Fruit Juice', image: '🟢', calories: 45, protein: 1, carbs: 10, fats: 0 },
  { name: 'Mangosteen Hull Juice', image: '🟣', calories: 55, protein: 1, carbs: 12, fats: 0 },
  { name: 'Camu Camu Juice', image: '🔴', calories: 35, protein: 1, carbs: 7, fats: 0 },
  { name: 'Baobab Fruit Juice', image: '🟤', calories: 65, protein: 2, carbs: 14, fats: 0 },
  { name: 'Moringa Pod Juice', image: '🍃', calories: 40, protein: 3, carbs: 8, fats: 0 },
  { name: 'Spirulina Juice', image: '🟢', calories: 25, protein: 4, carbs: 3, fats: 1 },
  { name: 'Chlorella Juice', image: '🟢', calories: 30, protein: 4, carbs: 4, fats: 1 },
  { name: 'Blue Green Algae Juice', image: '💙', calories: 28, protein: 4, carbs: 3, fats: 1 },
  { name: 'Sea Lettuce Juice', image: '🌿', calories: 22, protein: 2, carbs: 3, fats: 0 },
  { name: 'Kelp Juice Fresh', image: '🌿', calories: 20, protein: 2, carbs: 3, fats: 0 },
  { name: 'Wakame Juice', image: '🌿', calories: 25, protein: 2, carbs: 4, fats: 0 },
  { name: 'Dulse Juice', image: '🟣', calories: 30, protein: 3, carbs: 5, fats: 0 },
  { name: 'Nori Juice Fresh', image: '⚫', calories: 28, protein: 3, carbs: 4, fats: 0 },
  { name: 'Schisandra Berry Juice', image: '🔴', calories: 60, protein: 1, carbs: 14, fats: 0 },
  { name: 'Elderflower Juice', image: '🌸', calories: 45, protein: 0, carbs: 11, fats: 0 },
  { name: 'Hibiscus Flower Juice', image: '🌺', calories: 35, protein: 0, carbs: 8, fats: 0 },
  { name: 'Rose Hip Juice', image: '🌹', calories: 55, protein: 1, carbs: 12, fats: 0 },
  { name: 'Hawthorne Berry Juice', image: '🔴', calories: 50, protein: 1, carbs: 11, fats: 0 },
  { name: 'Sumac Berry Juice', image: '🔴', calories: 45, protein: 1, carbs: 10, fats: 0 },
  { name: 'Maqui Berry Juice', image: '⚫', calories: 65, protein: 1, carbs: 15, fats: 0 },
  { name: 'Chokeberry Juice', image: '⚫', calories: 55, protein: 1, carbs: 12, fats: 0 },
  { name: 'Saskatoon Berry Juice', image: '🫐', calories: 70, protein: 1, carbs: 16, fats: 0 },
  { name: 'Crowberry Juice', image: '⚫', calories: 60, protein: 1, carbs: 13, fats: 0 },
  { name: 'Silverberry Juice', image: '⚪', calories: 65, protein: 1, carbs: 14, fats: 0 },
  { name: 'Buffalo Berry Juice', image: '🔴', calories: 55, protein: 1, carbs: 12, fats: 0 },
  { name: 'Thimbleberry Juice', image: '🔴', calories: 60, protein: 1, carbs: 13, fats: 0 },
  { name: 'Salal Berry Juice', image: '🫐', calories: 65, protein: 1, carbs: 14, fats: 0 },
  
  // FERMENTED & PROBIOTIC JUICES (20 items)
  { name: 'Kombucha Green Tea', image: '🍃', calories: 35, protein: 0, carbs: 8, fats: 0 },
  { name: 'Kombucha Black Tea', image: '⚫', calories: 40, protein: 0, carbs: 9, fats: 0 },
  { name: 'Water Kefir Plain', image: '💧', calories: 25, protein: 0, carbs: 6, fats: 0 },
  { name: 'Water Kefir Fruit', image: '🍓', calories: 45, protein: 0, carbs: 11, fats: 0 },
  { name: 'Beet Kvass', image: '🟣', calories: 30, protein: 1, carbs: 6, fats: 0 },
  { name: 'Carrot Kvass', image: '🥕', calories: 35, protein: 1, carbs: 7, fats: 0 },
  { name: 'Cabbage Kvass', image: '🥬', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Fermented Ginger Juice', image: '🫚', calories: 30, protein: 1, carbs: 6, fats: 0 },
  { name: 'Fermented Turmeric Juice', image: '🟡', calories: 35, protein: 1, carbs: 7, fats: 0 },
  { name: 'Rejuvelac Wheat', image: '🌾', calories: 20, protein: 1, carbs: 4, fats: 0 },
  { name: 'Rejuvelac Quinoa', image: '🌾', calories: 25, protein: 2, carbs: 5, fats: 0 },
  { name: 'Fermented Apple Cider', image: '🍎', calories: 50, protein: 0, carbs: 12, fats: 0 },
  { name: 'Tepache Pineapple', image: '🍍', calories: 65, protein: 0, carbs: 16, fats: 0 },
  { name: 'Jun Honey Tea', image: '🍯', calories: 55, protein: 0, carbs: 13, fats: 0 },
  { name: 'Switchel Apple Cider', image: '🍎', calories: 45, protein: 0, carbs: 11, fats: 0 },
  { name: 'Shrub Strawberry', image: '🍓', calories: 40, protein: 0, carbs: 10, fats: 0 },
  { name: 'Shrub Blackberry', image: '⚫', calories: 45, protein: 0, carbs: 11, fats: 0 },
  { name: 'Fire Cider Tonic', image: '🔥', calories: 15, protein: 0, carbs: 3, fats: 0 },
  { name: 'Pickle Juice Cucumber', image: '🥒', calories: 10, protein: 0, carbs: 2, fats: 0 },
  { name: 'Sauerkraut Juice', image: '🥬', calories: 20, protein: 1, carbs: 4, fats: 0 },
  
  // WILD & FORAGED PLANT JUICES (15 items)
  { name: 'Wild Nettle Juice', image: '🍃', calories: 30, protein: 2, carbs: 5, fats: 0 },
  { name: 'Wild Garlic Juice', image: '🧄', calories: 25, protein: 1, carbs: 4, fats: 0 },
  { name: 'Wild Sorrel Juice', image: '🍃', calories: 28, protein: 1, carbs: 5, fats: 0 },
  { name: 'Wild Plantain Juice', image: '🍃', calories: 22, protein: 1, carbs: 4, fats: 0 },
  { name: 'Wild Violet Juice', image: '💜', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Wild Rose Hip Juice', image: '🌹', calories: 60, protein: 1, carbs: 13, fats: 0 },
  { name: 'Wild Elderberry Juice', image: '⚫', calories: 75, protein: 1, carbs: 17, fats: 0 },
  { name: 'Wild Grape Juice', image: '🍇', calories: 85, protein: 1, carbs: 20, fats: 0 },
  { name: 'Wild Strawberry Juice', image: '🍓', calories: 55, protein: 1, carbs: 12, fats: 0 },
  { name: 'Wild Raspberry Juice', image: '🫐', calories: 60, protein: 1, carbs: 13, fats: 0 },
  { name: 'Wild Blackberry Juice', image: '⚫', calories: 65, protein: 1, carbs: 14, fats: 0 },
  { name: 'Wild Gooseberry Juice', image: '🟢', calories: 50, protein: 1, carbs: 11, fats: 0 },
  { name: 'Wild Currant Juice', image: '🔴', calories: 55, protein: 1, carbs: 12, fats: 0 },
  { name: 'Wild Mulberry Juice', image: '⚫', calories: 70, protein: 2, carbs: 15, fats: 0 },
  { name: 'Wild Cherry Juice', image: '🍒', calories: 80, protein: 1, carbs: 18, fats: 0 },
  
  // COMPREHENSIVE LEAF-BASED JUICES (80 items)
  // HERB LEAF JUICES
  { name: 'Fresh Mint Leaf Juice', image: '🌿', calories: 20, protein: 1, carbs: 4, fats: 0 },
  { name: 'Holy Basil Juice', image: '🍃', calories: 18, protein: 1, carbs: 3, fats: 0 },
  { name: 'Sweet Basil Juice', image: '🌿', calories: 22, protein: 1, carbs: 4, fats: 0 },
  { name: 'Thai Basil Juice', image: '🍃', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Oregano Leaf Juice', image: '🌿', calories: 20, protein: 1, carbs: 4, fats: 0 },
  { name: 'Thyme Leaf Juice', image: '🍃', calories: 18, protein: 1, carbs: 3, fats: 0 },
  { name: 'Rosemary Leaf Juice', image: '🌿', calories: 22, protein: 1, carbs: 4, fats: 0 },
  { name: 'Sage Leaf Juice', image: '🍃', calories: 20, protein: 1, carbs: 4, fats: 0 },
  { name: 'Lavender Leaf Juice', image: '💜', calories: 15, protein: 1, carbs: 3, fats: 0 },
  { name: 'Tarragon Leaf Juice', image: '🌿', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Marjoram Leaf Juice', image: '🍃', calories: 20, protein: 1, carbs: 4, fats: 0 },
  { name: 'Bay Leaf Juice', image: '🍃', calories: 18, protein: 1, carbs: 3, fats: 0 },
  
  // MEDICINAL LEAF JUICES
  { name: 'Neem Leaf Juice', image: '🍃', calories: 15, protein: 1, carbs: 3, fats: 0 },
  { name: 'Tulsi Leaf Juice', image: '🍃', calories: 18, protein: 1, carbs: 4, fats: 0 },
  { name: 'Aloe Vera Leaf Juice', image: '🌿', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Moringa Leaf Juice', image: '🍃', calories: 35, protein: 4, carbs: 6, fats: 0 },
  { name: 'Brahmi Leaf Juice', image: '🍃', calories: 20, protein: 1, carbs: 4, fats: 0 },
  { name: 'Ashwagandha Leaf Juice', image: '🍃', calories: 22, protein: 1, carbs: 4, fats: 0 },
  { name: 'Guduchi Leaf Juice', image: '🍃', calories: 18, protein: 1, carbs: 3, fats: 0 },
  { name: 'Bhringraj Leaf Juice', image: '🍃', calories: 20, protein: 1, carbs: 4, fats: 0 },
  { name: 'Kalmegh Leaf Juice', image: '🍃', calories: 15, protein: 1, carbs: 3, fats: 0 },
  { name: 'Shankhpushpi Leaf Juice', image: '🍃', calories: 18, protein: 1, carbs: 3, fats: 0 },
  { name: 'Punarnava Leaf Juice', image: '🍃', calories: 20, protein: 1, carbs: 4, fats: 0 },
  { name: 'Amla Leaf Juice', image: '🍃', calories: 25, protein: 1, carbs: 5, fats: 0 },
  
  // CULINARY LEAF JUICES
  { name: 'Coriander Leaf Juice', image: '🌿', calories: 30, protein: 2, carbs: 6, fats: 0 },
  { name: 'Parsley Leaf Juice', image: '🌿', calories: 28, protein: 2, carbs: 5, fats: 0 },
  { name: 'Dill Leaf Juice', image: '🌿', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Chive Leaf Juice', image: '🌿', calories: 22, protein: 1, carbs: 4, fats: 0 },
  { name: 'Green Onion Leaf Juice', image: '🟢', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Celery Leaf Juice', image: '🌿', calories: 30, protein: 1, carbs: 6, fats: 0 },
  { name: 'Curry Leaf Juice', image: '🍃', calories: 35, protein: 2, carbs: 7, fats: 0 },
  { name: 'Fenugreek Leaf Juice', image: '🍃', calories: 40, protein: 3, carbs: 7, fats: 0 },
  { name: 'Mustard Leaf Juice', image: '🍃', calories: 35, protein: 2, carbs: 7, fats: 0 },
  { name: 'Rocket Leaf Juice', image: '🌿', calories: 28, protein: 2, carbs: 5, fats: 0 },
  
  // TREE LEAF JUICES
  { name: 'Guava Leaf Juice', image: '🍃', calories: 15, protein: 1, carbs: 3, fats: 0 },
  { name: 'Mango Leaf Juice', image: '🍃', calories: 10, protein: 0, carbs: 2, fats: 0 },
  { name: 'Papaya Leaf Juice', image: '🍃', calories: 22, protein: 2, carbs: 4, fats: 0 },
  { name: 'Jamun Leaf Juice', image: '🍃', calories: 18, protein: 1, carbs: 3, fats: 0 },
  { name: 'Coconut Leaf Juice', image: '🍃', calories: 12, protein: 0, carbs: 3, fats: 0 },
  { name: 'Banana Leaf Tea', image: '🍃', calories: 12, protein: 0, carbs: 3, fats: 0 },
  { name: 'Jackfruit Leaf Juice', image: '🍃', calories: 15, protein: 1, carbs: 3, fats: 0 },
  { name: 'Tamarind Leaf Juice', image: '🍃', calories: 18, protein: 1, carbs: 4, fats: 0 },
  { name: 'Drumstick Leaf Juice', image: '🍃', calories: 32, protein: 3, carbs: 6, fats: 0 },
  { name: 'Eucalyptus Leaf Tea', image: '🍃', calories: 8, protein: 0, carbs: 2, fats: 0 },
  { name: 'Tea Tree Leaf Juice', image: '🍃', calories: 10, protein: 0, carbs: 2, fats: 0 },
  { name: 'Neem Tree Leaf Juice', image: '🍃', calories: 15, protein: 1, carbs: 3, fats: 0 },
  
  // VEGETABLE LEAF JUICES
  { name: 'Spinach Leaf Pure', image: '🥬', calories: 35, protein: 3, carbs: 6, fats: 0 },
  { name: 'Kale Leaf Extract', image: '🥬', calories: 40, protein: 3, carbs: 8, fats: 0 },
  { name: 'Lettuce Leaf Juice', image: '🥬', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Cabbage Leaf Juice', image: '🥬', calories: 32, protein: 2, carbs: 6, fats: 0 },
  { name: 'Bok Choy Leaf Extract', image: '🥬', calories: 25, protein: 2, carbs: 4, fats: 0 },
  { name: 'Swiss Chard Juice', image: '🍃', calories: 30, protein: 2, carbs: 6, fats: 0 },
  { name: 'Collard Green Juice', image: '🥬', calories: 35, protein: 3, carbs: 7, fats: 0 },
  { name: 'Turnip Green Juice', image: '🍃', calories: 30, protein: 2, carbs: 6, fats: 0 },
  { name: 'Radish Leaf Juice', image: '🍃', calories: 30, protein: 2, carbs: 6, fats: 0 },
  { name: 'Beetroot Leaf Juice', image: '🍃', calories: 35, protein: 2, carbs: 7, fats: 0 },
  { name: 'Carrot Top Juice', image: '🥕', calories: 28, protein: 2, carbs: 5, fats: 0 },
  { name: 'Sweet Potato Leaf Juice', image: '🍃', calories: 30, protein: 2, carbs: 6, fats: 0 },
  
  // WILD EDIBLE LEAF JUICES
  { name: 'Dandelion Leaf Extract', image: '🌿', calories: 20, protein: 1, carbs: 4, fats: 0 },
  { name: 'Nettle Leaf Juice', image: '🍃', calories: 25, protein: 2, carbs: 4, fats: 0 },
  { name: 'Plantain Leaf Extract', image: '🍃', calories: 18, protein: 1, carbs: 3, fats: 0 },
  { name: 'Clover Leaf Juice', image: '🍃', calories: 22, protein: 2, carbs: 4, fats: 0 },
  { name: 'Sorrel Leaf Juice', image: '🍃', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Violet Leaf Juice', image: '🍃', calories: 20, protein: 1, carbs: 4, fats: 0 },
  { name: 'Purslane Leaf Juice', image: '🍃', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Lamb Quarters Juice', image: '🍃', calories: 30, protein: 2, carbs: 6, fats: 0 },
  { name: 'Chickweed Leaf Juice', image: '🍃', calories: 18, protein: 1, carbs: 3, fats: 0 },
  { name: 'Wood Sorrel Juice', image: '🍃', calories: 20, protein: 1, carbs: 4, fats: 0 },
  
  // EXOTIC LEAF JUICES
  { name: 'Pandan Leaf Juice', image: '🍃', calories: 20, protein: 1, carbs: 4, fats: 0 },
  { name: 'Kaffir Lime Leaf Juice', image: '🍃', calories: 15, protein: 0, carbs: 3, fats: 0 },
  { name: 'Lemongrass Leaf Extract', image: '🌿', calories: 15, protein: 0, carbs: 3, fats: 0 },
  { name: 'Galangal Leaf Juice', image: '🍃', calories: 18, protein: 1, carbs: 3, fats: 0 },
  { name: 'Turmeric Leaf Juice', image: '🍃', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Ginger Leaf Extract', image: '🍃', calories: 20, protein: 1, carbs: 4, fats: 0 },
  { name: 'Galangal Leaf Extract', image: '🍃', calories: 18, protein: 1, carbs: 3, fats: 0 },
  { name: 'Betel Leaf Juice', image: '🍃', calories: 15, protein: 1, carbs: 3, fats: 0 },
  { name: 'Banana Flower Leaf Juice', image: '🍃', calories: 22, protein: 1, carbs: 4, fats: 0 },
  { name: 'Lotus Leaf Tea', image: '🍃', calories: 12, protein: 0, carbs: 3, fats: 0 },
  
  // GRAIN GRASS LEAF JUICES
  { name: 'Wheatgrass Leaf Juice', image: '🌾', calories: 20, protein: 2, carbs: 4, fats: 0 },
  { name: 'Barley Grass Juice', image: '🌾', calories: 25, protein: 2, carbs: 5, fats: 0 },
  { name: 'Oat Grass Juice', image: '🌾', calories: 22, protein: 2, carbs: 4, fats: 0 },
  { name: 'Rye Grass Juice', image: '🌾', calories: 24, protein: 2, carbs: 5, fats: 0 },
  { name: 'Kamut Grass Juice', image: '🌾', calories: 26, protein: 2, carbs: 5, fats: 0 },
  { name: 'Spelt Grass Juice', image: '🌾', calories: 23, protein: 2, carbs: 4, fats: 0 },
  { name: 'Quinoa Leaf Juice', image: '🌾', calories: 28, protein: 3, carbs: 5, fats: 0 },
  { name: 'Amaranth Leaf Juice', image: '🍃', calories: 30, protein: 2, carbs: 6, fats: 0 },
  { name: 'Buckwheat Leaf Juice', image: '🌾', calories: 25, protein: 2, carbs: 5, fats: 0 },
  { name: 'Millet Grass Juice', image: '🌾', calories: 24, protein: 2, carbs: 5, fats: 0 },
  
  // MIXED & SPECIALTY JUICES (25 items)
  { name: 'Green Detox Juice', image: '🥬', calories: 85, protein: 2, carbs: 18, fats: 1 },
  { name: 'Orange Carrot Juice', image: '🥕', calories: 95, protein: 2, carbs: 22, fats: 0 },
  { name: 'Apple Carrot Ginger', image: '🍎', calories: 90, protein: 1, carbs: 21, fats: 0 },
  { name: 'Beet Apple Carrot', image: '🟣', calories: 85, protein: 2, carbs: 19, fats: 0 },
  { name: 'Green Goddess Mix', image: '💚', calories: 65, protein: 3, carbs: 14, fats: 0 },
  { name: 'Rainbow Veggie Juice', image: '🌈', calories: 70, protein: 2, carbs: 15, fats: 0 },
  { name: 'Tropical Fruit Blend', image: '🌴', calories: 105, protein: 1, carbs: 25, fats: 0 },
  { name: 'Citrus Power Mix', image: '🍊', calories: 80, protein: 1, carbs: 19, fats: 0 },
  { name: 'Berry Antioxidant Blend', image: '🫐', calories: 75, protein: 1, carbs: 17, fats: 0 },
  { name: 'Immunity Booster Juice', image: '💪', calories: 90, protein: 2, carbs: 20, fats: 0 },
  { name: 'Energy Blast Juice', image: '⚡', calories: 110, protein: 2, carbs: 26, fats: 0 },
  { name: 'Digestive Aid Juice', image: '🌿', calories: 55, protein: 1, carbs: 12, fats: 0 },
  { name: 'Anti-Inflammatory Mix', image: '🟡', calories: 60, protein: 2, carbs: 13, fats: 0 },
  { name: 'Liver Cleanse Juice', image: '�', calories: 50, protein: 2, carbs: 11, fats: 0 },
  { name: 'Heart Healthy Blend', image: '❤️', calories: 70, protein: 2, carbs: 15, fats: 0 },
  { name: 'Brain Booster Juice', image: '🧠', calories: 85, protein: 2, carbs: 19, fats: 0 },
  { name: 'Skin Glow Juice', image: '✨', calories: 75, protein: 2, carbs: 16, fats: 0 },
  { name: 'Morning Kickstart', image: '🌅', calories: 95, protein: 2, carbs: 22, fats: 0 },
  { name: 'Post Workout Recovery', image: '🏃', calories: 100, protein: 3, carbs: 23, fats: 0 },
  { name: 'Stress Relief Blend', image: '🧘', calories: 65, protein: 1, carbs: 14, fats: 0 },
  { name: 'Metabolism Booster', image: '🔥', calories: 70, protein: 2, carbs: 15, fats: 0 },
  { name: 'Alkaline Balance Juice', image: '⚖️', calories: 55, protein: 2, carbs: 12, fats: 0 },
  { name: 'Hydration Plus Mix', image: '💧', calories: 45, protein: 1, carbs: 10, fats: 0 },
  { name: 'Vitamin C Power Juice', image: '🍊', calories: 85, protein: 1, carbs: 20, fats: 0 },
  { name: 'Iron Rich Blend', image: '🥬', calories: 60, protein: 3, carbs: 13, fats: 0 },
  
  // FAMOUS REGIONAL JUICES FROM INDIAN CITIES & STATES (50 items)
  { name: 'Mumbai Sugarcane Juice', image: '🌾', calories: 110, protein: 0, carbs: 28, fats: 0 },
  { name: 'Delhi Nimbu Paani', image: '🍋', calories: 45, protein: 0, carbs: 11, fats: 0 },
  { name: 'Kolkata Daab er Jol', image: '🥥', calories: 40, protein: 1, carbs: 8, fats: 0 },
  { name: 'Chennai Paneer Soda', image: '🥤', calories: 65, protein: 0, carbs: 16, fats: 0 },
  { name: 'Bangalore Badam Milk', image: '🥛', calories: 145, protein: 6, carbs: 20, fats: 4 },
  { name: 'Hyderabad Rooh Afza', image: '🌹', calories: 85, protein: 0, carbs: 21, fats: 0 },
  { name: 'Pune Solkadhi', image: '🟣', calories: 75, protein: 1, carbs: 15, fats: 2 },
  { name: 'Jaipur Thandai', image: '🥛', calories: 165, protein: 5, carbs: 22, fats: 6 },
  { name: 'Ahmedabad Khajur Pak Juice', image: '🟤', calories: 135, protein: 2, carbs: 32, fats: 0 },
  { name: 'Lucknow Sharbat-e-Sandal', image: '🌸', calories: 95, protein: 0, carbs: 23, fats: 0 },
  { name: 'Amritsar Lassi Sweet', image: '🥛', calories: 155, protein: 6, carbs: 24, fats: 4 },
  { name: 'Amritsar Lassi Salted', image: '🥛', calories: 125, protein: 6, carbs: 18, fats: 4 },
  { name: 'Varanasi Kesar Kulfi Drink', image: '🟡', calories: 175, protein: 5, carbs: 28, fats: 5 },
  { name: 'Goa Kokum Juice', image: '🟣', calories: 55, protein: 1, carbs: 12, fats: 0 },
  { name: 'Kerala Tender Coconut', image: '🥥', calories: 35, protein: 1, carbs: 7, fats: 0 },
  { name: 'Tamil Nadu Nannari Juice', image: '🌿', calories: 70, protein: 0, carbs: 17, fats: 0 },
  { name: 'Karnataka Ragi Malt', image: '🟤', calories: 95, protein: 3, carbs: 20, fats: 1 },
  { name: 'Andhra Pradesh Tamarind Juice', image: '🟤', calories: 50, protein: 1, carbs: 11, fats: 0 },
  { name: 'West Bengal Aam Panna', image: '🥭', calories: 85, protein: 1, carbs: 20, fats: 0 },
  { name: 'Odisha Bel Juice', image: '🟡', calories: 95, protein: 2, carbs: 22, fats: 0 },
  { name: 'Assam Ou Tenga Juice', image: '🟡', calories: 40, protein: 1, carbs: 9, fats: 0 },
  { name: 'Gujarat Chaas Masala', image: '🥛', calories: 85, protein: 4, carbs: 12, fats: 2 },
  { name: 'Rajasthan Ker Sangri Juice', image: '🌿', calories: 45, protein: 2, carbs: 8, fats: 1 },
  { name: 'Haryana Sattu Drink', image: '🟤', calories: 110, protein: 4, carbs: 22, fats: 1 },
  { name: 'Punjab Kulfi Falooda', image: '🍨', calories: 185, protein: 5, carbs: 32, fats: 5 },
  { name: 'Himachal Apple Juice', image: '🍎', calories: 85, protein: 0, carbs: 21, fats: 0 },
  { name: 'Kashmir Kahwa Tea', image: '☕', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Uttarakhand Buransh Juice', image: '🌺', calories: 60, protein: 1, carbs: 14, fats: 0 },
  { name: 'Meghalaya Sohiong Juice', image: '🟢', calories: 75, protein: 1, carbs: 17, fats: 0 },
  { name: 'Manipur Hawai Jar Juice', image: '🍑', calories: 80, protein: 1, carbs: 19, fats: 0 },
  { name: 'Mizoram Passion Fruit Juice', image: '🟡', calories: 90, protein: 2, carbs: 20, fats: 0 },
  { name: 'Nagaland Bhut Jolokia Drink', image: '🌶️', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Sikkim Chhurpi Tea', image: '🫖', calories: 45, protein: 3, carbs: 6, fats: 1 },
  { name: 'Tripura Queen Pineapple Juice', image: '🍍', calories: 105, protein: 1, carbs: 25, fats: 0 },
  { name: 'Arunachal Kiwi Juice', image: '🥝', calories: 85, protein: 1, carbs: 20, fats: 0 },
  { name: 'Jharkhand Mahua Juice', image: '🌸', calories: 95, protein: 1, carbs: 23, fats: 0 },
  { name: 'Chhattisgarh Tendu Juice', image: '🟡', calories: 70, protein: 1, carbs: 16, fats: 0 },
  { name: 'Madhya Pradesh Amla Juice', image: '🟢', calories: 55, protein: 1, carbs: 12, fats: 0 },
  { name: 'Bihar Makhana Shake', image: '⚪', calories: 125, protein: 4, carbs: 24, fats: 2 },
  { name: 'UP Jamun Juice', image: '🟣', calories: 75, protein: 1, carbs: 17, fats: 0 },
  { name: 'Telangana Borassus Juice', image: '🌴', calories: 85, protein: 1, carbs: 20, fats: 0 },
  { name: 'Andaman Coconut Punch', image: '🥥', calories: 95, protein: 1, carbs: 22, fats: 1 },
  { name: 'Lakshadweep Tuna Water', image: '🐟', calories: 30, protein: 2, carbs: 5, fats: 0 },
  { name: 'Puducherry French Lime Soda', image: '🍋', calories: 55, protein: 0, carbs: 13, fats: 0 },
  { name: 'Daman Sea Buckthorn Juice', image: '🟠', calories: 65, protein: 1, carbs: 15, fats: 0 },
  { name: 'Chandigarh Rose Sherbet', image: '🌹', calories: 85, protein: 0, carbs: 21, fats: 0 },
  { name: 'Delhi NCR Jal Jeera', image: '🌿', calories: 35, protein: 1, carbs: 7, fats: 0 },
  { name: 'Mumbai Masala Chaas', image: '🥛', calories: 95, protein: 4, carbs: 14, fats: 3 },
  { name: 'Kolkata Gondhoraj Sherbet', image: '🍋', calories: 60, protein: 0, carbs: 14, fats: 0 },
  { name: 'Chennai Filter Coffee', image: '☕', calories: 45, protein: 2, carbs: 8, fats: 1 },
  
  // FAMOUS INTERNATIONAL CITY JUICES (30 items)
  { name: 'New York Green Juice', image: '🥬', calories: 75, protein: 3, carbs: 15, fats: 0 },
  { name: 'California Orange Juice', image: '🍊', calories: 90, protein: 1, carbs: 21, fats: 0 },
  { name: 'Florida Grapefruit Juice', image: '🍊', calories: 75, protein: 1, carbs: 18, fats: 0 },
  { name: 'Hawaii Pineapple Juice', image: '🍍', calories: 105, protein: 1, carbs: 25, fats: 0 },
  { name: 'Texas Watermelon Juice', image: '🍉', calories: 60, protein: 1, carbs: 14, fats: 0 },
  { name: 'Arizona Cactus Juice', image: '🌵', calories: 45, protein: 1, carbs: 10, fats: 0 },
  { name: 'London Elderflower Juice', image: '🌸', calories: 65, protein: 0, carbs: 16, fats: 0 },
  { name: 'Paris Grape Juice', image: '🍇', calories: 110, protein: 1, carbs: 26, fats: 0 },
  { name: 'Rome Lemon Granita', image: '🍋', calories: 85, protein: 0, carbs: 21, fats: 0 },
  { name: 'Barcelona Orange Agua', image: '🍊', calories: 80, protein: 1, carbs: 19, fats: 0 },
  { name: 'Tokyo Yuzu Juice', image: '🟡', calories: 35, protein: 1, carbs: 8, fats: 0 },
  { name: 'Seoul Pear Juice', image: '🍐', calories: 95, protein: 1, carbs: 23, fats: 0 },
  { name: 'Beijing Jujube Juice', image: '🔴', calories: 85, protein: 1, carbs: 20, fats: 0 },
  { name: 'Shanghai Lychee Juice', image: '⚪', calories: 95, protein: 1, carbs: 22, fats: 0 },
  { name: 'Bangkok Coconut Water', image: '🥥', calories: 40, protein: 1, carbs: 8, fats: 0 },
  { name: 'Manila Mango Juice', image: '🥭', calories: 120, protein: 1, carbs: 28, fats: 0 },
  { name: 'Singapore Sugarcane Juice', image: '🌾', calories: 115, protein: 0, carbs: 29, fats: 0 },
  { name: 'Dubai Date Juice', image: '🟤', calories: 125, protein: 1, carbs: 30, fats: 0 },
  { name: 'Cairo Tamarind Juice', image: '🟤', calories: 50, protein: 1, carbs: 11, fats: 0 },
  { name: 'Cape Town Rooibos Tea', image: '🍵', calories: 5, protein: 0, carbs: 1, fats: 0 },
  { name: 'Rio Acai Juice', image: '🫐', calories: 85, protein: 1, carbs: 19, fats: 1 },
  { name: 'Mexico City Agua Fresca', image: '🍉', calories: 65, protein: 1, carbs: 15, fats: 0 },
  { name: 'Buenos Aires Mate Tea', image: '🧉', calories: 15, protein: 1, carbs: 3, fats: 0 },
  { name: 'Lima Chicha Morada', image: '🟣', calories: 95, protein: 1, carbs: 23, fats: 0 },
  { name: 'Marrakech Mint Tea', image: '🌿', calories: 25, protein: 0, carbs: 6, fats: 0 },
  { name: 'Istanbul Pomegranate Juice', image: '🍇', calories: 115, protein: 1, carbs: 28, fats: 0 },
  { name: 'Moscow Birch Juice', image: '🌳', calories: 35, protein: 0, carbs: 8, fats: 0 },
  { name: 'Stockholm Lingonberry Juice', image: '🔴', calories: 70, protein: 0, carbs: 17, fats: 0 },
  { name: 'Amsterdam Carrot Juice', image: '🥕', calories: 80, protein: 2, carbs: 18, fats: 0 },
  { name: 'Melbourne Beetroot Juice', image: '🟣', calories: 75, protein: 2, carbs: 16, fats: 0 },
  
  // LEAF-BASED JUICES & HERBAL EXTRACTS (35 items)
  { name: 'Fresh Mint Leaf Juice', image: '🌿', calories: 20, protein: 1, carbs: 4, fats: 0 },
  { name: 'Basil Leaf Extract', image: '🌿', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Coriander Leaf Juice', image: '🌿', calories: 30, protein: 2, carbs: 6, fats: 0 },
  { name: 'Curry Leaf Extract', image: '🍃', calories: 35, protein: 2, carbs: 7, fats: 0 },
  { name: 'Neem Leaf Juice', image: '🍃', calories: 15, protein: 1, carbs: 3, fats: 0 },
  { name: 'Tulsi Leaf Extract', image: '🍃', calories: 18, protein: 1, carbs: 4, fats: 0 },
  { name: 'Oregano Leaf Juice', image: '🌿', calories: 22, protein: 1, carbs: 4, fats: 0 },
  { name: 'Parsley Leaf Extract', image: '🌿', calories: 28, protein: 2, carbs: 5, fats: 0 },
  { name: 'Dill Leaf Juice', image: '🌿', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Fenugreek Leaf Juice', image: '🍃', calories: 40, protein: 3, carbs: 7, fats: 0 },
  { name: 'Moringa Leaf Extract', image: '🍃', calories: 35, protein: 4, carbs: 6, fats: 0 },
  { name: 'Drumstick Leaf Juice', image: '🍃', calories: 32, protein: 3, carbs: 6, fats: 0 },
  { name: 'Amaranth Leaf Juice', image: '🍃', calories: 30, protein: 2, carbs: 6, fats: 0 },
  { name: 'Spinach Leaf Pure', image: '🥬', calories: 35, protein: 3, carbs: 6, fats: 0 },
  { name: 'Kale Leaf Extract', image: '🥬', calories: 40, protein: 3, carbs: 8, fats: 0 },
  { name: 'Lettuce Leaf Juice', image: '🥬', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Rocket Leaves Juice', image: '🥬', calories: 28, protein: 2, carbs: 5, fats: 0 },
  { name: 'Mustard Leaf Extract', image: '🍃', calories: 35, protein: 2, carbs: 7, fats: 0 },
  { name: 'Radish Leaf Juice', image: '🍃', calories: 30, protein: 2, carbs: 6, fats: 0 },
  { name: 'Turnip Leaf Extract', image: '🍃', calories: 28, protein: 2, carbs: 5, fats: 0 },
  { name: 'Cabbage Leaf Juice', image: '🥬', calories: 32, protein: 2, carbs: 6, fats: 0 },
  { name: 'Bok Choy Leaf Extract', image: '🥬', calories: 25, protein: 2, carbs: 4, fats: 0 },
  { name: 'Swiss Chard Juice', image: '🍃', calories: 30, protein: 2, carbs: 6, fats: 0 },
  { name: 'Collard Green Juice', image: '🥬', calories: 35, protein: 3, carbs: 7, fats: 0 },
  { name: 'Dandelion Leaf Extract', image: '🌿', calories: 20, protein: 1, carbs: 4, fats: 0 },
  { name: 'Nettle Leaf Juice', image: '🍃', calories: 25, protein: 2, carbs: 4, fats: 0 },
  { name: 'Plantain Leaf Extract', image: '🍃', calories: 18, protein: 1, carbs: 3, fats: 0 },
  { name: 'Banana Leaf Tea', image: '🍃', calories: 12, protein: 0, carbs: 3, fats: 0 },
  { name: 'Guava Leaf Extract', image: '🍃', calories: 15, protein: 1, carbs: 3, fats: 0 },
  { name: 'Mango Leaf Tea', image: '🍃', calories: 10, protein: 0, carbs: 2, fats: 0 },
  { name: 'Papaya Leaf Juice', image: '🍃', calories: 22, protein: 2, carbs: 4, fats: 0 },
  { name: 'Jamun Leaf Extract', image: '🍃', calories: 18, protein: 1, carbs: 3, fats: 0 },
  { name: 'Eucalyptus Leaf Tea', image: '🍃', calories: 8, protein: 0, carbs: 2, fats: 0 },
  { name: 'Lemongrass Extract', image: '🌿', calories: 15, protein: 0, carbs: 3, fats: 0 },
  { name: 'Pandan Leaf Juice', image: '🍃', calories: 20, protein: 1, carbs: 4, fats: 0 },
  
  // BARK, STEM & ROOT EXTRACTS (20 items)
  { name: 'Cinnamon Bark Tea', image: '🟤', calories: 12, protein: 0, carbs: 3, fats: 0 },
  { name: 'Ginger Root Juice', image: '🫚', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Turmeric Root Extract', image: '🟡', calories: 30, protein: 1, carbs: 6, fats: 0 },
  { name: 'Licorice Root Tea', image: '🟤', calories: 15, protein: 0, carbs: 4, fats: 0 },
  { name: 'Dandelion Root Extract', image: '🟤', calories: 18, protein: 1, carbs: 3, fats: 0 },
  { name: 'Burdock Root Juice', image: '🟤', calories: 35, protein: 1, carbs: 8, fats: 0 },
  { name: 'Ashwagandha Root Tea', image: '🟤', calories: 20, protein: 1, carbs: 4, fats: 0 },
  { name: 'Ginseng Root Extract', image: '🟤', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Valerian Root Tea', image: '🟤', calories: 15, protein: 0, carbs: 3, fats: 0 },
  { name: 'Marshmallow Root Extract', image: '🤍', calories: 20, protein: 1, carbs: 4, fats: 0 },
  { name: 'Bamboo Shoot Juice', image: '🎋', calories: 40, protein: 2, carbs: 8, fats: 0 },
  { name: 'Sugarcane Stem Juice', image: '🌾', calories: 110, protein: 0, carbs: 28, fats: 0 },
  { name: 'Celery Stem Extract', image: '🌿', calories: 35, protein: 1, carbs: 7, fats: 0 },
  { name: 'Rhubarb Stem Juice', image: '🔴', calories: 45, protein: 1, carbs: 10, fats: 0 },
  { name: 'Fennel Stem Extract', image: '🌿', calories: 30, protein: 1, carbs: 6, fats: 0 },
  { name: 'Asparagus Stem Juice', image: '🌿', calories: 35, protein: 2, carbs: 6, fats: 0 },
  { name: 'Lotus Stem Extract', image: '🪷', calories: 45, protein: 2, carbs: 10, fats: 0 },
  { name: 'Water Chestnut Extract', image: '⚪', calories: 50, protein: 1, carbs: 12, fats: 0 },
  { name: 'Beetroot Stem Juice', image: '🔴', calories: 30, protein: 2, carbs: 6, fats: 0 },
  { name: 'Radish Stem Extract', image: '🌿', calories: 25, protein: 1, carbs: 5, fats: 0 },
  
  // FLOWER & PETAL EXTRACTS (15 items)
  { name: 'Rose Petal Juice', image: '🌹', calories: 35, protein: 1, carbs: 8, fats: 0 },
  { name: 'Hibiscus Flower Tea', image: '🌺', calories: 20, protein: 0, carbs: 5, fats: 0 },
  { name: 'Jasmine Flower Extract', image: '🌸', calories: 15, protein: 0, carbs: 4, fats: 0 },
  { name: 'Lavender Flower Tea', image: '💜', calories: 12, protein: 0, carbs: 3, fats: 0 },
  { name: 'Chamomile Flower Extract', image: '🌼', calories: 10, protein: 0, carbs: 2, fats: 0 },
  { name: 'Marigold Petal Juice', image: '🟠', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Chrysanthemum Tea', image: '🌻', calories: 18, protein: 0, carbs: 4, fats: 0 },
  { name: 'Lotus Flower Extract', image: '🪷', calories: 30, protein: 1, carbs: 6, fats: 0 },
  { name: 'Sunflower Petal Tea', image: '🌻', calories: 20, protein: 1, carbs: 4, fats: 0 },
  { name: 'Orange Blossom Water', image: '🌸', calories: 25, protein: 0, carbs: 6, fats: 0 },
  { name: 'Elderflower Extract', image: '🌸', calories: 30, protein: 0, carbs: 7, fats: 0 },
  { name: 'Violet Flower Tea', image: '💜', calories: 15, protein: 0, carbs: 3, fats: 0 },
  { name: 'Pansy Flower Extract', image: '💜', calories: 12, protein: 0, carbs: 3, fats: 0 },
  { name: 'Nasturtium Flower Juice', image: '🟠', calories: 20, protein: 1, carbs: 4, fats: 0 },
  { name: 'Calendula Petal Extract', image: '🟡', calories: 22, protein: 1, carbs: 4, fats: 0 },
  
  // SEED & NUT BASED DRINKS (15 items)
  { name: 'Chia Seed Water', image: '⚫', calories: 45, protein: 2, carbs: 8, fats: 2 },
  { name: 'Flax Seed Drink', image: '🟤', calories: 55, protein: 2, carbs: 6, fats: 4 },
  { name: 'Sesame Seed Milk', image: '🤍', calories: 85, protein: 3, carbs: 8, fats: 6 },
  { name: 'Sunflower Seed Milk', image: '🌻', calories: 75, protein: 3, carbs: 6, fats: 5 },
  { name: 'Pumpkin Seed Drink', image: '🎃', calories: 95, protein: 4, carbs: 8, fats: 6 },
  { name: 'Watermelon Seed Juice', image: '🍉', calories: 65, protein: 3, carbs: 6, fats: 4 },
  { name: 'Fennel Seed Water', image: '🌿', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Cumin Seed Drink', image: '🟤', calories: 30, protein: 1, carbs: 6, fats: 1 },
  { name: 'Coriander Seed Water', image: '⚪', calories: 35, protein: 1, carbs: 7, fats: 1 },
  { name: 'Fenugreek Seed Drink', image: '🟤', calories: 40, protein: 2, carbs: 8, fats: 1 },
  { name: 'Mustard Seed Extract', image: '🟡', calories: 35, protein: 2, carbs: 6, fats: 1 },
  { name: 'Nigella Seed Water', image: '⚫', calories: 30, protein: 1, carbs: 5, fats: 2 },
  { name: 'Ajwain Seed Drink', image: '🟤', calories: 25, protein: 1, carbs: 5, fats: 0 },
  { name: 'Methi Seed Water', image: '🟡', calories: 35, protein: 2, carbs: 6, fats: 1 },
  { name: 'Sabja Seed Drink', image: '⚫', calories: 40, protein: 2, carbs: 7, fats: 2 },
  { name: 'Kale Apple Smoothie', image: '🍏', calories: 125, protein: 3, carbs: 26, fats: 1 },
  { name: 'Spinach Banana Shake', image: '🍌', calories: 145, protein: 4, carbs: 32, fats: 2 },
  { name: 'Avocado Smoothie', image: '🥑', calories: 185, protein: 4, carbs: 22, fats: 12 },
  { name: 'Chia Seed Pudding', image: '⚫', calories: 165, protein: 6, carbs: 18, fats: 8 },
  { name: 'Oat Milk Latte', image: '☕', calories: 125, protein: 3, carbs: 22, fats: 3 },
  { name: 'Almond Milk Chai', image: '🫖', calories: 95, protein: 2, carbs: 18, fats: 2 },
  { name: 'Coconut Water', image: '🥥', calories: 45, protein: 1, carbs: 9, fats: 0 },
  { name: 'Kombucha', image: '🫧', calories: 25, protein: 0, carbs: 6, fats: 0 },
  { name: 'Fresh Lemonade', image: '🍋', calories: 65, protein: 0, carbs: 16, fats: 0 },
  { name: 'Mint Cucumber Water', image: '🥒', calories: 15, protein: 0, carbs: 3, fats: 0 },
  { name: 'Turmeric Latte', image: '🟡', calories: 105, protein: 3, carbs: 18, fats: 3 },
  { name: 'Matcha Latte', image: '🍵', calories: 115, protein: 4, carbs: 16, fats: 4 },
  { name: 'Golden Milk', image: '🥛', calories: 135, protein: 4, carbs: 18, fats: 5 },
  { name: 'Herbal Tea Blend', image: '🍵', calories: 5, protein: 0, carbs: 1, fats: 0 },
  { name: 'Fruit Infused Water', image: '💧', calories: 25, protein: 0, carbs: 6, fats: 0 }
];

// GOURMET WRAPS & SANDWICHES (30 items)
const gourmetWraps = [
  { name: 'Mediterranean Wrap', image: '🌯', calories: 265, protein: 10, carbs: 35, fats: 9 },
  { name: 'Hummus Veggie Wrap', image: '🌯', calories: 225, protein: 8, carbs: 32, fats: 7 },
  { name: 'Avocado BLT Wrap', image: '🥑', calories: 285, protein: 8, carbs: 28, fats: 16 },
  { name: 'Quinoa Power Wrap', image: '⚪', calories: 245, protein: 10, carbs: 38, fats: 6 },
  { name: 'Greek Goddess Wrap', image: '🫒', calories: 255, protein: 12, carbs: 28, fats: 11 },
  { name: 'California Club Sandwich', image: '🥪', calories: 315, protein: 12, carbs: 35, fats: 14 },
  { name: 'Caprese Panini', image: '🍅', calories: 275, protein: 14, carbs: 28, fats: 12 },
  { name: 'Grilled Veggie Sandwich', image: '🥪', calories: 235, protein: 8, carbs: 32, fats: 8 },
  { name: 'Pesto Mozzarella Wrap', image: '🌿', calories: 295, protein: 15, carbs: 25, fats: 16 },
  { name: 'Buffalo Cauliflower Wrap', image: '🌶️', calories: 225, protein: 7, carbs: 28, fats: 10 },
  { name: 'Asian Lettuce Wrap', image: '🥬', calories: 145, protein: 6, carbs: 18, fats: 5 },
  { name: 'Mexican Bean Burrito', image: '🌯', calories: 385, protein: 14, carbs: 55, fats: 12 },
  { name: 'Indian Kati Roll', image: '🌯', calories: 255, protein: 9, carbs: 38, fats: 8 },
  { name: 'Thai Peanut Wrap', image: '🥜', calories: 285, protein: 11, carbs: 32, fats: 13 },
  { name: 'Middle Eastern Falafel', image: '🧆', calories: 245, protein: 9, carbs: 28, fats: 11 },
  { name: 'European Rye Sandwich', image: '🍞', calories: 185, protein: 7, carbs: 28, fats: 5 },
  { name: 'American Deli Sub', image: '🥪', calories: 345, protein: 15, carbs: 42, fats: 12 },
  { name: 'French Croque Monsieur', image: '🥪', calories: 325, protein: 18, carbs: 25, fats: 18 },
  { name: 'Italian Focaccia Sandwich', image: '🥪', calories: 295, protein: 11, carbs: 35, fats: 12 },
  { name: 'Cuban Black Bean Wrap', image: '🖤', calories: 265, protein: 11, carbs: 42, fats: 6 },
  { name: 'Korean Kimchi Wrap', image: '🌶️', calories: 185, protein: 6, carbs: 28, fats: 5 },
  { name: 'Japanese Onigiri', image: '🍙', calories: 165, protein: 4, carbs: 32, fats: 2 },
  { name: 'Vietnamese Banh Mi', image: '🥪', calories: 225, protein: 8, carbs: 35, fats: 6 },
  { name: 'Turkish Doner Wrap', image: '🌯', calories: 285, protein: 12, carbs: 32, fats: 11 },
  { name: 'Lebanese Shawarma', image: '🌯', calories: 275, protein: 11, carbs: 28, fats: 13 },
  { name: 'Moroccan Tagine Wrap', image: '🌯', calories: 245, protein: 8, carbs: 35, fats: 8 },
  { name: 'Spanish Bocadillo', image: '🥪', calories: 255, protein: 9, carbs: 32, fats: 9 },
  { name: 'German Pretzel Sandwich', image: '🥨', calories: 285, protein: 10, carbs: 42, fats: 8 },
  { name: 'British Tea Sandwich', image: '🫖', calories: 165, protein: 6, carbs: 22, fats: 6 },
  { name: 'Scandinavian Open Sandwich', image: '🍞', calories: 185, protein: 8, carbs: 18, fats: 8 }
];

// PREMIUM DESSERTS & TREATS (50 items)
const premiumDesserts = [
  { name: 'Dark Chocolate Truffle', image: '🍫', calories: 85, protein: 2, carbs: 8, fats: 6 },
  { name: 'Vanilla Bean Panna Cotta', image: '🍮', calories: 145, protein: 4, carbs: 18, fats: 7 },
  { name: 'Strawberry Cheesecake', image: '🍰', calories: 285, protein: 6, carbs: 35, fats: 14 },
  { name: 'Tiramisu', image: '🍰', calories: 265, protein: 5, carbs: 32, fats: 13 },
  { name: 'Crème Brûlée', image: '🍮', calories: 225, protein: 4, carbs: 22, fats: 14 },
  { name: 'Chocolate Lava Cake', image: '🍫', calories: 345, protein: 6, carbs: 42, fats: 18 },
  { name: 'Fruit Tart', image: '🥧', calories: 195, protein: 3, carbs: 32, fats: 7 },
  { name: 'Macarons', image: '🧁', calories: 125, protein: 2, carbs: 18, fats: 5 },
  { name: 'Gelato', image: '🍨', calories: 165, protein: 3, carbs: 24, fats: 7 },
  { name: 'Sorbet', image: '🍧', calories: 95, protein: 0, carbs: 24, fats: 0 },
  { name: 'Mousse', image: '🍮', calories: 185, protein: 4, carbs: 22, fats: 9 },
  { name: 'Eclairs', image: '🥖', calories: 245, protein: 5, carbs: 28, fats: 13 },
  { name: 'Opera Cake', image: '🎭', calories: 315, protein: 6, carbs: 38, fats: 16 },
  { name: 'Mille-feuille', image: '🥧', calories: 285, protein: 4, carbs: 32, fats: 16 },
  { name: 'Profiteroles', image: '⚪', calories: 195, protein: 4, carbs: 22, fats: 10 },
  { name: 'Cannoli', image: '🥖', calories: 225, protein: 6, carbs: 25, fats: 12 },
  { name: 'Baklava', image: '🥧', calories: 205, protein: 4, carbs: 28, fats: 9 },
  { name: 'Tres Leches', image: '🍰', calories: 255, protein: 6, carbs: 35, fats: 10 },
  { name: 'Red Velvet Cupcake', image: '🧁', calories: 265, protein: 4, carbs: 38, fats: 11 },
  { name: 'Lemon Tart', image: '🍋', calories: 185, protein: 3, carbs: 28, fats: 7 },
  { name: 'Chocolate Soufflé', image: '🍫', calories: 165, protein: 5, carbs: 18, fats: 8 },
  { name: 'Fruit Parfait', image: '🍓', calories: 145, protein: 6, carbs: 25, fats: 3 },
  { name: 'Banana Foster', image: '🍌', calories: 225, protein: 2, carbs: 42, fats: 6 },
  { name: 'Apple Crisp', image: '🍎', calories: 185, protein: 2, carbs: 38, fats: 4 },
  { name: 'Peach Cobbler', image: '🍑', calories: 205, protein: 3, carbs: 42, fats: 4 },
  { name: 'Berry Crumble', image: '🫐', calories: 175, protein: 3, carbs: 35, fats: 4 },
  { name: 'Chocolate Fondue', image: '🍫', calories: 165, protein: 3, carbs: 22, fats: 8 },
  { name: 'Crème Caramel', image: '🍮', calories: 195, protein: 4, carbs: 32, fats: 6 },
  { name: 'Sticky Toffee Pudding', image: '🍰', calories: 285, protein: 4, carbs: 45, fats: 10 },
  { name: 'Bread Pudding', image: '🍞', calories: 225, protein: 6, carbs: 38, fats: 6 },
  { name: 'Rice Pudding', image: '🍚', calories: 165, protein: 4, carbs: 28, fats: 4 },
  { name: 'Chocolate Chip Cookie', image: '🍪', calories: 125, protein: 2, carbs: 18, fats: 5 },
  { name: 'Oatmeal Cookie', image: '🍪', calories: 115, protein: 3, carbs: 16, fats: 4 },
  { name: 'Sugar Cookie', image: '🍪', calories: 105, protein: 2, carbs: 15, fats: 4 },
  { name: 'Gingerbread Cookie', image: '🍪', calories: 95, protein: 2, carbs: 16, fats: 3 },
  { name: 'Brownies', image: '🟫', calories: 185, protein: 3, carbs: 25, fats: 8 },
  { name: 'Blondies', image: '🟨', calories: 165, protein: 3, carbs: 22, fats: 7 },
  { name: 'Fudge', image: '🍫', calories: 145, protein: 2, carbs: 22, fats: 6 },
  { name: 'Caramel', image: '🟤', calories: 95, protein: 1, carbs: 18, fats: 3 },
  { name: 'Nougat', image: '⚪', calories: 115, protein: 2, carbs: 22, fats: 2 },
  { name: 'Marzipan', image: '🟡', calories: 135, protein: 3, carbs: 18, fats: 6 },
  { name: 'Turkish Delight', image: '🟣', calories: 85, protein: 0, carbs: 20, fats: 0 },
  { name: 'Halva', image: '🟤', calories: 165, protein: 4, carbs: 18, fats: 9 },
  { name: 'Lokum', image: '🟩', calories: 75, protein: 0, carbs: 18, fats: 0 },
  { name: 'Pralines', image: '🟤', calories: 125, protein: 2, carbs: 16, fats: 6 },
  { name: 'Marshmallow', image: '⚪', calories: 65, protein: 1, carbs: 15, fats: 0 },
  { name: 'Cotton Candy', image: '🩷', calories: 85, protein: 0, carbs: 22, fats: 0 },
  { name: 'Rock Candy', image: '💎', calories: 95, protein: 0, carbs: 24, fats: 0 },
  { name: 'Honey Candy', image: '🍯', calories: 75, protein: 0, carbs: 18, fats: 0 },
  { name: 'Chocolate Bark', image: '🍫', calories: 155, protein: 3, carbs: 18, fats: 8 }
];

// ============================================
// FAMOUS TIFFIN ITEMS FROM ALL STATES (100+ items)
// ============================================
const famousTiffins = [
  // SOUTH INDIAN TIFFINS
  { name: 'Plain Dosa', image: '🥞', calories: 165, protein: 4, carbs: 32, fats: 2 },
  { name: 'Masala Dosa', image: '🥞', calories: 285, protein: 7, carbs: 48, fats: 8 },
  { name: 'Rava Dosa', image: '🥞', calories: 195, protein: 5, carbs: 35, fats: 4 },
  { name: 'Onion Dosa', image: '🧅', calories: 205, protein: 5, carbs: 36, fats: 5 },
  { name: 'Cheese Dosa', image: '🧀', calories: 315, protein: 12, carbs: 38, fats: 14 },
  { name: 'Mysore Masala Dosa', image: '🌶️', calories: 305, protein: 8, carbs: 50, fats: 9 },
  { name: 'Set Dosa', image: '🥞', calories: 245, protein: 6, carbs: 42, fats: 6 },
  { name: 'Podi Dosa', image: '🌶️', calories: 225, protein: 6, carbs: 38, fats: 6 },
  
  // IDLI VARIETIES
  { name: 'Plain Idli', image: '⚪', calories: 60, protein: 2, carbs: 12, fats: 0.5 },
  { name: 'Rava Idli', image: '⚪', calories: 85, protein: 3, carbs: 15, fats: 2 },
  { name: 'Stuffed Idli', image: '⚪', calories: 95, protein: 3, carbs: 16, fats: 2 },
  { name: 'Mini Idli', image: '⚪', calories: 45, protein: 2, carbs: 9, fats: 0.5 },
  { name: 'Kanchipuram Idli', image: '🟡', calories: 105, protein: 4, carbs: 18, fats: 2 },
  { name: 'Button Idli', image: '⚪', calories: 35, protein: 1, carbs: 7, fats: 0.5 },
  
  // UTTAPAM VARIETIES
  { name: 'Plain Uttapam', image: '🥞', calories: 185, protein: 5, carbs: 32, fats: 4 },
  { name: 'Onion Uttapam', image: '🧅', calories: 205, protein: 5, carbs: 35, fats: 5 },
  { name: 'Tomato Uttapam', image: '🍅', calories: 195, protein: 5, carbs: 33, fats: 4 },
  { name: 'Mixed Veg Uttapam', image: '🥕', calories: 225, protein: 6, carbs: 38, fats: 6 },
  { name: 'Coconut Uttapam', image: '🥥', calories: 235, protein: 6, carbs: 36, fats: 8 },
  
  // VADA VARIETIES
  { name: 'Medu Vada', image: '🟤', calories: 85, protein: 4, carbs: 10, fats: 4 },
  { name: 'Sambar Vada', image: '🟤', calories: 145, protein: 6, carbs: 18, fats: 5 },
  { name: 'Dahi Vada', image: '⚪', calories: 125, protein: 5, carbs: 15, fats: 5 },
  { name: 'Rava Vada', image: '🟡', calories: 95, protein: 3, carbs: 12, fats: 4 },
  { name: 'Masala Vada', image: '🟤', calories: 105, protein: 4, carbs: 14, fats: 4 },
  
  // UPMA VARIETIES
  { name: 'Plain Upma', image: '🟡', calories: 165, protein: 4, carbs: 28, fats: 4 },
  { name: 'Vegetable Upma', image: '🥕', calories: 185, protein: 5, carbs: 30, fats: 5 },
  { name: 'Rava Upma', image: '🟡', calories: 175, protein: 4, carbs: 32, fats: 4 },
  { name: 'Vermicelli Upma', image: '🍜', calories: 155, protein: 4, carbs: 28, fats: 3 },
  { name: 'Broken Wheat Upma', image: '🟤', calories: 145, protein: 5, carbs: 26, fats: 3 },
  
  // POHA VARIETIES
  { name: 'Kanda Poha', image: '🟡', calories: 185, protein: 3, carbs: 35, fats: 4 },
  { name: 'Aloo Poha', image: '🥔', calories: 205, protein: 4, carbs: 38, fats: 5 },
  { name: 'Mixed Veg Poha', image: '🥕', calories: 195, protein: 4, carbs: 36, fats: 4 },
  { name: 'Indori Poha', image: '🟡', calories: 215, protein: 4, carbs: 40, fats: 5 },
  { name: 'Dadpe Poha', image: '🟡', calories: 125, protein: 3, carbs: 24, fats: 2 },
  
  // NORTH INDIAN TIFFINS
  { name: 'Aloo Paratha', image: '🥔', calories: 285, protein: 6, carbs: 42, fats: 11 },
  { name: 'Gobi Paratha', image: '🥬', calories: 265, protein: 6, carbs: 38, fats: 10 },
  { name: 'Paneer Paratha', image: '🧀', calories: 325, protein: 12, carbs: 40, fats: 14 },
  { name: 'Mooli Paratha', image: '🟢', calories: 245, protein: 5, carbs: 35, fats: 9 },
  { name: 'Mix Veg Paratha', image: '🥕', calories: 275, protein: 7, carbs: 40, fats: 10 },
  { name: 'Plain Paratha', image: '🫓', calories: 185, protein: 4, carbs: 28, fats: 6 },
  
  // PUNJABI TIFFINS
  { name: 'Chole Bhature', image: '🍞', calories: 485, protein: 14, carbs: 68, fats: 18 },
  { name: 'Kulcha Chole', image: '🍞', calories: 425, protein: 12, carbs: 62, fats: 15 },
  { name: 'Puri Bhaji', image: '🍞', calories: 365, protein: 8, carbs: 52, fats: 14 },
  { name: 'Rajma Chawal', image: '🍛', calories: 385, protein: 14, carbs: 65, fats: 8 },
  { name: 'Dal Chawal', image: '🍛', calories: 295, protein: 11, carbs: 55, fats: 4 },
  
  // GUJARATI TIFFINS
  { name: 'Dhokla Tiffin', image: '🟡', calories: 145, protein: 5, carbs: 24, fats: 3 },
  { name: 'Khandvi', image: '🟡', calories: 125, protein: 4, carbs: 18, fats: 4 },
  { name: 'Thepla', image: '🟢', calories: 155, protein: 4, carbs: 25, fats: 4 },
  { name: 'Handvo', image: '🟢', calories: 195, protein: 6, carbs: 28, fats: 7 },
  { name: 'Khaman', image: '🟡', calories: 135, protein: 4, carbs: 22, fats: 3 },
  { name: 'Fafda Jalebi', image: '🟡', calories: 285, protein: 6, carbs: 45, fats: 9 },
  
  // MAHARASHTRIAN TIFFINS
  { name: 'Misal Pav Tiffin', image: '🌶️', calories: 325, protein: 12, carbs: 48, fats: 11 },
  { name: 'Vada Pav Tiffin', image: '🥔', calories: 265, protein: 6, carbs: 42, fats: 9 },
  { name: 'Thalipeeth', image: '🟤', calories: 205, protein: 6, carbs: 32, fats: 6 },
  { name: 'Sabudana Khichdi', image: '⚪', calories: 215, protein: 3, carbs: 40, fats: 6 },
  { name: 'Poha Tiffin', image: '🟡', calories: 185, protein: 3, carbs: 35, fats: 4 },
];

// ============================================
// REGIONAL SPECIALTY FOODS (50+ items)
// ============================================
const regionalSpecialties = [
  // NORTH EAST SPECIALTIES
  { name: 'Bamboo Shoot Curry', image: '🎋', calories: 95, protein: 4, carbs: 14, fats: 3 },
  { name: 'Manipuri Eromba', image: '🌶️', calories: 115, protein: 5, carbs: 16, fats: 4 },
  { name: 'Assamese Tenga', image: '🟡', calories: 105, protein: 3, carbs: 15, fats: 4 },
  { name: 'Naga King Chilli Curry', image: '🔥', calories: 125, protein: 4, carbs: 18, fats: 4 },
  { name: 'Tripuri Wahan Mosdeng', image: '🥬', calories: 85, protein: 3, carbs: 12, fats: 3 },
  
  // HIMACHALI SPECIALTIES
  { name: 'Siddu', image: '⚪', calories: 185, protein: 5, carbs: 32, fats: 4 },
  { name: 'Babru', image: '🟤', calories: 225, protein: 6, carbs: 35, fats: 8 },
  { name: 'Aktori', image: '🟢', calories: 145, protein: 4, carbs: 24, fats: 4 },
  { name: 'Patande', image: '🥞', calories: 165, protein: 5, carbs: 28, fats: 4 },
  
  // KASHMIRI SPECIALTIES
  { name: 'Modur Pulao', image: '🍚', calories: 285, protein: 6, carbs: 52, fats: 6 },
  { name: 'Kashmiri Kahwa', image: '☕', calories: 45, protein: 1, carbs: 8, fats: 1 },
  { name: 'Sheermal', image: '🍞', calories: 195, protein: 5, carbs: 32, fats: 5 },
  { name: 'Tchaaman', image: '🧀', calories: 145, protein: 8, carbs: 12, fats: 8 },
  
  // GOA SPECIALTIES
  { name: 'Goan Bread', image: '🍞', calories: 165, protein: 4, carbs: 28, fats: 4 },
  { name: 'Bebinca', image: '🟡', calories: 245, protein: 4, carbs: 38, fats: 9 },
  { name: 'Doce de Grao', image: '🟡', calories: 185, protein: 6, carbs: 28, fats: 6 },
  { name: 'Neureos', image: '🥟', calories: 125, protein: 3, carbs: 18, fats: 4 },
  
  // TRIBAL FOODS
  { name: 'Ragi Sangati', image: '🟤', calories: 175, protein: 5, carbs: 32, fats: 3 },
  { name: 'Jowar Roti', image: '🟤', calories: 145, protein: 4, carbs: 28, fats: 2 },
  { name: 'Bajra Khichdi', image: '🟤', calories: 195, protein: 6, carbs: 35, fats: 4 },
  { name: 'Quinoa Upma', image: '⚪', calories: 165, protein: 6, carbs: 28, fats: 4 },
  { name: 'Amaranth Paratha', image: '🟣', calories: 205, protein: 7, carbs: 32, fats: 6 },
];

// ============================================
// GENERATE FULL DATABASE
// ============================================
const generateFoodItem = (item, index, categoryPrefix) => {
  const nutrition = generateNutrition(item);
  const healthImpact = getHealthImpact(nutrition.calories, nutrition.sugar, nutrition.fats);
  
  return {
    id: `${categoryPrefix}${index + 1}`,
    name: item.name,
    image: item.image,
    category: 'veg',
    subCategory: categoryPrefix,
    nutrition,
    healthImpact,
  };
};

// Generate all food items
const generateAllVegFoods = () => {
  const allFoods = [];
  
  // Add existing categories
  starters.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'starter'));
  });
  
  curries.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'curry'));
  });
  
  // Add new state-wise curries
  stateWiseCurries.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'stateCurries'));
  });

  // Add tiffin curries
  tiffinCurries.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'tiffinCurries'));
  });

  // Add famous tiffins
  famousTiffins.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'tiffins'));
  });  // Add regional specialties
  regionalSpecialties.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'regional'));
  });
  
  riceAndBiryani.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'rice'));
  });
  
  breads.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'bread'));
  });
  
  southIndian.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'south'));
  });
  
  streetFood.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'street'));
  });
  
  chinese.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'chinese'));
  });
  
  continental.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'continental'));
  });
  
  desserts.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'dessert'));
  });
  
  sideDishes.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'side'));
  });
  
  buffetSpecials.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'buffet'));
  });

  // Add NEW categories (200+ items)
  healthyBowls.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'healthyBowls'));
  });

  fusionFoods.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'fusion'));
  });

  smoothieBowls.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'smoothies'));
  });

  gourmetWraps.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'wraps'));
  });

  premiumDesserts.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'premium'));
  });
  
  return allFoods;
};

export const vegFoodsDatabase = generateAllVegFoods();

export const vegSubCategories = {
  starter: { 
    name: 'Starters & Appetizers', 
    icon: '🥟', 
    count: starters.length,
    color: '#bbf7d0', 
    textColor: '#166534'
  },
  curry: { 
    name: 'Traditional Curries', 
    icon: '🍛', 
    count: curries.length,
    color: '#fecaca', 
    textColor: '#991b1b'
  },
  stateCurries: { 
    name: 'State-wise Famous Curries', 
    icon: '🏛️', 
    count: stateWiseCurries.length,
    color: '#fecaca', 
    textColor: '#991b1b'
  },
  tiffinCurries: { 
    name: 'Tiffin Curries & Chutneys', 
    icon: '🍛', 
    count: tiffinCurries.length,
    color: '#fed7d7', 
    textColor: '#c53030'
  },
  tiffins: { 
    name: 'Famous Tiffin Items', 
    icon: '🥞', 
    count: famousTiffins.length,
    color: '#fef3c7', 
    textColor: '#92400e'
  },
  regional: { 
    name: 'Regional Specialties', 
    icon: '🗺️', 
    count: regionalSpecialties.length,
    color: '#f3e8ff', 
    textColor: '#7c3aed'
  },
  rice: { 
    name: 'Rice & Biryani', 
    icon: '�', 
    count: riceAndBiryani.length,
    color: '#cffafe', 
    textColor: '#155e75'
  },
  bread: { 
    name: 'Breads & Rotis', 
    icon: '🫓', 
    count: breads.length,
    color: '#ddd6fe', 
    textColor: '#6b21a8'
  },
  south: { 
    name: 'South Indian', 
    icon: '🥞', 
    count: southIndian.length,
    color: '#fef3c7', 
    textColor: '#92400e'
  },
  street: { 
    name: 'Street Food', 
    icon: '🥙', 
    count: streetFood.length,
    color: '#fed7d7', 
    textColor: '#c53030'
  },
  chinese: { 
    name: 'Chinese & Indo-Chinese', 
    icon: '🍜', 
    count: chinese.length,
    color: '#fde68a', 
    textColor: '#92400e'
  },
  continental: { 
    name: 'Continental', 
    icon: '🍝', 
    count: continental.length,
    color: '#f9a8d4', 
    textColor: '#be185d'
  },
  dessert: { 
    name: 'Desserts & Sweets', 
    icon: '🍰', 
    count: desserts.length,
    color: '#fce7f3', 
    textColor: '#be185d'
  },
  side: { 
    name: 'Side Dishes', 
    icon: '🥗', 
    count: sideDishes.length,
    color: '#bbf7d0', 
    textColor: '#166534'
  },
  buffet: { 
    name: 'Buffet Specials', 
    icon: '🍽️', 
    count: buffetSpecials.length,
    color: '#e0e7ff', 
    textColor: '#3730a3'
  },
  healthyBowls: { 
    name: 'Healthy Bowls', 
    icon: '🥗', 
    count: healthyBowls.length,
    color: '#d1fae5', 
    textColor: '#065f46'
  },
  fusionFoods: { 
    name: 'Fusion Foods', 
    icon: '🌮', 
    count: fusionFoods.length,
    color: '#fef3c7', 
    textColor: '#92400e'
  },
  smoothieBowls: { 
    name: 'Smoothie Bowls', 
    icon: '🍓', 
    count: smoothieBowls.length,
    color: '#fce7f3', 
    textColor: '#be185d'
  },
  gourmetWraps: { 
    name: 'Gourmet Wraps', 
    icon: '🌯', 
    count: gourmetWraps.length,
    color: '#e0e7ff', 
    textColor: '#3730a3'
  },
  premiumDesserts: { 
    name: 'Premium Desserts', 
    icon: '🧁', 
    count: premiumDesserts.length,
    color: '#fdf2f8', 
    textColor: '#9d174d'
  },
};

export const getVegFoodsBySubCategory = (subCategory) => {
  return vegFoodsDatabase.filter(food => food.subCategory === subCategory);
};

export const searchVegFoods = (query) => {
  const lowerQuery = query.toLowerCase();
  return vegFoodsDatabase.filter(food => 
    food.name.toLowerCase().includes(lowerQuery)
  );
};

export const getVegFoodById = (id) => {
  return vegFoodsDatabase.find(food => food.id === id);
};

console.log(`Total Veg Foods in Database: ${vegFoodsDatabase.length}`);
