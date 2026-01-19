const express = require('express');
const { protect } = require('../middleware/auth');
const { getWeeklyAnalytics, getMonthlyAnalytics, getGoalAnalytics, getMacroBreakdown } = require('../controllers/analyticsController');

const router = express.Router();
router.use(protect);

router.get('/weekly', getWeeklyAnalytics);
router.get('/monthly', getMonthlyAnalytics);
router.get('/goals', getGoalAnalytics);
router.get('/macros', getMacroBreakdown);

module.exports = router;
