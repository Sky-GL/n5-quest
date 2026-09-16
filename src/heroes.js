// 勇者のドット絵（すべてオリジナル）
// px : 構え（32行×32文字）。'.' は透明、その他の文字は pal のキー。
//      タイトル画面にも出るので、これが勇者の「顔」になる。
// px2: 突き。腕をまっすぐ伸ばして刃を右へ出した差分。
//      剣が当たる瞬間だけ px2 に差し替える（踏み込みの間は構えのまま）。
//
// 24x24から32x32に描き直した。24では頭が全体の半分を占めて幼く見えたため、
// 頭と胴の比を落として、兜・肩当て・胸の紋・マントを入れられる密度にしている。
// 外周1pxの輪郭線(d)は、背景が暗い舞台でも形が沈まないように入れている。
//
// パレットの役割
//   d 輪郭   s/S 肌(明/影)   e 瞳   w 白目   m 口
//   a/b/c 鎧(影/中/明)   g/G 金(明/影)   k/K ブーツ(影/明)
//   n/N 剣身(明/影)   P/p マント(影/明)   h/H 髪(影/明・女のみ)
export const HEROES = [
  {
    id: 'hero_m', name: 'おとこ', label: 'おとこの ゆうしゃ',
    pal: {
      G: '#B8860B',   // 金の影
      K: '#4A3424',   // ブーツの明
      N: '#9AA6C8',   // 剣身の影
      P: '#6E1A32',   // マント
      S: '#D9A87C',   // 肌の影
      a: '#17325C',   // 鎧の影
      b: '#2F5A9E',   // 鎧
      c: '#6E9FE0',   // 鎧の明
      d: '#14142A',   // 輪郭
      e: '#1A2340',   // 瞳
      g: '#F8D048',   // 金
      k: '#2A1E14',   // ブーツ
      m: '#9A6A4A',   // 口
      n: '#EDF2FF',   // 剣身
      p: '#B0364F',   // マントの明
      s: '#F2C9A0',   // 肌
      w: '#FFFFFF',   // 白目
    },
    px: [
      '..............dGgd......ddd.....',
      '.............dGggGd....dnnNd....',
      '............daaggaad...dnnNd....',
      '..........ddaccccbbadd.dnnNd....',
      '.........dabbccccbbbbaddnnNd....',
      '.........dabbccccbbbbaddnnNd....',
      '.........dabbbbbbbbbbaddnnNd....',
      '.........dGGggGGGGggGGddnnNd....',
      '.........dabSssssssSbaddnnNd....',
      '.........dabSewssewSbaddnnNd....',
      '.........dabSewssewSbaddnnNd....',
      '.........dabSssssssSbaddnnNd....',
      '.........daaSssmmssSaaddnnNd....',
      '......ddddddssssssssddddnnNd....',
      '.....dpPcccaaaSSSSaaacccnnNdd...',
      '.....dPPcccabbbbbbbbacGGGGGGGd..',
      '....dggggggabcGGGGcbasgggggggd..',
      '....dgbbbbgabcGggGcbasssKKKdd...',
      '....dgbbGbgabcGggGcbasssKKKd....',
      '....dgbGgGgSbcGGGGcbasssKKKd....',
      '....dgbbGbgSbcbbbbcbadddKKKd....',
      '....dgbbbbgSbbbbbbbbad.dGGGd....',
      '...dPgbbbbgGGGGggGGGGd.dGGGd....',
      '...dPPgbbbgdabbdabbad...ddd.....',
      '...dpPgbbbgdabbdabbad...........',
      '...dPPPgbgddabbdabbad...........',
      '..dPPPPPggddabbdabbad...........',
      '..dPPPPPPPddabbaabbad...........',
      '...ddPPPPPdkKKKkkKKKkd..........',
      '....dPPPPPdkkkkkkkkkkd..........',
      '.....ddddddkkkkkkkkkkd..........',
      '...........dddddddddd...........'
    ],
    px2: [
      '..............dGgd..............',
      '.............dGggGd.............',
      '............daaggaad............',
      '..........ddaccccbbadd..........',
      '.........dabbccccbbbbad.........',
      '.........dabbccccbbbbad.........',
      '.........dabbbbbbbbbbad.........',
      '.........dGGggGGGGggGGd.........',
      '.........dabSssssssSbad.........',
      '.........dabSewssewSbad.........',
      '.........dabSewssewSbad.........',
      '.........dabSssssssSbad.........',
      '.........daaSssmmssSaad..d......',
      '......ddddddssssssssdddddGd.....',
      '.....dpPcccaaaSSSSaaacccdGdddddd',
      '.....dPPcccabbbbbbbbassssGnnnnnn',
      '....dggggggabcGGGGcbassssGnnnnnn',
      '....dgbbbbgabcGggGcbassssGNNNNNN',
      '....dgbbGbgabcGggGcbaddddGdddddd',
      '....dgbGgGgSbcGGGGcbad..dGd.....',
      '....dgbbGbgSbcbbbbcbad...d......',
      '....dgbbbbgSbbbbbbbbad..........',
      '...dPgbbbbgGGGGggGGGGd..........',
      '...dPPgbbbgdabbdabbad...........',
      '...dpPgbbbgdabbdabbad...........',
      '...dPPPgbgddabbdabbad...........',
      '..dPPPPPggddabbdabbad...........',
      '..dPPPPPPPddabbaabbad...........',
      '...ddPPPPPdkKKKkkKKKkd..........',
      '....dPPPPPdkkkkkkkkkkd..........',
      '.....ddddddkkkkkkkkkkd..........',
      '...........dddddddddd...........'
    ]
  },
  {
    id: 'hero_f', name: 'おんな', label: 'おんなの ゆうしゃ',
    pal: {
      G: '#B8860B',   // 金の影
      H: '#C89A50',   // 髪
      K: '#4A3424',   // ブーツの明
      N: '#9AA6C8',   // 剣身の影
      P: '#1F3E6E',   // マント
      S: '#D9A87C',   // 肌の影
      a: '#5E1830',   // 鎧の影
      b: '#A8304A',   // 鎧
      c: '#D9647E',   // 鎧の明
      d: '#14142A',   // 輪郭
      e: '#1A2340',   // 瞳
      g: '#F8D048',   // 金
      h: '#7A4A1E',   // 髪の影
      k: '#2A1E14',   // ブーツ
      m: '#9A6A4A',   // 口
      n: '#EDF2FF',   // 剣身
      p: '#3A6ABE',   // マントの明
      s: '#F2C9A0',   // 肌
      w: '#FFFFFF',   // 白目
    },
    px: [
      '..............dGgd......ddd.....',
      '.............dGggGd....dnnNd....',
      '............daaggaad...dnnNd....',
      '..........ddaccccbbadd.dnnNd....',
      '.........dabbccccbbbbaddnnNd....',
      '.........dabbccccbbbbaddnnNd....',
      '.........dabbbbbbbbbbaddnnNd....',
      '.........dGGggGGGGggGGddnnNd....',
      '........dhabhHHHHHHhbahdnnNd....',
      '........dHabSewssewSbaHdnnNd....',
      '........dHabSewssewSbaHdnnNd....',
      '........dHabSssssssSbaHdnnNd....',
      '........dHaaSssmmssSaaHdnnNd....',
      '......dddHddssssssssddHdnnNd....',
      '.....dpPcccaaaSSSSaaacccnnNdd...',
      '.....dPPcccabbbbbbbbacGGGGGGGd..',
      '....dggggggabcGGGGcbasgggggggd..',
      '....dgbbbbgabcGggGcbasssKKKdd...',
      '....dgbbGbgabcGggGcbasssKKKd....',
      '....dgbGgGgSbcGGGGcbasssKKKd....',
      '....dgbbGbgSbcbbbbcbadddKKKd....',
      '....dgbbbbgSbbbbbbbbad.dGGGd....',
      '...dPgbbbbgGGGGggGGGGaddGGGd....',
      '...dPPgbbbgbbbbbbbbbbad.ddd.....',
      '...dpPgbbbgbbbbbbbbbbad.........',
      '...dPPPgbgaGGGGGGGGGGad.........',
      '..dPPPPPggddabbdabbadd..........',
      '..dPPPPPPPddabbaabbad...........',
      '...ddPPPPPdkKKKkkKKKkd..........',
      '....dPPPPPdkkkkkkkkkkd..........',
      '.....ddddddkkkkkkkkkkd..........',
      '...........dddddddddd...........'
    ],
    px2: [
      '..............dGgd..............',
      '.............dGggGd.............',
      '............daaggaad............',
      '..........ddaccccbbadd..........',
      '.........dabbccccbbbbad.........',
      '.........dabbccccbbbbad.........',
      '.........dabbbbbbbbbbad.........',
      '.........dGGggGGGGggGGd.........',
      '........dhabhHHHHHHhbahd........',
      '........dHabSewssewSbaHd........',
      '........dHabSewssewSbaHd........',
      '........dHabSssssssSbaHd........',
      '........dHaaSssmmssSaaHd.d......',
      '......dddHddssssssssddHddGd.....',
      '.....dpPcccaaaSSSSaaacccdGdddddd',
      '.....dPPcccabbbbbbbbassssGnnnnnn',
      '....dggggggabcGGGGcbassssGnnnnnn',
      '....dgbbbbgabcGggGcbassssGNNNNNN',
      '....dgbbGbgabcGggGcbaddddGdddddd',
      '....dgbGgGgSbcGGGGcbad..dGd.....',
      '....dgbbGbgSbcbbbbcbad...d......',
      '....dgbbbbgSbbbbbbbbad..........',
      '...dPgbbbbgGGGGggGGGGad.........',
      '...dPPgbbbgbbbbbbbbbbad.........',
      '...dpPgbbbgbbbbbbbbbbad.........',
      '...dPPPgbgaGGGGGGGGGGad.........',
      '..dPPPPPggddabbdabbadd..........',
      '..dPPPPPPPddabbaabbad...........',
      '...ddPPPPPdkKKKkkKKKkd..........',
      '....dPPPPPdkkkkkkkkkkd..........',
      '.....ddddddkkkkkkkkkkd..........',
      '...........dddddddddd...........'
    ]
  }
];
