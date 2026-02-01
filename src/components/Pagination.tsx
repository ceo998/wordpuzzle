import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;

    if (totalPages <= showPages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = Math.min(totalPages - 1, showPages - 1);
      } else if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - showPages + 2);
      }

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const getPageUrl = (page: number) => {
    return page === 1 ? basePath : `${basePath}?page=${page}`;
  };

  return (
    <nav aria-label="Pagination" className="flex justify-center mt-8">
      <ul className="flex items-center space-x-1">
        {/* Previous Button */}
        <li>
          {currentPage > 1 ? (
            <Link
              href={getPageUrl(currentPage - 1)}
              className="flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors text-gray-700"
              aria-label="Previous page"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
          ) : (
            <span className="flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed" aria-disabled="true">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </span>
          )}
        </li>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => (
          <li key={index}>
            {page === '...' ? (
              <span className="flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 text-gray-600">
                ...
              </span>
            ) : (
              <Link
                href={getPageUrl(page as number)}
                className={cn(
                  'flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-lg border transition-colors font-medium',
                  page === currentPage
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-800'
                )}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </Link>
            )}
          </li>
        ))}

        {/* Next Button */}
        <li>
          {currentPage < totalPages ? (
            <Link
              href={getPageUrl(currentPage + 1)}
              className="flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors text-gray-700"
              aria-label="Next page"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ) : (
            <span className="flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed" aria-disabled="true">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
