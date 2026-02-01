export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  puzzleCount: number;
  icon?: string;
}

export interface Puzzle {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  words: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  gridSize: number;
  description?: string;
  createdAt: string;
  plays?: number;
}

export interface PuzzleGrid {
  grid: string[][];
  wordPlacements: WordPlacement[];
}

export interface WordPlacement {
  word: string;
  startRow: number;
  startCol: number;
  direction: Direction;
  found?: boolean;
}

export type Direction =
  | 'horizontal'
  | 'vertical'
  | 'diagonal-down'
  | 'diagonal-up'
  | 'horizontal-reverse'
  | 'vertical-reverse'
  | 'diagonal-down-reverse'
  | 'diagonal-up-reverse';

export interface Cell {
  row: number;
  col: number;
  letter: string;
  isSelected?: boolean;
  isFound?: boolean;
  isHighlighted?: boolean;
}

export interface Selection {
  startCell: { row: number; col: number } | null;
  endCell: { row: number; col: number } | null;
  cells: { row: number; col: number }[];
}

export interface GameState {
  puzzle: Puzzle;
  grid: PuzzleGrid;
  foundWords: string[];
  timer: number;
  isComplete: boolean;
  selection: Selection;
}

export interface MakerConfig {
  title: string;
  words: string[];
  gridSize: number;
  difficulty: 'easy' | 'medium' | 'hard';
  allowDiagonals: boolean;
  allowReverse: boolean;
}
