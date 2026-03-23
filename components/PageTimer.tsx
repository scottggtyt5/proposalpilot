'use client';

import { useState, useEffect } from 'react';

export function PageTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed top-24 right-8 z-40">
      <div className="bg-dark-card border border-primary/50 rounded-lg px-4 py-3 glow-primary">
        <div className="text-xs text-gray-400 mb-1">Time on page</div>
        <div className="text-2xl font-mono font-bold text-primary">
          {formatTime(seconds)}
        </div>
      </div>
    </div>
  );
}
