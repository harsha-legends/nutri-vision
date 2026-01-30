const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const scanHistoryController = require('../controllers/scanHistoryController');

/**
 * @swagger
 * /api/scan-history:
 *   post:
 *     summary: Save a new food scan to history
 *     tags: [Scan History]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *               - analysis
 *             properties:
 *               image:
 *                 type: string
 *                 description: Base64 encoded image
 *               thumbnail:
 *                 type: string
 *                 description: Base64 encoded thumbnail (optional)
 *               analysis:
 *                 type: object
 *                 description: AI analysis result
 *               hint:
 *                 type: string
 *                 description: User-provided hint
 *     responses:
 *       201:
 *         description: Scan saved successfully
 */
router.post('/', protect, scanHistoryController.saveScan);

/**
 * @swagger
 * /api/scan-history:
 *   get:
 *     summary: Get user's scan history
 *     tags: [Scan History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of scans
 */
router.get('/', protect, scanHistoryController.getScanHistory);

/**
 * @swagger
 * /api/scan-history/stats:
 *   get:
 *     summary: Get scan statistics
 *     tags: [Scan History]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Scan statistics
 */
router.get('/stats', protect, scanHistoryController.getScanStats);

/**
 * @swagger
 * /api/scan-history/{id}:
 *   get:
 *     summary: Get a single scan by ID
 *     tags: [Scan History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Scan details
 */
router.get('/:id', protect, scanHistoryController.getScanById);

/**
 * @swagger
 * /api/scan-history/{id}:
 *   patch:
 *     summary: Update a scan
 *     tags: [Scan History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Scan updated
 */
router.patch('/:id', protect, scanHistoryController.updateScan);

/**
 * @swagger
 * /api/scan-history/{id}:
 *   delete:
 *     summary: Delete a scan
 *     tags: [Scan History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Scan deleted
 */
router.delete('/:id', protect, scanHistoryController.deleteScan);

module.exports = router;
