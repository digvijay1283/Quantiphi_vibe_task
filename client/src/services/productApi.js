import mockProductsData from '../data/mockProducts.json';

/**
 * Product API Service Client
 * Attempts HTTP GET to Express backend (/api/products).
 * If the backend API is offline or when deployed in client-side static mode,
 * seamlessly falls back to local embedded JSON filtering with warning logging.
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

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }
    const data = await response.json();
    console.log(`[HTTP ${response.status} OK] Connected to Express Backend API:`, {
      endpoint: url,
      count: data.count,
      timestamp: new Date().toISOString()
    });
    return data;
  } catch (err) {
    console.warn(`[CLIENT STANDALONE MODE] Express Backend API is offline or unavailable. Running in client-side static demo mode using embedded JSON dataset.\nNote: To run the live Express backend API, start the server using 'npm start' in the server directory.`);
    
    return filterClientSide(mockProductsData, filters);
  }
}

/**
 * Client-Side Fallback Combinatorial Filtering Function
 */
function filterClientSide(dataset, filters) {
  const { categories, minPrice, maxPrice, rating, minRating, sortBy, search } = filters;
  const effectiveRating = minRating !== undefined && minRating !== null ? minRating : rating;

  let result = [...dataset];

  // 1. Search Query
  if (search && search.trim().length > 0) {
    const q = search.trim().toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  // 2. Categories (OR logic)
  if (Array.isArray(categories) && categories.length > 0) {
    const catLower = categories.map(c => c.toLowerCase());
    result = result.filter(p => catLower.includes(p.category.toLowerCase()));
  }

  // 3. Price Bounds
  if (minPrice !== undefined && minPrice !== null && minPrice !== '') {
    result = result.filter(p => p.price >= Number(minPrice));
  }

  if (maxPrice !== undefined && maxPrice !== null && maxPrice !== '') {
    result = result.filter(p => p.price <= Number(maxPrice));
  }

  // 4. Rating (rating >= minRating)
  if (effectiveRating !== undefined && effectiveRating !== null && effectiveRating !== '') {
    result = result.filter(p => p.rating >= Number(effectiveRating));
  }

  // 5. Sorting
  if (sortBy === 'price_asc' || sortBy === 'priceAsc') {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc' || sortBy === 'priceDesc') {
    result.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating_desc' || sortBy === 'ratingDesc' || sortBy === 'topRated') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'newest') {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const availableCategories = Array.from(new Set(dataset.map(p => p.category)));
  const prices = dataset.map(p => p.price);

  return {
    success: true,
    isStandaloneFallbackMode: true,
    count: result.length,
    products: result,
    metadata: {
      categories: availableCategories,
      priceBounds: {
        min: Math.min(...prices),
        max: Math.max(...prices)
      }
    }
  };
}

export async function fetchCategories() {
  try {
    const response = await fetch('/api/categories');
    if (!response.ok) throw new Error('API offline');
    return response.json();
  } catch (err) {
    const categories = Array.from(new Set(mockProductsData.map(p => p.category)));
    return { success: true, categories };
  }
}

export async function fetchPriceRange() {
  try {
    const response = await fetch('/api/price-range');
    if (!response.ok) throw new Error('API offline');
    return response.json();
  } catch (err) {
    const prices = mockProductsData.map(p => p.price);
    return {
      success: true,
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices)
    };
  }
}
