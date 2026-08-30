import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Magnetic from '@/common/Magnetic';

// Narrower padding below sm so the 22-character email address still fits
// inside a 320px viewport once the pill stretches to full width.
const pill =
  'relative rounded-[3em] border border-mist-500 px-8 py-3 text-center transition-colors duration-[400ms] ease-linear hover:text-white sm:px-[3.75rem] sm:py-[0.9375rem]';

// A touch device fires a synthetic mouseenter on tap but frequently never
// fires the matching mouseleave, which left the fill stuck on — the burger
// stayed blue after the menu was closed. Only run the fill where hover is real.
const canHover = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

export default function RoundedButton({
  children,
  backgroundColor = '#455CE9',
  className,
  ...attributes
}) {
  const circle = useRef(null);
  const timeline = useRef(null);
  // A ref, not a local: a plain `let` is re-initialised on every render, so
  // clearTimeout() could never cancel a timer created by an earlier one.
  const timeoutId = useRef(null);

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(
        circle.current,
        { top: '-25%', width: '150%', duration: 0.4, ease: 'power3.in' },
        'enter',
      )
      .to(
        circle.current,
        { top: '-150%', width: '125%', duration: 0.25 },
        'exit',
      );

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeline.current?.kill();
    };
  }, []);

  const manageMouseEnter = () => {
    if (!canHover()) return;
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeline.current.tweenFromTo('enter', 'exit');
  };

  const manageMouseLeave = () => {
    if (!canHover()) return;
    timeoutId.current = setTimeout(() => {
      timeline.current.play();
    }, 200);
  };

  return (
    <Magnetic>
      <div
        className={`isolate flex cursor-pointer items-center justify-center overflow-hidden ${
          className ?? pill
        }`}
        onMouseEnter={manageMouseEnter}
        onMouseLeave={manageMouseLeave}
        {...attributes}
      >
        {children}
        <div
          ref={circle}
          style={{ backgroundColor }}
          className='absolute top-full -z-10 h-[150%] w-full rounded-[50%]'
        />
      </div>
    </Magnetic>
  );
}
