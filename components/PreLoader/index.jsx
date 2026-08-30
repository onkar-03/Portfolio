'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { opacity, slideUp } from './anim';

const words = [
  'Hello',
  'Bonjour',
  'Ciao',
  'Olà',
  'やあ',
  'Hallå',
  'Guten tag',
  'Hallo',
  'नमस्ते',
];

// Depth of the curve's overshoot, in the same user units as the path below.
const BULGE = 300;

export default function PreLoader() {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const container = useRef(null);

  // Measure the overlay itself, not the window: `w-full` excludes the
  // scrollbar and `h-dvh` is not exactly window.innerHeight, and a path drawn
  // in window pixels inside a slightly smaller box is what left a sliver of
  // the curve on screen after the intro slid away.
  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      setDimension({ width, height });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (index == words.length - 1) return;
    setTimeout(
      () => {
        setIndex(index + 1);
      },
      index == 0 ? 1000 : 150,
    );
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + BULGE} 0 ${
    dimension.height
  }  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  return (
    <motion.div
      ref={container}
      variants={slideUp}
      initial='initial'
      exit='exit'
      className='fixed top-0 left-0 z-99 flex h-dvh w-full items-center justify-center bg-ink-900'
    >
      {dimension.width > 0 && (
        <>
          <motion.p
            variants={opacity}
            initial='initial'
            animate='enter'
            className='absolute z-1 flex items-center text-[1.75rem] text-white sm:text-[2.625rem]'
          >
            <span className='mr-2.5 block h-2.5 w-2.5 rounded-full bg-white' />
            {words[index]}
          </motion.p>
          {/* The viewBox is the measured box plus the same 300 the CSS height
              adds, so one user unit is one CSS pixel. The flattened curve then
              lands exactly on the container's bottom edge and slides fully out
              of view with it. */}
          <svg
            viewBox={`0 0 ${dimension.width} ${dimension.height + BULGE}`}
            preserveAspectRatio='none'
            className='absolute top-0 h-[calc(100%+300px)] w-full'
          >
            <motion.path
              variants={curve}
              initial='initial'
              exit='exit'
              className='fill-ink-900'
            ></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
}
