const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const { createGoal, getActiveGoal, getGoals, updateGoal, logProgress, deleteGoal } = require('../controllers/goalController');

const router = express.Router();
router.use(protect);

router.get('/active', getActiveGoal);
router.route('/')
  .get(getGoals)
  .post([
    body('goalType').isIn(['weight_loss', 'weight_gain', 'maintain', 'muscle_gain', 'improve_health', 'custom']).withMessage('Invalid goal type'),
    body('dailyCalories').isNumeric().withMessage('Daily calories must be a number')
  ], validate, createGoal);

router.route('/:id').put(updateGoal).delete(deleteGoal);
router.post('/:id/progress', logProgress);

module.exports = router;
