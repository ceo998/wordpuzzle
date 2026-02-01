import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components';
import { puzzles, getPuzzleById } from '@/data/puzzles';
import PuzzleGame from './PuzzleGame';

interface PuzzlePageProps {
  params: Promise<{ id: string; slug: string }>;
}

export async function generateStaticParams() {
  return puzzles.map((puzzle) => ({
    id: puzzle.id,
    slug: puzzle.slug,
  }));
}

export async function generateMetadata({
  params,
}: PuzzlePageProps): Promise<Metadata> {
  const { id } = await params;
  const puzzle = getPuzzleById(id);

  if (!puzzle) {
    return {
      title: 'Puzzle Not Found',
    };
  }

  return {
    title: `${puzzle.title} Word Search Puzzle - Play Free Online`,
    description: `Play the ${puzzle.title} word search puzzle online for free. Find ${puzzle.words.length} hidden words in this ${puzzle.difficulty} ${puzzle.gridSize}x${puzzle.gridSize} puzzle. ${puzzle.description || ''}`,
    alternates: {
      canonical: `/puzzle/${puzzle.id}/${puzzle.slug}`,
    },
    openGraph: {
      title: `${puzzle.title} Word Search Puzzle`,
      description: `Find ${puzzle.words.length} hidden words in this ${puzzle.difficulty} puzzle`,
      url: `/puzzle/${puzzle.id}/${puzzle.slug}`,
      type: 'article',
    },
  };
}

export default async function PuzzlePage({ params }: PuzzlePageProps) {
  const { id } = await params;
  const puzzle = getPuzzleById(id);

  if (!puzzle) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: `${puzzle.title} Word Search`,
    description: puzzle.description || `Find ${puzzle.words.length} hidden words`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://wordpuzzle.com'}/puzzle/${puzzle.id}/${puzzle.slug}`,
    genre: 'Word Puzzle',
    gamePlatform: ['Web Browser'],
    numberOfPlayers: {
      '@type': 'QuantitativeValue',
      minValue: 1,
      maxValue: 1,
    },
    applicationCategory: 'Game',
    isAccessibleForFree: true,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-wide py-8">
        <Breadcrumb
          items={[
            { label: puzzle.categoryName, href: `/cat/${puzzle.categorySlug}` },
            { label: puzzle.title },
          ]}
        />

        <PuzzleGame puzzle={puzzle} />
      </div>
    </>
  );
}
