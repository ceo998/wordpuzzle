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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white py-20 md:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-2xl rotate-12 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent-500/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-xl -rotate-12 animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="container-wide relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              100% Free • No Sign-up Required
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
              Word Search Puzzles
              <span className="block mt-2 bg-gradient-to-r from-white via-accent-200 to-white bg-clip-text text-transparent">
                Made Fun & Easy
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto text-balance">
              Discover thousands of free word search puzzles. Perfect for all ages –
              from kids to adults. Play online or print for offline fun!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#categories"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-xl shadow-black/20 hover:shadow-2xl hover:-translate-y-1"
              >
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Browse Puzzles
              </Link>
              <Link
                href="/maker"
                className="group inline-flex items-center justify-center px-8 py-4 font-semibold rounded-2xl border-2 border-white/30 text-white hover:bg-white hover:text-primary-700 transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Your Own
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">1000+</div>
                <div className="text-white/60 text-sm mt-1">Puzzles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">25+</div>
                <div className="text-white/60 text-sm mt-1">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">Free</div>
                <div className="text-white/60 text-sm mt-1">Forever</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white relative" aria-labelledby="features-heading">
        <div className="container-wide">
          <h2 id="features-heading" className="sr-only">Why Choose WordPuzzle</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-primary-50 to-white border border-primary-100 hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 text-white"
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Free</h3>
              <p className="text-gray-600 leading-relaxed">
                All puzzles are completely free to play and print. No hidden fees, no sign-up required.
              </p>
            </div>

            <div className="group p-8 rounded-3xl bg-gradient-to-br from-accent-50 to-white border border-accent-100 hover:shadow-xl hover:shadow-accent-100/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-accent-500/30 group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 text-white"
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">Play Anywhere</h3>
              <p className="text-gray-600 leading-relaxed">
                Works beautifully on desktop, tablet, and mobile. Play online or print for offline enjoyment.
              </p>
            </div>

            <div className="group p-8 rounded-3xl bg-gradient-to-br from-green-50 to-white border border-green-100 hover:shadow-xl hover:shadow-green-100/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 text-white"
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">Educational</h3>
              <p className="text-gray-600 leading-relaxed">
                Perfect for teachers and parents. Improve vocabulary, spelling, and cognitive skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Puzzles */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Most Popular</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Trending Puzzles
              </h2>
            </div>
            <Link
              href="/cat/general"
              className="group inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
            >
              View All Puzzles
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPuzzles.map((puzzle, index) => (
              <div key={puzzle.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <PuzzleCard puzzle={puzzle} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-20 bg-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Explore</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Browse by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Choose from our wide selection of puzzle categories. From TV shows to science – we have something for everyone!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={category.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Puzzles */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider">Fresh Content</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                New Puzzles
              </h2>
            </div>
            <Link
              href="/cat/general"
              className="group inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
            >
              View All
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPuzzles.map((puzzle, index) => (
              <div key={puzzle.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <PuzzleCard puzzle={puzzle} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600"></div>
        <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-accent-500/10 rounded-full blur-3xl"></div>

        <div className="container-wide relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick & Easy
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Create Your Own
              <span className="block text-white/80">Word Search Puzzle</span>
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Use our free word search maker to create custom puzzles with your own words. Perfect for teachers, party planners, or just for fun!
            </p>
            <Link
              href="/maker"
              className="group inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-xl shadow-black/20 hover:shadow-2xl hover:-translate-y-1"
            >
              Start Creating
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
