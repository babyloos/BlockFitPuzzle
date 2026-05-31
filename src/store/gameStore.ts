import { create } from 'zustand';
import { newGame, placeBlock } from '../game/logic';
import type { GameState } from '../game/logic';

interface GameStore extends GameState {
  best: number;
  selectedPiece: 0 | 1 | 2 | null;
  start: () => void;
  selectPiece: (index: 0 | 1 | 2) => void;
  place: (row: number, col: number) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  ...newGame(),
  best: 0,
  selectedPiece: null,

  start: () => set({ ...newGame(), selectedPiece: null }),

  selectPiece: (index) => {
    set({ selectedPiece: get().selectedPiece === index ? null : index });
  },

  place: (row, col) => {
    const { selectedPiece, isOver } = get();
    if (selectedPiece === null || isOver) return;
    const next = placeBlock(get(), selectedPiece, row, col);
    if (next === get()) return; // no change (invalid placement)
    set({ ...next, best: Math.max(get().best, next.score), selectedPiece: null });
  },
}));
