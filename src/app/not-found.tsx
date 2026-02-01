import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="container-wide py-16 md:py-24">
      <div className="max-w-md mx-auto text-center">
        <div className="text-8xl font-bold text-primary-600 mb-4">404</div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
          moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/search" className="btn-secondary">
            Search Puzzles
          </Link>
        </div>
      </div>
    </div>
  );
}
