import React from 'react';
import { motion } from 'framer-motion';
import { Check, Laptop, Footprints, Shirt, Watch, Sofa, Tag } from 'lucide-react';
import { spring } from '../../lib/motion';

const CATEGORIES_DEFAULT = [
  'Electronics',
  'Footwear',
  'Apparel',
  'Accessories',
  'Home & Living'
];

// Each category gets a glyph so the list scans faster than plain text.
const CATEGORY_ICONS = {
  Electronics: Laptop,
  Footwear: Footprints,
  Apparel: Shirt,
  Accessories: Watch,
  'Home & Living': Sofa
};

export default function CategoryChecklist({ selectedCategories, onToggleCategory, availableCategories = [] }) {
  const categoriesList = availableCategories.length > 0 ? availableCategories : CATEGORIES_DEFAULT;

  return (
    <div>
      <h3 className="mb-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle">
        Categories
      </h3>

      <div className="space-y-1">
        {categoriesList.map((cat) => {
          const isSelected = selectedCategories.includes(cat);
          const Icon = CATEGORY_ICONS[cat] || Tag;

          return (
            <motion.button
              key={cat}
              type="button"
              onClick={() => onToggleCategory(cat)}
              whileTap={{ scale: 0.98 }}
              transition={spring}
              aria-pressed={isSelected}
              className={`group relative flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-[13px] transition-colors duration-200 ${
                isSelected ? 'text-fg' : 'text-muted hover:text-fg'
              }`}
            >
              {/* Selected background — multi-select, so each row fades its own */}
              <motion.span
                aria-hidden
                initial={false}
                animate={{ opacity: isSelected ? 1 : 0, scale: isSelected ? 1 : 0.96 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 rounded-2xl border border-line bg-elevated"
              />
              <span className="absolute inset-0 rounded-2xl transition-colors duration-200 group-hover:bg-elevated/50" />


              <span
                className={`relative z-10 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-md border transition-colors duration-200 ${
                  isSelected
                    ? 'border-invert bg-invert text-invert-fg'
                    : 'border-line bg-surface group-hover:border-subtle'
                }`}
              >
                <motion.span
                  initial={false}
                  animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }}
                  transition={spring}
                >
                  <Check className="h-3 w-3 stroke-[3]" />
                </motion.span>
              </span>

              <Icon className="relative z-10 h-4 w-4 shrink-0 stroke-[1.75] opacity-70" />

              <span className={`relative z-10 ${isSelected ? 'font-medium' : ''}`}>{cat}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
