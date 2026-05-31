import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ACCENT, BG, TEXT, TEXT_DIM } from '../constants/theme';
import t from '../constants/i18n';
import { BLOCK_COLORS } from '../game/blocks';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const PREVIEW_GRID = [
  [0, 0, 0, 1, 1, 0],
  [0, 2, 2, 2, 1, 0],
  [0, 2, 0, 0, 0, 0],
  [3, 3, 3, 3, 0, 0],
  [0, 0, 0, 0, 4, 4],
  [0, 0, 0, 4, 4, 0],
];

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>{t('title')}</Text>
        <Text style={styles.subtitle}>{t('howToPlay')}</Text>

        {/* Mini grid preview */}
        <View style={styles.preview}>
          {PREVIEW_GRID.map((row, r) => (
            <View key={r} style={styles.previewRow}>
              {row.map((v, c) => (
                <View
                  key={c}
                  style={[
                    styles.previewCell,
                    { backgroundColor: v > 0 ? BLOCK_COLORS[v - 1] : '#1f3a6e' },
                  ]}
                />
              ))}
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Game')}>
          <Text style={styles.btnText}>{t('play')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  inner: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, gap: 24 },
  title: { fontSize: 44, fontWeight: '900', color: TEXT, letterSpacing: -1 },
  subtitle: { fontSize: 14, color: TEXT_DIM, textAlign: 'center' },
  preview: { backgroundColor: '#0f3460', borderRadius: 10, padding: 8, gap: 4 },
  previewRow: { flexDirection: 'row', gap: 4 },
  previewCell: { width: 36, height: 36, borderRadius: 5 },
  btn: { backgroundColor: ACCENT, paddingVertical: 16, paddingHorizontal: 56, borderRadius: 12 },
  btnText: { color: TEXT, fontSize: 20, fontWeight: '700' },
});
