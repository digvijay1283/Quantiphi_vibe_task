import React from 'react';
import { motion } from 'framer-motion';
import { spring } from '../../lib/motion';

const PRESETS = [
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50–150', min: 50, max: 150 },
  { label: '$150+', min: 150, max: 500 }
];

export default function PriceRangeSlider({ minPrice, maxPrice, onPriceChange, absoluteMin = 0, absoluteMax = 500 }) {
  const handleMinSlider = (e) => {
    const val = Math.min(Number(e.target.value), maxPrice - 5);
    onPriceChange(val, maxPrice);
  };

  const handleMaxSlider = (e) => {
    const val = Math.max(Number(e.target.value), minPrice + 5);
    onPriceChange(minPrice, val);
  };

  // Compute percentage for track highlight
  const minPercent = Math.max(0, Math.min(100, ((minPrice - absoluteMin) / (absoluteMax - absoluteMin)) * 100));
  const maxPercent = Math.max(0, Math.min(100, ((maxPrice - absoluteMin) / (absoluteMax - absoluteMin)) * 100));

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle">
          Price range
        </h3>
        <motion.span
          key={`${minPrice}-${maxPrice}`}
          initial={{ opacity: 0.4, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="rounded-full border border-line bg-elevated px-2.5 py-1 font-mono text-[11px] font-medium text-fg"
        >
          ${minPrice}–${maxPrice}
        </motion.span>
      </div>

      {/* Track */}
      <div className="relative px-[10px] pb-1 pt-2">
        <div className="relative h-1.5 w-full rounded-full bg-elevated">
          <motion.div
            className="absolute h-full rounded-full bg-invert"
            animate={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Min thumb */}
        <input
          type="range"
          min={absoluteMin}
          max={absoluteMax}
          value={minPrice}
          onChange={handleMinSlider}
          aria-label="Minimum price"
          className="range-thumb pointer-events-none absolute left-0 top-2 z-20 h-1.5 w-full appearance-none bg-transparent"
        />

        {/* Max thumb */}
        <input
          type="range"
          min={absoluteMin}
          max={absoluteMax}
          value={maxPrice}
          onChange={handleMaxSlider}
          aria-label="Maximum price"
          className="range-thumb pointer-events-none absolute left-0 top-2 z-30 h-1.5 w-full appearance-none bg-transparent"
        />
      </div>

      {/* Quick presets */}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {PRESETS.map((preset) => {
          const isActive = minPrice === preset.min && maxPrice === preset.max;
          return (
            <motion.button
              key={preset.label}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => onPriceChange(preset.min, preset.max)}
              className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors duration-200 ${
                isActive
                  ? 'border-invert bg-invert text-invert-fg'
                  : 'border-line bg-surface text-muted hover:border-subtle hover:text-fg'
              }`}
            >
              {preset.label}
            </motion.button>
          );
        })}
      </div>

      {/* Numeric inputs */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-[10px] uppercase tracking-wider text-subtle">
            Min ($)
          </label>
          <input
            type="number"
            min={absoluteMin}
            max={maxPrice - 1}
            value={minPrice}
            onChange={(e) => onPriceChange(Number(e.target.value) || 0, maxPrice)}
            className="w-full rounded-xl border border-line bg-elevated/60 px-3 py-2 font-mono text-[12px] text-fg transition-colors focus:border-accent/60 focus:bg-surface focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[10px] uppercase tracking-wider text-subtle">
            Max ($)
          </label>
          <input
            type="number"
            min={minPrice + 1}
            max={absoluteMax}
            value={maxPrice}
            onChange={(e) => onPriceChange(minPrice, Number(e.target.value) || absoluteMax)}
            className="w-full rounded-xl border border-line bg-elevated/60 px-3 py-2 font-mono text-[12px] text-fg transition-colors focus:border-accent/60 focus:bg-surface focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
