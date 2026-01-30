const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  duplicateTemplate,
  useTemplate,
  toggleFavorite,
} = require('../controllers/templateController');

// All routes require authentication
router.use(protect);

// Main CRUD routes
router.route('/')
  .get(getTemplates)
  .post(createTemplate);

router.route('/:id')
  .get(getTemplate)
  .put(updateTemplate)
  .delete(deleteTemplate);

// Special actions
router.post('/:id/duplicate', duplicateTemplate);
router.post('/:id/use', useTemplate);
router.patch('/:id/favorite', toggleFavorite);

module.exports = router;
