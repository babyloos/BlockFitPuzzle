import { randomBlock } from './blocks';
import type { Block } from './blocks';

export const GRID_SIZE = 10;
export type Grid = (string | null)[][]; // stores color of placed block or null

export interface GameState {
  grid: Grid;
  score: number;
  pieces: [Block, Block, Block];
  isOver: boolean;
}

export function emptyGrid(): Grid {
  return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
}

export function newGame(): GameState {
  return {
    grid: emptyGrid(),
    score: 0,
    pieces: [randomBlock(), randomBlock(), randomBlock()],
    isOver: false,
  };
}

export function canPlace(grid: Grid, block: Block, row: number, col: number): boolean {
  for (const [dr, dc] of block.shape) {
    const r = row + dr;
    const c = col + dc;
    if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) return false;
    if (grid[r][c] !== null) return false;
  }
  return true;
}

export function placeBlock(
  state: GameState,
  pieceIndex: 0 | 1 | 2,
  row: number,
  col: number
): GameState {
  const block = state.pieces[pieceIndex];
  if (!canPlace(state.grid, block, row, col)) return state;

  // Place the block
  let grid = state.grid.map(r => [...r]);
  for (const [dr, dc] of block.shape) {
    grid[row + dr][col + dc] = block.color;
  }

  // Clear completed rows and columns
  let cleared = 0;
  const rowsToClear: number[] = [];
  const colsToClear: number[] = [];

  for (let r = 0; r < GRID_SIZE; r++) {
    if (grid[r].every(cell => cell !== null)) rowsToClear.push(r);
  }
  for (let c = 0; c < GRID_SIZE; c++) {
    if (grid.every(row => row[c] !== null)) colsToClear.push(c);
  }

  cleared = rowsToClear.length + colsToClear.length;
  for (const r of rowsToClear) {
    grid[r] = Array(GRID_SIZE).fill(null);
  }
  for (const c of colsToClear) {
    for (let r = 0; r < GRID_SIZE; r++) grid[r][c] = null;
  }

  // Scoring: cells placed + bonus for lines cleared
  const cellsPlaced = block.shape.length;
  const lineBonus = cleared * cleared * 50; // exponential bonus for multi-line clears
  const score = state.score + cellsPlaced * 10 + lineBonus;

  // Replace used piece with new random block
  const pieces = [...state.pieces] as [Block, Block, Block];
  pieces[pieceIndex] = randomBlock();

  // Check game over: if none of the 3 pieces can be placed anywhere
  const isOver = !pieces.some(p =>
    Array.from({ length: GRID_SIZE }, (_, r) =>
      Array.from({ length: GRID_SIZE }, (_, c) => canPlace(grid, p, r, c))
    ).flat().some(Boolean)
  );

  return { grid, score, pieces, isOver };
}
