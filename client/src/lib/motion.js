/**
 * Shared Framer Motion presets.
 *
 * Everything here uses a single expressive easing curve (out-expo) or a spring,
 * so entrances across the app feel like they come from the same system.
 */

export const EASE = [0.16, 1, 0.3, 1];

export const spring = {
  type: 'spring',
  stiffness: 320,
  damping: 30,
  mass: 0.8
};

export const softSpring = {
  type: 'spring',
  stiffness: 180,
  damping: 24
};

/* --------------------------------------------------------------------------
   Entrances
   -------------------------------------------------------------------------- */

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE } }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94, y: 12 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE }
  }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } }
};

/* --------------------------------------------------------------------------
   Containers — stagger their children
   -------------------------------------------------------------------------- */

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 }
  }
};

export const fastStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.035 }
  }
};

/* Grid cards: rise + settle, staggered by index. */
export const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE, delay: Math.min(index, 8) * 0.05 }
  }),
  exit: { opacity: 0, y: -12, scale: 0.97, transition: { duration: 0.22, ease: 'easeIn' } }
};

/* --------------------------------------------------------------------------
   Scroll reveal — spread onto any motion element
   -------------------------------------------------------------------------- */

export const revealOnScroll = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.2, margin: '0px 0px -80px 0px' }
};

/* --------------------------------------------------------------------------
   Overlays
   -------------------------------------------------------------------------- */

export const backdropVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }
};

export const drawerRight = {
  hidden: { x: '100%' },
  show: { x: 0, transition: { type: 'spring', stiffness: 260, damping: 32 } },
  exit: { x: '100%', transition: { duration: 0.28, ease: EASE } }
};

export const drawerLeft = {
  hidden: { x: '-100%' },
  show: { x: 0, transition: { type: 'spring', stiffness: 260, damping: 32 } },
  exit: { x: '-100%', transition: { duration: 0.28, ease: EASE } }
};

/* Filter pills popping in and out of the active-filter bar. */
export const pillVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -4 },
  show: { opacity: 1, scale: 1, y: 0, transition: spring },
  exit: { opacity: 0, scale: 0.8, y: -4, transition: { duration: 0.16 } }
};

/* --------------------------------------------------------------------------
   Interactions
   -------------------------------------------------------------------------- */

export const tapScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.97 },
  transition: spring
};

export const pressable = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.97, y: 0 },
  transition: spring
};
