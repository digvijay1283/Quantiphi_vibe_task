import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingBag, Check } from 'lucide-react';
import { cardVariants, spring } from '../../lib/motion';

export default function ProductCard({ product, index = 0, onAddToCart }) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      layout
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      whileHover={{ y: -6 }}
      transition={spring}
      className="group panel flex flex-col justify-between overflow-hidden rounded-4xl shadow-soft transition-shadow duration-300 hover:shadow-lift"
    >
      <div>
        {/* Image */}
        <div className="relative aspect-square w-full overflow-hidden bg-elevated">
          <motion.img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover object-center"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <span className="absolute left-3 top-3 rounded-full border border-line bg-surface/85 px-2.5 py-1 text-[10px] font-semibold text-fg backdrop-blur-md">
            {product.category}
          </span>
        </div>

        {/* Content */}
        <div className="space-y-2 p-4">
          <div className="flex items-center gap-1.5 text-xs">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-fg">{product.rating}</span>
            <span className="text-subtle">({product.reviewCount || 42})</span>
          </div>

          <h3 className="line-clamp-1 text-[14px] font-semibold text-fg">
            {product.name}
          </h3>

          <p className="line-clamp-2 text-[12px] leading-relaxed text-muted">
            {product.description}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-line p-4 pt-3.5">
        <div>
          <span className="block text-[10px] leading-none text-subtle">Price</span>
          <span className="font-mono text-lg font-semibold text-fg">
            ${product.price}
          </span>
        </div>

        <motion.button
          onClick={handleAddToCart}
          whileTap={{ scale: 0.94 }}
          transition={spring}
          className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-2.5 text-xs font-semibold transition-colors duration-200 ${
            added
              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
              : 'bg-invert text-invert-fg shadow-soft hover:shadow-lift'
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={spring}
                className="flex items-center gap-1.5"
              >
                <Check className="h-3.5 w-3.5" />
                Added
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={spring}
                className="flex items-center gap-1.5"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                Add
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}
