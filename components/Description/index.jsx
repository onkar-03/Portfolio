import Button from '@/common/RoundedButton';
import {
  motion,
  useInView,
} from 'framer-motion';
import { useRef } from 'react';
import {
  opacity,
  slideUp,
} from './anim.js';

const phrase =
  'Designing thoughtful interfaces. Building standout digital experiences. Merging creativity and code to craft products users remember.';

const Description = () => {
  const description = useRef(null);
  const isInView = useInView(
    description,
  );

  const handleAboutClick = () => {
    const aboutSection =
      document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div
      ref={description}
      className="mt-0 mb-16 flex justify-center px-6 md:my-16 md:px-16 lg:my-[6.25rem] lg:px-[12.5rem]"
    >
      <div className="relative flex max-w-[87.5rem] flex-col gap-8 lg:flex-row lg:gap-[3.125rem]">
        <p className="text-xl leading-[1.3] sm:text-[2rem] lg:text-[2.5rem]">
          {phrase
            .split(' ')
            .map((word, index) => (
              <span
                key={index}
                className="relative mr-[0.1875rem] inline-flex overflow-hidden"
              >
                <motion.span
                  variants={slideUp}
                  custom={index}
                  animate={
                    isInView
                      ? 'open'
                      : 'closed'
                  }
                >
                  {word}
                </motion.span>
              </span>
            ))}
        </p>
        {/* Below lg the button sits beside the secondary copy rather than
            trailing it as a third stacked block. `lg:contents` dissolves this
            wrapper at lg, so the desktop layout — button absolutely anchored to
            the relative parent — stays exactly as it was. */}
        <div className="flex items-center gap-6 lg:contents">
          <motion.p
            variants={opacity}
            animate={
              isInView
                ? 'open'
                : 'closed'
            }
            className="min-w-0 flex-1 text-sm leading-[1.3] font-normal tracking-[0.0625em] sm:text-base lg:w-4/5 lg:flex-initial"
          >
            Crafting modern, user-first
            web experiences through a
            blend of design sense and
            technical depth. Passionate
            about clean UI, smooth
            performance, and standout
            solutions.
          </motion.p>
          <div className="shrink-0">
            <Button
              onClick={handleAboutClick}
              className="relative h-[7.5rem] w-[7.5rem] rounded-full bg-ink-800 text-white sm:h-[11.25rem] sm:w-[11.25rem] lg:absolute lg:top-[80%] lg:left-[calc(100%-12.5rem)]"
            >
              <p className="text-sm font-medium sm:text-base">
                About me
              </p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
