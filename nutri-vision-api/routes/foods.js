const express = require('express');
const { getFoods, getFood, getCategories, getPopularFoods, searchFoods, getFoodByBarcode } = require('../controllers/foodController');

const router = express.Router();

router.get('/categories', getCategories);
router.get('/popular', getPopularFoods);
router.get('/search', searchFoods);
router.get('/barcode/:code', getFoodByBarcode);
router.get('/:id', getFood);
router.get('/', getFoods);

module.exports = router;
