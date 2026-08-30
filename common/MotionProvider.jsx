'use client';
import { MotionConfig } from 'framer-motion';

// `reducedMotion="user"` makes every Framer animation in the tree respect the
// OS preference automatically (transforms are dropped, opacity is kept).
// Motion values bound directly through `style` are not animations, so the
// components driving those opt out themselves.
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion='user'>{children}</MotionConfig>;
}
