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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {category.icon && (
              <span className="text-4xl" role="img" aria-label={category.name}>
                {category.icon}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {category.name} Word Search Puzzles
            </h1>
          </div>
          <p className="text-gray-600 max-w-3xl">
            {category.description}. Browse our collection of {category.puzzleCount}+
            puzzles. Play online or print them for offline enjoyment!
          </p>
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
        <div className="mt-12 p-6 bg-primary-50 rounded-xl">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            About {category.name} Puzzles
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {category.puzzleCount}+
              </div>
              <div className="text-sm text-gray-600">Total Puzzles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">Free</div>
              <div className="text-sm text-gray-600">Always Free</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">Yes</div>
              <div className="text-sm text-gray-600">Printable</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">All</div>
              <div className="text-sm text-gray-600">Skill Levels</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
