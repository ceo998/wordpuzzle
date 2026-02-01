import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb, PuzzleCard, Pagination } from '@/components';
import { categories, getCategoryBySlug } from '@/data/categories';
import { getPuzzlesByCategory } from '@/data/puzzles';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} Word Search Puzzles - Free Online`,
    description: `Play free ${category.name.toLowerCase()} word search puzzles online. ${category.description} Browse ${category.puzzleCount}+ puzzles and print for offline fun!`,
    alternates: {
      canonical: `/cat/${slug}`,
    },
    openGraph: {
      title: `${category.name} Word Search Puzzles`,
      description: category.description,
      url: `/cat/${slug}`,
    },
  };
}

const PUZZLES_PER_PAGE = 12;

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { page } = await searchParams;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const allPuzzles = getPuzzlesByCategory(slug);
  const currentPage = Math.max(1, parseInt(page || '1', 10));
  const totalPages = Math.ceil(allPuzzles.length / PUZZLES_PER_PAGE);
  const startIndex = (currentPage - 1) * PUZZLES_PER_PAGE;
  const puzzles = allPuzzles.slice(startIndex, startIndex + PUZZLES_PER_PAGE);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} Word Search Puzzles`,
    description: category.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://wordpuzzle.com'}/cat/${slug}`,
    numberOfItems: allPuzzles.length,
    itemListElement: puzzles.map((puzzle, index) => ({
      '@type': 'ListItem',
      position: startIndex + index + 1,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://wordpuzzle.com'}/puzzle/${puzzle.id}/${puzzle.slug}`,
      name: puzzle.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-wide py-8">
        <Breadcrumb
          items={[{ label: category.name }]}
        />

        {/* Category Header */}
        <div className="mb-10 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-3xl -z-10" />

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 p-6 md:p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              {category.icon && (
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/10">
                  <span className="text-4xl" role="img" aria-label={category.name}>
                    {category.icon}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-primary-800 to-gray-900 bg-clip-text text-transparent">
                  {category.name} Word Search Puzzles
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
                    {category.puzzleCount}+ Puzzles
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 max-w-3xl text-lg">
              {category.description}. Browse our collection of {category.puzzleCount}+
              puzzles. Play online or print them for offline enjoyment!
            </p>
          </div>
        </div>

        {/* Puzzles Grid */}
        {puzzles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {puzzles.map((puzzle) => (
                <PuzzleCard key={puzzle.id} puzzle={puzzle} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath={`/cat/${slug}`}
            />
          </>
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
              We&apos;re adding more puzzles to this category soon!
            </p>
          </div>
        )}

        {/* Category Stats */}
        <div className="mt-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-white to-accent-500/5 rounded-2xl" />
          <div className="relative p-8 rounded-2xl border border-primary-100/50">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/25">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              About {category.name} Puzzles
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: `${category.puzzleCount}+`, label: 'Total Puzzles', icon: '🧩' },
                { value: 'Free', label: 'Always Free', icon: '🎁' },
                { value: 'Yes', label: 'Printable', icon: '🖨️' },
                { value: 'All', label: 'Skill Levels', icon: '📊' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
