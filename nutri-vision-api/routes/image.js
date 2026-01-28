const express = require('express');
const { protect } = require('../middleware/auth');
const { analyzeFoodImage } = require('../controllers/imageController');

const router = express.Router();

/**
 * @swagger
 * /api/image/analyze:
 *   post:
 *     summary: Analyze food image (mock AI - matches by name/tags)
 *     tags: [Image]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [image]
 *             properties:
 *               image: { type: string, description: 'Base64 encoded image' }
 *               imageName: { type: string, description: 'Optional hint for food name', example: 'chicken biryani' }
 *     responses:
 *       200:
 *         description: List of matched foods from database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Food'
 */
router.post('/analyze', protect, analyzeFoodImage);

module.exports = router;
