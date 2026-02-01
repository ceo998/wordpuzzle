'use client';

import { useEffect, useState } from 'react';
import { formatTime } from '@/lib/utils';

interface TimerProps {
  isRunning: boolean;
  onTimeUpdate?: (seconds: number) => void;
  initialTime?: number;
}

export default function Timer({
  isRunning,
  onTimeUpdate,
  initialTime = 0,
}: TimerProps) {
  const [seconds, setSeconds] = useState(initialTime);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const newTime = prev + 1;
          onTimeUpdate?.(newTime);
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, onTimeUpdate]);

  return (
    <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm border border-gray-100 px-4 py-2">
      <svg
        className="w-5 h-5 text-primary-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="font-mono text-lg font-semibold text-gray-900">
        {formatTime(seconds)}
      </span>
    </div>
  );
}
