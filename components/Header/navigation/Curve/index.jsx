import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Curve = () => {
  // Measured in an effect, not during render: reading window while rendering is
  // unsafe on the server and goes stale when the device rotates.
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const measure = () => setHeight(window.innerHeight);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const initialPath = `M100 0 L100 ${height} Q-100 ${height / 2} 100 0 `;
  const targetPath = `M100 0 L100 ${height} Q100 ${height / 2} 100 0 `;

  const curve = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  // px, not rem: the paths above are built from literal user units (100), so
  // this box has to stay exactly 100 CSS px wide to match them.
  return (
    <svg className='absolute top-0 -left-[99px] hidden h-full w-[100px] fill-ink-700 stroke-none sm:block'>
      <motion.path
        variants={curve}
        initial='initial'
        animate='enter'
        exit='exit'
      ></motion.path>
    </svg>
  );
};

export default Curve;
