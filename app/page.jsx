'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import PreLoader from '@/components/PreLoader';
import Landing from '@/components/Landing';
import Description from '@/components/Description';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

const PRELOADER_SEEN = 'preloader-seen';
const PRELOADER_MS = 2000;

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Storage throws in some privacy modes; a failure here should never be
    // able to keep the preloader on screen, so both accesses are guarded.
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(PRELOADER_SEEN) === '1';
    } catch {
      alreadySeen = false;
    }

    const reveal = () => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
      try {
        sessionStorage.setItem(PRELOADER_SEEN, '1');
      } catch {
        // Nothing to do — the intro simply plays again next visit.
      }
    };

    // Skip the intro on repeat visits within a session, and for anyone who has
    // asked for reduced motion.
    if (alreadySeen || prefersReducedMotion) {
      reveal();
      return;
    }

    const timer = setTimeout(reveal, PRELOADER_MS);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <main className='flex flex-col items-center justify-center'>
      <AnimatePresence mode='wait'>
        {isLoading && <PreLoader />}
      </AnimatePresence>
      {/* main is a centred flex column, so a section shrinks to fit its content
          unless told otherwise. Landing is left to shrink on purpose. */}
      <section id='home'>
        <Landing />
      </section>
      <section id='about' className='w-full'>
        <Description />
      </section>
      <section id='work' className='w-full'>
        <Projects />
      </section>
      <section id='contact' className='w-full'>
        <Contact />
      </section>
    </main>
  );
};

export default Home;
