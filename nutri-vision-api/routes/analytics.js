const express = require('express');
const { protect } = require('../middleware/auth');
const { getWeeklyAnalytics, getMonthlyAnalytics, getGoalAnalytics, getMacroBreakdown } = require('../controllers/analyticsController');

const router = express.Router();
router.use(protect);

/**
 * @swagger
 * /api/analytics/weekly:
 *   get:
 *     summary: Get weekly nutrition analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daily nutrition data for the past 7 days
 */
router.get('/weekly', getWeeklyAnalytics);

/**
 * @swagger
 * /api/analytics/monthly:
 *   get:
 *     summary: Get monthly nutrition analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema: { type: integer }
 *         description: Month number (1-12)
 *       - in: query
 *         name: year
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Monthly totals and daily averages
 */
router.get('/monthly', getMonthlyAnalytics);

/**
 * @swagger
 * /api/analytics/goals:
 *   get:
 *     summary: Get goal progress analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Today's progress vs active goal targets
 */
router.get('/goals', getGoalAnalytics);

/**
 * @swagger
 * /api/analytics/macros:
 *   get:
 *     summary: Get macro breakdown
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: days
 *         schema: { type: integer, default: 7 }
 *         description: Number of days to analyze
 *     responses:
 *       200:
 *         description: Macro totals and percentages
 */
router.get('/macros', getMacroBreakdown);

module.exports = router;
