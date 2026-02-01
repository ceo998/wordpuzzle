'use client';

import { cn } from '@/lib/utils';

interface WordListProps {
  words: string[];
  foundWords: string[];
}

export default function WordList({ words, foundWords }: WordListProps) {
  const progress = (foundWords.length / words.length) * 100;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-5 overflow-hidden">
      {/* Header with progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center text-white text-sm shadow-lg shadow-primary-500/25">
              {foundWords.length}
            </span>
            <span className="text-gray-400 font-normal">/</span>
            <span>{words.length}</span>
            <span className="text-gray-500 font-normal text-sm">words found</span>
          </h3>
          {foundWords.length === words.length && (
            <span className="text-2xl animate-bounce">🎉</span>
          )}
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 bg-[length:200%_100%] animate-shimmer transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Word grid */}
      <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
        {words.map((word, index) => {
          const isFound = foundWords.includes(word);
          return (
            <div
              key={word}
              className={cn(
                'relative px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden',
                isFound
                  ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-md shadow-green-500/20'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              )}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <span className={cn(
                'relative flex items-center gap-2',
                isFound && 'opacity-90'
              )}>
                {isFound && (
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                <span className={isFound ? 'line-through' : ''}>{word}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
