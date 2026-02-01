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
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />

      <div className="relative flex items-center space-x-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 px-5 py-3">
        {/* Animated clock icon */}
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25 ${isRunning ? 'animate-pulse' : ''}`}>
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Time</span>
          <span className="font-mono text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {formatTime(seconds)}
          </span>
        </div>

        {/* Status indicator */}
        {isRunning && (
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        )}
      </div>
    </div>
  );
}
