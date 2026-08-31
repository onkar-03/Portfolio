export const slideUp = {
  initial: {
    y: 0,
  },
  exit: {
    // A percentage on `y` resolves against the element's own height — which is
    // `lvh`, the viewport at its tallest — so this always clears the screen
    // even if the browser chrome retracts mid-flight. Framer cannot parse a
    // `-100lvh` literal, hence the percentage.
    y: '-100%',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};

export const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.8,
    transition: { duration: 1, delay: 0.2 },
  },
};
