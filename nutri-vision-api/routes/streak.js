const express = require('express');
const { protect } = require('../middleware/auth');
const { getStreak } = require('../controllers/streakController');

const router = express.Router();

/**
 * @swagger
 * /api/streak:
 *   get:
 *     summary: Get user's meal tracking streak
 *     tags: [Streak]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current streak, longest streak, and badges
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: object
 *                   properties:
 *                     currentStreak: { type: number, example: 5 }
 *                     longestStreak: { type: number, example: 14 }
 *                     badges: { type: array, items: { type: string }, example: ['7-day streak'] }
 */
router.get('/', protect, getStreak);

module.exports = router;
