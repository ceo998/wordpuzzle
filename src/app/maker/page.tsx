import { Metadata } from 'next';
import { Breadcrumb } from '@/components';
import PuzzleMaker from './PuzzleMaker';

export const metadata: Metadata = {
  title: 'Word Search Maker - Create Custom Puzzles Free',
  description:
    'Create your own custom word search puzzles for free. Perfect for teachers, parents, and party planners. Choose grid size, difficulty, and add your own words. Print or play online!',
  alternates: {
    canonical: '/maker',
  },
  openGraph: {
    title: 'Free Word Search Maker - Create Custom Puzzles',
    description:
      'Create custom word search puzzles with your own words. Free online tool for teachers and parents.',
    url: '/maker',
  },
};

export default function MakerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Word Search Maker',
    description: 'Create custom word search puzzles for free',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://wordpuzzle.com'}/maker`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Custom word input',
      'Multiple grid sizes',
      'Difficulty settings',
      'Print functionality',
      'Online play',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-wide py-8">
        <Breadcrumb items={[{ label: 'Word Search Maker' }]} />

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Word Search Maker
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Create your own custom word search puzzles for free! Add your own words,
            choose the difficulty level, and generate a unique puzzle. Perfect for
            teachers, parents, and party planners.
          </p>
        </div>

        <PuzzleMaker />
      </div>
    </>
  );
}
