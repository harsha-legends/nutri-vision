const express = require('express');
const router = express.Router();
const { chat } = require('../controllers/aiController');

/**
 * @swagger
 * /api/ai/chat:
 *   post:
 *     summary: Chat with AI nutrition assistant
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [message]
 *             properties:
 *               message: { type: string, example: 'How much protein should I eat daily?' }
 *               conversationHistory:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type: { type: string, enum: [user, bot] }
 *                     text: { type: string }
 *     responses:
 *       200:
 *         description: AI response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: object
 *                   properties:
 *                     message: { type: string }
 *                     timestamp: { type: string, format: date-time }
 */
router.post('/chat', chat);

module.exports = router;
