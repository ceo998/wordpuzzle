import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components';
import { categories } from '@/data/categories';
import { puzzles } from '@/data/puzzles';

export const metadata: Metadata = {
  title: 'Sitemap - All Pages',
  description: 'Complete sitemap of WordPuzzle. Browse all word search puzzles, categories, and pages.',
  alternates: {
    canonical: '/sitemap',
  },
};

export default function SitemapPage() {
  return (
    <div className="container-wide py-8">
      <Breadcrumb items={[{ label: 'Sitemap' }]} />

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
        Sitemap
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Main Pages */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
            Main Pages
          </h2>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-primary-600 hover:text-primary-700">
                Home
              </Link>
            </li>
            <li>
              <Link href="/maker" className="text-primary-600 hover:text-primary-700">
                Word Search Maker
              </Link>
            </li>
            <li>
              <Link href="/printable" className="text-primary-600 hover:text-primary-700">
                Printable Puzzles
              </Link>
            </li>
            <li>
              <Link href="/hangman" className="text-primary-600 hover:text-primary-700">
                Hangman Game
              </Link>
            </li>
            <li>
              <Link href="/search" className="text-primary-600 hover:text-primary-700">
                Search
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-primary-600 hover:text-primary-700">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-primary-600 hover:text-primary-700">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
            Categories ({categories.length})
          </h2>
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/cat/${category.slug}`}
                  className="text-primary-600 hover:text-primary-700"
                >
                  {category.name}
                </Link>
                <span className="text-gray-400 text-sm ml-2">
                  ({category.puzzleCount})
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Puzzles */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
            Puzzles ({puzzles.length})
          </h2>
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {puzzles.map((puzzle) => (
              <li key={puzzle.id}>
                <Link
                  href={`/puzzle/${puzzle.id}/${puzzle.slug}`}
                  className="text-primary-600 hover:text-primary-700"
                >
                  {puzzle.title}
                </Link>
                <span className="text-gray-400 text-sm ml-2">
                  ({puzzle.categoryName})
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
