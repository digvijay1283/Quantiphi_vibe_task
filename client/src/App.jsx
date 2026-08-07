import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import FilterSidebar from './components/FilterSidebar/FilterSidebar';
import ProductGrid from './components/ProductGrid/ProductGrid';
import SortDropdown from './components/SortDropdown/SortDropdown';
import CartDrawer from './components/CartDrawer';
import { useProductFilters } from './hooks/useProductFilters';
import { X, AlertCircle, Star, ArrowUpRight } from 'lucide-react';
import { EASE, fadeUp, pillVariants, revealOnScroll, spring, staggerContainer } from './lib/motion';

export default function App() {
  const {
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
  } = useProductFilters();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Cart Handlers with Debug Console Logs
  const handleAddToCart = (product) => {
    console.log(`[CART ACTION] [Status 200 SUCCESS] Item added to cart:`, {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      timestamp: new Date().toISOString()
    });

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    console.log(`[CART ACTION] [Status 200 SUCCESS] Updated item quantity:`, {
      id: productId,
      newQuantity: newQty,
      timestamp: new Date().toISOString()
    });

    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (productId) => {
    console.log(`[CART ACTION] [Status 200 SUCCESS] Removed item from cart:`, {
      id: productId,
      timestamp: new Date().toISOString()
    });
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    console.log(`[CART ACTION] [Status 200 SUCCESS] Shopping cart cleared completely.`, {
      timestamp: new Date().toISOString()
    });
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const priceFilterActive = filters.minPrice > 0 || filters.maxPrice < 500;

  return (
    <div className="flex min-h-screen flex-col bg-canvas font-sans text-fg">
      <Navbar
        searchQuery={filters.searchQuery}
        onSearchChange={setSearchQuery}
        activeFilterCount={activeFilterCount}
        onOpenMobileFilters={() => setMobileFilterOpen(true)}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

        {/* Hero */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="grain relative mb-10 overflow-hidden rounded-4xl border border-line bg-elevated/50 px-6 py-10 sm:px-10 sm:py-14"
        >
          {/* Soft radial wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-accent/5 blur-3xl"
          />

          <div className="relative z-10 max-w-2xl">
            <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-[11px] font-medium text-muted backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Real-time combinatorial filtering
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-balance text-4xl font-semibold leading-[1.05] tracking-tightest text-fg sm:text-6xl"
            >
              Discover quality,
              <span className="font-display font-normal italic text-accent"> beautifully</span> filtered.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted"
            >
              Narrow the catalogue by category, price band, and star rating — every
              control composes, and results update live from the backend.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
              <Stat value={metadata.categories?.length || 5} label="Categories" />
              <Divider />
              <Stat value={loading ? '—' : count} label="Matching now" />
              <Divider />
              <Stat value="4.8" label="Avg. rating" icon={<Star className="h-3 w-3 fill-amber-400 text-amber-400" />} />
            </motion.div>
          </div>
        </motion.section>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="flex items-center gap-3 overflow-hidden rounded-2xl border border-clay-500/30 bg-clay-500/10 px-4 py-3.5 text-sm text-clay-700 dark:text-clay-300"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Workspace */}
        <div className="flex gap-8">
          <FilterSidebar
            filters={filters}
            metadata={metadata}
            onToggleCategory={toggleCategory}
            onPriceChange={setPriceRange}
            onRatingChange={setRating}
            onResetFilters={resetFilters}
            activeFilterCount={activeFilterCount}
            isOpen={mobileFilterOpen}
            onClose={() => setMobileFilterOpen(false)}
          />

          <div className="min-w-0 flex-1 space-y-6">

            {/* Toolbar */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-col items-stretch justify-between gap-4 border-b border-line pb-5 sm:flex-row sm:items-center"
            >
              <div className="flex items-baseline gap-2.5">
                <h2 className="text-lg font-semibold tracking-tight text-fg">Catalogue</h2>
                <motion.span
                  key={loading ? 'loading' : count}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={spring}
                  className="rounded-full border border-line bg-elevated px-2.5 py-1 font-mono text-[11px] font-medium text-muted"
                >
                  {loading ? '···' : `${count} items`}
                </motion.span>
              </div>

              <SortDropdown sortBy={filters.sortBy} onSortChange={setSortBy} />
            </motion.div>

            {/* Active filter pills */}
            <AnimatePresence initial={false}>
              {activeFilterCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap items-center gap-2 pb-1">
                    <span className="mr-1 text-[11px] font-medium uppercase tracking-wider text-subtle">
                      Active
                    </span>

                    <AnimatePresence mode="popLayout">
                      {filters.categories.map((cat) => (
                        <FilterPill key={`cat-${cat}`} onRemove={() => toggleCategory(cat)}>
                          {cat}
                        </FilterPill>
                      ))}

                      {priceFilterActive && (
                        <FilterPill key="price" onRemove={() => setPriceRange(0, 500)}>
                          ${filters.minPrice} – ${filters.maxPrice}
                        </FilterPill>
                      )}

                      {filters.rating !== null && (
                        <FilterPill key="rating" onRemove={() => setRating(null)}>
                          {filters.rating}+ stars
                        </FilterPill>
                      )}

                      {filters.searchQuery.trim().length > 0 && (
                        <FilterPill key="search" onRemove={() => setSearchQuery('')}>
                          “{filters.searchQuery}”
                        </FilterPill>
                      )}
                    </AnimatePresence>

                    <button
                      onClick={resetFilters}
                      className="ml-1 text-[11px] font-medium text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
                    >
                      Clear all
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <ProductGrid
              products={products}
              loading={loading}
              count={count}
              onResetFilters={resetFilters}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </main>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Footer */}
      <motion.footer
        {...revealOnScroll}
        variants={fadeUp}
        className="mt-auto border-t border-line bg-elevated/40"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="grid h-7 w-7 place-items-center rounded-xl bg-invert text-invert-fg">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" strokeWidth="2" stroke="currentColor" strokeLinecap="round">
                <circle cx="12" cy="12" r="8.5" />
                <path d="M12 3.5v8.5l6 6" />
              </svg>
            </div>
            <span className="text-xs text-muted">
              AuraStore — React · Tailwind · Express
            </span>
          </div>

          <a
            href="#"
            className="group inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-fg"
          >
            E-Commerce Filter Assessment
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </motion.footer>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Stat({ value, label, icon }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 font-mono text-xl font-medium tracking-tight text-fg">
        {icon}
        {value}
      </div>
      <div className="mt-0.5 text-[11px] uppercase tracking-wider text-subtle">{label}</div>
    </div>
  );
}

function Divider() {
  return <div className="hidden h-8 w-px bg-line sm:block" />;
}

function FilterPill({ children, onRemove }) {
  return (
    <motion.span
      layout
      variants={pillVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface py-1 pl-3 pr-1.5 text-[11px] font-medium text-fg shadow-soft"
    >
      {children}
      <button
        onClick={onRemove}
        className="grid h-4 w-4 place-items-center rounded-full text-subtle transition-colors hover:bg-elevated hover:text-fg"
        aria-label="Remove filter"
      >
        <X className="h-2.5 w-2.5 stroke-[2.5]" />
      </button>
    </motion.span>
  );
}
