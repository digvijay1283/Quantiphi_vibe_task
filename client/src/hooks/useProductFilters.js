import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchProducts } from '../services/productApi';

const DEFAULT_FILTERS = {
  categories: [],
  minPrice: 0,
  maxPrice: 500,
  rating: null,
  sortBy: 'default',
  searchQuery: ''
};

export function useProductFilters() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [metadata, setMetadata] = useState({ categories: [], priceBounds: { min: 0, max: 500 } });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reference for debounce timeout
  const debounceTimerRef = useRef(null);

  const loadProducts = useCallback(async (currentFilters) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts(currentFilters);
      if (data.success) {
        setProducts(data.products);
        setCount(data.count);
        if (data.metadata) {
          setMetadata(data.metadata);
        }
      }
    } catch (err) {
      console.error('Failed to load products:', err);
      setError(err.message || 'An error occurred while loading products.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced effect for API trigger
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce price slider or typing by 200ms
    debounceTimerRef.current = setTimeout(() => {
      loadProducts(filters);
    }, 200);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [filters, loadProducts]);

  // Handler methods with Console Debug Logs
  const toggleCategory = useCallback((categoryName) => {
    setFilters(prev => {
      const exists = prev.categories.includes(categoryName);
      const updated = exists
        ? prev.categories.filter(c => c !== categoryName)
        : [...prev.categories, categoryName];
      console.log(`[FILTER STATE] [Status 200 SUCCESS] Toggled category "${categoryName}":`, updated);
      return { ...prev, categories: updated };
    });
  }, []);

  const setPriceRange = useCallback((minPrice, maxPrice) => {
    const min = Math.max(0, minPrice);
    const max = Math.max(minPrice, maxPrice);
    console.log(`[FILTER STATE] [Status 200 SUCCESS] Updated price range:`, { minPrice: min, maxPrice: max });
    setFilters(prev => ({
      ...prev,
      minPrice: min,
      maxPrice: max
    }));
  }, []);

  const setRating = useCallback((ratingVal) => {
    console.log(`[FILTER STATE] [Status 200 SUCCESS] Rating threshold set to:`, ratingVal);
    setFilters(prev => ({
      ...prev,
      rating: prev.rating === ratingVal ? null : ratingVal
    }));
  }, []);

  const setSortBy = useCallback((sortByVal) => {
    console.log(`[SORT STATE] [Status 200 SUCCESS] Sort option changed to:`, sortByVal);
    setFilters(prev => ({
      ...prev,
      sortBy: sortByVal
    }));
  }, []);

  const setSearchQuery = useCallback((query) => {
    setFilters(prev => ({
      ...prev,
      searchQuery: query
    }));
  }, []);

  const resetFilters = useCallback(() => {
    console.log(`[FILTER STATE] [Status 200 SUCCESS] Filters reset to default values.`);
    setFilters(DEFAULT_FILTERS);
  }, []);

  // Compute total active filters count (for UI badge)
  const activeFilterCount = 
    filters.categories.length + 
    (filters.rating !== null ? 1 : 0) + 
    (filters.minPrice > 0 || filters.maxPrice < 500 ? 1 : 0) +
    (filters.searchQuery.trim().length > 0 ? 1 : 0);

  return {
    products,
    count,
    loading,
    error,
    filters,
    metadata,
    toggleCategory,
    setPriceRange,
    setRating,
    setSortBy,
    setSearchQuery,
    resetFilters,
    activeFilterCount
  };
}
