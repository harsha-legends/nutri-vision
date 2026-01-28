const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const { createGoal, getActiveGoal, getGoals, updateGoal, logProgress, deleteGoal } = require('../controllers/goalController');

const router = express.Router();
router.use(protect);

/**
 * @swagger
 * /api/goals/active:
 *   get:
 *     summary: Get user's active goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Active goal data
 *       404:
 *         description: No active goal found
 */
router.get('/active', getActiveGoal);

/**
 * @swagger
 * /api/goals:
 *   get:
 *     summary: Get all user goals
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user goals
 *   post:
 *     summary: Create a new goal (deactivates previous goals)
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [goalType, dailyCalories]
 *             properties:
 *               goalType: { type: string, enum: [weight_loss, weight_gain, maintain, muscle_gain, improve_health, custom] }
 *               dailyCalories: { type: number, example: 2000 }
 *               dailyProtein: { type: number, example: 50 }
 *               dailyCarbs: { type: number, example: 250 }
 *               dailyFat: { type: number, example: 65 }
 *               targetWeight: { type: number }
 *               targetDate: { type: string, format: date }
 *     responses:
 *       201:
 *         description: Goal created
 */
router.route('/')
  .get(getGoals)
  .post([
    body('goalType').isIn(['weight_loss', 'weight_gain', 'maintain', 'muscle_gain', 'improve_health', 'custom']).withMessage('Invalid goal type'),
    body('dailyCalories').isNumeric().withMessage('Daily calories must be a number')
  ], validate, createGoal);

/**
 * @swagger
 * /api/goals/{id}:
 *   put:
 *     summary: Update a goal
 *     tags: [Goals]
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
 *               dailyCalories: { type: number }
 *               dailyProtein: { type: number }
 *               dailyCarbs: { type: number }
 *               dailyFat: { type: number }
 *               isActive: { type: boolean }
 *     responses:
 *       200:
 *         description: Goal updated
 *   delete:
 *     summary: Delete a goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Goal deleted
 */
router.route('/:id').put(updateGoal).delete(deleteGoal);

/**
 * @swagger
 * /api/goals/{id}/progress:
 *   post:
 *     summary: Log daily progress for a goal
 *     tags: [Goals]
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
 *               date: { type: string, format: date }
 *               weight: { type: number }
 *               caloriesConsumed: { type: number }
 *               waterGlasses: { type: number }
 *               exerciseMinutes: { type: number }
 *               notes: { type: string }
 *     responses:
 *       200:
 *         description: Progress logged
 */
router.post('/:id/progress', logProgress);

module.exports = router;
