import Link from 'next/link';
import { Puzzle } from '@/types';

interface PuzzleCardProps {
  puzzle: Puzzle;
}

export default function PuzzleCard({ puzzle }: PuzzleCardProps) {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };

  return (
    <Link
      href={`/puzzle/${puzzle.id}/${puzzle.slug}`}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
            {puzzle.title}
          </h3>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              difficultyColors[puzzle.difficulty]
            }`}
          >
            {puzzle.difficulty}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {puzzle.description || `Find ${puzzle.words.length} hidden words`}
        </p>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            {puzzle.words.length} words &middot; {puzzle.gridSize}x{puzzle.gridSize}
          </span>
          {puzzle.plays && (
            <span className="text-gray-400">
              {puzzle.plays.toLocaleString()} plays
            </span>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-primary-600 font-medium">
            {puzzle.categoryName}
          </span>
        </div>
      </div>
    </Link>
  );
}
