import React from 'react';
import { ArrowUpDown, ChevronDown } from 'lucide-react';

const SORT_OPTIONS = [
  { label: 'Default sorting', value: 'default' },
  { label: 'Price: low → high', value: 'price_asc' },
  { label: 'Price: high → low', value: 'price_desc' },
  { label: 'Top rated', value: 'rating_desc' },
  { label: 'Newest arrivals', value: 'newest' }
];

export default function SortDropdown({ sortBy, onSortChange }) {
  return (
    <div className="inline-flex items-center rounded-2xl border border-line bg-surface p-1 shadow-soft transition-colors hover:border-subtle/60">
      <div className="flex items-center gap-2 px-3 py-1.5 text-subtle">
        <ArrowUpDown className="h-3.5 w-3.5 shrink-0 stroke-[2]" />
        <label htmlFor="sort-select" className="select-none whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider">
          Sort
        </label>
      </div>

      <div className="relative flex items-center">
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="cursor-pointer appearance-none rounded-xl border border-line bg-elevated py-1.5 pl-3.5 pr-8 text-[12px] font-medium text-fg transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 stroke-[2] text-subtle" />
      </div>
    </div>
  );
}
