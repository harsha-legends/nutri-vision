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
  { name: 'Green Detox Juice', image: '🥬', calories: 85, protein: 2, carbs: 18, fats: 1 },
  { name: 'Orange Carrot Juice', image: '🥕', calories: 95, protein: 2, carbs: 22, fats: 0 },
  { name: 'Beetroot Juice', image: '🟣', calories: 75, protein: 2, carbs: 16, fats: 0 },
  { name: 'Pomegranate Juice', image: '🍇', calories: 115, protein: 1, carbs: 28, fats: 0 },
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
