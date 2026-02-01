import { Direction, PuzzleGrid, WordPlacement } from '@/types';

const DIRECTIONS: Direction[] = [
  'horizontal',
  'vertical',
  'diagonal-down',
  'diagonal-up',
  'horizontal-reverse',
  'vertical-reverse',
  'diagonal-down-reverse',
  'diagonal-up-reverse',
];

const EASY_DIRECTIONS: Direction[] = ['horizontal', 'vertical'];
const MEDIUM_DIRECTIONS: Direction[] = [
  'horizontal',
  'vertical',
  'horizontal-reverse',
  'vertical-reverse',
];

function getDirectionDelta(direction: Direction): { dr: number; dc: number } {
  const deltas: Record<Direction, { dr: number; dc: number }> = {
    horizontal: { dr: 0, dc: 1 },
    vertical: { dr: 1, dc: 0 },
    'diagonal-down': { dr: 1, dc: 1 },
    'diagonal-up': { dr: -1, dc: 1 },
    'horizontal-reverse': { dr: 0, dc: -1 },
    'vertical-reverse': { dr: -1, dc: 0 },
    'diagonal-down-reverse': { dr: -1, dc: -1 },
    'diagonal-up-reverse': { dr: 1, dc: -1 },
  };
  return deltas[direction];
}

function canPlaceWord(
  grid: string[][],
  word: string,
  startRow: number,
  startCol: number,
  direction: Direction
): boolean {
  const { dr, dc } = getDirectionDelta(direction);
  const gridSize = grid.length;

  for (let i = 0; i < word.length; i++) {
    const row = startRow + i * dr;
    const col = startCol + i * dc;

    if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) {
      return false;
    }

    const cell = grid[row][col];
    if (cell !== '' && cell !== word[i]) {
      return false;
    }
  }

  return true;
}

function placeWord(
  grid: string[][],
  word: string,
  startRow: number,
  startCol: number,
  direction: Direction
): void {
  const { dr, dc } = getDirectionDelta(direction);

  for (let i = 0; i < word.length; i++) {
    const row = startRow + i * dr;
    const col = startCol + i * dc;
    grid[row][col] = word[i];
  }
}

function getAvailableDirections(
  difficulty: 'easy' | 'medium' | 'hard',
  allowDiagonals: boolean,
  allowReverse: boolean
): Direction[] {
  let directions: Direction[];

  if (difficulty === 'easy') {
    directions = [...EASY_DIRECTIONS];
  } else if (difficulty === 'medium') {
    directions = [...MEDIUM_DIRECTIONS];
  } else {
    directions = [...DIRECTIONS];
  }

  if (!allowDiagonals) {
    directions = directions.filter(
      (d) => !d.includes('diagonal')
    );
  }

  if (!allowReverse) {
    directions = directions.filter(
      (d) => !d.includes('reverse')
    );
  }

  return directions;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generatePuzzleGrid(
  words: string[],
  gridSize: number,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium',
  allowDiagonals: boolean = true,
  allowReverse: boolean = true
): PuzzleGrid {
  // Initialize empty grid
  const grid: string[][] = Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill(''));

  const wordPlacements: WordPlacement[] = [];
  const availableDirections = getAvailableDirections(
    difficulty,
    allowDiagonals,
    allowReverse
  );

  // Sort words by length (longest first for better placement)
  const sortedWords = [...words]
    .map((w) => w.toUpperCase().replace(/[^A-Z]/g, ''))
    .filter((w) => w.length > 0 && w.length <= gridSize)
    .sort((a, b) => b.length - a.length);

  // Try to place each word
  for (const word of sortedWords) {
    let placed = false;
    const directions = shuffleArray(availableDirections);
    const maxAttempts = gridSize * gridSize * directions.length;
    let attempts = 0;

    while (!placed && attempts < maxAttempts) {
      const direction = directions[attempts % directions.length];
      const startRow = Math.floor(Math.random() * gridSize);
      const startCol = Math.floor(Math.random() * gridSize);

      if (canPlaceWord(grid, word, startRow, startCol, direction)) {
        placeWord(grid, word, startRow, startCol, direction);
        wordPlacements.push({
          word,
          startRow,
          startCol,
          direction,
          found: false,
        });
        placed = true;
      }

      attempts++;
    }
  }

  // Fill remaining cells with random letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row][col] === '') {
        grid[row][col] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return { grid, wordPlacements };
}

export function checkWord(
  grid: string[][],
  wordPlacements: WordPlacement[],
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number
): string | null {
  // Get the selected letters
  const rowDiff = endRow - startRow;
  const colDiff = endCol - startCol;
  const length = Math.max(Math.abs(rowDiff), Math.abs(colDiff)) + 1;

  const dr = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
  const dc = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);

  let selectedWord = '';
  for (let i = 0; i < length; i++) {
    const row = startRow + i * dr;
    const col = startCol + i * dc;
    if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
      selectedWord += grid[row][col];
    }
  }

  // Check if it matches any word (forward or backward)
  for (const placement of wordPlacements) {
    if (placement.found) continue;

    const reversedWord = selectedWord.split('').reverse().join('');
    if (selectedWord === placement.word || reversedWord === placement.word) {
      return placement.word;
    }
  }

  return null;
}

export function getWordCells(
  placement: WordPlacement
): { row: number; col: number }[] {
  const { dr, dc } = getDirectionDelta(placement.direction);
  const cells: { row: number; col: number }[] = [];

  for (let i = 0; i < placement.word.length; i++) {
    cells.push({
      row: placement.startRow + i * dr,
      col: placement.startCol + i * dc,
    });
  }

  return cells;
}
