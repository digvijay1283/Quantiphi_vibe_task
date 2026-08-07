import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, PackageSearch } from 'lucide-react';
import { fadeUp, scaleIn, spring, staggerContainer } from '../../lib/motion';

export default function EmptyState({ onResetFilters }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="panel mx-auto my-8 max-w-lg rounded-5xl px-10 py-16 text-center shadow-soft"
    >
      <motion.div
        variants={scaleIn}
        className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-3xl bg-elevated text-muted"
      >
        <PackageSearch className="h-8 w-8 stroke-[1.5]" />
      </motion.div>

      <motion.h3 variants={fadeUp} className="mb-2 text-xl font-semibold tracking-tight text-fg">
        Nothing matches yet
      </motion.h3>

      <motion.p variants={fadeUp} className="mx-auto mb-7 max-w-xs text-[13px] leading-relaxed text-muted">
        Try widening your categories, price range, or rating threshold to see more results.
      </motion.p>

      <motion.button
        variants={fadeUp}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        transition={spring}
        onClick={onResetFilters}
        className="inline-flex items-center gap-2 rounded-2xl bg-invert px-5 py-2.5 text-sm font-medium text-invert-fg shadow-soft transition-shadow hover:shadow-lift"
      >
        <RotateCcw className="h-4 w-4" />
        Reset filters
      </motion.button>
    </motion.div>
  );
}
