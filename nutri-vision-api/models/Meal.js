const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
  mealType: {
    type: String,
    required: true,
    enum: ['breakfast', 'lunch', 'dinner', 'snack']
  },
  date: { type: Date, required: true, default: Date.now },
  quantity: { type: Number, required: true, default: 1 },
  servingSize: {
    amount: { type: Number, default: 100 },
    unit: { type: String, default: 'g' }
  },
  nutritionConsumed: {
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbohydrates: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    fiber: { type: Number, default: 0 },
    sugar: { type: Number, default: 0 },
    sodium: { type: Number, default: 0 }
  },
  notes: { type: String, default: '' },
  isScanned: { type: Boolean, default: false },
  scannedImage: { type: String, default: '' }
}, { timestamps: true });

mealSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Meal', mealSchema);
