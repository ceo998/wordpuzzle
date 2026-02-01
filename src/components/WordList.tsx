'use client';

import { cn } from '@/lib/utils';

interface WordListProps {
  words: string[];
  foundWords: string[];
}

export default function WordList({ words, foundWords }: WordListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <h3 className="font-semibold text-gray-900 mb-3">
        Words to Find ({foundWords.length}/{words.length})
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {words.map((word) => {
          const isFound = foundWords.includes(word);
          return (
            <div
              key={word}
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-medium transition-all',
                isFound
                  ? 'bg-green-100 text-green-800 line-through'
                  : 'bg-gray-50 text-gray-700'
              )}
            >
              {word}
            </div>
          );
        })}
      </div>
    </div>
  );
}
