import * as Localization from 'expo-localization';

const locale = Localization.getLocales()[0]?.languageCode ?? 'en';

const strings: Record<string, Record<string, string>> = {
  ja: {
    title: 'ブロックフィット',
    score: 'スコア',
    best: 'ベスト',
    newGame: 'ニューゲーム',
    gameOver: 'ゲームオーバー',
    tryAgain: 'もう一度',
    howToPlay: 'ブロックを選んでグリッドに配置しよう！列や行が埋まるとクリア！',
    play: 'プレイ',
    selectPiece: 'ブロックを選択',
    tapGrid: 'グリッドをタップして配置',
  },
  zh: {
    title: '方块拼图',
    score: '分数',
    best: '最高',
    newGame: '新游戏',
    gameOver: '游戏结束',
    tryAgain: '再试一次',
    howToPlay: '选择方块放入网格！填满行或列即可消除！',
    play: '开始',
    selectPiece: '选择方块',
    tapGrid: '点击网格放置',
  },
  en: {
    title: 'Block Fit',
    score: 'SCORE',
    best: 'BEST',
    newGame: 'New Game',
    gameOver: 'Game Over!',
    tryAgain: 'Try Again',
    howToPlay: 'Select a block and tap the grid to place it. Clear rows & columns!',
    play: 'Play',
    selectPiece: 'Select a piece',
    tapGrid: 'Tap grid to place',
  },
};

const t = (key: string): string => {
  const lang = locale in strings ? locale : 'en';
  return strings[lang][key] ?? strings['en'][key] ?? key;
};

export default t;
