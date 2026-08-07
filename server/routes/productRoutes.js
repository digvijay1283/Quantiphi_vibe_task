const express = require('express');
const router = express.Router();
const { getProducts, getCategories, getPriceRange } = require('../controllers/productController');

// GET /api/products
router.get('/products', getProducts);

// GET /api/categories
router.get('/categories', getCategories);

// GET /api/price-range
router.get('/price-range', getPriceRange);

module.exports = router;
