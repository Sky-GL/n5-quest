// 勇者のドット絵（すべてオリジナル）
// px : 構え（48行×48文字）。'.' は透明、その他の文字は pal のキー。
//      タイトル画面にも出るので、これが勇者の「顔」になる。
// px2: 突き。腕をまっすぐ前に出して刃を右へ伸ばした差分。
//      剣が当たる瞬間だけ px2 に差し替える（踏み込みの間は構えのまま）。
//
// 48ドット。32では かぶとも胴も一色の板に見えたので上げた。
// 画面に出る大きさは変えず、1ドットを小さくしている
// （タイトル3倍・戦闘2倍。倍率は app 側の monHtml で指定）。
//
// 目は白目6×ひとみ4で、あいだは2ドットだけ。離すと顔が間のびする。
// ひとみは白目の真ん中に置く。端に寄せると外を見ているように見える。
//
// 男女の描き分け
//   男 … 兜。稜線と前立てを入れる
//   女 … 兜はかぶせない。かみを出して はちがねをティアラとして使い、
//         すそ広がりの こしよろい（ひだ入り）にする。
//         まつげは白目の上辺を1段濃くするだけ。目の上に斜めの線を足すと
//         「怒り眉」になって、かわいさが消える。
//         かみは肩までで止める。のばすと盾と右腕にかぶって形が読めない。
//
// かぶとの楕円は顔より わずかに大きく取る。同じにすると上のふちから肌が出る。
// こしよろいは 胴と帯の「あとに」描く。先に描くと胴に隠れる。
//
// 48行を手で打つと左右がずれるので、形を置いてから外周1pxの輪郭(d)を
// 自動で付けて作った。モンスターと同じ手順。
//
// パレットの役割
//   d 輪郭   s/S 肌(明/影)   e 瞳とまつげ   w 白目   m 口
//   a/b/c 鎧(影/中/明)   g/G 金(明/影)   k/K ブーツ(影/明)
//   n/N 剣身(明/影)   h/H 髪(地/明かり・女のみ)
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
      e: '#1A2340',   // 瞳・まつげ
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
      H: '#C89A50',   // 髪の明かり
      K: '#4A3424',   // ブーツの明
      N: '#9AA6C8',   // 剣身の影
      S: '#D9A87C',   // 肌の影
      a: '#5E1830',   // 鎧の影
      b: '#A8304A',   // 鎧
      c: '#D9647E',   // 鎧の明
      d: '#14142A',   // 輪郭
      e: '#1A2340',   // 瞳・まつげ
      g: '#F8D048',   // 金
      h: '#7A4A1E',   // 髪
      k: '#2A1E14',   // ブーツ
      m: '#9A6A4A',   // 口
      n: '#EDF2FF',   // 剣身
      s: '#F2C9A0',   // 肌
      w: '#FFFFFF',   // 白目
    },
    px: [
      '................................................',
      '................................................',
      '................................................',
      '......................dddd.............d........',
      '..................ddddhhhhdddd........dnd.......',
      '.................dhhhhHHHHhhhhd......dndnd......',
      '...............ddhhHHHHHHHHHHhhdd....dnNnNd.....',
      '..............dhhhHHHHHHHHHHHHhhhd...dnNnNd.....',
      '.............dhhhHHHHHHHHHHHHHHhhhd..dnNnNd.....',
      '.............dhhhhhhhhhhhhhhhhhhhhd..dnNnNd.....',
      '............dhhhhhhhhhhhhhhhhhhhhhhd.dnNnNd.....',
      '............dhhhhhhhhhGGGGhhhhhhhhhd.dnNnNd.....',
      '.........dddGgggggggggGggGgggggggggGddnNnNd.....',
      '........dHhHhhggggggggGggGgggggggghhHhHNnNd.....',
      '........dHhHhhGGGGGGGGGGGGGGGGGGGGhhHhHNnNd.....',
      '........dHhHhhssseeeeeesseeeeeessshhHhHNnNd.....',
      '........dHhHhhssswwwwwwsswwwwwwssshhHhHNnNd.....',
      '........dHhHhhssswewwewsswewwewssshhHhHNnNd.....',
      '........dHhHhhsssweeeewssweeeewssshhHhHNnNd.....',
      '........dHhHhhsssweeeewssweeeewssshhHhHNnNd.....',
      '........dHhHhhSSSwweewwsswweewwSSShhHhHNnNd.....',
      '........dHhHhhSSSssssssssssssssSSShhHhHNnNd.....',
      '........dHhHhhddssssssmmmmssssssddhhHhHNnNd.....',
      '.......ddHhHhhggddssssmSSmssssddgghhHhHNnNd.....',
      '......dhhhhHhhccbbbbssssssssbbbbcchhHhhhhNd.....',
      '......dHHhhbbcccbbccccccccccccbbcccbbhhHHNd.....',
      '......dHHhhbbcccbbccccccccccccbbcccbbhhHHNd.....',
      '......dHHhhbbcccbbccccccccccccbbcccbbhhHHNd.....',
      '.....ddbbbdbbcccbbccccccccccccbbcccbbdnNnNd.....',
      '....dbbgggbbbbbabbccccccccccccbbbbbaadnNnNd.....',
      '....dbggGggbbbbaaaaaaGGGGGGaaaaabbbaadnNnNddd...',
      '...dbgGGGGGgbbbabbbbbGggggGbbbbbbbbGggggggggGd..',
      '...dbgGGGGGgbbbdbbbbbGgGGgGbbbbbbbbGggggggggGd..',
      '..dbgGGgggGGgbbdbbbbbGgGGgGbbbbbbssGGGGGGGGGGd..',
      '..dbgGGgggGGgbbdbbbbbGggggGbbbbbbssssdkkKKddd...',
      '..dbgGGgGgGGgbbdaaaaaGGGGGGaaaaabssssdkkKKd.....',
      '..dbgGGgggGGgbbbccccccccccccccccbssssdkkKKd.....',
      '..dbgGGgggGGgbbbccccccccccccccccbdddddkkKKd.....',
      '...dbgGGGGGgbddabbbabbbabbbabbbabdd..dkkKKd.....',
      '...dbgGGGGGgbbbabbbabbbabbbabbbabbbddGGGGGGd....',
      '....dbggGggbdbbabbbabbbabbbabbbabbbddGGGGGGd....',
      '....dbbgggbbdaaaaaaaaaaaaaaaaaaaaaad.dddddd.....',
      '.....ddbbbdd.dddddddSSssssSSddddddd.............',
      '.......ddd......ddddSSssssSSdddd................',
      '...............dKKKKKKKKKKKKKKKKd...............',
      '...............dkkkkkkkkkkkkkkkkd...............',
      '...............dKKkkkkkkkkkkkkKKd...............',
      '...............dkkkkkkkkkkkkkkkkd...............'
    ],
    px2: [
      '................................................',
      '................................................',
      '................................................',
      '......................dddd......................',
      '..................ddddhhhhdddd..................',
      '.................dhhhhHHHHhhhhd.................',
      '...............ddhhHHHHHHHHHHhhdd...............',
      '..............dhhhHHHHHHHHHHHHhhhd..............',
      '.............dhhhHHHHHHHHHHHHHHhhhd.............',
      '.............dhhhhhhhhhhhhhhhhhhhhd.............',
      '............dhhhhhhhhhhhhhhhhhhhhhhd............',
      '............dhhhhhhhhhGGGGhhhhhhhhhd............',
      '.........dddGgggggggggGggGgggggggggGddd.........',
      '........dHhHhhggggggggGggGgggggggghhHhHd........',
      '........dHhHhhGGGGGGGGGGGGGGGGGGGGhhHhHd........',
      '........dHhHhhssseeeeeesseeeeeessshhHhHd........',
      '........dHhHhhssswwwwwwsswwwwwwssshhHhHd........',
      '........dHhHhhssswewwewsswewwewssshhHhHd........',
      '........dHhHhhsssweeeewssweeeewssshhHhHd........',
      '........dHhHhhsssweeeewssweeeewssshhHhHd........',
      '........dHhHhhSSSwweewwsswweewwSSShhHhHd........',
      '........dHhHhhSSSssssssssssssssSSShhHhHd........',
      '........dHhHhhddssssssmmmmssssssddhhHhHd........',
      '.......ddHhHhhggddssssmSSmssssddgghhHhHdd.......',
      '......dhhhhHhhccbbbbssssssssbbbbcchhHhhhhd......',
      '......dHHhhbbcccbbccccccccccccbbcccbbhhHHd......',
      '......dHHhhbbcccbbccccccccccccbbcccbbhhHHd......',
      '......dHHhhbbcccbbccccccccccccbbcccbbhhHHd......',
      '.....ddbbbdbbcccbbccccccccccccbbcccbbdddd.......',
      '....dbbgggbbbbbabbccccccccccccbbbbbaadGGd.......',
      '....dbggGggbbbbaaaaaaGGGGGGaaaaabbbaadGGddddddd.',
      '...dbgGGGGGgbbbabbbbbGggggGbbbbbbbbsssggnnnnnnnd',
      '...dbgGGGGGgbbbdbbbbbGgGGgGbbbbbbbbsssggnnnnnnnd',
      '..dbgGGgggGGgbbdbbbbbGgGGgGbbbbbbsssssggNNNNNNNd',
      '..dbgGGgggGGgbbdbbbbbGggggGbbbbbbsssssGGddddddd.',
      '..dbgGGgGgGGgbbdaaaaaGGGGGGaaaaabssssdGGd.......',
      '..dbgGGgggGGgbbbccccccccccccccccbssssdGGd.......',
      '..dbgGGgggGGgbbbccccccccccccccccbdddd.dd........',
      '...dbgGGGGGgbddabbbabbbabbbabbbabdd.............',
      '...dbgGGGGGgbbbabbbabbbabbbabbbabbbd............',
      '....dbggGggbdbbabbbabbbabbbabbbabbbd............',
      '....dbbgggbbdaaaaaaaaaaaaaaaaaaaaaad............',
      '.....ddbbbdd.dddddddSSssssSSddddddd.............',
      '.......ddd......ddddSSssssSSdddd................',
      '...............dKKKKKKKKKKKKKKKKd...............',
      '...............dkkkkkkkkkkkkkkkkd...............',
      '...............dKKkkkkkkkkkkkkKKd...............',
      '...............dkkkkkkkkkkkkkkkkd...............'
    ]
  }
];
