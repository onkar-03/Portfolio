import Magnetic from '@/common/Magnetic';
import Link from 'next/link';
import { socials } from '@/common/socials';

const Footer = () => {
  return (
    <div className='flex flex-col'>
      <div className='mb-2.5 pb-2.5 text-xs uppercase text-mist-400'>
        <p>Socials</p>
      </div>
      <div className='flex gap-6 text-base sm:gap-10'>
        {socials.map(({ label, href }) => (
          <Magnetic key={label}>
            <Link
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              className='underline-sweep cursor-pointer p-[0.15625rem] font-light'
            >
              {label}
            </Link>
          </Magnetic>
        ))}
      </div>
    </div>
  );
};

export default Footer;
