import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryChecklist from './CategoryChecklist';
import PriceRangeSlider from './PriceRangeSlider';
import RatingRadioGroup from './RatingRadioGroup';
import { RotateCcw, X, SlidersHorizontal } from 'lucide-react';
import { backdropVariants, drawerLeft, slideInLeft, spring } from '../../lib/motion';

export default function FilterSidebar({
  filters,
  metadata,
  onToggleCategory,
  onPriceChange,
  onRatingChange,
  onResetFilters,
  activeFilterCount,
  isOpen,
  onClose
}) {
  const content = (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="h-4 w-4 stroke-[1.75] text-muted" />
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-fg">
            Filters
          </h2>
          <AnimatePresence>
            {activeFilterCount > 0 && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={spring}
                className="grid h-5 min-w-[20px] place-items-center rounded-full bg-invert px-1.5 text-[10px] font-bold text-invert-fg"
              >
                {activeFilterCount}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {activeFilterCount > 0 && (
            <motion.button
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              whileTap={{ scale: 0.95 }}
              onClick={onResetFilters}
              className="group flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-medium text-muted transition-colors hover:bg-elevated hover:text-fg"
            >
              <RotateCcw className="h-3 w-3 transition-transform duration-500 group-hover:-rotate-180" />
              Reset
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <CategoryChecklist
        selectedCategories={filters.categories}
        onToggleCategory={onToggleCategory}
        availableCategories={metadata.categories}
      />

      <div className="h-px bg-line" />

      <PriceRangeSlider
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        onPriceChange={onPriceChange}
        absoluteMin={metadata.priceBounds?.min || 0}
        absoluteMax={metadata.priceBounds?.max || 500}
      />

      <div className="h-px bg-line" />

      <RatingRadioGroup
        selectedRating={filters.rating}
        onRatingChange={onRatingChange}
      />
    </div>
  );

  const drawer = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
          />

          <motion.div
            variants={drawerLeft}
            initial="hidden"
            animate="show"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0.4, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) onClose();
            }}
            className="absolute inset-y-0 left-0 flex w-full max-w-xs flex-col justify-between overflow-y-auto border-r border-line bg-surface p-6 shadow-float"
          >
            <div>
              <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
                <span className="text-base font-semibold tracking-tight text-fg">
                  Filter products
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="grid h-8 w-8 place-items-center rounded-xl text-muted transition-colors hover:bg-elevated hover:text-fg"
                  aria-label="Close filters"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>
              {content}
            </div>

            <div className="mt-8 border-t border-line pt-5">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="w-full rounded-2xl bg-invert py-3 text-sm font-medium text-invert-fg shadow-soft transition-shadow hover:shadow-lift"
              >
                Apply &amp; close
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Desktop sticky sidebar */}
      <motion.aside
        variants={slideInLeft}
        initial="hidden"
        animate="show"
        className="hidden w-[280px] shrink-0 lg:block"
      >
        <div className="sidebar panel rounded-4xl p-6 shadow-soft">
          {content}
        </div>
      </motion.aside>

      {/* Mobile slide-over */}
      {typeof document !== 'undefined' && createPortal(drawer, document.body)}
    </>
  );
}
