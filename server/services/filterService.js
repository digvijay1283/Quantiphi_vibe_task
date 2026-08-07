/**
 * Combinatorial Intersect Filtering Service
 * 
 * Filters products by:
 * 1. Categories (multi-select, OR logic between categories)
 * 2. Price Range (inclusive min and max price bounds)
 * 3. Rating (minimum rating requirement: rating >= minRating)
 * 
 * Short-circuits to true when a filter is empty or unspecified.
 */
function filterProducts(products, { categories, minPrice, maxPrice, minRating }) {
  // Normalize categories input (accepts array or comma-separated string)
  let categoryList = [];
  if (Array.isArray(categories)) {
    categoryList = categories.map(c => c.trim().toLowerCase()).filter(Boolean);
  } else if (typeof categories === 'string' && categories.trim().length > 0) {
    categoryList = categories.split(',').map(c => c.trim().toLowerCase()).filter(Boolean);
  }

  // Parse numeric criteria safely
  const parsedMinPrice = minPrice !== undefined && minPrice !== null && minPrice !== '' ? Number(minPrice) : null;
  const parsedMaxPrice = maxPrice !== undefined && maxPrice !== null && maxPrice !== '' ? Number(maxPrice) : null;
  const parsedMinRating = minRating !== undefined && minRating !== null && minRating !== '' ? Number(minRating) : null;

  return products.filter(product => {
    // 1. Category Filter (OR logic between selected categories)
    const matchesCategory = categoryList.length === 0 || 
      categoryList.includes(product.category.toLowerCase());

    // 2. Price Filter (Inclusive Range)
    const matchesMinPrice = parsedMinPrice === null || isNaN(parsedMinPrice) || product.price >= parsedMinPrice;
    const matchesMaxPrice = parsedMaxPrice === null || isNaN(parsedMaxPrice) || product.price <= parsedMaxPrice;
    const matchesPrice = matchesMinPrice && matchesMaxPrice;

    // 3. Rating Filter (rating >= minRating)
    const matchesRating = parsedMinRating === null || isNaN(parsedMinRating) || product.rating >= parsedMinRating;

    return matchesCategory && matchesPrice && matchesRating;
  });
}

module.exports = {
  filterProducts
};
