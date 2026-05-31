import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { EMPTY_CELL, SELECTED_BORDER } from '../constants/theme';
import type { Block } from '../game/blocks';
import { blockHeight, blockWidth } from '../game/blocks';

interface BlockPieceProps {
  block: Block;
  cellSize: number;
  selected: boolean;
  onPress: () => void;
}

export default function BlockPiece({ block, cellSize, selected, onPress }: BlockPieceProps) {
  const w = blockWidth(block.shape);
  const h = blockHeight(block.shape);

  const shapeSet = new Set(block.shape.map(([r, c]) => `${r},${c}`));

  return (
    <TouchableOpacity
      style={[styles.container, selected && { borderColor: SELECTED_BORDER, borderWidth: 2, borderRadius: 8 }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={{ width: w * cellSize, height: h * cellSize }}>
        {Array.from({ length: h }, (_, r) =>
          Array.from({ length: w }, (_, c) => {
            const filled = shapeSet.has(`${r},${c}`);
            return (
              <View
                key={`${r},${c}`}
                style={[
                  styles.cell,
                  {
                    width: cellSize,
                    height: cellSize,
                    left: c * cellSize,
                    top: r * cellSize,
                    backgroundColor: filled ? block.color : 'transparent',
                    borderRadius: filled ? cellSize * 0.15 : 0,
                  },
                ]}
              />
            );
          })
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { padding: 8, alignItems: 'center', justifyContent: 'center' },
  cell: { position: 'absolute' },
});
