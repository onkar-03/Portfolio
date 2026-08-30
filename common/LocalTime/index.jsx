import { useEffect, useState } from 'react';
import Magnetic from '@/common/Magnetic';

export default function LocalTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    function updateTime() {
      const formatted = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Kolkata',
        hour12: true,
      });
      setTime(formatted);
    }
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-col items-start gap-4'>
      <h3 className='cursor-default text-[0.7em] font-light tracking-[0.1em] text-[#808080]'>
        LOCAL TIME
      </h3>
      <Magnetic>
        <span className='block cursor-pointer text-left text-[1.08em] font-normal text-white'>
          {time} GMT+5:30
        </span>
      </Magnetic>
    </div>
  );
}
