import { Metadata } from 'next';
import Link from 'next/link';
import { CategoryCard, PuzzleCard } from '@/components';
import { categories } from '@/data/categories';
import { getFeaturedPuzzles, getRecentPuzzles } from '@/data/puzzles';

export const metadata: Metadata = {
  title: 'Free Word Search Puzzles Online - Play & Print',
  description:
    'Play thousands of free word search puzzles online or print them for offline fun. Categories include TV shows, movies, science, sports, kids puzzles and more. 100% free!',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  const featuredPuzzles = getFeaturedPuzzles(6);
  const recentPuzzles = getRecentPuzzles(6);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WordPuzzle',
    description: 'Free online word search puzzles for all ages',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://wordpuzzle.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://wordpuzzle.com'}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Free Word Search Puzzles
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 text-balance">
              Play thousands of word search puzzles online for free. Perfect for
              all ages - from kids to adults. Print them out or play digitally!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#categories"
                className="btn-primary bg-white text-primary-700 hover:bg-primary-50"
              >
                Browse Puzzles
              </Link>
              <Link
                href="/maker"
                className="btn-secondary border-white text-white hover:bg-white/10"
              >
                Create Your Own
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white border-b" aria-labelledby="features-heading">
        <div className="container-wide">
          <h2 id="features-heading" className="sr-only">Why Choose WordPuzzle</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-primary-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">100% Free</h3>
              <p className="text-gray-700">
                All puzzles are completely free to play and print. No sign-up required.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-primary-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Play Anywhere</h3>
              <p className="text-gray-700">
                Works on desktop, tablet, and mobile. Play online or print for offline.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-primary-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Educational</h3>
              <p className="text-gray-700">
                Perfect for teachers and parents. Improve vocabulary and spelling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Puzzles */}
      <section className="py-12 md:py-16">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Popular Puzzles
            </h2>
            <Link
              href="/cat/general"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
            >
              View All
              <svg
                className="w-4 h-4 ml-1"
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
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPuzzles.map((puzzle) => (
              <PuzzleCard key={puzzle.id} puzzle={puzzle} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-12 md:py-16 bg-white">
        <div className="container-wide">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our wide selection of word search puzzle categories.
              Whether you love TV shows, science, or sports - we have puzzles for everyone!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Puzzles */}
      <section className="py-12 md:py-16">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              New Puzzles
            </h2>
            <Link
              href="/cat/general"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
            >
              View All
              <svg
                className="w-4 h-4 ml-1"
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
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPuzzles.map((puzzle) => (
              <PuzzleCard key={puzzle.id} puzzle={puzzle} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary-50">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Create Your Own Word Search
            </h2>
            <p className="text-gray-600 mb-8">
              Use our free word search maker to create custom puzzles with your own
              words. Perfect for teachers, party planners, or just for fun!
            </p>
            <Link href="/maker" className="btn-primary">
              Start Creating
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
