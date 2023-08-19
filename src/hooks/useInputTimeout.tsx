import React, { useEffect, useState } from 'react';

export default function useInputTimeout(timeout: number, callback: () => void) {
  const [lastTime, setLastTime] = useState<number | null>(null);

  const resetFunction = () => {
    setLastTime(Date.now());
  };

  useEffect(() => {
    window.addEventListener('input', resetFunction);

    return () => {
      window.removeEventListener('input', resetFunction);
    };
  }, []);

  useEffect(() => {
    if (!lastTime) return;
    console.log('----time start----');

    const timer = setTimeout(() => {
      callback();
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [lastTime]);
}
