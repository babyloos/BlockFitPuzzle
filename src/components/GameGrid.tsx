import { StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { CELL_BORDER, EMPTY_CELL, GRID_BG, VALID_PREVIEW } from '../constants/theme';
import { GRID_SIZE, canPlace, type Grid } from '../game/logic';
import type { Block } from '../game/blocks';

interface GameGridProps {
  grid: Grid;
  selectedBlock: Block | null;
  onPlace: (row: number, col: number) => void;
}

const GAP = 2;
const PADDING = 6;

export default function GameGrid({ grid, selectedBlock, onPlace }: GameGridProps) {
  const { width } = useWindowDimensions();
  const gridWidth = Math.min(width - 24, 360);
  const cellSize = (gridWidth - PADDING * 2 - GAP * (GRID_SIZE - 1)) / GRID_SIZE;

  return (
    <View style={[styles.grid, { width: gridWidth, padding: PADDING, gap: GAP }]}>
      {Array.from({ length: GRID_SIZE }, (_, r) => (
        <View key={r} style={[styles.row, { gap: GAP }]}>
          {Array.from({ length: GRID_SIZE }, (_, c) => {
            const filled = grid[r][c] !== null;
            const previewValid = selectedBlock ? canPlace(grid, selectedBlock, r, c) : false;

            return (
              <TouchableOpacity
                key={c}
                onPress={() => selectedBlock && onPlace(r, c)}
                activeOpacity={selectedBlock ? 0.6 : 1}
              >
                <View
                  style={[
                    styles.cell,
                    {
                      width: cellSize,
                      height: cellSize,
                      backgroundColor: filled ? grid[r][c]! : EMPTY_CELL,
                      borderColor: filled ? 'transparent' : CELL_BORDER,
                      borderRadius: cellSize * 0.12,
                      opacity: previewValid && !filled ? 0.8 : 1,
                    },
                    !filled && previewValid && { backgroundColor: VALID_PREVIEW },
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    backgroundColor: GRID_BG,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
  },
});
