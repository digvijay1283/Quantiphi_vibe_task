import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search, SlidersHorizontal, ShoppingBag, X, Command } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { EASE, spring } from '../lib/motion';

export default function Navbar({
  searchQuery,
  onSearchChange,
  activeFilterCount,
  onOpenMobileFilters,
  cartCount = 0,
  onOpenCart
}) {
  // Header tightens and gains a border as the page scrolls away from the top.
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 60], [0, 1]);
  const blurAmount = useTransform(scrollY, [0, 60], [8, 22]);
  const backdropFilter = useTransform(blurAmount, (v) => `blur(${v}px) saturate(150%)`);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      style={{ backdropFilter, WebkitBackdropFilter: backdropFilter }}
      className="sticky top-0 z-40 bg-canvas/70"
    >
      <motion.div
        style={{ opacity: borderOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-line"
      />

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Brand */}
        <motion.a
          href="#"
          className="flex shrink-0 items-center gap-3"
          whileHover="hover"
          initial="rest"
          animate="rest"
        >
          <motion.div
            variants={{
              rest: { rotate: 0, scale: 1 },
              hover: { rotate: -8, scale: 1.06 }
            }}
            transition={spring}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-invert text-invert-fg shadow-soft"
          >
            {/* Aperture-style monogram */}
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round">
              <circle cx="12" cy="12" r="8.5" />
              <path d="M12 3.5v8.5l6 6" />
              <path d="M12 12l-7.4 4.3" />
            </svg>
          </motion.div>

          <div className="leading-none">
            <span className="block text-[19px] font-semibold tracking-tightest text-fg">
              AuraStore
            </span>
            <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-subtle">
              Marketplace
            </span>
          </div>
        </motion.a>

        {/* Search */}
        <div className="mx-2 hidden max-w-md flex-1 sm:mx-4 sm:block">
          <motion.div
            className="group relative"
            whileFocus={{ scale: 1.01 }}
          >
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle transition-colors group-focus-within:text-fg" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products, brands, categories…"
              className="w-full rounded-2xl border border-line bg-elevated/60 py-3 pl-11 pr-20 text-[13px] text-fg placeholder-subtle transition-all duration-300 hover:bg-elevated focus:border-accent/60 focus:bg-surface focus:outline-none"
            />

            <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    key="clear"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={spring}
                    onClick={() => onSearchChange('')}
                    className="rounded-lg p-1 text-subtle transition-colors hover:bg-elevated hover:text-fg"
                    aria-label="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </motion.button>
                )}
              </AnimatePresence>

              <kbd className="hidden items-center gap-0.5 rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[10px] text-subtle lg:flex">
                <Command className="h-2.5 w-2.5" />K
              </kbd>
            </div>
          </motion.div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />

          {/* Mobile filters */}
          <motion.button
            onClick={onOpenMobileFilters}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={spring}
            className="relative grid h-10 w-10 place-items-center rounded-2xl border border-line bg-elevated/70 text-fg transition-colors hover:bg-elevated lg:hidden"
            aria-label="Open filters"
          >
            <SlidersHorizontal className="h-[18px] w-[18px] stroke-[1.75]" />
            <AnimatePresence>
              {activeFilterCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={spring}
                  className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-fg"
                >
                  {activeFilterCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Cart */}
          <motion.button
            onClick={onOpenCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={spring}
            className="relative grid h-10 w-10 place-items-center rounded-2xl bg-invert text-invert-fg shadow-soft transition-shadow hover:shadow-lift"
            aria-label="View shopping cart"
          >
            <ShoppingBag className="h-[18px] w-[18px] stroke-[1.75]" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0, y: -4 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0 }}
                  transition={spring}
                  className="absolute -right-1.5 -top-1.5 grid h-[19px] min-w-[19px] place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-fg ring-2 ring-canvas"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Search — mobile row */}
      <div className="border-t border-line/60 px-4 pb-3 sm:hidden">
        <div className="relative pt-3">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products…"
            className="w-full rounded-2xl border border-line bg-elevated/60 py-2.5 pl-11 pr-4 text-[13px] text-fg placeholder-subtle focus:border-accent/60 focus:bg-surface focus:outline-none"
          />
        </div>
      </div>
    </motion.header>
  );
}
