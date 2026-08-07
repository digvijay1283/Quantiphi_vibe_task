import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { spring } from '../../lib/motion';

const RATING_OPTIONS = [4.5, 4.0, 3.5, 3.0];

export default function RatingRadioGroup({ selectedRating, onRatingChange }) {
  return (
    <div>
      <div className="mb-3.5 flex items-center justify-between">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle">
          Minimum rating
        </h3>
        {selectedRating !== null && (
          <button
            onClick={() => onRatingChange(null)}
            className="text-[11px] font-medium text-muted transition-colors hover:text-fg"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-1">
        {RATING_OPTIONS.map((minVal) => {
          const isSelected = selectedRating === minVal;

          return (
            <motion.button
              key={minVal}
              type="button"
              onClick={() => onRatingChange(minVal)}
              whileTap={{ scale: 0.98 }}
              transition={spring}
              aria-pressed={isSelected}
              className={`group relative flex w-full items-center justify-between overflow-hidden rounded-2xl px-3 py-2.5 text-left text-[13px] transition-colors duration-200 ${
                isSelected ? 'text-fg' : 'text-muted hover:text-fg'
              }`}
            >
              <motion.span
                aria-hidden
                initial={false}
                animate={{ opacity: isSelected ? 1 : 0, scale: isSelected ? 1 : 0.96 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 rounded-2xl border border-line bg-elevated"
              />
              <span className="absolute inset-0 rounded-2xl transition-colors duration-200 group-hover:bg-elevated/50" />

              <div className="relative z-10 flex items-center gap-2.5">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((starIndex) => (
                    <Star
                      key={starIndex}
                      className={`h-3.5 w-3.5 ${
                        starIndex <= Math.floor(minVal)
                          ? 'fill-amber-400 text-amber-400'
                          : starIndex - 0.5 <= minVal
                          ? 'fill-amber-400/50 text-amber-400'
                          : 'fill-transparent text-line'
                      }`}
                    />
                  ))}
                </div>
                <span className={isSelected ? 'font-medium' : ''}>{minVal} &amp; up</span>
              </div>

              <span
                className={`relative z-10 grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors duration-200 ${
                  isSelected ? 'border-invert bg-invert' : 'border-line bg-surface'
                }`}
              >
                <motion.span
                  initial={false}
                  animate={{ scale: isSelected ? 1 : 0 }}
                  transition={spring}
                  className="h-1.5 w-1.5 rounded-full bg-invert-fg"
                />
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
