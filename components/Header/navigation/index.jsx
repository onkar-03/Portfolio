'use client';
import { motion } from 'framer-motion';
import { forwardRef, useState } from 'react';
import { menuSlide } from '../anim.js';
import Curve from './Curve';
import Footer from './Footer';
import Link from './Link';

const navItems = [
  { title: 'Home', href: '#home' },
  { title: 'Work', href: '#work' },
  { title: 'About', href: '#about' },
  { title: 'Contact', href: '#contact' },
];

const Nav = forwardRef((props, ref) => {
  const [activeItem, setActiveItem] = useState('Home');

  return (
    <motion.div
      ref={ref}
      variants={menuSlide}
      initial='initial'
      animate='enter'
      exit='exit'
      role='dialog'
      aria-modal='true'
      aria-label='Site navigation'
      className='fixed right-0 z-3 h-dvh w-full bg-ink-800 text-white sm:w-[36.25rem]'
    >
      <div className='flex h-full flex-col justify-between overflow-y-auto p-10 sm:p-[6.25rem]'>
        <div className='mb-10 flex flex-col gap-1.5'>
          <div className='mb-5 border-b border-mist-400 text-[0.6875rem] uppercase text-mist-400'>
            <h5 className='mb-5 font-light'>Navigation</h5>
          </div>
          <div>
            {navItems.map((item, index) => (
              <Link
                data={{ ...item, index }}
                key={item.title}
                isActive={activeItem === item.title}
                setActiveItem={setActiveItem}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
      <Curve />
    </motion.div>
  );
});

Nav.displayName = 'Nav';

export default Nav;
