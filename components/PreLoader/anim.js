export const slideUp = {
  initial: {
    y: 0,
  },
  exit: {
    // A percentage on `y` resolves against the element's own height, so this is
    // always exactly one viewport up — `-100dvh` is not a unit Framer can parse.
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
