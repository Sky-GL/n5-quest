// 勇者のドット絵（すべてオリジナル）
// px : 構え（32行×32文字）。'.' は透明、その他の文字は pal のキー。
//      タイトル画面にも出るので、これが勇者の「顔」になる。
// px2: 突き。腕をまっすぐ前に出して刃を右へ伸ばした差分。
//      剣が当たる瞬間だけ px2 に差し替える（踏み込みの間は構えのまま）。
//
// かわいさに寄せて、はばを24→29ドットに広げ、頭を大きく丸くした。
// 目は白目4×瞳2で、ひとみを白目の真ん中に置いている。端に寄せると
// 外を見ているように見えて、かわいさより不安が出る。
// 肩当てを左右に張り出して、頭の大きさに胴が負けないようにしている。
//
// 32行を手で打つと左右がずれるので、形を置いてから外周1pxの輪郭(d)を
// 自動で付けて作った。輪郭は、背景が暗い舞台でも形が沈まないために要る。
//
// パレットの役割
//   d 輪郭   s/S 肌(明/影)   e 瞳   w 白目   m 口
//   a/b/c 鎧(影/中/明)   g/G 金(明/影)   k/K ブーツ(影/明)
//   n/N 剣身(明/影)   h/H 髪(地/ふちの明かり・女のみ)
// a/b/c は「ころも」で色を替える（app 側の ROBES）。ほかのキーは替えない。
export const HEROES = [
  {
    id: 'hero_m', name: 'おとこ', en: 'Male', label: 'おとこの ゆうしゃ',
    pal: {
      G: '#B8860B',   // 金の影
      K: '#4A3424',   // ブーツの明
      N: '#9AA6C8',   // 剣身の影
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
      s: '#F2C9A0',   // 肌
      w: '#FFFFFF',   // 白目
    },
    px: [
      '..............dggd..............',
      '..............dGgd........d.....',
      '..............dgGd.......dnd....',
      '............ddbggbdd....dnnd....',
      '..........ddbbbbbbbbdd..dnnNd...',
      '.........dbbbccccccbbbd.dnnNd...',
      '.........dbbccccccccbbd.dnnNd...',
      '........dbbbbbbbbbbbbbbddnnNd...',
      '.......dGggggggggggggggGdnnNd...',
      '.......dGGGGGGGGGGGGGGGGdnnNd...',
      '.......daawwwwsssswwwwaadnnNd...',
      '.......daaweewssssweewaadnnNd...',
      '.......daaweewssssweewaadnnNd...',
      '.......daaSssssssssssSaadnnNd...',
      '........dddssssmmssssddddnnNd...',
      '........ddddssssssssdddddnnNd...',
      '.......dcccbbbbbbbbbbcccdnnNd...',
      '.....d.dcccbccccccccbcccdnnNd...',
      '...ddbddcccbccccccccbcccdnnNd...',
      '..dbbgbbbbabccccccccbbbbbnnNd...',
      '..dbgggbbbabbbGGGGbbbbbGGggGGd..',
      '.dbgGGGgbbdbbbGggGbbbbsGGGGGGd..',
      '.dbgGGGgbbdbbbGggGbbbbsssdddd...',
      '.dbgGgGgbbdbbbGGGGbbbbsssd......',
      '.dbgGGGgbbdGggggggggGdddd.......',
      '.dbgGGGgbddGGGGGGGGGGd..........',
      '..dbgggbd..daaaaaaaad...........',
      '..dbbgbbd..daaaddaaad...........',
      '...ddbdd...daaaaaaaad...........',
      '.....d....dKKKKKKKKKKd..........',
      '..........dkkkkkkkkkkd..........',
      '...........dddddddddd...........'
    ],
    px2: [
      '..............dggd..............',
      '..............dGgd..............',
      '..............dgGd..............',
      '............ddbggbdd............',
      '..........ddbbbbbbbbdd..........',
      '.........dbbbccccccbbbd.........',
      '.........dbbccccccccbbd.........',
      '........dbbbbbbbbbbbbbbd........',
      '.......dGggggggggggggggGd.......',
      '.......dGGGGGGGGGGGGGGGGd.......',
      '.......daawwwwsssswwwwaad.......',
      '.......daaweewssssweewaad.......',
      '.......daaweewssssweewaad.......',
      '.......daaSssssssssssSaad.......',
      '........dddssssmmssssddd........',
      '........ddddssssssssdddd........',
      '.......dcccbbbbbbbbbbcccd.......',
      '.....d.dcccbccccccccbcccd.......',
      '...ddbddcccbccccccccbcccddd.....',
      '..dbbgbbbbabccccccccbbbbbGGdddd.',
      '..dbgggbbbabbbGGGGbbbbbbsGGnnnnd',
      '.dbgGGGgbbdbbbGggGbbbbsssGGnnnnd',
      '.dbgGGGgbbdbbbGggGbbbbsssGGNNNNd',
      '.dbgGgGgbbdbbbGGGGbbbbsssGGdddd.',
      '.dbgGGGgbbdGggggggggGdddddd.....',
      '.dbgGGGgbddGGGGGGGGGGd..........',
      '..dbgggbd..daaaaaaaad...........',
      '..dbbgbbd..daaaddaaad...........',
      '...ddbdd...daaaaaaaad...........',
      '.....d....dKKKKKKKKKKd..........',
      '..........dkkkkkkkkkkd..........',
      '...........dddddddddd...........'
    ]
  },
  {
    id: 'hero_f', name: 'おんな', en: 'Female', label: 'おんなの ゆうしゃ',
    pal: {
      G: '#B8860B',   // 金の影
      H: '#C89A50',   // 髪の明かり
      K: '#4A3424',   // ブーツの明
      N: '#9AA6C8',   // 剣身の影
      S: '#D9A87C',   // 肌の影
      a: '#5E1830',   // 鎧の影
      b: '#A8304A',   // 鎧
      c: '#D9647E',   // 鎧の明
      d: '#14142A',   // 輪郭
      e: '#1A2340',   // 瞳
      g: '#F8D048',   // 金
      h: '#7A4A1E',   // 髪
      k: '#2A1E14',   // ブーツ
      m: '#9A6A4A',   // 口
      n: '#EDF2FF',   // 剣身
      s: '#F2C9A0',   // 肌
      w: '#FFFFFF',   // 白目
    },
    px: [
      '..............dggd..............',
      '..............dGgd........d.....',
      '..............dgGd.......dnd....',
      '............ddbggbdd....dnnd....',
      '..........ddbbbbbbbbdd..dnnNd...',
      '.........dbbbccccccbbbd.dnnNd...',
      '.........dbbccccccccbbd.dnnNd...',
      '........dbbbbbbbbbbbbbbddnnNd...',
      '.......dGggggggggggggggGdnnNd...',
      '......ddGGGGGGGGGGGGGGGGdnnNd...',
      '.....dHhaawwwwsssswwwwaahHnNd...',
      '.....dHhaaweewssssweewaahHnNd...',
      '.....dHhaaweewssssweewaahHnNd...',
      '.....dHhaaSssssssssssSaahHnNd...',
      '.....dHhdddssssmmssssdddhHnNd...',
      '.....dHhddddssssssssddddhHnNd...',
      '.....dHhcccbbbbbbbbbbccchHnNd...',
      '.....dHhcccbccccccccbccchHnNd...',
      '...ddbHhcccbccccccccbccchHnNd...',
      '..dbbghhhbabccccccccbbbhhhnNd...',
      '..dbgghhhbabbbGGGGbbbbbhhhgGGd..',
      '.dbgGGGgbbdbbbGggGbbbbsGGGGGGd..',
      '.dbgGGGgbbdbbbGggGbbbbsssdddd...',
      '.dbgGgGgbbdbbbGGGGbbbbsssd......',
      '.dbgGGGgbbdGggggggggGdddd.......',
      '.dbgGGGgbddGGGGGGGGGGd..........',
      '..dbgggbd..daaaaaaaad...........',
      '..dbbgbbd..daaaddaaad...........',
      '...ddbdd...daaaaaaaad...........',
      '.....d....dKKKKKKKKKKd..........',
      '..........dkkkkkkkkkkd..........',
      '...........dddddddddd...........'
    ],
    px2: [
      '..............dggd..............',
      '..............dGgd..............',
      '..............dgGd..............',
      '............ddbggbdd............',
      '..........ddbbbbbbbbdd..........',
      '.........dbbbccccccbbbd.........',
      '.........dbbccccccccbbd.........',
      '........dbbbbbbbbbbbbbbd........',
      '.......dGggggggggggggggGd.......',
      '......ddGGGGGGGGGGGGGGGGdd......',
      '.....dHhaawwwwsssswwwwaahHd.....',
      '.....dHhaaweewssssweewaahHd.....',
      '.....dHhaaweewssssweewaahHd.....',
      '.....dHhaaSssssssssssSaahHd.....',
      '.....dHhdddssssmmssssdddhHd.....',
      '.....dHhddddssssssssddddhHd.....',
      '.....dHhcccbbbbbbbbbbccchHd.....',
      '.....dHhcccbccccccccbccchHd.....',
      '...ddbHhcccbccccccccbccchHd.....',
      '..dbbghhhbabccccccccbbbhhhGdddd.',
      '..dbgghhhbabbbGGGGbbbbbhhhGnnnnd',
      '.dbgGGGgbbdbbbGggGbbbbsssGGnnnnd',
      '.dbgGGGgbbdbbbGggGbbbbsssGGNNNNd',
      '.dbgGgGgbbdbbbGGGGbbbbsssGGdddd.',
      '.dbgGGGgbbdGggggggggGdddddd.....',
      '.dbgGGGgbddGGGGGGGGGGd..........',
      '..dbgggbd..daaaaaaaad...........',
      '..dbbgbbd..daaaddaaad...........',
      '...ddbdd...daaaaaaaad...........',
      '.....d....dKKKKKKKKKKd..........',
      '..........dkkkkkkkkkkd..........',
      '...........dddddddddd...........'
    ]
  }
];
