import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={`relative grid h-10 w-10 place-items-center overflow-hidden rounded-2xl border border-line bg-elevated/70 text-fg transition-colors hover:bg-elevated ${className}`}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="absolute grid place-items-center"
        >
          {isDark ? (
            <Sun className="h-[18px] w-[18px] stroke-[1.75]" />
          ) : (
            <Moon className="h-[18px] w-[18px] stroke-[1.75]" />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
