'use client';

import { PuzzleGrid } from '@/types';

interface PrintPuzzleProps {
  title: string;
  grid: PuzzleGrid;
  words: string[];
  difficulty: string;
  showAnswers?: boolean;
}

export default function PrintPuzzle({
  title,
  grid,
  words,
  difficulty,
  showAnswers = false,
}: PrintPuzzleProps) {
  return (
    <div className="print-only hidden print:block p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-sm text-gray-600">
          Difficulty: {difficulty} | {words.length} words | {grid.grid.length}x
          {grid.grid.length} grid
        </p>
      </div>

      {/* Grid */}
      <div className="flex justify-center mb-8">
        <table className="border-collapse">
          <tbody>
            {grid.grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((letter, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className="w-6 h-6 text-center text-sm font-mono border border-gray-300"
                    style={{
                      backgroundColor: showAnswers
                        ? grid.wordPlacements.some((wp) => {
                            const cells = getWordCells(wp);
                            return cells.some(
                              (c) => c.row === rowIndex && c.col === colIndex
                            );
                          })
                          ? '#fef3c7'
                          : 'white'
                        : 'white',
                    }}
                  >
                    {letter}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Word List */}
      <div className="border-t pt-4">
        <h2 className="font-bold mb-3">Find these words:</h2>
        <div className="grid grid-cols-4 gap-2 text-sm">
          {words.map((word) => (
            <span key={word} className="font-mono">
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t text-center text-xs text-gray-500">
        <p>Created with WordPuzzle - wordpuzzle.com</p>
      </div>
    </div>
  );
}

// Helper to get word cells
function getWordCells(placement: {
  word: string;
  startRow: number;
  startCol: number;
  direction: string;
}): { row: number; col: number }[] {
  const cells: { row: number; col: number }[] = [];
  const directionDeltas: Record<string, { dr: number; dc: number }> = {
    horizontal: { dr: 0, dc: 1 },
    vertical: { dr: 1, dc: 0 },
    'diagonal-down': { dr: 1, dc: 1 },
    'diagonal-up': { dr: -1, dc: 1 },
    'horizontal-reverse': { dr: 0, dc: -1 },
    'vertical-reverse': { dr: -1, dc: 0 },
    'diagonal-down-reverse': { dr: -1, dc: -1 },
    'diagonal-up-reverse': { dr: 1, dc: -1 },
  };

  const { dr, dc } = directionDeltas[placement.direction] || { dr: 0, dc: 1 };

  for (let i = 0; i < placement.word.length; i++) {
    cells.push({
      row: placement.startRow + i * dr,
      col: placement.startCol + i * dc,
    });
  }

  return cells;
}
