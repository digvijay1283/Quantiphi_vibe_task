import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import EmptyState from './EmptyState';
import { staggerContainer } from '../../lib/motion';

export default function ProductGrid({ products, loading, count, onResetFilters, onAddToCart }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <motion.div
            key={n}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: n * 0.04 }}
            className="panel space-y-4 rounded-4xl p-4"
          >
            <div className="skeleton aspect-square rounded-3xl" />
            <div className="space-y-2 px-1">
              <div className="skeleton h-3.5 w-3/4 rounded-full" />
              <div className="skeleton h-3 w-1/2 rounded-full" />
            </div>
            <div className="flex items-center justify-between px-1 pt-1">
              <div className="skeleton h-6 w-1/4 rounded-full" />
              <div className="skeleton h-9 w-1/3 rounded-2xl" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (count === 0 || products.length === 0) {
    return <EmptyState onResetFilters={onResetFilters} />;
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} onAddToCart={onAddToCart} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
