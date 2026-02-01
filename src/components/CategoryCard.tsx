import Link from 'next/link';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/cat/${category.slug}`}
      className="group relative block overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-white to-accent-500/5 group-hover:from-primary-500/10 group-hover:to-accent-500/10 transition-all duration-500" />

      {/* Glass effect border */}
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 group-hover:border-primary-300/50 group-hover:shadow-2xl group-hover:shadow-primary-500/10 transition-all duration-500 p-6">
        {/* Icon container */}
        <div className="mb-4 relative">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary-500/10">
            {category.icon && (
              <span className="text-3xl" role="img" aria-label={category.name}>
                {category.icon}
              </span>
            )}
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-accent-600 group-hover:bg-clip-text transition-all duration-300 mb-2">
          {category.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {category.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100/50">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg text-white text-xs font-bold shadow-lg shadow-primary-500/25">
              {category.puzzleCount}
            </span>
            <span className="text-sm font-medium text-gray-600">puzzles</span>
          </div>

          {/* Arrow */}
          <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-primary-500 group-hover:to-accent-500 flex items-center justify-center transition-all duration-300">
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
