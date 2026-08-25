'use client';
import { motion } from 'framer-motion';
import {
  forwardRef,
  useState,
} from 'react';
import { menuSlide } from '../anim.js';
import Curve from './Curve/page';
import Footer from './Footer/page';
import Link from './Link/page';
import styles from './style.module.scss';

const Nav = forwardRef((props, ref) => {
  const [activeItem, setActiveItem] =
    useState('Home'); // Default to Home

  const navItems = [
    { title: 'Home', href: '#home' },
    { title: 'Work', href: '#work' },
    { title: 'About', href: '#about' },
    {
      title: 'Contact',
      href: '#contact',
    },
  ];

  const socialLinks = [
    { title: 'GitHub', href: '#' },
    { title: 'Twitter', href: '#' },
    { title: 'LinkedIn', href: '#' },
  ];

  return (
    <motion.div
      ref={ref}
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.menu}
    >
      <div className={styles.body}>
        <div className={styles.nav}>
          <div
            className={styles.header}
          >
            <h5>Navigation</h5>
          </div>
          <div>
            {navItems.map(
              (item, index) => {
                return (
                  <Link
                    data={{
                      ...item,
                      index,
                    }}
                    key={index}
                    href={item.href}
                    isActive={
                      activeItem ===
                      item.title
                    }
                    setActiveItem={
                      setActiveItem
                    }
                  />
                );
              },
            )}
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
