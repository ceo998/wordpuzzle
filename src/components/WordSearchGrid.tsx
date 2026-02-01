'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { PuzzleGrid } from '@/types';
import { checkWord, getWordCells } from '@/lib/puzzle-generator';
import { cn } from '@/lib/utils';

interface WordSearchGridProps {
  puzzleGrid: PuzzleGrid;
  onWordFound: (word: string) => void;
  foundWords: string[];
  showAnswers?: boolean;
}

interface CellPosition {
  row: number;
  col: number;
}

export default function WordSearchGrid({
  puzzleGrid,
  onWordFound,
  foundWords,
  showAnswers = false,
}: WordSearchGridProps) {
  const { grid, wordPlacements } = puzzleGrid;
  const gridRef = useRef<HTMLDivElement>(null);

  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState<CellPosition | null>(null);
  const [endCell, setEndCell] = useState<CellPosition | null>(null);
  const [selectedCells, setSelectedCells] = useState<CellPosition[]>([]);
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());

  // Get cells for found words
  useEffect(() => {
    const cells = new Set<string>();
    wordPlacements.forEach((placement) => {
      if (foundWords.includes(placement.word)) {
        const wordCells = getWordCells(placement);
        wordCells.forEach((cell) => cells.add(`${cell.row}-${cell.col}`));
      }
    });
    setFoundCells(cells);
  }, [foundWords, wordPlacements]);

  // Calculate selected cells between start and end
  const calculateSelectedCells = useCallback(
    (start: CellPosition, end: CellPosition): CellPosition[] => {
      const cells: CellPosition[] = [];
      const rowDiff = end.row - start.row;
      const colDiff = end.col - start.col;

      // Only allow straight lines (horizontal, vertical, or 45-degree diagonal)
      const absRow = Math.abs(rowDiff);
      const absCol = Math.abs(colDiff);

      if (absRow !== 0 && absCol !== 0 && absRow !== absCol) {
        // Not a valid selection direction - return just the start cell
        return [start];
      }

      const length = Math.max(absRow, absCol) + 1;
      const dr = rowDiff === 0 ? 0 : rowDiff / absRow;
      const dc = colDiff === 0 ? 0 : colDiff / absCol;

      for (let i = 0; i < length; i++) {
        cells.push({
          row: start.row + i * dr,
          col: start.col + i * dc,
        });
      }

      return cells;
    },
    []
  );

  // Handle mouse/touch start
  const handleStart = useCallback((row: number, col: number, e?: React.MouseEvent | React.TouchEvent) => {
    e?.preventDefault();
    setIsSelecting(true);
    setStartCell({ row, col });
    setEndCell({ row, col });
    setSelectedCells([{ row, col }]);
  }, []);

  // Handle mouse/touch move
  const handleMove = useCallback(
    (row: number, col: number) => {
      if (!isSelecting || !startCell) return;

      setEndCell({ row, col });
      const newSelectedCells = calculateSelectedCells(startCell, { row, col });
      setSelectedCells(newSelectedCells);
    },
    [isSelecting, startCell, calculateSelectedCells]
  );

  // Handle mouse/touch end
  const handleEnd = useCallback(() => {
    if (!isSelecting || !startCell || !endCell) {
      setIsSelecting(false);
      setStartCell(null);
      setEndCell(null);
      setSelectedCells([]);
      return;
    }

    // Check if selection matches a word
    const foundWord = checkWord(
      grid,
      wordPlacements,
      startCell.row,
      startCell.col,
      endCell.row,
      endCell.col
    );

    if (foundWord && !foundWords.includes(foundWord)) {
      onWordFound(foundWord);
    }

    setIsSelecting(false);
    setStartCell(null);
    setEndCell(null);
    setSelectedCells([]);
  }, [isSelecting, startCell, endCell, grid, wordPlacements, foundWords, onWordFound]);

  // Handle touch events
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isSelecting || !gridRef.current) return;
      e.preventDefault();

      const touch = e.touches[0];
      const gridRect = gridRef.current.getBoundingClientRect();
      const cellSize = gridRect.width / grid.length;

      const col = Math.floor((touch.clientX - gridRect.left) / cellSize);
      const row = Math.floor((touch.clientY - gridRect.top) / cellSize);

      if (row >= 0 && row < grid.length && col >= 0 && col < grid.length) {
        handleMove(row, col);
      }
    },
    [isSelecting, grid.length, handleMove]
  );

  const isSelected = useCallback((row: number, col: number) =>
    selectedCells.some((cell) => cell.row === row && cell.col === col),
    [selectedCells]
  );

  const isFound = useCallback((row: number, col: number) =>
    foundCells.has(`${row}-${col}`),
    [foundCells]
  );

  const isAnswer = useCallback((row: number, col: number) => {
    if (!showAnswers) return false;
    return wordPlacements.some((placement) => {
      const cells = getWordCells(placement);
      return cells.some((cell) => cell.row === row && cell.col === col);
    });
  }, [showAnswers, wordPlacements]);

  return (
    <div
      ref={gridRef}
      className="select-none touch-none"
      onMouseLeave={handleEnd}
      onMouseUp={handleEnd}
      onTouchEnd={handleEnd}
      onTouchMove={handleTouchMove}
    >
      <div
        className="grid gap-1.5 bg-gradient-to-br from-primary-100 via-white to-accent-100 p-3 sm:p-4 rounded-2xl shadow-inner"
        style={{
          gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((letter, colIndex) => {
            const selected = isSelected(rowIndex, colIndex);
            const found = isFound(rowIndex, colIndex);
            const answer = isAnswer(rowIndex, colIndex);

            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={cn(
                  'aspect-square flex items-center justify-center text-sm sm:text-base md:text-lg font-bold rounded-xl transition-all duration-200 min-w-[28px] min-h-[28px] sm:min-w-[36px] sm:min-h-[36px] md:min-w-[44px] md:min-h-[44px]',
                  'bg-white text-gray-800 shadow-sm border border-gray-100',
                  'hover:bg-primary-50 hover:border-primary-200 hover:scale-105',
                  // Selection highlighting - most prominent with gradient
                  selected && !found && 'bg-gradient-to-br from-blue-500 to-primary-600 text-white shadow-xl scale-110 ring-2 ring-blue-300 ring-offset-1 border-transparent',
                  // Found words - green gradient background
                  found && 'bg-gradient-to-br from-emerald-400 to-green-500 text-white shadow-lg border-transparent',
                  // Show answers - accent highlight
                  showAnswers && answer && !found && !selected && 'bg-gradient-to-br from-amber-100 to-yellow-200 text-amber-900 border-amber-200'
                )}
                onMouseDown={(e) => handleStart(rowIndex, colIndex, e)}
                onMouseEnter={() => handleMove(rowIndex, colIndex)}
                onTouchStart={(e) => handleStart(rowIndex, colIndex, e)}
                aria-label={`Letter ${letter} at row ${rowIndex + 1}, column ${colIndex + 1}${selected ? ', selected' : ''}${found ? ', found' : ''}`}
              >
                {letter}
              </button>
            );
          })
        )}
      </div>

      {/* Selection indicator */}
      {isSelecting && selectedCells.length > 0 && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-primary-600 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span className="font-bold tracking-wider">
              {selectedCells.map(cell => grid[cell.row][cell.col]).join('')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
