import { useRef, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';

const title = "Hi, I'm Onkar";

const Landing = () => {
  const img = useRef(null);
  const imgContainer = useRef(null);
  const titles = useRef([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const titleEls = titles.current.filter(Boolean);

    // Land everything in its finished state rather than animating into it.
    if (prefersReducedMotion) {
      gsap.set([imgContainer.current, img.current], { scale: 1 });
      gsap.set(titleEls, { y: '0%', opacity: 1 });
      return;
    }

    const tl = gsap.timeline({ delay: 2.2 });

    tl.from(imgContainer.current, {
      scale: 1.3,
      duration: 3.25,
      ease: 'power3.inOut',
    })
      .from(
        img.current,
        {
          scale: 2,
          duration: 3.2,
          ease: 'power4.inOut',
        },
        '-=3.1',
      )
      .fromTo(
        titleEls,
        { y: '300%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 3,
          ease: 'power4.inOut',
        },
        '-=2.7',
      );

    return () => tl.kill();
  }, [prefersReducedMotion]);

  return (
    // 5rem is the mobile header's height: pt-9 (2.25) + pb-5 (1.25) + a 1.5rem
    // text-base line. Offsetting pt by it puts equal space above and below the
    // banner, since the header is absolutely positioned over the hero's top.
    <section className='relative z-0 flex h-[70dvh] w-full items-center justify-center py-[5vh] pt-[calc(5vh+5rem)] select-none md:h-dvh md:py-[10vh] md:pt-[10vh]'>
      <div className='z-10 flex w-fit max-w-[90vw] flex-col items-center text-center font-cabinet text-[clamp(1.75rem,10vw,7rem)] font-black text-black uppercase'>
        {[0, 1, 2].map((i) => (
          <div key={i} className='overflow-hidden'>
            <h1
              ref={(el) => (titles.current[i] = el)}
              className={`translate-y-[200%] ${
                i === 1 ? 'text-stroke-2 text-stroke-black text-transparent' : ''
              }`}
            >
              {title}
            </h1>
          </div>
        ))}
      </div>
      <div
        ref={imgContainer}
        className='absolute mx-auto w-4/5 overflow-hidden rounded-[0.625rem]'
      >
        {/* priority: this is the LCP element. The aspect-* classes deliberately
            override the intrinsic 2602x1736 ratio, as the original design did. */}
        <Image
          ref={img}
          src='/images/heroimg.webp'
          alt='Abstract cubic background'
          width={2602}
          height={1736}
          priority
          sizes='80vw'
          className='aspect-square h-auto w-full rounded-xl opacity-50 lg:aspect-[11/9]'
        />
      </div>
    </section>
  );
};

export default Landing;
