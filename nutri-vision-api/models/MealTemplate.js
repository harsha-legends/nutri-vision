const mongoose = require('mongoose');

const mealTemplateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: [true, 'Template name is required'],
    trim: true,
    maxlength: [100, 'Template name cannot exceed 100 characters'],
  },
  mealType: {
    type: String,
    required: true,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    default: 'breakfast',
  },
  foods: [{
    foodId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
    },
    nutrition: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
      fiber: { type: Number, default: 0 },
      sugar: { type: Number, default: 0 },
    },
    quantity: {
      type: Number,
      default: 1,
    },
  }],
  totalCalories: {
    type: Number,
    default: 0,
  },
  totalProtein: {
    type: Number,
    default: 0,
  },
  totalCarbs: {
    type: Number,
    default: 0,
  },
  totalFat: {
    type: Number,
    default: 0,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  usageCount: {
    type: Number,
    default: 0,
  },
  lastUsedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Index for efficient queries
mealTemplateSchema.index({ user: 1, mealType: 1 });
mealTemplateSchema.index({ user: 1, isFavorite: 1 });

// Calculate totals before saving
mealTemplateSchema.pre('save', function(next) {
  if (this.foods && this.foods.length > 0) {
    this.totalCalories = this.foods.reduce((sum, food) => {
      return sum + ((food.nutrition?.calories || 0) * (food.quantity || 1));
    }, 0);
    this.totalProtein = this.foods.reduce((sum, food) => {
      return sum + ((food.nutrition?.protein || 0) * (food.quantity || 1));
    }, 0);
    this.totalCarbs = this.foods.reduce((sum, food) => {
      return sum + ((food.nutrition?.carbs || 0) * (food.quantity || 1));
    }, 0);
    this.totalFat = this.foods.reduce((sum, food) => {
      return sum + ((food.nutrition?.fat || 0) * (food.quantity || 1));
    }, 0);
  }
  next();
});

module.exports = mongoose.model('MealTemplate', mealTemplateSchema);
