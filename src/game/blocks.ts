// Block shapes defined as arrays of [row, col] offsets from the origin (top-left of bounding box)
export type Shape = [number, number][];

export interface Block {
  id: number;
  shape: Shape;
  color: string;
}

export const BLOCK_COLORS = [
  '#ff6b6b', // red
  '#ffd93d', // yellow
  '#6bcb77', // green
  '#4d96ff', // blue
  '#ff922b', // orange
  '#cc5de8', // purple
  '#20c997', // teal
  '#f06595', // pink
];

const SHAPES: Shape[] = [
  // 1x1
  [[0,0]],
  // 1x2
  [[0,0],[0,1]],
  // 2x1
  [[0,0],[1,0]],
  // 1x3
  [[0,0],[0,1],[0,2]],
  // 3x1
  [[0,0],[1,0],[2,0]],
  // 2x2 square
  [[0,0],[0,1],[1,0],[1,1]],
  // L shape
  [[0,0],[1,0],[2,0],[2,1]],
  // J shape
  [[0,1],[1,1],[2,0],[2,1]],
  // T shape
  [[0,0],[0,1],[0,2],[1,1]],
  // S shape
  [[0,1],[0,2],[1,0],[1,1]],
  // Z shape
  [[0,0],[0,1],[1,1],[1,2]],
  // 1x4
  [[0,0],[0,1],[0,2],[0,3]],
  // 4x1
  [[0,0],[1,0],[2,0],[3,0]],
  // 2x3
  [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2]],
  // corner L large
  [[0,0],[1,0],[2,0],[2,1],[2,2]],
];

let blockIdCounter = 0;

export function randomBlock(): Block {
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  const color = BLOCK_COLORS[Math.floor(Math.random() * BLOCK_COLORS.length)];
  return { id: ++blockIdCounter, shape, color };
}

export function blockWidth(shape: Shape): number {
  return Math.max(...shape.map(([, c]) => c)) + 1;
}

export function blockHeight(shape: Shape): number {
  return Math.max(...shape.map(([r]) => r)) + 1;
}
