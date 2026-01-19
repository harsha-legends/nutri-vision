const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  goalType: {
    type: String,
    required: true,
    enum: ['weight_loss', 'weight_gain', 'maintain', 'muscle_gain', 'improve_health', 'custom']
  },
  targetWeight: { type: Number, default: 0 },
  dailyCalories: { type: Number, required: true, default: 2000 },
  dailyProtein: { type: Number, default: 50 },
  dailyCarbs: { type: Number, default: 250 },
  dailyFat: { type: Number, default: 65 },
  dailyFiber: { type: Number, default: 25 },
  dailyWater: { type: Number, default: 8 },
  weeklyExerciseMinutes: { type: Number, default: 150 },
  startDate: { type: Date, default: Date.now },
  targetDate: { type: Date },
  isActive: { type: Boolean, default: true },
  progress: [{
    date: { type: Date, default: Date.now },
    weight: { type: Number },
    caloriesConsumed: { type: Number },
    proteinConsumed: { type: Number },
    carbsConsumed: { type: Number },
    fatConsumed: { type: Number },
    waterGlasses: { type: Number },
    exerciseMinutes: { type: Number },
    notes: { type: String }
  }],
  reminders: {
    breakfast: { enabled: { type: Boolean, default: true }, time: { type: String, default: '08:00' } },
    lunch: { enabled: { type: Boolean, default: true }, time: { type: String, default: '13:00' } },
    dinner: { enabled: { type: Boolean, default: true }, time: { type: String, default: '19:00' } },
    water: { enabled: { type: Boolean, default: true }, intervalHours: { type: Number, default: 2 } }
  }
}, { timestamps: true });

goalSchema.index({ user: 1, isActive: 1 });

module.exports = mongoose.model('Goal', goalSchema);
