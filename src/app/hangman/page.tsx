import { Metadata } from 'next';
import { Breadcrumb } from '@/components';
import HangmanGame from './HangmanGame';

export const metadata: Metadata = {
  title: 'Play Hangman Online - Free Word Guessing Game',
  description:
    'Play the classic hangman word guessing game online for free. Choose from multiple categories and difficulty levels. Perfect for learning vocabulary and spelling.',
  alternates: {
    canonical: '/hangman',
  },
  openGraph: {
    title: 'Free Online Hangman Game',
    description:
      'Play the classic hangman game online. Guess the word before the man hangs!',
    url: '/hangman',
  },
};

export default function HangmanPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: 'Hangman',
    description: 'Classic word guessing game',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://wordpuzzle.com'}/hangman`,
    genre: 'Word Game',
    gamePlatform: ['Web Browser'],
    numberOfPlayers: {
      '@type': 'QuantitativeValue',
      minValue: 1,
      maxValue: 1,
    },
    isAccessibleForFree: true,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-wide py-8">
        <Breadcrumb items={[{ label: 'Hangman' }]} />

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Play Hangman
            </h1>
            <p className="text-gray-600">
              Guess the hidden word one letter at a time. You have 6 chances
              before the game is over!
            </p>
          </div>

          <HangmanGame />
        </div>
      </div>
    </>
  );
}
