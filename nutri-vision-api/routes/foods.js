const express = require('express');
const { getFoods, getFood, getCategories, getPopularFoods, searchFoods, getFoodByBarcode } = require('../controllers/foodController');

const router = express.Router();

/**
 * @swagger
 * /api/foods/categories:
 *   get:
 *     summary: Get all food categories with subcategories
 *     tags: [Foods]
 *     responses:
 *       200:
 *         description: List of categories with counts
 */
router.get('/categories', getCategories);

/**
 * @swagger
 * /api/foods/popular:
 *   get:
 *     summary: Get popular foods
 *     tags: [Foods]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *         description: Number of results to return
 *     responses:
 *       200:
 *         description: List of popular foods
 */
router.get('/popular', getPopularFoods);

/**
 * @swagger
 * /api/foods/search:
 *   get:
 *     summary: Search foods by name or tags
 *     tags: [Foods]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema: { type: string }
 *         description: Search query
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: List of matching foods
 */
router.get('/search', searchFoods);

/**
 * @swagger
 * /api/foods/barcode/{code}:
 *   get:
 *     summary: Get food by barcode
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema: { type: string }
 *         description: Barcode number
 *     responses:
 *       200:
 *         description: Food details
 *       404:
 *         description: Food not found
 */
router.get('/barcode/:code', getFoodByBarcode);

/**
 * @swagger
 * /api/foods/{id}:
 *   get:
 *     summary: Get a single food by ID
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Food ID
 *     responses:
 *       200:
 *         description: Food details
 *       404:
 *         description: Food not found
 */
router.get('/:id', getFood);

/**
 * @swagger
 * /api/foods:
 *   get:
 *     summary: Get all foods with filters and pagination
 *     tags: [Foods]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *         description: Filter by category (vegetarian, non-vegetarian, juices, etc.)
 *       - in: query
 *         name: subCategory
 *         schema: { type: string }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *       - in: query
 *         name: isPopular
 *         schema: { type: boolean }
 *       - in: query
 *         name: minCalories
 *         schema: { type: integer }
 *       - in: query
 *         name: maxCalories
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Paginated list of foods
 */
router.get('/', getFoods);

module.exports = router;
