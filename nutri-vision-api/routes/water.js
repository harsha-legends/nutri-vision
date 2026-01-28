const express = require('express');
const { protect } = require('../middleware/auth');
const { logWater, getWater } = require('../controllers/waterController');

const router = express.Router();

/**
 * @swagger
 * /api/water:
 *   post:
 *     summary: Log or update water intake for a day
 *     tags: [Water]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [date, glasses]
 *             properties:
 *               date: { type: string, format: date, example: '2026-01-28' }
 *               glasses: { type: number, example: 8 }
 *     responses:
 *       200:
 *         description: Water intake logged/updated
 *   get:
 *     summary: Get water intake logs
 *     tags: [Water]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema: { type: string, format: date }
 *         description: Get water for a specific date
 *       - in: query
 *         name: startDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: endDate
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: List of water intake logs
 */
router.post('/', protect, logWater);
router.get('/', protect, getWater);

module.exports = router;
