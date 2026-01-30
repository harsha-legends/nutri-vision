const mongoose = require('mongoose');

const scanHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  image: {
    type: String, // Base64 image or URL
    required: true,
  },
  thumbnail: {
    type: String, // Smaller version for list view
  },
  analysis: {
    name: { type: String, required: true },
    confidence: { type: Number, default: 0 },
    servingSize: String,
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    fiber: { type: Number, default: 0 },
    sugar: { type: Number, default: 0 },
    sodium: { type: Number, default: 0 },
    ingredients: [String],
    suggestions: [String],
    foodCategory: String,
    isHealthy: Boolean,
    healthScore: Number,
  },
  hint: {
    type: String, // User-provided hint during analysis
  },
  addedToMeal: {
    type: Boolean,
    default: false,
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack', null],
    default: null,
  },
  scannedAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
}, {
  timestamps: true,
});

// Index for efficient querying
scanHistorySchema.index({ user: 1, scannedAt: -1 });

module.exports = mongoose.model('ScanHistory', scanHistorySchema);
