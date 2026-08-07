/**
 * Product Sorting Service
 * 
 * Sorting is applied strictly AFTER filtering on the resulting dataset.
 * Options:
 * - price_asc / priceAsc: Low to High
 * - price_desc / priceDesc: High to Low
 * - rating_desc / topRated: Highest rated first
 * - newest: Latest creation date first
 * - default: Retain original inventory order
 */
function sortProducts(products, sortBy) {
  const sorted = [...products];

  switch (sortBy) {
    case 'price_asc':
    case 'priceAsc':
      return sorted.sort((a, b) => a.price - b.price);

    case 'price_desc':
    case 'priceDesc':
      return sorted.sort((a, b) => b.price - a.price);

    case 'rating_desc':
    case 'ratingDesc':
    case 'topRated':
      return sorted.sort((a, b) => b.rating - a.rating);

    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    default:
      return sorted;
  }
}

module.exports = {
  sortProducts
};
