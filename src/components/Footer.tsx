import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">W</span>
              </div>
              <span className="text-xl font-bold text-white">WordPuzzle</span>
            </Link>
            <p className="text-gray-400 max-w-md">
              Free online word search puzzles for all ages. Play instantly or print
              for offline fun. Perfect for education, entertainment, and brain
              training.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  All Puzzles
                </Link>
              </li>
              <li>
                <Link href="/maker" className="hover:text-white transition-colors">
                  Create Puzzle
                </Link>
              </li>
              <li>
                <Link
                  href="/printable"
                  className="hover:text-white transition-colors"
                >
                  Printable Puzzles
                </Link>
              </li>
              <li>
                <Link href="/hangman" className="hover:text-white transition-colors">
                  Play Hangman
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/cat/television-shows"
                  className="hover:text-white transition-colors"
                >
                  Television Shows
                </Link>
              </li>
              <li>
                <Link
                  href="/cat/movies"
                  className="hover:text-white transition-colors"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  href="/cat/kids-puzzles"
                  className="hover:text-white transition-colors"
                >
                  Kids Puzzles
                </Link>
              </li>
              <li>
                <Link
                  href="/cat/science"
                  className="hover:text-white transition-colors"
                >
                  Science
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} WordPuzzle. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm hover:text-white transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              href="/sitemap"
              className="text-sm hover:text-white transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
