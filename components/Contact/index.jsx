import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import LocalTime from '@/common/LocalTime';
import Magnetic from '@/common/Magnetic';
import Rounded from '@/common/RoundedButton';
import { socials } from '@/common/socials';

gsap.registerPlugin(ScrollTrigger);

const gutter = 'mx-6 md:mx-16 lg:mx-[12.5rem]';
const mutedLabel =
  'cursor-default text-[0.7em] font-light tracking-[0.1em] text-[#808080]';

const Contact = () => {
  const container = useRef(null);
  const circleRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Below lg the button is a centred static block, so the full 150px drift
  // would run it off the right edge. It still drifts, just scaled (see
  // xMobile) — the motion matches desktop, the distance is proportional.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 64rem)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end'],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rawRotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

  const x = useSpring(rawX, { stiffness: 50, damping: 15 });
  // 150px is ~11.7% of a 1280px viewport; 0.4 keeps roughly that proportion on
  // a phone (60px), leaving a 120px centred button clear of the edge at 320px.
  const xMobile = useTransform(x, (v) => v * 0.4);
  const y = useTransform(scrollYProgress, [0, 1], [-50, 0]);
  const rotate = useSpring(rawRotate, { stiffness: 40, damping: 12 });

  useEffect(() => {
    if (!circleRef.current || !container.current) return;

    // The container carries a scroll-linked `y` transform, and ScrollTrigger
    // measures a trigger's position *including* its transform — so every
    // refresh recorded a different end. The parent section is untransformed and
    // therefore measures the same every time.
    const trigger = container.current.parentElement ?? container.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: '0% 100%',
        // 110%, not 100%: ending on the page's very last pixel left no margin,
        // and on a phone the collapsing URL bar shifts both the viewport height
        // and the maximum scroll, so the scrub could stop just short and leave
        // the semicircle half-open. Finishing a tenth of a viewport early makes
        // closing it unconditional.
        end: '100% 110%',
        scrub: 0.5,
        // Recompute start/end on resize — i.e. when the mobile URL bar shows or
        // hides — instead of reusing values measured at the old viewport size.
        invalidateOnRefresh: true,
      },
    });
    tl.to(circleRef.current, { height: 0, ease: 'none' }, 0);
  }, []);

  return (
    <motion.div
      style={{ y: prefersReducedMotion ? 0 : y }}
      ref={container}
      className='relative flex w-full flex-col items-center justify-center overflow-x-clip bg-background text-white'
    >
      {/* Semicircular transition into the dark panel */}
      <div ref={circleRef} className='relative h-[1.5625rem] w-full'>
        <div className='absolute -left-[10%] z-1 h-[1600%] w-[120%] rounded-b-[50%] bg-background shadow-[0_3.75rem_3.125rem_rgba(0,0,0,0.748)]' />
      </div>

      <div className='w-full max-w-[112.5rem] bg-ink-900 pt-16 lg:pt-[6.25rem]'>
        <div
          className={`relative border-b border-[#868686] pb-16 lg:pb-[6.25rem] ${gutter}`}
        >
          <span className='flex items-center'>
            <h2 className='text-[12vw] font-light md:text-[8vw] lg:text-[5vw]'>
              Let&apos;s work
            </h2>
          </span>
          <h2 className='text-[12vw] font-light md:text-[8vw] lg:text-[5vw]'>
            together
          </h2>

          <motion.div
            style={{ x: prefersReducedMotion ? 0 : isDesktop ? x : xMobile }}
            className='absolute inset-x-0 top-[calc(100%-3.75rem)] mx-auto w-fit sm:top-[calc(100%-5.625rem)] lg:inset-x-auto lg:top-[calc(100%-4.6875rem)] lg:left-[calc(100%-25rem)] lg:mx-0 lg:w-auto'
          >
            <Rounded
              backgroundColor='#334BD3'
              className='relative mx-auto h-[7.5rem] w-[7.5rem] rounded-full bg-accent text-white sm:h-[11.25rem] sm:w-[11.25rem] lg:mx-0'
            >
              <p className='text-sm font-medium sm:text-base'>Get in touch</p>
            </Rounded>
          </motion.div>

          <motion.svg
            style={{ rotate: prefersReducedMotion ? 90 : rotate, scale: 2 }}
            width='9'
            height='9'
            viewBox='0 0 9 9'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='absolute top-[30%] left-full hidden lg:block'
          >
            <path
              d='M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z'
              fill='white'
            />
          </motion.svg>
        </div>

        <div className={`mt-28 flex flex-col gap-5 sm:mt-36 sm:flex-row lg:mt-[6.25rem] ${gutter}`}>
          <Rounded>
            <a
              href='mailto:reachonkarpatel@gmail.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              reachonkarpatel@gmail.com
            </a>
          </Rounded>
          <Rounded>
            <Link href='/resume.pdf' download className='flex items-center gap-4'>
              Resume
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3'
                />
              </svg>
            </Link>
          </Rounded>
        </div>

        <div className='flex flex-col gap-8 px-6 pt-16 pb-5 sm:flex-row sm:justify-between md:px-10 lg:pt-[4.375rem]'>
          {/* Decorative only — below sm the footer stacks and this just adds
              height above the socials. */}
          <div className='hidden sm:block'>
            <LocalTime />
          </div>

          <div className='flex flex-col items-start gap-4'>
            <h3 className={mutedLabel}>SOCIALS</h3>
            <div className='flex gap-6'>
              {socials.map(({ label, href }) => (
                <Magnetic key={label}>
                  <Link
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline-sweep py-[0.2em] text-sm font-normal text-white sm:text-[1.08em]'
                  >
                    {label}
                  </Link>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
