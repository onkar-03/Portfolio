'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import Project from './Project';
import Rounded from '@/common/RoundedButton';

const projects = [
  {
    title: 'GTA VI Site',
    src: 'gta.webp',
    color: '#000000',
    link: 'https://gtavi-landing-page.vercel.app/',
    github: 'https://github.com/onkkkar/gta-vi-landing-page',
  },
  {
    title: 'NOVA - AI',
    src: 'Nova.webp',
    color: '#8C8C8C',
    link: 'https://buildwithnova.vercel.app',
    github: 'https://github.com/onkkkar/nova',
  },
  {
    title: 'TrueFeedback',
    src: 'TrueFeedback.webp',
    color: '#1E1E1E',
    link: 'https://trufeedback.vercel.app',
    github: 'https://github.com/onkkkar/truefeedback',
  },
  {
    title: 'Resumind',
    src: 'Resumind.webp',
    color: '#d6d4e4',
    link: 'https://getresumind.vercel.app',
    github: 'https://github.com/onkkkar/resumind',
  },
];

const scaleAnimation = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

const cursorBase =
  'pointer-events-none fixed z-3 hidden h-20 w-20 items-center justify-center rounded-full text-sm font-light text-white md:flex';

export default function Projects() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect(() => {
    xMoveContainer.current = gsap.quickTo(modalContainer.current, 'left', {
      duration: 0.8,
      ease: 'power3',
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, 'top', {
      duration: 0.8,
      ease: 'power3',
    });
    xMoveCursor.current = gsap.quickTo(cursor.current, 'left', {
      duration: 0.5,
      ease: 'power3',
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, 'top', {
      duration: 0.5,
      ease: 'power3',
    });
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, 'left', {
      duration: 0.45,
      ease: 'power3',
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, 'top', {
      duration: 0.45,
      ease: 'power3',
    });
  }, []);

  const moveItems = (x, y) => {
    xMoveContainer.current(x);
    yMoveContainer.current(y);
    xMoveCursor.current(x);
    yMoveCursor.current(y);
    xMoveCursorLabel.current(x);
    yMoveCursorLabel.current(y);
  };

  const manageModal = (active, index, x, y) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  return (
    <main
      onMouseMove={(e) => moveItems(e.clientX, e.clientY)}
      className='mx-auto mt-16 mb-[4.6875rem] flex w-full max-w-[100em] flex-col items-center px-5 md:px-[8vw] lg:mt-[6.25rem]'
    >
      <div className='flex w-full pb-8'>
        <h5 className='mb-4 w-[70%] text-[0.6em] leading-[1.065] font-[450] tracking-[0.05em] uppercase opacity-50 md:pl-[6vw]'>
          Recent Work
        </h5>
      </div>

      <div className='mb-[3.125rem] flex w-full max-w-[87.5rem] flex-col items-center justify-center'>
        {projects.map((project, index) => (
          <Project
            index={index}
            title={project.title}
            manageModal={manageModal}
            key={project.title}
            link={project.link}
            github={project.github}
          />
        ))}
      </div>

      <Rounded>
        <Link
          href='#contact'
          onClick={(e) => {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }
          }}
        >
          Get In Touch
        </Link>
      </Rounded>

      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial='initial'
        animate={active ? 'enter' : 'closed'}
        className='pointer-events-none fixed top-1/2 left-1/2 z-3 hidden h-[21.875rem] w-[25rem] overflow-hidden bg-white md:block'
      >
        <div
          style={{ top: index * -100 + '%' }}
          className='relative h-full w-full transition-[top] duration-500 ease-smooth'
        >
          {projects.map((project) => (
            <div
              className='flex h-full w-full items-center justify-center'
              style={{ backgroundColor: project.color }}
              key={project.title}
            >
              <Image
                src={`/images/${project.src}`}
                width={300}
                height={0}
                alt={project.title}
                className='h-auto'
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        ref={cursor}
        className={`${cursorBase} bg-accent`}
        variants={scaleAnimation}
        initial='initial'
        animate={active ? 'enter' : 'closed'}
      />
      <motion.div
        ref={cursorLabel}
        className={`${cursorBase} bg-transparent`}
        variants={scaleAnimation}
        initial='initial'
        animate={active ? 'enter' : 'closed'}
      >
        View
      </motion.div>
    </main>
  );
}
