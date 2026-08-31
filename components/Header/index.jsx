'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Nav from './navigation';
import Rounded from '@/common/RoundedButton';
import Magnetic from '@/common/Magnetic';

// At and above this width the inline links carry navigation and the burger is
// scroll-gated. Below it the links are hidden and the burger is always on.
// Matches Tailwind's `md` so the CSS and the ScrollTrigger stay in sync.
const DESKTOP = '(min-width: 48rem)';

// The header drops in only once the preloader has cleared.
const ENTRANCE_DELAY = 3.4;

const slideTransition =
  'transition-transform duration-500 ease-smooth';

const burgerBar =
  "before:content-[''] before:relative before:mx-auto before:block before:h-px before:w-[40%] before:bg-white before:transition-transform before:duration-300 after:content-[''] after:relative after:mx-auto after:block after:h-px after:w-[40%] after:bg-white after:transition-transform after:duration-300";

export default function Header() {
  const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);
  const navRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Close the menu on navigation. Setting state to its current value is a no-op
  // in React, so the unconditional call needs no `isActive` dependency.
  useEffect(() => {
    setIsActive(false);
  }, [pathname]);

  useEffect(() => {
    if (!isActive) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsActive(false);
        button.current?.querySelector('[aria-label]')?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isActive &&
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !button.current.contains(event.target)
      ) {
        setIsActive(false);
      }
    };

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Header drops in only once the preloader has finished — unless motion is
    // unwelcome, in which case it simply starts where it would have landed.
    if (prefersReducedMotion) {
      gsap.set(header.current, { y: 0, opacity: 1 });
    } else {
      gsap.fromTo(
        header.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          delay: ENTRANCE_DELAY,
          duration: 2,
          ease: 'power4.out',
        },
      );
    }

    // matchMedia re-runs these on resize/rotate and reverts the branch that no
    // longer applies, so the burger can't get stuck at the wrong scale.
    const mm = gsap.matchMedia();

    // Desktop: the inline links carry navigation while the hero is on screen,
    // so the burger stays hidden until the hero scrolls away.
    mm.add(DESKTOP, () => {
      gsap.set(button.current, { scale: 0 });

      gsap.to(button.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          start: 0,
          end: window.innerHeight,
          onLeave: () => {
            gsap.to(button.current, {
              scale: 1,
              duration: 0.25,
              ease: 'power1.out',
            });
          },
          onEnterBack: () => {
            gsap.to(button.current, {
              scale: 0,
              duration: 0.25,
              ease: 'power1.out',
            });
            setIsActive(false);
          },
        },
      });
    });

    // No mobile branch: below md the burger is visible from CSS alone. Leaving
    // the desktop tween inside a matchMedia context means resizing past the
    // breakpoint reverts its inline transform and hands control back to CSS.

    return () => mm.revert();
  }, [prefersReducedMotion]);

  const handleNavClick = (event, sectionId) => {
    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return; // let the browser follow the href instead
    event.preventDefault();
    targetElement.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <div
        ref={header}
        className='absolute top-0 z-1 flex w-full items-center justify-between px-5 pt-9 pb-5 font-light text-black md:p-[2.1875rem] md:pt-[2.1875rem]'
        style={{ opacity: 0, transform: 'translateY(-100px)' }} // hide before GSAP runs
      >
        <Magnetic>
          <div className='group flex cursor-pointer'>
            <p
              className={`${slideTransition} group-hover:rotate-[360deg]`}
            >
              ©
            </p>
            <div className='relative ml-[0.3125rem] flex overflow-hidden whitespace-nowrap transition-all duration-500 ease-smooth group-hover:pr-[1.875rem]'>
              <p
                className={`relative ${slideTransition} group-hover:-translate-x-full`}
              >
                Code by
              </p>
              <p
                className={`relative pl-[0.3em] ${slideTransition} group-hover:-translate-x-[4.0625rem]`}
              >
                Onkar
              </p>
              <p
                className={`absolute left-[6.875rem] pl-[0.3em] ${slideTransition} group-hover:-translate-x-[4.0625rem]`}
              >
                Patel
              </p>
            </div>
          </div>
        </Magnetic>

        {/* Hidden below md: three small tap targets crowd the logo on a phone,
            and the burger drawer already lists every section. */}
        <div className='hidden items-center md:flex'>
          {['work', 'about', 'contact'].map((section) => (
            <Magnetic key={section}>
              <div className='group/el relative z-1 flex cursor-pointer flex-col p-[0.9375rem] capitalize'>
                <a
                  href={`#${section}`}
                  onClick={(event) => handleNavClick(event, section)}
                >
                  {section}
                </a>
                <div className='absolute top-[2.8125rem] left-1/2 h-[0.3125rem] w-[0.3125rem] -translate-x-1/2 scale-0 rounded-full bg-black transition-transform duration-200 ease-smooth group-hover/el:scale-100' />
              </div>
            </Magnetic>
          ))}
        </div>
      </div>

      {/* No `scale-0` below md: the burger is the only navigation there, so its
          visibility must not depend on a GSAP tween landing. At md and up it
          starts hidden and the ScrollTrigger below reveals it. */}
      <div ref={button} className='fixed right-0 z-4 md:scale-0'>
        <Rounded
          onClick={() => setIsActive(!isActive)}
          className='relative m-5 h-14 w-14 rounded-full bg-ink-800 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] md:h-20 md:w-20'
        >
          <div
            className={`relative z-1 w-full ${burgerBar} ${
              isActive
                ? 'before:top-0 before:-rotate-45 after:top-[-1px] after:rotate-45'
                : 'before:top-[0.3125rem] after:top-[-0.3125rem]'
            }`}
          />
        </Rounded>
      </div>

      <AnimatePresence mode='wait'>
        {isActive && <Nav ref={navRef} />}
      </AnimatePresence>
    </>
  );
}
