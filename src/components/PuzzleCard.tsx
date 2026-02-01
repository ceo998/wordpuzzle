import Link from 'next/link';
import { Puzzle } from '@/types';

interface PuzzleCardProps {
  puzzle: Puzzle;
}

export default function PuzzleCard({ puzzle }: PuzzleCardProps) {
  const difficultyConfig = {
    easy: {
      bg: 'bg-gradient-to-r from-emerald-500 to-green-500',
      text: 'text-white',
      glow: 'shadow-emerald-500/20',
    },
    medium: {
      bg: 'bg-gradient-to-r from-amber-500 to-orange-500',
      text: 'text-white',
      glow: 'shadow-amber-500/20',
    },
    hard: {
      bg: 'bg-gradient-to-r from-rose-500 to-red-500',
      text: 'text-white',
      glow: 'shadow-rose-500/20',
    },
  };

  const config = difficultyConfig[puzzle.difficulty];

  return (
    <Link
      href={`/puzzle/${puzzle.id}/${puzzle.slug}`}
      className="group relative block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-1"
    >
      {/* Gradient border on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
      <div className="absolute inset-[1px] bg-white rounded-2xl -z-5" />

      {/* Card content */}
      <div className="relative p-5">
        {/* Header with title and badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-accent-600 group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
            {puzzle.title}
          </h3>
          <span
            className={`px-3 py-1 text-xs font-bold rounded-full ${config.bg} ${config.text} shadow-lg ${config.glow} capitalize shrink-0`}
          >
            {puzzle.difficulty}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {puzzle.description || `Find ${puzzle.words.length} hidden words in this puzzle`}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-gray-500">
            <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span>{puzzle.words.length} words</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <svg className="w-4 h-4 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            <span>{puzzle.gridSize}×{puzzle.gridSize}</span>
          </div>
          {puzzle.plays && (
            <div className="flex items-center gap-1.5 text-gray-500 ml-auto">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{puzzle.plays.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Footer with category */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
            {puzzle.categoryName}
          </span>
          <span className="text-xs text-gray-400 group-hover:text-primary-500 transition-colors flex items-center gap-1">
            Play Now
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
