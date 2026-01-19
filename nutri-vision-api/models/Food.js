const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  nameHindi: { type: String, trim: true, default: '' },
  category: {
    type: String,
    required: true,
    enum: ['vegetarian', 'non-vegetarian', 'juices', 'packed-foods', 'fruits', 'dairy', 'grains', 'snacks', 'beverages', 'desserts']
  },
  subCategory: { type: String, default: '' },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  servingSize: {
    amount: { type: Number, default: 100 },
    unit: { type: String, default: 'g' }
  },
  nutrition: {
    calories: { type: Number, required: true, default: 0 },
    protein: { type: Number, default: 0 },
    carbohydrates: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    fiber: { type: Number, default: 0 },
    sugar: { type: Number, default: 0 },
    sodium: { type: Number, default: 0 },
    cholesterol: { type: Number, default: 0 },
    potassium: { type: Number, default: 0 },
    calcium: { type: Number, default: 0 },
    iron: { type: Number, default: 0 },
    vitaminA: { type: Number, default: 0 },
    vitaminC: { type: Number, default: 0 },
    vitaminD: { type: Number, default: 0 },
    vitaminB12: { type: Number, default: 0 }
  },
  ingredients: [{ type: String }],
  allergens: [{ type: String }],
  isVerified: { type: Boolean, default: true },
  brand: { type: String, default: '' },
  barcode: { type: String, default: '' },
  tags: [{ type: String }],
  healthScore: { type: Number, min: 0, max: 100, default: 50 },
  isPopular: { type: Boolean, default: false }
}, { timestamps: true });

foodSchema.index({ name: 'text', nameHindi: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Food', foodSchema);
