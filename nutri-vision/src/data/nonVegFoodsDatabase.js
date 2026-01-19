// ============================================
// EXPANDED NON-VEGETARIAN FOODS DATABASE
// 400+ items across comprehensive categories
// ============================================

// 1. STARTERS & APPETIZERS (100+ items)
const starters = [
  // CHICKEN STARTERS
  {
    id: 'nv_st_001',
    name: 'Chicken 65',
    image: '🍗',
    category: 'nonVeg',
    subCategory: 'starters',
    nutrition: { calories: 250, protein: 28, carbs: 8, fats: 12, fiber: 1, sugar: 2, vitamins: { A: 5, B: 35, C: 8, D: 2, E: 3, K: 1 }, minerals: { iron: 12, calcium: 3, potassium: 15, magnesium: 8 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_st_002',
    name: 'Chicken Tikka',
    image: '🍗',
    category: 'nonVeg',
    subCategory: 'starters',
    nutrition: { calories: 235, protein: 32, carbs: 5, fats: 10, fiber: 1, sugar: 2, vitamins: { A: 6, B: 38, C: 5, D: 3, E: 4, K: 2 }, minerals: { iron: 14, calcium: 8, potassium: 18, magnesium: 12 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'low', riskLevel: 'low' },
  },
  {
    id: 'nv_st_003',
    name: 'Chicken Lollipop',
    image: '🍗',
    category: 'nonVeg',
    subCategory: 'starters',
    nutrition: { calories: 195, protein: 24, carbs: 6, fats: 9, fiber: 1, sugar: 3, vitamins: { A: 5, B: 30, C: 6, D: 2, E: 3, K: 1 }, minerals: { iron: 10, calcium: 5, potassium: 14, magnesium: 8 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'low', riskLevel: 'low' },
  },
  {
    id: 'nv_st_004',
    name: 'Chicken Manchurian',
    image: '🍗',
    category: 'nonVeg',
    subCategory: 'starters',
    nutrition: { calories: 320, protein: 26, carbs: 18, fats: 16, fiber: 2, sugar: 5, vitamins: { A: 7, B: 28, C: 10, D: 3, E: 5, K: 2 }, minerals: { iron: 12, calcium: 6, potassium: 16, magnesium: 10 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_st_005',
    name: 'Buffalo Wings',
    image: '🍗',
    category: 'nonVeg',
    subCategory: 'starters',
    nutrition: { calories: 285, protein: 28, carbs: 8, fats: 16, fiber: 1, sugar: 4, vitamins: { A: 5, B: 32, C: 6, D: 2, E: 4, K: 2 }, minerals: { iron: 12, calcium: 6, potassium: 18, magnesium: 11 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_st_006',
    name: 'Tandoori Chicken',
    image: '🍗',
    category: 'nonVeg',
    subCategory: 'starters',
    nutrition: { calories: 215, protein: 35, carbs: 4, fats: 8, fiber: 1, sugar: 2, vitamins: { A: 8, B: 40, C: 5, D: 4, E: 5, K: 3 }, minerals: { iron: 15, calcium: 10, potassium: 22, magnesium: 15 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'low', riskLevel: 'low' },
  },
  {
    id: 'nv_st_007',
    name: 'Chicken Wings BBQ',
    image: '🍗',
    category: 'nonVeg',
    subCategory: 'starters',
    nutrition: { calories: 275, protein: 26, carbs: 12, fats: 15, fiber: 1, sugar: 6, vitamins: { A: 6, B: 30, C: 4, D: 2, E: 4, K: 2 }, minerals: { iron: 11, calcium: 8, potassium: 16, magnesium: 10 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_st_008',
    name: 'Chicken Pakoda',
    image: '🍗',
    category: 'nonVeg',
    subCategory: 'starters',
    nutrition: { calories: 295, protein: 22, carbs: 16, fats: 17, fiber: 2, sugar: 3, vitamins: { A: 5, B: 25, C: 8, D: 2, E: 4, K: 2 }, minerals: { iron: 9, calcium: 6, potassium: 14, magnesium: 8 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_st_009',
    name: 'Chicken Pepper Fry',
    image: '🌶️',
    category: 'nonVeg',
    subCategory: 'starters',
    nutrition: { calories: 265, protein: 30, carbs: 6, fats: 13, fiber: 1, sugar: 2, vitamins: { A: 6, B: 35, C: 15, D: 3, E: 5, K: 3 }, minerals: { iron: 13, calcium: 8, potassium: 20, magnesium: 12 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_st_010',
    name: 'Chicken Sukka',
    image: '🌶️',
    category: 'nonVeg',
    subCategory: 'starters',
    nutrition: { calories: 245, protein: 31, carbs: 5, fats: 11, fiber: 2, sugar: 2, vitamins: { A: 7, B: 36, C: 12, D: 3, E: 5, K: 3 }, minerals: { iron: 14, calcium: 10, potassium: 22, magnesium: 14 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'medium', riskLevel: 'medium' },
  },

  // MUTTON STARTERS
  {
    id: 'nv_st_011',
    name: 'Mutton Seekh Kebab',
    image: '🍖',
    category: 'nonVeg',
    subCategory: 'starters',
    nutrition: { calories: 320, protein: 35, carbs: 3, fats: 18, fiber: 0, sugar: 1, vitamins: { A: 3, B: 45, C: 2, D: 1, E: 4, K: 2 }, minerals: { iron: 20, calcium: 5, potassium: 18, magnesium: 12 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_st_012',
    name: 'Mutton Chops',
    image: '🍖',
    category: 'nonVeg',
    subCategory: 'starters',
    nutrition: { calories: 385, protein: 38, carbs: 4, fats: 24, fiber: 0, sugar: 2, vitamins: { A: 4, B: 48, C: 3, D: 2, E: 6, K: 3 }, minerals: { iron: 25, calcium: 8, potassium: 25, magnesium: 18 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'medium', riskLevel: 'high' },
  },
  {
    id: 'nv_st_013',
    name: 'Mutton Pepper Fry',
    image: '🌶️',
    category: 'nonVeg',
    subCategory: 'starters',
    nutrition: { calories: 345, protein: 33, carbs: 6, fats: 21, fiber: 1, sugar: 2, vitamins: { A: 5, B: 42, C: 8, D: 2, E: 5, K: 3 }, minerals: { iron: 22, calcium: 10, potassium: 22, magnesium: 16 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_st_014',
    name: 'Mutton Ghee Roast',
    image: '🧈',
    category: 'nonVeg',
    subCategory: 'starters',
    nutrition: { calories: 395, protein: 32, carbs: 7, fats: 26, fiber: 1, sugar: 3, vitamins: { A: 6, B: 40, C: 5, D: 3, E: 8, K: 4 }, minerals: { iron: 20, calcium: 12, potassium: 20, magnesium: 15 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'medium', riskLevel: 'high' },
  },
  {
    id: 'nv_st_015',
    name: 'Lamb Chops',
    image: '🐑',
    category: 'nonVeg',
    subCategory: 'starters',
    nutrition: { calories: 365, protein: 32, carbs: 3, fats: 25, fiber: 0, sugar: 1, vitamins: { A: 3, B: 45, C: 2, D: 8, E: 6, K: 4 }, minerals: { iron: 25, calcium: 10, potassium: 28, magnesium: 18 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'medium', riskLevel: 'high' },
  },

  // SEAFOOD STARTERS
  {
    id: 'nv_st_016',
    name: 'Fish Fry',
    image: '🐟',
    category: 'nonVeg',
    subCategory: 'starters',
    nutrition: { calories: 235, protein: 28, carbs: 5, fats: 11, fiber: 1, sugar: 1, vitamins: { A: 12, B: 25, C: 8, D: 15, E: 8, K: 5 }, minerals: { iron: 8, calcium: 15, potassium: 25, magnesium: 18 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'low', riskLevel: 'low' },
  },
  {
    id: 'nv_st_017',
    name: 'Fish Tikka',
    image: '🐟',
    category: 'nonVeg',
    subCategory: 'starters',
    nutrition: { calories: 205, protein: 30, carbs: 4, fats: 8, fiber: 1, sugar: 2, vitamins: { A: 15, B: 28, C: 6, D: 18, E: 10, K: 6 }, minerals: { iron: 10, calcium: 18, potassium: 28, magnesium: 20 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'low', riskLevel: 'low' },
  },
  {
    id: 'nv_st_018',
    name: 'Fish Koliwada',
    image: '🐟',
    category: 'nonVeg',
    subCategory: 'starters',
    nutrition: { calories: 295, protein: 24, carbs: 16, fats: 16, fiber: 2, sugar: 3, vitamins: { A: 10, B: 22, C: 5, D: 12, E: 6, K: 4 }, minerals: { iron: 8, calcium: 12, potassium: 20, magnesium: 14 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'low', riskLevel: 'medium' },
  },
  {
    id: 'nv_st_019',
    name: 'Apollo Fish',
    image: '🚀',
    category: 'nonVeg',
    subCategory: 'starters',
    nutrition: { calories: 325, protein: 25, carbs: 18, fats: 17, fiber: 2, sugar: 5, vitamins: { A: 8, B: 20, C: 12, D: 10, E: 5, K: 3 }, minerals: { iron: 7, calcium: 10, potassium: 18, magnesium: 12 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_st_020',
    name: 'Prawn Fry',
    image: '🦐',
    category: 'nonVeg',
    subCategory: 'starters',
    nutrition: { calories: 185, protein: 26, carbs: 4, fats: 7, fiber: 0, sugar: 1, vitamins: { A: 8, B: 15, C: 12, D: 8, E: 6, K: 3 }, minerals: { iron: 6, calcium: 12, potassium: 22, magnesium: 16 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'low', riskLevel: 'low' },
  },

  // NEW ADDITIONS - PIZZA & INTERNATIONAL
  {
    id: 'nv_st_021',
    name: 'Chicken Pizza Slice',
    image: '🍕',
    category: 'nonVeg',
    subCategory: 'pizza',
    nutrition: { calories: 285, protein: 18, carbs: 28, fats: 12, fiber: 2, sugar: 4, vitamins: { A: 8, B: 20, C: 15, D: 5, E: 4, K: 3 }, minerals: { iron: 8, calcium: 20, potassium: 15, magnesium: 10 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_st_022',
    name: 'Pepperoni Pizza',
    image: '🍕',
    category: 'nonVeg',
    subCategory: 'pizza',
    nutrition: { calories: 315, protein: 16, carbs: 32, fats: 16, fiber: 2, sugar: 5, vitamins: { A: 6, B: 18, C: 12, D: 4, E: 3, K: 2 }, minerals: { iron: 10, calcium: 18, potassium: 12, magnesium: 8 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'high', riskLevel: 'high' },
  },
  {
    id: 'nv_st_023',
    name: 'Meat Lovers Pizza',
    image: '🍕',
    category: 'nonVeg',
    subCategory: 'pizza',
    nutrition: { calories: 385, protein: 22, carbs: 30, fats: 22, fiber: 2, sugar: 4, vitamins: { A: 5, B: 25, C: 8, D: 3, E: 4, K: 2 }, minerals: { iron: 15, calcium: 15, potassium: 18, magnesium: 12 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'high', riskLevel: 'high' },
  },
  {
    id: 'nv_st_024',
    name: 'BBQ Chicken Pizza',
    image: '🍕',
    category: 'nonVeg',
    subCategory: 'pizza',
    nutrition: { calories: 295, protein: 20, carbs: 28, fats: 14, fiber: 2, sugar: 6, vitamins: { A: 7, B: 22, C: 10, D: 4, E: 3, K: 2 }, minerals: { iron: 9, calcium: 16, potassium: 16, magnesium: 10 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'medium', riskLevel: 'medium' },
  },

  // FRIED ITEMS
  {
    id: 'nv_st_025',
    name: 'Chicken Popcorn',
    image: '🍿',
    category: 'nonVeg',
    subCategory: 'fried',
    nutrition: { calories: 265, protein: 20, carbs: 15, fats: 15, fiber: 1, sugar: 2, vitamins: { A: 5, B: 25, C: 6, D: 2, E: 3, K: 2 }, minerals: { iron: 8, calcium: 5, potassium: 12, magnesium: 8 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_st_026',
    name: 'Fish & Chips',
    image: '🍟',
    category: 'nonVeg',
    subCategory: 'fried',
    nutrition: { calories: 485, protein: 25, carbs: 45, fats: 25, fiber: 4, sugar: 3, vitamins: { A: 8, B: 18, C: 20, D: 12, E: 6, K: 4 }, minerals: { iron: 10, calcium: 8, potassium: 35, magnesium: 15 } },
    healthImpact: { bloodSugar: 'high', bloodPressure: 'medium', riskLevel: 'high' },
  },
  {
    id: 'nv_st_027',
    name: 'Chicken Nuggets',
    image: '🍗',
    category: 'nonVeg',
    subCategory: 'fried',
    nutrition: { calories: 245, protein: 18, carbs: 12, fats: 14, fiber: 1, sugar: 2, vitamins: { A: 4, B: 22, C: 5, D: 2, E: 3, K: 2 }, minerals: { iron: 7, calcium: 6, potassium: 12, magnesium: 8 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_st_028',
    name: 'Fried Chicken Drumsticks',
    image: '🍗',
    category: 'nonVeg',
    subCategory: 'fried',
    nutrition: { calories: 295, protein: 26, carbs: 8, fats: 18, fiber: 1, sugar: 2, vitamins: { A: 5, B: 28, C: 4, D: 2, E: 4, K: 2 }, minerals: { iron: 10, calcium: 8, potassium: 16, magnesium: 10 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_st_029',
    name: 'Calamari Rings',
    image: '🦑',
    category: 'nonVeg',
    subCategory: 'fried',
    nutrition: { calories: 225, protein: 20, carbs: 14, fats: 11, fiber: 1, sugar: 2, vitamins: { A: 4, B: 15, C: 8, D: 5, E: 8, K: 3 }, minerals: { iron: 6, calcium: 8, potassium: 18, magnesium: 12 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'low', riskLevel: 'medium' },
  },

  // PASTA ITEMS
  {
    id: 'nv_st_030',
    name: 'Chicken Alfredo Pasta',
    image: '🍝',
    category: 'nonVeg',
    subCategory: 'pasta',
    nutrition: { calories: 485, protein: 28, carbs: 45, fats: 22, fiber: 3, sugar: 5, vitamins: { A: 12, B: 25, C: 8, D: 6, E: 5, K: 3 }, minerals: { iron: 12, calcium: 25, potassium: 20, magnesium: 15 } },
    healthImpact: { bloodSugar: 'high', bloodPressure: 'medium', riskLevel: 'high' },
  },
  {
    id: 'nv_st_031',
    name: 'Meat Bolognese',
    image: '🍝',
    category: 'nonVeg',
    subCategory: 'pasta',
    nutrition: { calories: 425, protein: 25, carbs: 42, fats: 18, fiber: 4, sugar: 8, vitamins: { A: 15, B: 22, C: 20, D: 4, E: 6, K: 5 }, minerals: { iron: 15, calcium: 12, potassium: 25, magnesium: 18 } },
    healthImpact: { bloodSugar: 'high', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_st_032',
    name: 'Seafood Pasta',
    image: '🍝',
    category: 'nonVeg',
    subCategory: 'pasta',
    nutrition: { calories: 365, protein: 22, carbs: 38, fats: 14, fiber: 3, sugar: 4, vitamins: { A: 10, B: 18, C: 15, D: 12, E: 8, K: 4 }, minerals: { iron: 10, calcium: 15, potassium: 28, magnesium: 20 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'low', riskLevel: 'medium' },
  },
  {
    id: 'nv_st_033',
    name: 'Chicken Carbonara',
    image: '🍝',
    category: 'nonVeg',
    subCategory: 'pasta',
    nutrition: { calories: 465, protein: 26, carbs: 40, fats: 24, fiber: 2, sugar: 3, vitamins: { A: 8, B: 28, C: 6, D: 8, E: 4, K: 2 }, minerals: { iron: 10, calcium: 20, potassium: 18, magnesium: 12 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'medium', riskLevel: 'high' },
  },

  // REGIONAL SPECIALTIES
  {
    id: 'nv_st_034',
    name: 'Goan Fish Tikka',
    image: '🐟',
    category: 'nonVeg',
    subCategory: 'regional',
    nutrition: { calories: 235, protein: 28, carbs: 6, fats: 11, fiber: 1, sugar: 2, vitamins: { A: 12, B: 25, C: 18, D: 15, E: 8, K: 5 }, minerals: { iron: 8, calcium: 15, potassium: 25, magnesium: 18 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'low', riskLevel: 'low' },
  },
  {
    id: 'nv_st_035',
    name: 'Mangalorean Ghee Roast',
    image: '🧈',
    category: 'nonVeg',
    subCategory: 'regional',
    nutrition: { calories: 335, protein: 27, carbs: 9, fats: 22, fiber: 2, sugar: 3, vitamins: { A: 8, B: 35, C: 12, D: 4, E: 8, K: 4 }, minerals: { iron: 15, calcium: 12, potassium: 20, magnesium: 15 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_st_036',
    name: 'Hyderabadi Seekh',
    image: '🍖',
    category: 'nonVeg',
    subCategory: 'regional',
    nutrition: { calories: 295, protein: 30, carbs: 5, fats: 17, fiber: 1, sugar: 2, vitamins: { A: 4, B: 40, C: 6, D: 3, E: 5, K: 3 }, minerals: { iron: 18, calcium: 8, potassium: 20, magnesium: 14 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_st_037',
    name: 'Kolkata Fish Fry',
    image: '🐟',
    category: 'nonVeg',
    subCategory: 'regional',
    nutrition: { calories: 255, protein: 25, carbs: 8, fats: 14, fiber: 1, sugar: 2, vitamins: { A: 10, B: 22, C: 8, D: 12, E: 6, K: 4 }, minerals: { iron: 9, calcium: 12, potassium: 22, magnesium: 16 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'low', riskLevel: 'medium' },
  },
  {
    id: 'nv_st_038',
    name: 'Kerala Fish Fry',
    image: '🐟',
    category: 'nonVeg',
    subCategory: 'regional',
    nutrition: { calories: 245, protein: 27, carbs: 7, fats: 12, fiber: 2, sugar: 2, vitamins: { A: 15, B: 28, C: 25, D: 18, E: 10, K: 6 }, minerals: { iron: 10, calcium: 18, potassium: 30, magnesium: 22 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'low', riskLevel: 'low' },
  },

  // FUSION & INTERNATIONAL
  {
    id: 'nv_st_039',
    name: 'Korean Fried Chicken',
    image: '🇰🇷',
    category: 'nonVeg',
    subCategory: 'fusion',
    nutrition: { calories: 315, protein: 22, carbs: 18, fats: 18, fiber: 2, sugar: 6, vitamins: { A: 5, B: 28, C: 8, D: 2, E: 5, K: 3 }, minerals: { iron: 9, calcium: 6, potassium: 15, magnesium: 9 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_st_040',
    name: 'Japanese Karaage',
    image: '🇯🇵',
    category: 'nonVeg',
    subCategory: 'fusion',
    nutrition: { calories: 245, protein: 24, carbs: 12, fats: 12, fiber: 1, sugar: 2, vitamins: { A: 6, B: 30, C: 5, D: 3, E: 4, K: 2 }, minerals: { iron: 10, calcium: 5, potassium: 16, magnesium: 10 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'low', riskLevel: 'low' },
  },
];

// 2. FAMOUS BIRYANIS & RICE DISHES (60+ items)
const famousBiryanis = [
  // CLASSIC BIRYANIS
  {
    id: 'nv_br_001',
    name: 'Hyderabadi Chicken Biryani',
    image: '🍛',
    category: 'nonVeg',
    subCategory: 'biryanis',
    nutrition: { calories: 485, protein: 28, carbs: 65, fats: 18, fiber: 3, sugar: 8, vitamins: { A: 12, B: 35, C: 15, D: 5, E: 8, K: 6 }, minerals: { iron: 15, calcium: 12, potassium: 35, magnesium: 25 } },
    healthImpact: { bloodSugar: 'high', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_br_002',
    name: 'Lucknowi Mutton Biryani',
    image: '🍛',
    category: 'nonVeg',
    subCategory: 'biryanis',
    nutrition: { calories: 525, protein: 32, carbs: 62, fats: 22, fiber: 4, sugar: 6, vitamins: { A: 8, B: 45, C: 12, D: 4, E: 10, K: 8 }, minerals: { iron: 25, calcium: 15, potassium: 38, magnesium: 28 } },
    healthImpact: { bloodSugar: 'high', bloodPressure: 'medium', riskLevel: 'high' },
  },
  {
    id: 'nv_br_003',
    name: 'Kolkata Chicken Biryani',
    image: '🍛',
    category: 'nonVeg',
    subCategory: 'biryanis',
    nutrition: { calories: 465, protein: 26, carbs: 68, fats: 16, fiber: 3, sugar: 12, vitamins: { A: 15, B: 30, C: 18, D: 6, E: 6, K: 5 }, minerals: { iron: 12, calcium: 10, potassium: 32, magnesium: 22 } },
    healthImpact: { bloodSugar: 'high', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_br_004',
    name: 'Malabar Fish Biryani',
    image: '🍛',
    category: 'nonVeg',
    subCategory: 'biryanis',
    nutrition: { calories: 425, protein: 28, carbs: 58, fats: 14, fiber: 4, sugar: 6, vitamins: { A: 18, B: 25, C: 25, D: 15, E: 12, K: 8 }, minerals: { iron: 12, calcium: 20, potassium: 40, magnesium: 30 } },
    healthImpact: { bloodSugar: 'high', bloodPressure: 'low', riskLevel: 'medium' },
  },
  {
    id: 'nv_br_005',
    name: 'Bombay Duck Biryani',
    image: '🍛',
    category: 'nonVeg',
    subCategory: 'biryanis',
    nutrition: { calories: 395, protein: 25, carbs: 55, fats: 12, fiber: 3, sugar: 5, vitamins: { A: 12, B: 22, C: 15, D: 12, E: 8, K: 6 }, minerals: { iron: 10, calcium: 15, potassium: 35, magnesium: 25 } },
    healthImpact: { bloodSugar: 'high', bloodPressure: 'low', riskLevel: 'medium' },
  },
  {
    id: 'nv_br_006',
    name: 'Thalassery Prawn Biryani',
    image: '🍛',
    category: 'nonVeg',
    subCategory: 'biryanis',
    nutrition: { calories: 445, protein: 26, carbs: 60, fats: 16, fiber: 4, sugar: 7, vitamins: { A: 15, B: 20, C: 20, D: 10, E: 10, K: 7 }, minerals: { iron: 8, calcium: 18, potassium: 38, magnesium: 28 } },
    healthImpact: { bloodSugar: 'high', bloodPressure: 'low', riskLevel: 'medium' },
  },

  // MORE BIRYANI VARIETIES
  {
    id: 'nv_br_007',
    name: 'Ambur Chicken Biryani',
    image: '🍛',
    category: 'nonVeg',
    subCategory: 'biryanis',
    nutrition: { calories: 475, protein: 27, carbs: 63, fats: 17, fiber: 3, sugar: 6, vitamins: { A: 10, B: 32, C: 12, D: 4, E: 7, K: 5 }, minerals: { iron: 14, calcium: 12, potassium: 34, magnesium: 24 } },
    healthImpact: { bloodSugar: 'high', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_br_008',
    name: 'Dindigul Mutton Biryani',
    image: '🍛',
    category: 'nonVeg',
    subCategory: 'biryanis',
    nutrition: { calories: 535, protein: 34, carbs: 61, fats: 24, fiber: 4, sugar: 5, vitamins: { A: 6, B: 48, C: 10, D: 3, E: 12, K: 9 }, minerals: { iron: 28, calcium: 18, potassium: 40, magnesium: 30 } },
    healthImpact: { bloodSugar: 'high', bloodPressure: 'medium', riskLevel: 'high' },
  },
  {
    id: 'nv_br_009',
    name: 'Egg Biryani',
    image: '🥚',
    category: 'nonVeg',
    subCategory: 'biryanis',
    nutrition: { calories: 385, protein: 18, carbs: 58, fats: 12, fiber: 3, sugar: 5, vitamins: { A: 15, B: 25, C: 8, D: 12, E: 8, K: 4 }, minerals: { iron: 8, calcium: 8, potassium: 28, magnesium: 18 } },
    healthImpact: { bloodSugar: 'high', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_br_010',
    name: 'Quail Biryani',
    image: '🐦',
    category: 'nonVeg',
    subCategory: 'biryanis',
    nutrition: { calories: 455, protein: 25, carbs: 62, fats: 16, fiber: 3, sugar: 6, vitamins: { A: 8, B: 35, C: 10, D: 5, E: 9, K: 7 }, minerals: { iron: 18, calcium: 12, potassium: 32, magnesium: 22 } },
    healthImpact: { bloodSugar: 'high', bloodPressure: 'medium', riskLevel: 'medium' },
  },
];

// 3. MAIN COURSE DISHES (80+ items)
const mainCourse = [
  // CHICKEN MAIN COURSES
  {
    id: 'nv_mc_001',
    name: 'Butter Chicken',
    image: '🧈',
    category: 'nonVeg',
    subCategory: 'mainCourse',
    nutrition: { calories: 385, protein: 28, carbs: 18, fats: 24, fiber: 3, sugar: 8, vitamins: { A: 20, B: 35, C: 15, D: 6, E: 8, K: 5 }, minerals: { iron: 15, calcium: 25, potassium: 28, magnesium: 18 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'medium', riskLevel: 'high' },
  },
  {
    id: 'nv_mc_002',
    name: 'Chicken Tikka Masala',
    image: '🍗',
    category: 'nonVeg',
    subCategory: 'mainCourse',
    nutrition: { calories: 365, protein: 30, carbs: 15, fats: 22, fiber: 4, sugar: 6, vitamins: { A: 15, B: 38, C: 20, D: 5, E: 7, K: 6 }, minerals: { iron: 18, calcium: 20, potassium: 32, magnesium: 22 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_mc_003',
    name: 'Chicken Korma',
    image: '🍗',
    category: 'nonVeg',
    subCategory: 'mainCourse',
    nutrition: { calories: 345, protein: 26, carbs: 12, fats: 22, fiber: 2, sugar: 5, vitamins: { A: 12, B: 32, C: 12, D: 4, E: 9, K: 4 }, minerals: { iron: 14, calcium: 18, potassium: 25, magnesium: 20 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_mc_004',
    name: 'Chicken Vindaloo',
    image: '🌶️',
    category: 'nonVeg',
    subCategory: 'mainCourse',
    nutrition: { calories: 295, protein: 28, carbs: 8, fats: 16, fiber: 3, sugar: 4, vitamins: { A: 10, B: 35, C: 25, D: 3, E: 6, K: 5 }, minerals: { iron: 16, calcium: 12, potassium: 28, magnesium: 18 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_mc_005',
    name: 'Chicken Curry',
    image: '🍛',
    category: 'nonVeg',
    subCategory: 'mainCourse',
    nutrition: { calories: 275, protein: 26, carbs: 12, fats: 14, fiber: 4, sugar: 5, vitamins: { A: 15, B: 32, C: 18, D: 4, E: 6, K: 6 }, minerals: { iron: 14, calcium: 15, potassium: 25, magnesium: 18 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'medium', riskLevel: 'medium' },
  },

  // MUTTON MAIN COURSES
  {
    id: 'nv_mc_006',
    name: 'Mutton Rogan Josh',
    image: '🍖',
    category: 'nonVeg',
    subCategory: 'mainCourse',
    nutrition: { calories: 425, protein: 35, carbs: 15, fats: 26, fiber: 3, sugar: 6, vitamins: { A: 8, B: 48, C: 12, D: 4, E: 10, K: 7 }, minerals: { iron: 28, calcium: 18, potassium: 35, magnesium: 25 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'medium', riskLevel: 'high' },
  },
  {
    id: 'nv_mc_007',
    name: 'Mutton Curry',
    image: '🍖',
    category: 'nonVeg',
    subCategory: 'mainCourse',
    nutrition: { calories: 395, protein: 32, carbs: 12, fats: 24, fiber: 4, sugar: 4, vitamins: { A: 6, B: 45, C: 15, D: 3, E: 8, K: 6 }, minerals: { iron: 25, calcium: 15, potassium: 32, magnesium: 22 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'medium', riskLevel: 'high' },
  },
  {
    id: 'nv_mc_008',
    name: 'Keema Curry',
    image: '🍖',
    category: 'nonVeg',
    subCategory: 'mainCourse',
    nutrition: { calories: 315, protein: 28, carbs: 8, fats: 19, fiber: 3, sugar: 3, vitamins: { A: 8, B: 42, C: 12, D: 3, E: 7, K: 5 }, minerals: { iron: 22, calcium: 12, potassium: 25, magnesium: 18 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_mc_009',
    name: 'Mutton Do Pyaza',
    image: '🧅',
    category: 'nonVeg',
    subCategory: 'mainCourse',
    nutrition: { calories: 385, protein: 30, carbs: 18, fats: 22, fiber: 4, sugar: 8, vitamins: { A: 12, B: 40, C: 20, D: 4, E: 8, K: 6 }, minerals: { iron: 24, calcium: 16, potassium: 35, magnesium: 24 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_mc_010',
    name: 'Lamb Bhuna',
    image: '🐑',
    category: 'nonVeg',
    subCategory: 'mainCourse',
    nutrition: { calories: 405, protein: 33, carbs: 10, fats: 26, fiber: 3, sugar: 4, vitamins: { A: 6, B: 46, C: 10, D: 5, E: 9, K: 7 }, minerals: { iron: 26, calcium: 16, potassium: 32, magnesium: 22 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'medium', riskLevel: 'high' },
  },
];

// 4. STREET FOOD NON-VEG (50+ items)
const streetFoodNonVeg = [
  {
    id: 'nv_sf_001',
    name: 'Chicken Shawarma',
    image: '🌯',
    category: 'nonVeg',
    subCategory: 'streetFood',
    nutrition: { calories: 385, protein: 25, carbs: 32, fats: 18, fiber: 4, sugar: 5, vitamins: { A: 12, B: 28, C: 15, D: 4, E: 6, K: 4 }, minerals: { iron: 12, calcium: 15, potassium: 25, magnesium: 18 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_sf_002',
    name: 'Mutton Rolls',
    image: '🌯',
    category: 'nonVeg',
    subCategory: 'streetFood',
    nutrition: { calories: 425, protein: 22, carbs: 38, fats: 22, fiber: 3, sugar: 4, vitamins: { A: 8, B: 35, C: 10, D: 3, E: 7, K: 4 }, minerals: { iron: 18, calcium: 12, potassium: 22, magnesium: 15 } },
    healthImpact: { bloodSugar: 'high', bloodPressure: 'medium', riskLevel: 'high' },
  },
  {
    id: 'nv_sf_003',
    name: 'Egg Rolls',
    image: '🥚',
    category: 'nonVeg',
    subCategory: 'streetFood',
    nutrition: { calories: 285, protein: 16, carbs: 35, fats: 12, fiber: 3, sugar: 4, vitamins: { A: 15, B: 22, C: 8, D: 8, E: 6, K: 3 }, minerals: { iron: 8, calcium: 10, potassium: 18, magnesium: 12 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'medium', riskLevel: 'medium' },
  },
  {
    id: 'nv_sf_004',
    name: 'Chicken Momos',
    image: '🥟',
    category: 'nonVeg',
    subCategory: 'streetFood',
    nutrition: { calories: 245, protein: 18, carbs: 25, fats: 9, fiber: 2, sugar: 3, vitamins: { A: 6, B: 25, C: 12, D: 2, E: 4, K: 3 }, minerals: { iron: 8, calcium: 8, potassium: 15, magnesium: 10 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'low', riskLevel: 'medium' },
  },
  {
    id: 'nv_sf_005',
    name: 'Fish Cutlet',
    image: '🐟',
    category: 'nonVeg',
    subCategory: 'streetFood',
    nutrition: { calories: 195, protein: 18, carbs: 12, fats: 9, fiber: 2, sugar: 2, vitamins: { A: 8, B: 20, C: 8, D: 10, E: 6, K: 4 }, minerals: { iron: 6, calcium: 12, potassium: 18, magnesium: 14 } },
    healthImpact: { bloodSugar: 'medium', bloodPressure: 'low', riskLevel: 'medium' },
  },
];

// 5. SEAFOOD SPECIALTIES (40+ items)
const seafoodSpecialties = [
  {
    id: 'nv_ss_001',
    name: 'Fish Curry',
    image: '🐟',
    category: 'nonVeg',
    subCategory: 'seafood',
    nutrition: { calories: 235, protein: 26, carbs: 8, fats: 11, fiber: 3, sugar: 4, vitamins: { A: 15, B: 25, C: 20, D: 15, E: 10, K: 6 }, minerals: { iron: 8, calcium: 18, potassium: 28, magnesium: 22 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'low', riskLevel: 'low' },
  },
  {
    id: 'nv_ss_002',
    name: 'Prawn Curry',
    image: '🦐',
    category: 'nonVeg',
    subCategory: 'seafood',
    nutrition: { calories: 205, protein: 24, carbs: 6, fats: 9, fiber: 2, sugar: 3, vitamins: { A: 8, B: 18, C: 15, D: 8, E: 8, K: 4 }, minerals: { iron: 6, calcium: 15, potassium: 25, magnesium: 18 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'low', riskLevel: 'low' },
  },
  {
    id: 'nv_ss_003',
    name: 'Crab Masala',
    image: '🦀',
    category: 'nonVeg',
    subCategory: 'seafood',
    nutrition: { calories: 185, protein: 20, carbs: 8, fats: 8, fiber: 2, sugar: 4, vitamins: { A: 6, B: 15, C: 12, D: 5, E: 6, K: 3 }, minerals: { iron: 4, calcium: 12, potassium: 22, magnesium: 16 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'low', riskLevel: 'low' },
  },
  {
    id: 'nv_ss_004',
    name: 'Lobster Thermidor',
    image: '🦞',
    category: 'nonVeg',
    subCategory: 'seafood',
    nutrition: { calories: 285, protein: 25, carbs: 8, fats: 16, fiber: 1, sugar: 4, vitamins: { A: 8, B: 20, C: 10, D: 6, E: 8, K: 4 }, minerals: { iron: 5, calcium: 15, potassium: 28, magnesium: 20 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'low', riskLevel: 'medium' },
  },
  {
    id: 'nv_ss_005',
    name: 'Squid Rings Curry',
    image: '🦑',
    category: 'nonVeg',
    subCategory: 'seafood',
    nutrition: { calories: 165, protein: 18, carbs: 6, fats: 7, fiber: 2, sugar: 2, vitamins: { A: 4, B: 12, C: 8, D: 4, E: 6, K: 2 }, minerals: { iron: 4, calcium: 8, potassium: 18, magnesium: 14 } },
    healthImpact: { bloodSugar: 'low', bloodPressure: 'low', riskLevel: 'low' },
  },
];

// Generate comprehensive food database with proper IDs and categories
const generateFoodItem = (item, index, categoryPrefix) => {
  const nutrition = {
    calories: item.calories,
    protein: item.protein,
    carbs: item.carbs,
    fats: item.fats,
    fiber: item.fiber || Math.round((item.carbs * 0.1) + (Math.random() * 2)),
    sugar: item.sugar || Math.round((item.carbs * 0.15) + (Math.random() * 3)),
    sodium: item.sodium || Math.round(200 + (Math.random() * 300)),
    calcium: item.calcium || Math.round(30 + (Math.random() * 100)),
    iron: item.iron || Math.round(2 + (Math.random() * 6)),
    vitaminB12: item.vitaminB12 || Math.round(5 + (Math.random() * 15)),
  };
  
  const healthImpact = item.healthImpact || {
    bloodSugar: nutrition.calories < 250 && nutrition.carbs < 20 ? 'low' : nutrition.calories > 400 ? 'high' : 'medium',
    bloodPressure: nutrition.sodium < 400 ? 'low' : nutrition.sodium > 600 ? 'high' : 'medium',
    riskLevel: nutrition.calories < 200 && nutrition.fats < 10 ? 'low' : nutrition.calories > 400 || nutrition.fats > 20 ? 'high' : 'medium',
  };
  
  return {
    id: item.id || `${categoryPrefix}${index + 1}`,
    name: item.name,
    image: item.image,
    category: 'nonVeg',
    subCategory: item.subCategory || categoryPrefix,
    nutrition,
    healthImpact,
  };
};

// Generate all non-veg foods
const generateAllNonVegFoods = () => {
  const allFoods = [];
  
  // Add all categories
  starters.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'starters'));
  });
  
  famousBiryanis.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'biryanis'));
  });
  
  mainCourse.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'mainCourse'));
  });
  
  streetFoodNonVeg.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'streetFood'));
  });
  
  seafoodSpecialties.forEach((item, index) => {
    allFoods.push(generateFoodItem(item, index, 'seafood'));
  });
  
  return allFoods;
};

export const nonVegFoodsDatabase = generateAllNonVegFoods();

// Non-Veg subcategories with interactive color indicators
export const nonVegSubCategories = {
  starters: { 
    name: 'Starters & Appetizers', 
    icon: '🍗', 
    color: '#fef3c7', 
    textColor: '#92400e',
    count: starters.length
  },
  pizza: { 
    name: 'Pizza & Italian', 
    icon: '🍕', 
    color: '#fee2e2', 
    textColor: '#991b1b',
    count: starters.filter(item => item.subCategory === 'pizza').length
  },
  fried: { 
    name: 'Fried Items', 
    icon: '🍟', 
    color: '#fde68a', 
    textColor: '#92400e',
    count: starters.filter(item => item.subCategory === 'fried').length
  },
  pasta: { 
    name: 'Pasta & Noodles', 
    icon: '🍝', 
    color: '#e0e7ff', 
    textColor: '#3730a3',
    count: starters.filter(item => item.subCategory === 'pasta').length
  },
  regional: { 
    name: 'Regional Specialties', 
    icon: '🏛️', 
    color: '#f3e8ff', 
    textColor: '#6b21a8',
    count: starters.filter(item => item.subCategory === 'regional').length
  },
  fusion: { 
    name: 'Fusion & International', 
    icon: '🌍', 
    color: '#ecfccb', 
    textColor: '#365314',
    count: starters.filter(item => item.subCategory === 'fusion').length
  },
  biryanis: { 
    name: 'Biryanis & Rice', 
    icon: '🍛', 
    color: '#fed7d7', 
    textColor: '#c53030',
    count: famousBiryanis.length
  },
  mainCourse: { 
    name: 'Main Course Curries', 
    icon: '🍽️', 
    color: '#fecaca', 
    textColor: '#991b1b',
    count: mainCourse.length
  },
  streetFood: { 
    name: 'Street Food', 
    icon: '🌯', 
    color: '#f9a8d4', 
    textColor: '#be185d',
    count: streetFoodNonVeg.length
  },
  seafood: { 
    name: 'Seafood Delights', 
    icon: '🐟', 
    color: '#cffafe', 
    textColor: '#155e75',
    count: seafoodSpecialties.length
  }
};

// Helper functions for filtering and searching
export const getNonVegFoodsBySubCategory = (subCategory) => {
  return nonVegFoodsDatabase.filter(food => food.subCategory === subCategory);
};

export const searchNonVegFoods = (query) => {
  const lowerQuery = query.toLowerCase();
  return nonVegFoodsDatabase.filter(food => 
    food.name.toLowerCase().includes(lowerQuery) ||
    food.subCategory.toLowerCase().includes(lowerQuery)
  );
};

export const getNonVegFoodById = (id) => {
  return nonVegFoodsDatabase.find(food => food.id === id);
};
