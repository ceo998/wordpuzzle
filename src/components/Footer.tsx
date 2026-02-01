import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-300 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-shadow">
                  <span className="text-white font-bold text-2xl">W</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity -z-10" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                WordPuzzle
              </span>
            </Link>
            <p className="text-gray-400 max-w-md mb-6 leading-relaxed">
              Free online word search puzzles for all ages. Play instantly or print
              for offline fun. Perfect for education, entertainment, and brain
              training.
            </p>
            {/* Social icons */}
            <div className="flex space-x-3">
              {[
                { name: 'Twitter', icon: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' },
                { name: 'Facebook', icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 bg-white/5 hover:bg-gradient-to-br hover:from-primary-500 hover:to-accent-500 rounded-xl flex items-center justify-center transition-all duration-300 group/social"
                  aria-label={social.name}
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover/social:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'All Puzzles', href: '/' },
                { name: 'Create Puzzle', href: '/maker' },
                { name: 'Printable Puzzles', href: '/printable' },
                { name: 'Play Hangman', href: '/hangman' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group/link"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover/link:bg-primary-500 group-hover/link:w-2 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full" />
              Popular Categories
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Television Shows', href: '/cat/television-shows' },
                { name: 'Movies', href: '/cat/movies' },
                { name: 'Kids Puzzles', href: '/cat/kids-puzzles' },
                { name: 'Science', href: '/cat/science' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group/link"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover/link:bg-accent-500 group-hover/link:w-2 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} WordPuzzle. Made with{' '}
              <span className="text-red-500 animate-pulse">♥</span> for puzzle lovers.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Use', href: '/terms' },
                { name: 'Sitemap', href: '/sitemap' },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
