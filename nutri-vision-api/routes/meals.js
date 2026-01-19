const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const { logMeal, getMeals, getMeal, updateMeal, deleteMeal, getTodaySummary } = require('../controllers/mealController');

const router = express.Router();
router.use(protect);

router.get('/today/summary', getTodaySummary);
router.route('/')
  .get(getMeals)
  .post([
    body('foodId').notEmpty().withMessage('Food ID is required'),
    body('mealType').isIn(['breakfast', 'lunch', 'dinner', 'snack']).withMessage('Invalid meal type')
  ], validate, logMeal);

router.route('/:id').get(getMeal).put(updateMeal).delete(deleteMeal);

module.exports = router;
