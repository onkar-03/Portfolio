import styles from './style.module.scss';
import Rounded from '../../common/RoundedButton/page';
import { useRef, useEffect } from 'react';
import { useScroll, motion, useTransform, useSpring } from 'framer-motion';
import Magnetic from '../../common/Magnetic/page';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import LocalTime from '../../common/LocalTime/page';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end'],
  });

  // CHANGED: added raw transforms
  const rawX = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rawRotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

  const footerRef = useRef(null);
  const circleRef = useRef(null);

  // CHANGED: apply spring for smoother animation
  const x = useSpring(rawX, { stiffness: 50, damping: 15 });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 0]);
  const rotate = useSpring(rawRotate, { stiffness: 40, damping: 12 });

  // const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    if (!circleRef.current || !container.current) return;

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: '0% 100%',
        end: '100% 100%',
        scrub: 0.5,
      },
    });
    tl.to(
      circleRef.current,
      {
        height: 0,
        ease: 'none',
      },
      0,
    );
  }, []);

  return (
    <motion.div style={{ y }} ref={container} className={styles.contact}>
      {/* SEemicircular tTransition */}
      <div ref={circleRef} className={styles.circleDiv}>
        <div className={styles.circle}></div>
      </div>

      <div className={styles.body}>
        <div className={styles.title}>
          <span>
            <h2>Let's work</h2>
          </span>
          <h2>together</h2>

          {/* button movement with smooth spring */}
          <motion.div style={{ x }} className={styles.buttonContainer}>
            <Rounded backgroundColor={'#334BD3'} className={styles.button}>
              <p>Get in touch</p>
            </Rounded>
          </motion.div>

          {/* arrow with smooth spring rotation */}
          <motion.svg
            style={{ rotate, scale: 2 }}
            width='9'
            height='9'
            viewBox='0 0 9 9'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z'
              fill='white'
            />
          </motion.svg>
        </div>

        <div className={styles.nav}>
          <Rounded>
            <a
              href='mailto:onkarpatel10@gmail.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              onkarpatel10@gmail.com
            </a>
          </Rounded>
          <Rounded>
            <Link
              href='/resume.pdf'
              download
              style={{ display: 'flex', alignItems: 'center', gap: '1em' }}
            >
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

        <div className={styles.info}>
          <div>
            {/* Local Time Feature */}
            <div
              style={{
                marginTop: '1em',
                textAlign: 'center',
                fontSize: '1rem',
              }}
            >
              <LocalTime />
            </div>
          </div>
          <div className={styles.socialsColumn}>
            <h3>SOCIALS</h3>
            <div className={styles.socialsRow}>
              <Magnetic>
                <Link
                  href='https://github.com/onkkkar'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href='https://x.com/wannabe_sde'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Twitter
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href='https://www.linkedin.com/in/onkkkar'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Linkedin
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
