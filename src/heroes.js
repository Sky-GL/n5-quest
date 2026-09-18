// 勇者のドット絵（すべてオリジナル）
// px : 構え（48行×48文字）。'.' は透明、その他の文字は pal のキー。
//      タイトル画面にも出るので、これが勇者の「顔」になる。
// px2: 突き。腕をまっすぐ前に出して刃を右へ伸ばした差分。
//      剣が当たる瞬間だけ px2 に差し替える（踏み込みの間は構えのまま）。
//
// 32→48ドットに上げた。32では かぶとも胴も一色の板に見えて、
// 「ビットがあらい」状態だった。48にして稜線・板の継ぎ目・盾のびょう・
// 剣の樋まで入れている。画面に出る大きさは変えず、1ドットを小さくした
// （タイトル 5倍→3倍、戦闘 3倍→2倍。倍率は app 側の monHtml で指定）。
//
// 目は白目6×ひとみ4で、あいだを2ドットだけ空けている。
// 離すと顔が間のびするし、ひとみを白目の端に寄せると外を見ているように
// 見えて、かわいさより不安が出る。角を1ドットずつ落として丸くしてある。
//
// かぶとの楕円は顔より わずかに大きく取る。同じにすると上のふちから
// 肌がはみ出す。女の髪は肩までで止める。のばすと盾と右腕にかぶる。
//
// 48行を手で打つと左右がずれるので、形を置いてから外周1pxの輪郭(d)を
// 自動で付けて作った。モンスターと同じ手順。
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
      '.....................dggggd.....................',
      '.....................dGgggd.....................',
      '.....................dGggGd.....................',
      '.....................dGggGd............d........',
      '...................dddGggGddd.........dnd.......',
      '.................ddbbbgggGbbbdd......dndnd......',
      '................dbbbbbbaabbbbbbd.....dnNnNd.....',
      '...............dbbbbbccaaccbbbbbd....dnNnNd.....',
      '..............dbbbbccccaaccccbbbbd...dnNnNd.....',
      '.............dbbbbcccccaacccccbbbbd..dnNnNd.....',
      '............dbbbbbbbbbbaabbbbbbbbbbd.dnNnNd.....',
      '............dbbbbbbbbbGGGGbbbbbbbbbd.dnNnNd.....',
      '...........dGgggggggggGggGgggggggggGddnNnNd.....',
      '...........dGgggggggggGggGgggggggggGddnNnNd.....',
      '...........dGGGGGGGGGGGGGGGGGGGGGGGGddnNnNd.....',
      '..........dbaassswwwwwwsswwwwwwsssaabdnNnNd.....',
      '..........dbaassswwwwwwsswwwwwwsssaabdnNnNd.....',
      '..........dbaassswewwewsswewwewsssaabdnNnNd.....',
      '..........dbaasssweeeewssweeeewsssaabdnNnNd.....',
      '..........dbaasssweeeewssweeeewsssaabdnNnNd.....',
      '..........dbaaSSSwweewwsswweewwSSSaabdnNnNd.....',
      '...........dddSSSssssssssssssssSSSddddnNnNd.....',
      '............ddddssssssmmmmssssssdddd.dnNnNd.....',
      '...........dggggddssssmSSmssssddggggddnNnNd.....',
      '..........dbbcccbbbbssssssssbbbbcccbbdnNnNd.....',
      '..........dbbcccbbccccccccccccbbcccbbdnNnNd.....',
      '..........dbbcccbbccccccccccccbbcccbbdnNnNd.....',
      '.......ddddbbcccbbccccccccccccbbcccbbdnNnNd.....',
      '.....ddbbbdbbcccbbccccccccccccbbcccbbdnNnNd.....',
      '....dbbgggbbbbbabbccccccccccccbbbbbaadnNnNd.....',
      '....dbggGggbbbbaaaaaaGGGGGGaaaaabbbaadnNnNddd...',
      '...dbgGGGGGgbbbabbbbbGggggGbbbbbbbbGggggggggGd..',
      '...dbgGGGGGgbbbdbbbbbGgGGgGbbbbbbbbGggggggggGd..',
      '..dbgGGgggGGgbbdbbbbbGgGGgGbbbbbbssGGGGGGGGGGd..',
      '..dbgGGgggGGgbbdbbbbbGggggGbbbbbbssssdkkKKddd...',
      '..dbgGGgGgGGgbbdaaaaaGGGGGGaaaaabssssdkkKKd.....',
      '..dbgGGgggGGgbbdGgggggGGGGgggggGdssssdkkKKd.....',
      '..dbgGGgggGGgbbdGgggggGGGGgggggGddddddkkKKd.....',
      '...dbgGGGGGgbdddGGGGGGGGGGGGGGGGd....dkkKKd.....',
      '...dbgGGGGGgbd..ddabbbbddbbbbadd....dGGGGGGd....',
      '....dbggGggbd....dabbbbddbbbbad.....dGGGGGGd....',
      '....dbbgggbbd....dabbbbddbbbbad......dddddd.....',
      '.....ddbbbdd.....dabbbbddbbbbad.................',
      '.......ddd......ddabbbbddbbbbadd................',
      '...............dKKKKKKKKKKKKKKKKd...............',
      '...............dkkkkkkkkkkkkkkkkd...............',
      '...............dKKkkkkkkkkkkkkKKd...............',
      '...............dkkkkkkkkkkkkkkkkd...............'
    ],
    px2: [
      '.....................dggggd.....................',
      '.....................dGgggd.....................',
      '.....................dGggGd.....................',
      '.....................dGggGd.....................',
      '...................dddGggGddd...................',
      '.................ddbbbgggGbbbdd.................',
      '................dbbbbbbaabbbbbbd................',
      '...............dbbbbbccaaccbbbbbd...............',
      '..............dbbbbccccaaccccbbbbd..............',
      '.............dbbbbcccccaacccccbbbbd.............',
      '............dbbbbbbbbbbaabbbbbbbbbbd............',
      '............dbbbbbbbbbGGGGbbbbbbbbbd............',
      '...........dGgggggggggGggGgggggggggGd...........',
      '...........dGgggggggggGggGgggggggggGd...........',
      '...........dGGGGGGGGGGGGGGGGGGGGGGGGd...........',
      '..........dbaassswwwwwwsswwwwwwsssaabd..........',
      '..........dbaassswwwwwwsswwwwwwsssaabd..........',
      '..........dbaassswewwewsswewwewsssaabd..........',
      '..........dbaasssweeeewssweeeewsssaabd..........',
      '..........dbaasssweeeewssweeeewsssaabd..........',
      '..........dbaaSSSwweewwsswweewwSSSaabd..........',
      '...........dddSSSssssssssssssssSSSddd...........',
      '............ddddssssssmmmmssssssdddd............',
      '...........dggggddssssmSSmssssddggggd...........',
      '..........dbbcccbbbbssssssssbbbbcccbbd..........',
      '..........dbbcccbbccccccccccccbbcccbbd..........',
      '..........dbbcccbbccccccccccccbbcccbbd..........',
      '.......ddddbbcccbbccccccccccccbbcccbbd..........',
      '.....ddbbbdbbcccbbccccccccccccbbcccbbddd........',
      '....dbbgggbbbbbabbccccccccccccbbbbbaadGGd.......',
      '....dbggGggbbbbaaaaaaGGGGGGaaaaabbbaadGGddddddd.',
      '...dbgGGGGGgbbbabbbbbGggggGbbbbbbbbsssggnnnnnnnd',
      '...dbgGGGGGgbbbdbbbbbGgGGgGbbbbbbbbsssggnnnnnnnd',
      '..dbgGGgggGGgbbdbbbbbGgGGgGbbbbbbsssssggNNNNNNNd',
      '..dbgGGgggGGgbbdbbbbbGggggGbbbbbbsssssGGddddddd.',
      '..dbgGGgGgGGgbbdaaaaaGGGGGGaaaaabssssdGGd.......',
      '..dbgGGgggGGgbbdGgggggGGGGgggggGdssssdGGd.......',
      '..dbgGGgggGGgbbdGgggggGGGGgggggGddddd.dd........',
      '...dbgGGGGGgbdddGGGGGGGGGGGGGGGGd...............',
      '...dbgGGGGGgbd..ddabbbbddbbbbadd................',
      '....dbggGggbd....dabbbbddbbbbad.................',
      '....dbbgggbbd....dabbbbddbbbbad.................',
      '.....ddbbbdd.....dabbbbddbbbbad.................',
      '.......ddd......ddabbbbddbbbbadd................',
      '...............dKKKKKKKKKKKKKKKKd...............',
      '...............dkkkkkkkkkkkkkkkkd...............',
      '...............dKKkkkkkkkkkkkkKKd...............',
      '...............dkkkkkkkkkkkkkkkkd...............'
    ]
  },
  {
    id: 'hero_f', name: 'おんな', en: 'Female', label: 'おんなの ゆうしゃ',
    pal: {
      G: '#B8860B',   // 金の影
      H: '#C89A50',   // 髪のふちの明かり
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
      '.....................dggggd.....................',
      '.....................dGgggd.....................',
      '.....................dGggGd.....................',
      '.....................dGggGd............d........',
      '...................dddGggGddd.........dnd.......',
      '.................ddbbbgggGbbbdd......dndnd......',
      '................dbbbbbbaabbbbbbd.....dnNnNd.....',
      '...............dbbbbbccaaccbbbbbd....dnNnNd.....',
      '..............dbbbbccccaaccccbbbbd...dnNnNd.....',
      '.............dbbbbcccccaacccccbbbbd..dnNnNd.....',
      '............dbbbbbbbbbbaabbbbbbbbbbd.dnNnNd.....',
      '............dbbbbbbbbbGGGGbbbbbbbbbd.dnNnNd.....',
      '...........dGgggggggggGggGgggggggggGddnNnNd.....',
      '.........dddGgggggggggGggGgggggggggGddnNnNd.....',
      '........dHhhGGGGGGGGGGGGGGGGGGGGGGGGhhHNnNd.....',
      '........dHhhaassswwwwwwsswwwwwwsssaahhHNnNd.....',
      '........dHhhaassswwwwwwsswwwwwwsssaahhHNnNd.....',
      '........dHhhaassswewwewsswewwewsssaahhHNnNd.....',
      '........dHhhaasssweeeewssweeeewsssaahhHNnNd.....',
      '........dHhhaasssweeeewssweeeewsssaahhHNnNd.....',
      '........dHhhaaSSSwweewwsswweewwSSSaahhHNnNd.....',
      '........dHhhddSSSssssssssssssssSSSddhhHNnNd.....',
      '........dHhhddddssssssmmmmssssssddddhhHNnNd.....',
      '........dHhhggggddssssmSSmssssddgggghhHNnNd.....',
      '........dHhhbcccbbbbssssssssbbbbcccbhhHNnNd.....',
      '........dHhhbcccbbccccccccccccbbcccbhhHNnNd.....',
      '........dhhhhcccbbccccccccccccbbccchhhhNnNd.....',
      '.......ddHhhhcccbbccccccccccccbbccchhhHNnNd.....',
      '.....ddbbHhhhcccbbccccccccccccbbccchhhHNnNd.....',
      '....dbbgggbbbbbabbccccccccccccbbbbbaadnNnNd.....',
      '....dbggGggbbbbaaaaaaGGGGGGaaaaabbbaadnNnNddd...',
      '...dbgGGGGGgbbbabbbbbGggggGbbbbbbbbGggggggggGd..',
      '...dbgGGGGGgbbbdbbbbbGgGGgGbbbbbbbbGggggggggGd..',
      '..dbgGGgggGGgbbdbbbbbGgGGgGbbbbbbssGGGGGGGGGGd..',
      '..dbgGGgggGGgbbdbbbbbGggggGbbbbbbssssdkkKKddd...',
      '..dbgGGgGgGGgbbdaaaaaGGGGGGaaaaabssssdkkKKd.....',
      '..dbgGGgggGGgbbdGgggggGGGGgggggGdssssdkkKKd.....',
      '..dbgGGgggGGgbbdGgggggGGGGgggggGddddddkkKKd.....',
      '...dbgGGGGGgbdddGGGGGGGGGGGGGGGGd....dkkKKd.....',
      '...dbgGGGGGgbd..ddabbbbddbbbbadd....dGGGGGGd....',
      '....dbggGggbd....dabbbbddbbbbad.....dGGGGGGd....',
      '....dbbgggbbd....dabbbbddbbbbad......dddddd.....',
      '.....ddbbbdd.....dabbbbddbbbbad.................',
      '.......ddd......ddabbbbddbbbbadd................',
      '...............dKKKKKKKKKKKKKKKKd...............',
      '...............dkkkkkkkkkkkkkkkkd...............',
      '...............dKKkkkkkkkkkkkkKKd...............',
      '...............dkkkkkkkkkkkkkkkkd...............'
    ],
    px2: [
      '.....................dggggd.....................',
      '.....................dGgggd.....................',
      '.....................dGggGd.....................',
      '.....................dGggGd.....................',
      '...................dddGggGddd...................',
      '.................ddbbbgggGbbbdd.................',
      '................dbbbbbbaabbbbbbd................',
      '...............dbbbbbccaaccbbbbbd...............',
      '..............dbbbbccccaaccccbbbbd..............',
      '.............dbbbbcccccaacccccbbbbd.............',
      '............dbbbbbbbbbbaabbbbbbbbbbd............',
      '............dbbbbbbbbbGGGGbbbbbbbbbd............',
      '...........dGgggggggggGggGgggggggggGd...........',
      '.........dddGgggggggggGggGgggggggggGddd.........',
      '........dHhhGGGGGGGGGGGGGGGGGGGGGGGGhhHd........',
      '........dHhhaassswwwwwwsswwwwwwsssaahhHd........',
      '........dHhhaassswwwwwwsswwwwwwsssaahhHd........',
      '........dHhhaassswewwewsswewwewsssaahhHd........',
      '........dHhhaasssweeeewssweeeewsssaahhHd........',
      '........dHhhaasssweeeewssweeeewsssaahhHd........',
      '........dHhhaaSSSwweewwsswweewwSSSaahhHd........',
      '........dHhhddSSSssssssssssssssSSSddhhHd........',
      '........dHhhddddssssssmmmmssssssddddhhHd........',
      '........dHhhggggddssssmSSmssssddgggghhHd........',
      '........dHhhbcccbbbbssssssssbbbbcccbhhHd........',
      '........dHhhbcccbbccccccccccccbbcccbhhHd........',
      '........dhhhhcccbbccccccccccccbbccchhhhd........',
      '.......ddHhhhcccbbccccccccccccbbccchhhHd........',
      '.....ddbbHhhhcccbbccccccccccccbbccchhhHd........',
      '....dbbgggbbbbbabbccccccccccccbbbbbaadGGd.......',
      '....dbggGggbbbbaaaaaaGGGGGGaaaaabbbaadGGddddddd.',
      '...dbgGGGGGgbbbabbbbbGggggGbbbbbbbbsssggnnnnnnnd',
      '...dbgGGGGGgbbbdbbbbbGgGGgGbbbbbbbbsssggnnnnnnnd',
      '..dbgGGgggGGgbbdbbbbbGgGGgGbbbbbbsssssggNNNNNNNd',
      '..dbgGGgggGGgbbdbbbbbGggggGbbbbbbsssssGGddddddd.',
      '..dbgGGgGgGGgbbdaaaaaGGGGGGaaaaabssssdGGd.......',
      '..dbgGGgggGGgbbdGgggggGGGGgggggGdssssdGGd.......',
      '..dbgGGgggGGgbbdGgggggGGGGgggggGddddd.dd........',
      '...dbgGGGGGgbdddGGGGGGGGGGGGGGGGd...............',
      '...dbgGGGGGgbd..ddabbbbddbbbbadd................',
      '....dbggGggbd....dabbbbddbbbbad.................',
      '....dbbgggbbd....dabbbbddbbbbad.................',
      '.....ddbbbdd.....dabbbbddbbbbad.................',
      '.......ddd......ddabbbbddbbbbadd................',
      '...............dKKKKKKKKKKKKKKKKd...............',
      '...............dkkkkkkkkkkkkkkkkd...............',
      '...............dKKkkkkkkkkkkkkKKd...............',
      '...............dkkkkkkkkkkkkkkkkd...............'
    ]
  }
];
