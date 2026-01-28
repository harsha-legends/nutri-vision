const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const { logMeal, getMeals, getMeal, updateMeal, deleteMeal, getTodaySummary } = require('../controllers/mealController');

const router = express.Router();
router.use(protect);

/**
 * @swagger
 * /api/meals/today/summary:
 *   get:
 *     summary: Get today's meal summary
 *     tags: [Meals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Today's nutrition totals and meal counts
 */
router.get('/today/summary', getTodaySummary);

/**
 * @swagger
 * /api/meals:
 *   get:
 *     summary: Get user meals
 *     tags: [Meals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema: { type: string, format: date }
 *         description: Get meals for a specific date (YYYY-MM-DD)
 *       - in: query
 *         name: startDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: endDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: mealType
 *         schema: { type: string, enum: [breakfast, lunch, dinner, snack] }
 *     responses:
 *       200:
 *         description: List of meals grouped by type
 *   post:
 *     summary: Log a new meal
 *     tags: [Meals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [foodId, mealType]
 *             properties:
 *               foodId: { type: string, description: 'Food ID from database' }
 *               mealType: { type: string, enum: [breakfast, lunch, dinner, snack] }
 *               quantity: { type: number, default: 1 }
 *               date: { type: string, format: date-time }
 *               notes: { type: string }
 *     responses:
 *       201:
 *         description: Meal logged successfully
 */
router.route('/')
  .get(getMeals)
  .post([
    body('foodId').notEmpty().withMessage('Food ID is required'),
    body('mealType').isIn(['breakfast', 'lunch', 'dinner', 'snack']).withMessage('Invalid meal type')
  ], validate, logMeal);

/**
 * @swagger
 * /api/meals/{id}:
 *   get:
 *     summary: Get a single meal
 *     tags: [Meals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Meal details
 *   put:
 *     summary: Update a meal
 *     tags: [Meals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity: { type: number }
 *               mealType: { type: string }
 *               notes: { type: string }
 *     responses:
 *       200:
 *         description: Meal updated
 *   delete:
 *     summary: Delete a meal
 *     tags: [Meals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Meal deleted
 */
router.route('/:id').get(getMeal).put(updateMeal).delete(deleteMeal);

module.exports = router;
