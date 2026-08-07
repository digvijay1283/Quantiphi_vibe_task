const productsData = require('../data/products.json');
const { filterProducts } = require('../services/filterService');
const { sortProducts } = require('../services/sortService');

/**
 * Controller: GET /api/products
 * Query Params:
 * - categories (string CSV or array)
 * - minPrice (number)
 * - maxPrice (number)
 * - minRating (number)
 * - sortBy (string: price_asc | price_desc | rating_desc | newest)
 * - search (string)
 */
function getProducts(req, res) {
  try {
    const { categories, minPrice, maxPrice, minRating, rating, sortBy, sort, search } = req.query;

    // Handle aliases (e.g. minRating / rating, sortBy / sort)
    const effectiveRating = minRating || rating;
    const effectiveSort = sortBy || sort;

    let dataset = [...productsData];

    // Optional Search filter if provided
    if (search && search.trim().length > 0) {
      const query = search.trim().toLowerCase();
      dataset = dataset.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // 1. Filter dataset
    const filteredProducts = filterProducts(dataset, {
      categories,
      minPrice,
      maxPrice,
      minRating: effectiveRating
    });

    // 2. Sort filtered dataset
    const finalProducts = sortProducts(filteredProducts, effectiveSort);

    // Extract available metadata for UI helpers (distinct categories and min/max price range)
    const availableCategories = Array.from(new Set(productsData.map(p => p.category)));
    const prices = productsData.map(p => p.price);
    const overallMinPrice = Math.min(...prices);
    const overallMaxPrice = Math.max(...prices);

    // Log debug info to console for success tracking
    console.log(`[SERVER API] [Status 200 OK] Processing GET /api/products query:`, {
      categories: categories || 'All',
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 'max',
      minRating: effectiveRating || 'none',
      sortBy: effectiveSort || 'default',
      returnedCount: finalProducts.length
    });

    return res.json({
      success: true,
      count: finalProducts.length,
      products: finalProducts,
      metadata: {
        categories: availableCategories,
        priceBounds: {
          min: overallMinPrice,
          max: overallMaxPrice
        }
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while processing products query.'
    });
  }
}

/**
 * Controller: GET /api/categories
 */
function getCategories(req, res) {
  const categories = Array.from(new Set(productsData.map(p => p.category)));
  return res.json({ success: true, categories });
}

/**
 * Controller: GET /api/price-range
 */
function getPriceRange(req, res) {
  const prices = productsData.map(p => p.price);
  return res.json({
    success: true,
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices)
  });
}

module.exports = {
  getProducts,
  getCategories,
  getPriceRange
};
