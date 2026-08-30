import { motion } from 'framer-motion';
import { slide } from '../../anim.js';
import Magnetic from '@/common/Magnetic';

const Index = ({ data, isActive, setActiveItem }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const targetId = data.href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleMouseEnter = () => {
    setActiveItem(data.title);
  };

  const handleMouseLeave = () => {
    // Reset to Home when not hovering over any item
    setActiveItem('Home');
  };

  return (
    <motion.div
      custom={data.index}
      className='relative flex items-center py-2'
      variants={slide}
      initial='initial'
      animate='enter'
      exit='exit'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isActive && (
        <div className='absolute top-1/2 -left-[1.5625rem] h-2 w-2 -translate-y-1/2 animate-indicator-in rounded-full bg-white' />
      )}
      <Magnetic>
        <a
          href={data.href}
          onClick={handleClick}
          className='text-[2.25rem] font-light transition-colors duration-200 hover:text-white/80 sm:text-[3.5rem]'
        >
          {data.title}
        </a>
      </Magnetic>
    </motion.div>
  );
};

export default Index;
