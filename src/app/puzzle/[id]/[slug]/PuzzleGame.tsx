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

  const difficultyConfig = {
    easy: {
      bg: 'bg-gradient-to-r from-emerald-500 to-green-500',
      text: 'text-white',
      shadow: 'shadow-emerald-500/25',
    },
    medium: {
      bg: 'bg-gradient-to-r from-amber-500 to-orange-500',
      text: 'text-white',
      shadow: 'shadow-amber-500/25',
    },
    hard: {
      bg: 'bg-gradient-to-r from-rose-500 to-red-500',
      text: 'text-white',
      shadow: 'shadow-rose-500/25',
    },
  };

  const config = difficultyConfig[puzzle.difficulty];

  const words = useMemo(() => {
    return puzzleGrid?.wordPlacements.map((p) => p.word) || puzzle.words.map((w) => w.toUpperCase());
  }, [puzzleGrid, puzzle.words]);

  if (!puzzleGrid) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-200 rounded-full animate-spin border-t-primary-600" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping opacity-20 border-t-primary-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Puzzle Header */}
      <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 p-6 shadow-lg">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-primary-800 to-gray-900 bg-clip-text text-transparent mb-3">
              {puzzle.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span
                className={`px-4 py-1.5 rounded-full font-bold ${config.bg} ${config.text} shadow-lg ${config.shadow} capitalize`}
              >
                {puzzle.difficulty}
              </span>
              <span className="flex items-center gap-1.5 text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                </svg>
                {puzzle.gridSize}×{puzzle.gridSize}
              </span>
              <span className="flex items-center gap-1.5 text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                {words.length} words
              </span>
              <Link
                href={`/cat/${puzzle.categorySlug}`}
                className="flex items-center gap-1.5 text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-full transition-colors"
              >
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
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
          <p className="text-gray-600 bg-gray-50 rounded-xl p-3">{puzzle.description}</p>
        )}
      </div>

      {/* Completion Modal */}
      {isComplete && (
        <div className="mb-8 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />

          <div className="relative p-8 bg-gradient-to-br from-emerald-50 via-white to-green-50 border border-green-200 rounded-2xl text-center shadow-xl shadow-green-500/10">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-3">
              Congratulations!
            </h2>
            <p className="text-green-700 text-lg mb-6">
              You found all <span className="font-bold">{words.length}</span> words in{' '}
              <span className="font-bold">{formatTime(finalTime)}</span>!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={handleReset} className="btn-primary">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Play Again
              </button>
              <Link href={`/cat/${puzzle.categorySlug}`} className="btn-secondary">
                More Puzzles
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Game Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Puzzle Grid */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/50 p-4 md:p-6">
            <WordSearchGrid
              puzzleGrid={puzzleGrid}
              onWordFound={handleWordFound}
              foundWords={foundWords}
              showAnswers={showAnswers}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Word List */}
          <WordList words={words} foundWords={foundWords} />

          {/* Actions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-5">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => setShowAnswers(!showAnswers)}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  showAnswers
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {showAnswers ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  )}
                </svg>
                {showAnswers ? 'Hide Answers' : 'Show Answers'}
              </button>
              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Puzzle
              </button>
              <button
                onClick={handlePrint}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 no-print"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Puzzle
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-primary-50 via-white to-accent-50 rounded-2xl p-5 border border-primary-100/50">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/25">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              How to Play
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-xs shrink-0 mt-0.5">1</span>
                Click and drag to select letters
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-xs shrink-0 mt-0.5">2</span>
                Words can be horizontal, vertical, or diagonal
              </li>
              {puzzle.difficulty === 'hard' && (
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold text-xs shrink-0 mt-0.5">!</span>
                  Words may be spelled backwards
                </li>
              )}
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xs shrink-0 mt-0.5">✓</span>
                Found words will be highlighted in green
              </li>
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
