import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb, PuzzleCard } from '@/components';
import { categories } from '@/data/categories';
import { puzzles } from '@/data/puzzles';

export const metadata: Metadata = {
  title: 'Printable Word Search Puzzles - Free PDF Downloads',
  description:
    'Download and print free word search puzzles. Perfect for classrooms, parties, road trips, and offline fun. Easy, medium, and hard difficulty levels available.',
  alternates: {
    canonical: '/printable',
  },
  openGraph: {
    title: 'Free Printable Word Search Puzzles',
    description:
      'Download and print free word search puzzles for all ages. Perfect for teachers and parents.',
    url: '/printable',
  },
};

export default function PrintablePage() {
  // Get puzzles grouped by difficulty
  const easyPuzzles = puzzles.filter((p) => p.difficulty === 'easy').slice(0, 6);
  const mediumPuzzles = puzzles.filter((p) => p.difficulty === 'medium').slice(0, 6);
  const hardPuzzles = puzzles.filter((p) => p.difficulty === 'hard').slice(0, 6);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Printable Word Search Puzzles',
    description: 'Free printable word search puzzles for all ages',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://wordpuzzle.com'}/printable`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-wide py-8">
        <Breadcrumb items={[{ label: 'Printable Puzzles' }]} />

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Printable Word Search Puzzles
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Download and print free word search puzzles for offline fun. Perfect for
            classrooms, parties, road trips, and brain training. All puzzles are
            optimized for standard letter/A4 paper.
          </p>
        </div>

        {/* How to Print */}
        <div className="bg-primary-50 rounded-xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            How to Print
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                1
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Choose a Puzzle</h3>
                <p className="text-sm text-gray-600">
                  Browse and click on any puzzle you like
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                2
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Click Print</h3>
                <p className="text-sm text-gray-600">
                  Use the print button on the puzzle page
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                3
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Enjoy!</h3>
                <p className="text-sm text-gray-600">
                  Solve the puzzle with pen or pencil
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Easy Puzzles */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Easy Puzzles</h2>
              <p className="text-gray-600 text-sm">
                Perfect for kids and beginners. Horizontal and vertical words only.
              </p>
            </div>
            <Link
              href="/cat/kids-puzzles"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {easyPuzzles.map((puzzle) => (
              <PuzzleCard key={puzzle.id} puzzle={puzzle} />
            ))}
          </div>
        </section>

        {/* Medium Puzzles */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Medium Puzzles</h2>
              <p className="text-gray-600 text-sm">
                Moderate challenge with diagonal words included.
              </p>
            </div>
            <Link
              href="/cat/general"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediumPuzzles.map((puzzle) => (
              <PuzzleCard key={puzzle.id} puzzle={puzzle} />
            ))}
          </div>
        </section>

        {/* Hard Puzzles */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Hard Puzzles</h2>
              <p className="text-gray-600 text-sm">
                Expert level with backwards and diagonal words.
              </p>
            </div>
            <Link
              href="/cat/general"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hardPuzzles.map((puzzle) => (
              <PuzzleCard key={puzzle.id} puzzle={puzzle} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.slice(0, 15).map((category) => (
              <Link
                key={category.id}
                href={`/cat/${category.slug}`}
                className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all text-center"
              >
                <span className="text-2xl mb-2 block">{category.icon}</span>
                <span className="text-sm font-medium text-gray-900">
                  {category.name}
                </span>
                <span className="text-xs text-gray-500 block">
                  {category.puzzleCount} puzzles
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-900 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Create Your Own Printable Puzzle</h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Use our free word search maker to create custom puzzles with your own
            words. Perfect for personalized gifts, classroom activities, or party games.
          </p>
          <Link href="/maker" className="btn-primary bg-white text-gray-900 hover:bg-gray-100">
            Create Custom Puzzle
          </Link>
        </section>
      </div>
    </>
  );
}
