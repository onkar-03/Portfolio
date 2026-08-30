'use client';
import Link from 'next/link';

export default function Project({ index, title, manageModal, link, github }) {
  return (
    <div
      className='group flex w-full cursor-pointer items-center justify-between gap-4 border-t border-mist-200 py-6 transition-all duration-200 last:border-b hover:opacity-50 md:py-[3.125rem] md:pl-[6vw]'
      onMouseEnter={(e) => manageModal(true, index, e.clientX, e.clientY)}
      onMouseLeave={(e) => manageModal(false, index, e.clientX, e.clientY)}
    >
      <div className='flex min-w-0 flex-1 items-center gap-3'>
        <Link
          href={link}
          target='_blank'
          rel='noopener noreferrer'
          className='min-w-0'
        >
          {/* truncate is a safety net for a long title on a narrow phone; at
              md and up the row has room to spare. */}
          <h2 className='truncate text-xl font-normal transition-all duration-400 group-hover:-translate-x-2.5 sm:text-2xl md:text-[3rem] lg:text-[3.75rem]'>
            {title}
          </h2>
        </Link>
      </div>

      {/* Hovering the GitHub link suppresses the image preview, restoring it on leave */}
      <div className='shrink-0 text-left whitespace-nowrap md:px-[3vw]'>
        <Link
          href={github}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-block text-sm font-normal transition-all duration-400 group-hover:translate-x-2.5 md:text-base'
          onMouseEnter={(e) => manageModal(false, index, e.clientX, e.clientY)}
          onMouseLeave={(e) => manageModal(true, index, e.clientX, e.clientY)}
        >
          GitHub ↗
        </Link>
      </div>
    </div>
  );
}
