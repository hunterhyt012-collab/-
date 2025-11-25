import React, { useState, useEffect } from 'react';
import { Clock as ClockIcon } from 'lucide-react';

export const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col items-end mr-4">
      <div className="flex items-center text-slate-700 font-mono text-xl font-bold tracking-widest">
        <ClockIcon className="w-5 h-5 mr-2 text-indigo-600" />
        {formattedTime}
      </div>
      <div className="text-xs text-slate-500 font-medium">
        {formattedDate}
      </div>
    </div>
  );
};