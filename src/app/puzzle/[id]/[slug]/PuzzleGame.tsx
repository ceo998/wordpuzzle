'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Puzzle, PuzzleGrid } from '@/types';
import { generatePuzzleGrid } from '@/lib/puzzle-generator';
import { WordSearchGrid, WordList, Timer } from '@/components';
import { formatTime } from '@/lib/utils';

interface PuzzleGameProps {
  puzzle: Puzzle;
}

export default function PuzzleGame({ puzzle }: PuzzleGameProps) {
  const [puzzleGrid, setPuzzleGrid] = useState<PuzzleGrid | null>(null);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Generate puzzle grid on mount
  useEffect(() => {
    const allowDiagonals = puzzle.difficulty !== 'easy';
    const allowReverse = puzzle.difficulty === 'hard';

    const grid = generatePuzzleGrid(
      puzzle.words,
      puzzle.gridSize,
      puzzle.difficulty,
      allowDiagonals,
      allowReverse
    );
    setPuzzleGrid(grid);
  }, [puzzle]);

  // Check for completion
  useEffect(() => {
    if (puzzleGrid && foundWords.length === puzzleGrid.wordPlacements.length) {
      setIsComplete(true);
      setFinalTime(currentTime);
    }
  }, [foundWords.length, puzzleGrid, currentTime]);

  const handleWordFound = useCallback((word: string) => {
    setFoundWords((prev) => {
      if (prev.includes(word)) return prev;
      return [...prev, word];
    });
  }, []);

  const handleTimeUpdate = useCallback((seconds: number) => {
    setCurrentTime(seconds);
  }, []);

  const handleReset = useCallback(() => {
    const allowDiagonals = puzzle.difficulty !== 'easy';
    const allowReverse = puzzle.difficulty === 'hard';

    const grid = generatePuzzleGrid(
      puzzle.words,
      puzzle.gridSize,
      puzzle.difficulty,
      allowDiagonals,
      allowReverse
    );
    setPuzzleGrid(grid);
    setFoundWords([]);
    setIsComplete(false);
    setShowAnswers(false);
    setFinalTime(0);
    setCurrentTime(0);
  }, [puzzle]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };

  const words = useMemo(() => {
    return puzzleGrid?.wordPlacements.map((p) => p.word) || puzzle.words.map((w) => w.toUpperCase());
  }, [puzzleGrid, puzzle.words]);

  if (!puzzleGrid) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Puzzle Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {puzzle.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span
                className={`px-3 py-1 rounded-full font-medium ${
                  difficultyColors[puzzle.difficulty]
                }`}
              >
                {puzzle.difficulty.charAt(0).toUpperCase() + puzzle.difficulty.slice(1)}
              </span>
              <span className="text-gray-500">
                {puzzle.gridSize}x{puzzle.gridSize} grid
              </span>
              <span className="text-gray-500">{words.length} words</span>
              <Link
                href={`/cat/${puzzle.categorySlug}`}
                className="text-primary-600 hover:text-primary-700"
              >
                {puzzle.categoryName}
              </Link>
            </div>
          </div>
          <Timer
            isRunning={!isComplete}
            onTimeUpdate={handleTimeUpdate}
          />
        </div>
        {puzzle.description && (
          <p className="text-gray-600">{puzzle.description}</p>
        )}
      </div>

      {/* Completion Modal */}
      {isComplete && (
        <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-xl text-center">
          <div className="text-4xl mb-3">🎉</div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            Congratulations!
          </h2>
          <p className="text-green-700 mb-4">
            You found all {words.length} words in {formatTime(finalTime)}!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={handleReset} className="btn-primary">
              Play Again
            </button>
            <Link href={`/cat/${puzzle.categorySlug}`} className="btn-secondary">
              More Puzzles
            </Link>
          </div>
        </div>
      )}

      {/* Game Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Puzzle Grid */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
            <WordSearchGrid
              puzzleGrid={puzzleGrid}
              onWordFound={handleWordFound}
              foundWords={foundWords}
              showAnswers={showAnswers}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Word List */}
          <WordList words={words} foundWords={foundWords} />

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 space-y-3">
            <h3 className="font-semibold text-gray-900 mb-3">Actions</h3>
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="w-full btn-secondary text-sm"
            >
              {showAnswers ? 'Hide Answers' : 'Show Answers'}
            </button>
            <button
              onClick={handleReset}
              className="w-full btn-secondary text-sm"
            >
              Reset Puzzle
            </button>
            <button
              onClick={handlePrint}
              className="w-full btn-secondary text-sm no-print"
            >
              <svg
                className="w-4 h-4 mr-2 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print Puzzle
            </button>
          </div>

          {/* Tips */}
          <div className="bg-primary-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">How to Play</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Click and drag to select letters</li>
              <li>• Words can be horizontal, vertical, or diagonal</li>
              {puzzle.difficulty === 'hard' && (
                <li>• Words may be spelled backwards</li>
              )}
              <li>• Found words will be highlighted in green</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Print Section */}
      <div className="hidden print:block mt-8">
        <h2 className="text-xl font-bold mb-4">Word List:</h2>
        <div className="grid grid-cols-4 gap-2">
          {words.map((word) => (
            <span key={word} className="text-sm">
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
