const express = require('express');
const router = express.Router();
const { chat } = require('../controllers/aiController');

// POST /api/ai/chat - Chat with AI
router.post('/chat', chat);

module.exports = router;
