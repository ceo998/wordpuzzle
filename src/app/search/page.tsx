import { Metadata } from 'next';
import { Breadcrumb, PuzzleCard } from '@/components';
import { searchPuzzles } from '@/data/puzzles';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q || '';

  return {
    title: query
      ? `Search Results for "${query}" - Word Search Puzzles`
      : 'Search Word Search Puzzles',
    description: query
      ? `Find word search puzzles matching "${query}". Browse our collection of free online word puzzles.`
      : 'Search through thousands of free word search puzzles. Find puzzles by topic, theme, or keywords.',
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || '';
  const results = query ? searchPuzzles(query) : [];

  return (
    <div className="container-wide py-8">
      <Breadcrumb items={[{ label: 'Search' }]} />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Search Puzzles
        </h1>

        {/* Search Form */}
        <form action="/search" method="GET" className="max-w-xl">
          <div className="relative">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search for puzzles..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600"
              aria-label="Search"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      {query ? (
        <>
          <p className="text-gray-600 mb-6">
            {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
          </p>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((puzzle) => (
                <PuzzleCard key={puzzle.id} puzzle={puzzle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No puzzles found
              </h2>
              <p className="text-gray-600">
                Try different keywords or browse our categories.
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Search for puzzles
          </h2>
          <p className="text-gray-600">
            Enter a keyword to find word search puzzles.
          </p>
        </div>
      )}
    </div>
  );
}
