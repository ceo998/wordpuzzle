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
        className="grid gap-1 bg-gray-300 p-2 rounded-xl shadow-inner"
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
                  'aspect-square flex items-center justify-center text-sm sm:text-base md:text-lg font-bold rounded-md transition-all duration-150 min-w-[28px] min-h-[28px] sm:min-w-[36px] sm:min-h-[36px] md:min-w-[44px] md:min-h-[44px]',
                  'bg-white text-gray-900 shadow-sm',
                  'hover:bg-gray-100',
                  // Selection highlighting - most prominent
                  selected && !found && 'bg-blue-500 text-white shadow-lg scale-105 ring-2 ring-blue-300',
                  // Found words - green background
                  found && 'bg-green-500 text-white shadow-md',
                  // Show answers - yellow highlight
                  showAnswers && answer && !found && !selected && 'bg-yellow-200 text-yellow-900'
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
        <div className="mt-3 text-center text-sm text-gray-600">
          Selected: <span className="font-bold text-blue-600">
            {selectedCells.map(cell => grid[cell.row][cell.col]).join('')}
          </span>
        </div>
      )}
    </div>
  );
}
