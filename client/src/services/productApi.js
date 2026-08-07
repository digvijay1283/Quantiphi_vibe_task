/**
 * Product API Service Client
 * Encapsulates HTTP GET request to backend Express /api/products
 */
export async function fetchProducts(filters = {}) {
  const { categories, minPrice, maxPrice, rating, minRating, sortBy, search } = filters;

  const params = new URLSearchParams();

  if (Array.isArray(categories) && categories.length > 0) {
    params.append('categories', categories.join(','));
  }

  if (minPrice !== undefined && minPrice !== null && minPrice !== '') {
    params.append('minPrice', minPrice);
  }

  if (maxPrice !== undefined && maxPrice !== null && maxPrice !== '') {
    params.append('maxPrice', maxPrice);
  }

  const effectiveRating = minRating !== undefined && minRating !== null ? minRating : rating;
  if (effectiveRating !== undefined && effectiveRating !== null && effectiveRating !== '') {
    params.append('minRating', effectiveRating);
  }

  if (sortBy) {
    params.append('sortBy', sortBy);
  }

  if (search) {
    params.append('search', search);
  }

  const apiBase = import.meta.env.VITE_API_BASE_URL || '';
  const url = `${apiBase}/api/products?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    console.error(`[HTTP ${response.status} ERROR] Failed to fetch products: ${response.statusText}`);
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(`[HTTP ${response.status} OK] Products API query successful:`, {
    endpoint: url,
    count: data.count,
    timestamp: new Date().toISOString()
  });

  return data;
}

export async function fetchCategories() {
  const response = await fetch('/api/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}

export async function fetchPriceRange() {
  const response = await fetch('/api/price-range');
  if (!response.ok) {
    throw new Error('Failed to fetch price range');
  }
  return response.json();
}
