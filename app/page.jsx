'use client';
import { useEffect, useLayoutEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import PreLoader from '@/components/PreLoader';
import Landing from '@/components/Landing';
import Description from '@/components/Description';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

const PRELOADER_SEEN = 'preloader-seen';
const PRELOADER_MS = 2000;

// useLayoutEffect warns when React runs it on the server, where there is no
// storage to read and nothing painted yet to race against.
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const revealPage = () => {
  document.body.style.cursor = 'default';
  window.scrollTo(0, 0);
  try {
    sessionStorage.setItem(PRELOADER_SEEN, '1');
  } catch {
    // Storage throws in some privacy modes — the intro simply plays again.
  }
};

const Home = () => {
  // 'intro' plays the preloader, 'done' lets it animate out, and 'skip' drops
  // it outright.
  const [phase, setPhase] = useState('intro');

  // Skip the intro on repeat visits within a session, and for anyone who has
  // asked for reduced motion. This has to settle before the first paint, and
  // it has to unmount AnimatePresence rather than the child inside it: a skip
  // that goes through the exit animation asks the preloader to leave in the
  // same render that first measures it, so the curve mounts already exiting,
  // never runs its exit variant, and freezes mid-bulge — leaving the 300px of
  // the SVG box that overhangs the container on screen as a black semicircle.
  useIsomorphicLayoutEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(PRELOADER_SEEN) === '1';
    } catch {
      alreadySeen = false;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (alreadySeen || prefersReducedMotion) {
      setPhase('skip');
      revealPage();
    }
  }, []);

  useEffect(() => {
    if (phase !== 'intro') return;
    const timer = setTimeout(() => {
      setPhase('done');
      revealPage();
    }, PRELOADER_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <main className='flex flex-col items-center justify-center'>
      {phase !== 'skip' && (
        <AnimatePresence mode='wait'>
          {phase === 'intro' && <PreLoader />}
        </AnimatePresence>
      )}
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
