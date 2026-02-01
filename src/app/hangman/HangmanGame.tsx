'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';

const WORD_LISTS = {
  animals: ['ELEPHANT', 'GIRAFFE', 'PENGUIN', 'DOLPHIN', 'KANGAROO', 'BUTTERFLY', 'CROCODILE', 'SQUIRREL'],
  countries: ['AUSTRALIA', 'BRAZIL', 'CANADA', 'GERMANY', 'JAPAN', 'MEXICO', 'SPAIN', 'THAILAND'],
  fruits: ['STRAWBERRY', 'PINEAPPLE', 'WATERMELON', 'BLUEBERRY', 'RASPBERRY', 'GRAPEFRUIT', 'TANGERINE'],
  sports: ['BASKETBALL', 'FOOTBALL', 'SWIMMING', 'VOLLEYBALL', 'GYMNASTICS', 'SKATEBOARD', 'SNOWBOARD'],
  movies: ['AVENGERS', 'FROZEN', 'SPIDERMAN', 'TITANIC', 'INCEPTION', 'GLADIATOR', 'AVATAR'],
};

type Category = keyof typeof WORD_LISTS;

const MAX_WRONG = 6;

export default function HangmanGame() {
  const [category, setCategory] = useState<Category>('animals');
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const startNewGame = useCallback((cat: Category = category) => {
    const words = WORD_LISTS[cat];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameStatus('playing');
  }, [category]);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const handleGuess = useCallback((letter: string) => {
    if (gameStatus !== 'playing' || guessedLetters.has(letter)) return;

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    if (!word.includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);
      if (newWrongGuesses >= MAX_WRONG) {
        setGameStatus('lost');
      }
    } else {
      // Check if won
      const isWon = word.split('').every((l) => newGuessedLetters.has(l));
      if (isWon) {
        setGameStatus('won');
      }
    }
  }, [gameStatus, guessedLetters, word, wrongGuesses]);

  const handleCategoryChange = useCallback((cat: Category) => {
    setCategory(cat);
    startNewGame(cat);
  }, [startNewGame]);

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const letter = e.key.toUpperCase();
      if (/^[A-Z]$/.test(letter)) {
        handleGuess(letter);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [handleGuess]);

  const displayWord = word
    .split('')
    .map((letter) => (guessedLetters.has(letter) ? letter : '_'))
    .join(' ');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Category Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(WORD_LISTS) as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                category === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Hangman Drawing */}
      <div className="flex justify-center mb-6">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="stroke-gray-800"
          strokeWidth="3"
          fill="none"
        >
          {/* Base */}
          <line x1="20" y1="180" x2="100" y2="180" />
          {/* Pole */}
          <line x1="60" y1="180" x2="60" y2="20" />
          {/* Top */}
          <line x1="60" y1="20" x2="140" y2="20" />
          {/* Rope */}
          <line x1="140" y1="20" x2="140" y2="40" />

          {/* Head */}
          {wrongGuesses >= 1 && (
            <circle cx="140" cy="55" r="15" />
          )}
          {/* Body */}
          {wrongGuesses >= 2 && (
            <line x1="140" y1="70" x2="140" y2="120" />
          )}
          {/* Left Arm */}
          {wrongGuesses >= 3 && (
            <line x1="140" y1="80" x2="115" y2="100" />
          )}
          {/* Right Arm */}
          {wrongGuesses >= 4 && (
            <line x1="140" y1="80" x2="165" y2="100" />
          )}
          {/* Left Leg */}
          {wrongGuesses >= 5 && (
            <line x1="140" y1="120" x2="115" y2="155" />
          )}
          {/* Right Leg */}
          {wrongGuesses >= 6 && (
            <line x1="140" y1="120" x2="165" y2="155" />
          )}
        </svg>
      </div>

      {/* Word Display */}
      <div className="text-center mb-6">
        <div className="text-3xl md:text-4xl font-mono font-bold tracking-widest text-gray-900 mb-2">
          {displayWord}
        </div>
        <div className="text-sm text-gray-500">
          {MAX_WRONG - wrongGuesses} guesses remaining
        </div>
      </div>

      {/* Game Status */}
      {gameStatus !== 'playing' && (
        <div
          className={`text-center p-4 rounded-lg mb-6 ${
            gameStatus === 'won'
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}
        >
          <div className="text-2xl mb-2">
            {gameStatus === 'won' ? '🎉' : '😢'}
          </div>
          <h3
            className={`text-lg font-bold ${
              gameStatus === 'won' ? 'text-green-800' : 'text-red-800'
            }`}
          >
            {gameStatus === 'won' ? 'You Won!' : 'Game Over'}
          </h3>
          {gameStatus === 'lost' && (
            <p className="text-red-700 mt-1">
              The word was: <strong>{word}</strong>
            </p>
          )}
          <button
            onClick={() => startNewGame()}
            className="mt-4 btn-primary"
          >
            Play Again
          </button>
        </div>
      )}

      {/* Keyboard */}
      {gameStatus === 'playing' && (
        <div className="flex flex-wrap justify-center gap-2">
          {alphabet.map((letter) => {
            const isGuessed = guessedLetters.has(letter);
            const isCorrect = isGuessed && word.includes(letter);
            const isWrong = isGuessed && !word.includes(letter);

            return (
              <button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={isGuessed}
                className={`w-10 h-10 rounded-lg font-bold transition-colors ${
                  isCorrect
                    ? 'bg-green-500 text-white cursor-not-allowed'
                    : isWrong
                    ? 'bg-red-500 text-white cursor-not-allowed'
                    : 'bg-gray-100 text-gray-900 hover:bg-primary-100 hover:text-primary-700'
                }`}
                aria-label={`Guess letter ${letter}`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-2">How to Play</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Click letters or use your keyboard to guess</li>
          <li>• Correct letters will be revealed in the word</li>
          <li>• Wrong guesses add body parts to the hangman</li>
          <li>• Guess the word before the drawing is complete!</li>
        </ul>
      </div>

      {/* Related Link */}
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Try our Word Search Puzzles →
        </Link>
      </div>
    </div>
  );
}
