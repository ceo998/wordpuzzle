import Link from 'next/link';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/cat/${category.slug}`}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200"
    >
      <div className="p-5">
        <div className="flex items-center space-x-3 mb-3">
          {category.icon && (
            <span className="text-2xl" role="img" aria-label={category.name}>
              {category.icon}
            </span>
          )}
          <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {category.name}
          </h3>
        </div>

        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {category.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-primary-600 font-medium">
            {category.puzzleCount} puzzles
          </span>
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
