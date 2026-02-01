'use client';

import { useState, useCallback, useMemo } from 'react';
import { PuzzleGrid } from '@/types';
import { generatePuzzleGrid } from '@/lib/puzzle-generator';
import { WordSearchGrid, WordList } from '@/components';

interface MakerConfig {
  title: string;
  words: string;
  gridSize: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function PuzzleMaker() {
  const [config, setConfig] = useState<MakerConfig>({
    title: 'My Word Search',
    words: '',
    gridSize: 15,
    difficulty: 'medium',
  });
  const [puzzleGrid, setPuzzleGrid] = useState<PuzzleGrid | null>(null);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const wordList = useMemo(() => {
    return config.words
      .split(/[\n,]+/)
      .map((w) => w.trim().toUpperCase())
      .filter((w) => w.length > 0 && w.length <= config.gridSize);
  }, [config.words, config.gridSize]);

  const handleGenerate = useCallback(() => {
    setError(null);

    if (wordList.length === 0) {
      setError('Please add at least one word');
      return;
    }

    if (wordList.length > 30) {
      setError('Maximum 30 words allowed');
      return;
    }

    const invalidWords = wordList.filter((w) => !/^[A-Z]+$/.test(w));
    if (invalidWords.length > 0) {
      setError('Words can only contain letters (A-Z)');
      return;
    }

    const longWords = wordList.filter((w) => w.length > config.gridSize);
    if (longWords.length > 0) {
      setError(
        `Some words are longer than the grid size (${config.gridSize}). Please increase grid size or shorten words.`
      );
      return;
    }

    const allowDiagonals = config.difficulty !== 'easy';
    const allowReverse = config.difficulty === 'hard';

    const grid = generatePuzzleGrid(
      wordList,
      config.gridSize,
      config.difficulty,
      allowDiagonals,
      allowReverse
    );

    setPuzzleGrid(grid);
    setFoundWords([]);
  }, [wordList, config.gridSize, config.difficulty]);

  const handleWordFound = useCallback((word: string) => {
    setFoundWords((prev) => {
      if (prev.includes(word)) return prev;
      return [...prev, word];
    });
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleReset = useCallback(() => {
    setPuzzleGrid(null);
    setFoundWords([]);
    setError(null);
  }, []);

  const words = useMemo(() => {
    return puzzleGrid?.wordPlacements.map((p) => p.word) || [];
  }, [puzzleGrid]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Configuration Panel */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Puzzle Settings
          </h2>

          {/* Title */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Puzzle Title
            </label>
            <input
              type="text"
              id="title"
              value={config.title}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter puzzle title"
            />
          </div>

          {/* Words */}
          <div className="mb-4">
            <label
              htmlFor="words"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Words (one per line or comma-separated)
            </label>
            <textarea
              id="words"
              value={config.words}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, words: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={8}
              placeholder="WORD1&#10;WORD2&#10;WORD3&#10;or&#10;WORD1, WORD2, WORD3"
            />
            <p className="text-sm text-gray-500 mt-1">
              {wordList.length} word{wordList.length !== 1 ? 's' : ''} added
              (max 30)
            </p>
          </div>

          {/* Grid Size */}
          <div className="mb-4">
            <label
              htmlFor="gridSize"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Grid Size: {config.gridSize}x{config.gridSize}
            </label>
            <input
              type="range"
              id="gridSize"
              min="10"
              max="20"
              value={config.gridSize}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  gridSize: parseInt(e.target.value, 10),
                }))
              }
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>10x10</span>
              <span>20x20</span>
            </div>
          </div>

          {/* Difficulty */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() =>
                    setConfig((prev) => ({ ...prev, difficulty: level }))
                  }
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    config.difficulty === level
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {config.difficulty === 'easy' && 'Horizontal and vertical only'}
              {config.difficulty === 'medium' &&
                'Includes diagonal directions'}
              {config.difficulty === 'hard' &&
                'Includes diagonals and reverse words'}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={handleGenerate} className="btn-primary flex-1">
              Generate Puzzle
            </button>
            {puzzleGrid && (
              <button onClick={handleReset} className="btn-secondary">
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-primary-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Tips</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Use words with 3-15 letters for best results</li>
            <li>• Longer words work better with larger grid sizes</li>
            <li>• Easy mode is great for younger children</li>
            <li>• Hard mode includes backwards words for a challenge</li>
            <li>• Print your puzzle to share with others</li>
          </ul>
        </div>
      </div>

      {/* Preview Panel */}
      <div>
        {puzzleGrid ? (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {config.title}
                </h2>
                <button
                  onClick={handlePrint}
                  className="btn-secondary text-sm no-print"
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
                  Print
                </button>
              </div>
              <WordSearchGrid
                puzzleGrid={puzzleGrid}
                onWordFound={handleWordFound}
                foundWords={foundWords}
              />
            </div>

            <WordList words={words} foundWords={foundWords} />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Puzzle Yet
            </h3>
            <p className="text-gray-600">
              Add your words and click &quot;Generate Puzzle&quot; to create your word
              search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
