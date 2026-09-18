// 勇者のドット絵（すべてオリジナル）
// px : 構え（64行×64文字）。'.' は透明、その他の文字は pal のキー。
//      タイトル画面にも出るので、これが勇者の「顔」になる。
// px2: 突き。腕をまっすぐ前に出して刃を右へ伸ばした差分。
//      剣が当たる瞬間だけ px2 に差し替える（踏み込みの間は構えのまま）。
//
// 64ドット。48では髪が2色の板にしかならず、髪に見えなかった。
// 画面に出る大きさは倍率で合わせる（タイトル2倍・戦闘2倍。app の monHtml）。
//
// 目は白目8×ひとみ4で、あいだは2ドットだけ。離すと顔が間のびする。
// ひとみは白目の真ん中に置く。端に寄せると外を見ているように見える。
//
// 髪は h(地) H(明) j(影) の3色を、3ドット幅の縦の房で塗り分ける（streak）。
// 一色の面は板にしか見えない。行ごとに柄をずらすと、房ではなく まだらに
// なるので ずらさない。外側ほど全体を暗く落として丸みを出す。
// つやは 面で塗ると記号に見えるので、房を保ったまま1段だけ明るくする
// （lighten）。
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
//   n/N 剣身(明/影)   h/H/j 髪(地/明かり/影・女のみ)
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
      '............................dggggggd............................',
      '............................dGgggggd............................',
      '............................dGggggGd............................',
      '............................dGggggGd............................',
      '............................dGggggGd................d...........',
      '...........................ddGggggGdd..............dnd..........',
      '........................dddbbGggggGbbddd...........ddnd.........',
      '......................ddbbbbbgggggGbbbbbdd........dndnd.........',
      '.....................dbbbbbbbbbaabbbbbbbbbd.......dnNnNd........',
      '....................dbbbbbbbbbbaabbbbbbbbbbd......dnNnNd........',
      '...................dbbbbbbbccccaaccccbbbbbbbd.....dnNnNd........',
      '..................dbbbbbbccccccaaccccccbbbbbbd....dnNnNd........',
      '.................dbbbbbbcccccccaacccccccbbbbbbd...dnNnNd........',
      '.................dbbbbbbbbbbbbbaabbbbbbbbbbbbbd...dnNnNd........',
      '................dbbbbbbbbbbbbbbaabbbbbbbbbbbbbbd..dnNnNd........',
      '................dbbbbbbbbbbbbGGGGGGbbbbbbbbbbbbd..dnNnNd........',
      '...............dGggggggggggggGggggGggggggggggggGd.dnNnNd........',
      '...............dGggggggggggggGggggGggggggggggggGd.dnNnNd........',
      '...............dGggggggggggggGggggGggggggggggggGd.dnNnNd........',
      '...............dGGGGGGGGGGGGGGggggGGGGGGGGGGGGGGd.dnNnNd........',
      '..............dbaaasssswwwwwwwwGGwwwwwwwwssssaaabddnNnNd........',
      '..............dbaaasssswwwwwwwwsswwwwwwwwssssaaabddnNnNd........',
      '..............dbaaasssswwewwewwsswwewwewwssssaaabddnNnNd........',
      '..............dbaaasssswwewwewwsswwewwewwssssaaabddnNnNd........',
      '..............dbaaasssswweeeewwsswweeeewwssssaaabddnNnNd........',
      '..............dbaaasssswweeeewwsswweeeewwssssaaabddnNnNd........',
      '..............dbaaasssswwweewwwsswwweewwwssssaaabddnNnNd........',
      '..............dbaaaSSSssssssssssssssssssssSSSaaabddnNnNd........',
      '...............ddddSSSssssssssssssssssssssSSSdddd.dnNnNd........',
      '..................dSSSsssssssmmmmmmsssssssSSSd....dnNnNd........',
      '................ddddddsssssssmmmmmmsssssssdddddd..dnNnNd........',
      '...............dgggggdddsssssmSSSSmsssssdddgggggd.dnNnNd........',
      '..............dbbccccbbbbbssssssssssssbbbbbccccbbddnNnNd........',
      '..............dbbccccbbbccccccssssccccccbbbccccbbddnNnNd........',
      '..............dbbccccbbbccccccccccccccccbbbccccbbddnNnNd........',
      '..............dbbccccbbbccccccccccccccccbbbccccbbddnNnNd........',
      '..............dbbccccbbbccccccccccccccccbbbccccbbddnNnNd........',
      '........ddddd.dbbccccbbbccccccccccccccccbbbccccbbddnNnNd........',
      '......ddbbbbbddbbccccbbbccccccccccccccccbbbccccbbddnNnNd........',
      '.....dbbbgggbbbbbbbbabbbccccccccccccccccbbbbbbbaaddnNnNd........',
      '....dbbgggggggbbbbbbaaaaaaaaGGGGGGGGaaaaaaabbbbaaddnNnNdddd.....',
      '....dbggGGGGGggbbbbbabbbbbbbGggggggGbbbbbbbbbbbaGgggggggggGd....',
      '...dbbgGGGGGGGgbbbbbabbbbbbbGgGGGGgGbbbbbbbbbbbaGgggggggggGd....',
      '...dbggGGGGGGGggbbbbdbbbbbbbGgGGGGgGbbbbbbbbbbbaGGGGGGGGGGGd....',
      '...dbgGGGgggGGGgbbbbdbbbbbbbGgGGGGgGbbbbbbbbsssssddkkKKdddd.....',
      '..dbbgGGGgggGGGgbbbbdbbbbbbbGgGGGGgGbbbbbbbbsssssddkkKKd........',
      '..dbbgGGgggggGGgbbbbdaaaaaaaGggggggGaaaaaaabsssssddkkKKd........',
      '..dbbgGGggGggGGgbbbbdbbbbbbbGGGGGGGGbbbbbbbbsssssddkkKKd........',
      '..dbbgGGgggggGGgbbbbdGggggggggGGGGggggggggGdsssssddkkKKd........',
      '..dbbgGGGgggGGGgbbbbdGggggggggGGGGggggggggGdddddd.dkkKKd........',
      '...dbgGGGgggGGGgbbbbdGggggggggGGGGggggggggGd......dkkKKd........',
      '...dbggGGGGGGGggbddddGGGGGGGGGGGGGGGGGGGGGGd.....dGggggGd.......',
      '...dbbgGGGGGGGgbbd...dddabbbbbbddbbbbbbaddd......dGggggGd.......',
      '....dbggGGGGGggbd......dabbbbbbddbbbbbbad........dGGGGGGd.......',
      '....dbbgggggggbbd......dabbbbbbddbbbbbbad.........dddddd........',
      '.....dbbbgggbbbd.......dabbbbbbddbbbbbbad.......................',
      '......ddbbbbbdd........dabbbbbbddbbbbbbad.......................',
      '........ddddd..........dabbbbbbddbbbbbbad.......................',
      '.....................dddabbbbbbddbbbbbbaddd.....................',
      '....................dKKKKKKKKKKKKKKKKKKKKKKd....................',
      '....................dkkkkkkkkkkkkkkkkkkkkkkd....................',
      '....................dKKKkkkkkkkkkkkkkkkkKKKd....................',
      '....................dkkkkkkkkkkkkkkkkkkkkkkd....................',
      '....................dkkkkkkkkkkkkkkkkkkkkkkd....................'
    ],
    px2: [
      '............................dggggggd............................',
      '............................dGgggggd............................',
      '............................dGggggGd............................',
      '............................dGggggGd............................',
      '............................dGggggGd............................',
      '...........................ddGggggGdd...........................',
      '........................dddbbGggggGbbddd........................',
      '......................ddbbbbbgggggGbbbbbdd......................',
      '.....................dbbbbbbbbbaabbbbbbbbbd.....................',
      '....................dbbbbbbbbbbaabbbbbbbbbbd....................',
      '...................dbbbbbbbccccaaccccbbbbbbbd...................',
      '..................dbbbbbbccccccaaccccccbbbbbbd..................',
      '.................dbbbbbbcccccccaacccccccbbbbbbd.................',
      '.................dbbbbbbbbbbbbbaabbbbbbbbbbbbbd.................',
      '................dbbbbbbbbbbbbbbaabbbbbbbbbbbbbbd................',
      '................dbbbbbbbbbbbbGGGGGGbbbbbbbbbbbbd................',
      '...............dGggggggggggggGggggGggggggggggggGd...............',
      '...............dGggggggggggggGggggGggggggggggggGd...............',
      '...............dGggggggggggggGggggGggggggggggggGd...............',
      '...............dGGGGGGGGGGGGGGggggGGGGGGGGGGGGGGd...............',
      '..............dbaaasssswwwwwwwwGGwwwwwwwwssssaaabd..............',
      '..............dbaaasssswwwwwwwwsswwwwwwwwssssaaabd..............',
      '..............dbaaasssswwewwewwsswwewwewwssssaaabd..............',
      '..............dbaaasssswwewwewwsswwewwewwssssaaabd..............',
      '..............dbaaasssswweeeewwsswweeeewwssssaaabd..............',
      '..............dbaaasssswweeeewwsswweeeewwssssaaabd..............',
      '..............dbaaasssswwweewwwsswwweewwwssssaaabd..............',
      '..............dbaaaSSSssssssssssssssssssssSSSaaabd..............',
      '...............ddddSSSssssssssssssssssssssSSSdddd...............',
      '..................dSSSsssssssmmmmmmsssssssSSSd..................',
      '................ddddddsssssssmmmmmmsssssssdddddd................',
      '...............dgggggdddsssssmSSSSmsssssdddgggggd...............',
      '..............dbbccccbbbbbssssssssssssbbbbbccccbbd..............',
      '..............dbbccccbbbccccccssssccccccbbbccccbbd..............',
      '..............dbbccccbbbccccccccccccccccbbbccccbbd..............',
      '..............dbbccccbbbccccccccccccccccbbbccccbbd..............',
      '..............dbbccccbbbccccccccccccccccbbbccccbbd..............',
      '........ddddd.dbbccccbbbccccccccccccccccbbbccccbbd..............',
      '......ddbbbbbddbbccccbbbccccccccccccccccbbbccccbbd..d...........',
      '.....dbbbgggbbbbbbbbabbbccccccccccccccccbbbbbbbaad.dgd..........',
      '....dbbgggggggbbbbbbaaaaaaaaGGGGGGGGaaaaaaabbbbaaddGGd..........',
      '....dbggGGGGGggbbbbbabbbbbbbGggggggGbbbbbbbbbbbaaddGGdddddddddd.',
      '...dbbgGGGGGGGgbbbbbabbbbbbbGgGGGGgGbbbbbbbbbbbssssggnnnnnnnnnnd',
      '...dbggGGGGGGGggbbbbdbbbbbbbGgGGGGgGbbbbbbbbbbbssssggnnnnnnnnnnd',
      '...dbgGGGgggGGGgbbbbdbbbbbbbGgGGGGgGbbbbbbbbsssssssggNNNNNNNNNNd',
      '..dbbgGGGgggGGGgbbbbdbbbbbbbGgGGGGgGbbbbbbbbsssssssggdddddddddd.',
      '..dbbgGGgggggGGgbbbbdaaaaaaaGggggggGaaaaaaabsssssssGGd..........',
      '..dbbgGGggGggGGgbbbbdbbbbbbbGGGGGGGGbbbbbbbbsssssddGGd..........',
      '..dbbgGGgggggGGgbbbbdGggggggggGGGGggggggggGdsssssd.dd...........',
      '..dbbgGGGgggGGGgbbbbdGggggggggGGGGggggggggGdddddd...............',
      '...dbgGGGgggGGGgbbbbdGggggggggGGGGggggggggGd....................',
      '...dbggGGGGGGGggbddddGGGGGGGGGGGGGGGGGGGGGGd....................',
      '...dbbgGGGGGGGgbbd...dddabbbbbbddbbbbbbaddd.....................',
      '....dbggGGGGGggbd......dabbbbbbddbbbbbbad.......................',
      '....dbbgggggggbbd......dabbbbbbddbbbbbbad.......................',
      '.....dbbbgggbbbd.......dabbbbbbddbbbbbbad.......................',
      '......ddbbbbbdd........dabbbbbbddbbbbbbad.......................',
      '........ddddd..........dabbbbbbddbbbbbbad.......................',
      '.....................dddabbbbbbddbbbbbbaddd.....................',
      '....................dKKKKKKKKKKKKKKKKKKKKKKd....................',
      '....................dkkkkkkkkkkkkkkkkkkkkkkd....................',
      '....................dKKKkkkkkkkkkkkkkkkkKKKd....................',
      '....................dkkkkkkkkkkkkkkkkkkkkkkd....................',
      '....................dkkkkkkkkkkkkkkkkkkkkkkd....................'
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
      j: '#4A2A0E',   // 髪の影（房の切れ目）
      k: '#2A1E14',   // ブーツ
      m: '#9A6A4A',   // 口
      n: '#EDF2FF',   // 剣身
      s: '#F2C9A0',   // 肌
      w: '#FFFFFF',   // 白目
    },
    px: [
      '................................................................',
      '................................................................',
      '................................................................',
      '................................................................',
      '.............................dddddd.................d...........',
      '..........................dddhhhjjjddd.............dnd..........',
      '.......................dddHHHhhhjjjHHHddd..........ddnd.........',
      '......................djjjHHHhhhjjjHHHhhhd........dndnd.........',
      '.....................dhjjjHHHhhhjjjHHHhhhjd.......dnNnNd........',
      '....................dhhjjjHHHHHHhhhHHHhhhjjd......dnNnNd........',
      '...................dhhhjjhHHHHHHhhhHHHHhhjjjd.....dnNnNd........',
      '..................dhhhhjhhHHHHHHhhhHHHHHhjjjhd....dnNnNd........',
      '.................dhhhhhhhhHHHHHHhhhHHHHHHjjjhhd...dnNnNd........',
      '.................dhhhhhhhhHHHHHHhhhHHHHHHjjjhhd...dnNnNd........',
      '................dhhhhhhhhhHHHHHHhhhHHHHHHjjjhhhd..dnNnNd........',
      '................dhhhhhhjhhHHHGGGGGGHHHHHhjjjhhhd..dnNnNd........',
      '..............ddGggggggggggggGggggGggggggggggggGdddnNnNd........',
      '.............djjGggggggggggggGggggGggggggggggggGjjdnNnNd........',
      '.............djjGggggggggggggGggggGggggggggggggGjjdnNnNd........',
      '.............djjGGGGGGGGGGGGGGggggGGGGGGGGGGGGGGjjdnNnNd........',
      '.............djjjhhhssseeeeeeeeGGeeeeeeeessshhhjjjdnNnNd........',
      '.............djjjhhhssswwwwwwwwsswwwwwwwwssshhhjjjdnNnNd........',
      '.............djjjhhhssswwewwewwsswwewwewwssshhhjjjdnNnNd........',
      '.............djjjhhhssswwewwewwsswwewwewwssshhhjjjdnNnNd........',
      '.............djjjhhhssswweeeewwsswweeeewwssshhhjjjdnNnNd........',
      '.............djjjhhhssswweeeewwsswweeeewwssshhhjjjdnNnNd........',
      '.............djjjhhhssswwweewwwsswwweewwwssshhhjjjdnNnNd........',
      '.............djjjhhSSSssssssssssssssssssssSSShhjjjdnNnNd........',
      '.............djjjhhSSSssssssssssssssssssssSSShhjjjdnNnNd........',
      '...........dddjjjhhSSSsssssssmmmmmmsssssssSSShhjjjdnNnNd........',
      '..........djjjjjjhhhddsssssssmmmmmmsssssssddhhhjjjjjjnNd........',
      '..........djjjjjjhhhgdddsssssmSSSSmsssssdddghhhjjjjjjnNd........',
      '..........djjjjjjhhhcbbbbbssssssssssssbbbbbchhhjjjjjjnNd........',
      '..........djjjjjjhhhcbbbccccccssssccccccbbbchhhjjjjjjnNd........',
      '..........djjjjjjhhccbbbccccccccccccccccbbbcchhjjjjjjnNd........',
      '..........djjjjjjhhccbbbccccccccccccccccbbbcchhjjjjjjnNd........',
      '..........djjjjjjhhccbbbccccccccccccccccbbbcchhjjjjjjnNd........',
      '........dddjjjjjjhhccbbbccccccccccccccccbbbcchhjjjjjjnNd........',
      '......ddbbbjjjjjjhhccbbbccccccccccccccccbbbcchhjjjjjjnNd........',
      '.....dbbbgggjjjjjhhbabbbccccccccccccccccbbbbbhhjjjjjNnNd........',
      '....dbbggggggjjjjhhbaaaaaaaaGGGGGGGGaaaaaaabbhhjjjjnNnNdddd.....',
      '....dbggGGGGGgjjjhhbabbbbbbbGggggggGbbbbbbbbbhhjjjggggggggGd....',
      '...dbbgGGGGGGGgbbbbbabbbbbbbGgGGGGgGbbbbbbbbbbbaGgggggggggGd....',
      '...dbggGGGGGGGggbbbbdbbbbbbbGgGGGGgGbbbbbbbbbbbaGGGGGGGGGGGd....',
      '...dbgGGGgggGGGgbbbbdbbbbbbbGgGGGGgGbbbbbbbbsssssddkkKKdddd.....',
      '..dbbgGGGgggGGGgbbbbdbbbbbbbGgGGGGgGbbbbbbbbsssssddkkKKd........',
      '..dbbgGGgggggGGgbbbbdaaaaaaaGggggggGaaaaaaabsssssddkkKKd........',
      '..dbbgGGggGggGGgbbbbdbbbbbbbGGGGGGGGbbbbbbbbsssssddkkKKd........',
      '..dbbgGGgggggGGgbbbbbccccccccccccccccccccccbsssssddkkKKd........',
      '..dbbgGGGgggGGGgbbbbbccccccccccccccccccccccbddddd.dkkKKd........',
      '...dbgGGGgggGGGgbbbbbbbbbbbbbbbbbbbbbbbbbbbbd.....dkkKKd........',
      '...dbggGGGGGGGggbddabbbbabbbbabbbbabbbbabbbbadd..dGggggGd.......',
      '...dbbgGGGGGGGgbbbbabbbbabbbbabbbbabbbbabbbbabbd.dGggggGd.......',
      '....dbggGGGGGggbdbbabbbbabbbbabbbbabbbbabbbbabbd.dGGGGGGd.......',
      '....dbbgggggggbbdbbabbbbabbbbabbbbabbbbabbbbabbd..dddddd........',
      '.....dbbbgggbbbddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaad................',
      '......ddbbbbbdd..ddddddddddSSssssssSSdddddddddd.................',
      '........ddddd.............dSSssssssSSd..........................',
      '.....................ddddddSSssssssSSdddddd.....................',
      '....................dKKKKKKKKKKKKKKKKKKKKKKd....................',
      '....................dkkkkkkkkkkkkkkkkkkkkkkd....................',
      '....................dKKKkkkkkkkkkkkkkkkkKKKd....................',
      '....................dkkkkkkkkkkkkkkkkkkkkkkd....................',
      '....................dkkkkkkkkkkkkkkkkkkkkkkd....................'
    ],
    px2: [
      '................................................................',
      '................................................................',
      '................................................................',
      '................................................................',
      '.............................dddddd.............................',
      '..........................dddhhhjjjddd..........................',
      '.......................dddHHHhhhjjjHHHddd.......................',
      '......................djjjHHHhhhjjjHHHhhhd......................',
      '.....................dhjjjHHHhhhjjjHHHhhhjd.....................',
      '....................dhhjjjHHHHHHhhhHHHhhhjjd....................',
      '...................dhhhjjhHHHHHHhhhHHHHhhjjjd...................',
      '..................dhhhhjhhHHHHHHhhhHHHHHhjjjhd..................',
      '.................dhhhhhhhhHHHHHHhhhHHHHHHjjjhhd.................',
      '.................dhhhhhhhhHHHHHHhhhHHHHHHjjjhhd.................',
      '................dhhhhhhhhhHHHHHHhhhHHHHHHjjjhhhd................',
      '................dhhhhhhjhhHHHGGGGGGHHHHHhjjjhhhd................',
      '..............ddGggggggggggggGggggGggggggggggggGdd..............',
      '.............djjGggggggggggggGggggGggggggggggggGjjd.............',
      '.............djjGggggggggggggGggggGggggggggggggGjjd.............',
      '.............djjGGGGGGGGGGGGGGggggGGGGGGGGGGGGGGjjd.............',
      '.............djjjhhhssseeeeeeeeGGeeeeeeeessshhhjjjd.............',
      '.............djjjhhhssswwwwwwwwsswwwwwwwwssshhhjjjd.............',
      '.............djjjhhhssswwewwewwsswwewwewwssshhhjjjd.............',
      '.............djjjhhhssswwewwewwsswwewwewwssshhhjjjd.............',
      '.............djjjhhhssswweeeewwsswweeeewwssshhhjjjd.............',
      '.............djjjhhhssswweeeewwsswweeeewwssshhhjjjd.............',
      '.............djjjhhhssswwweewwwsswwweewwwssshhhjjjd.............',
      '.............djjjhhSSSssssssssssssssssssssSSShhjjjd.............',
      '.............djjjhhSSSssssssssssssssssssssSSShhjjjd.............',
      '...........dddjjjhhSSSsssssssmmmmmmsssssssSSShhjjjddd...........',
      '..........djjjjjjhhhddsssssssmmmmmmsssssssddhhhjjjjjjd..........',
      '..........djjjjjjhhhgdddsssssmSSSSmsssssdddghhhjjjjjjd..........',
      '..........djjjjjjhhhcbbbbbssssssssssssbbbbbchhhjjjjjjd..........',
      '..........djjjjjjhhhcbbbccccccssssccccccbbbchhhjjjjjjd..........',
      '..........djjjjjjhhccbbbccccccccccccccccbbbcchhjjjjjjd..........',
      '..........djjjjjjhhccbbbccccccccccccccccbbbcchhjjjjjjd..........',
      '..........djjjjjjhhccbbbccccccccccccccccbbbcchhjjjjjjd..........',
      '........dddjjjjjjhhccbbbccccccccccccccccbbbcchhjjjjjjd..........',
      '......ddbbbjjjjjjhhccbbbccccccccccccccccbbbcchhjjjjjjd..........',
      '.....dbbbgggjjjjjhhbabbbccccccccccccccccbbbbbhhjjjjjgd..........',
      '....dbbggggggjjjjhhbaaaaaaaaGGGGGGGGaaaaaaabbhhjjjjGGd..........',
      '....dbggGGGGGgjjjhhbabbbbbbbGggggggGbbbbbbbbbhhjjjdGGdddddddddd.',
      '...dbbgGGGGGGGgbbbbbabbbbbbbGgGGGGgGbbbbbbbbbbbssssggnnnnnnnnnnd',
      '...dbggGGGGGGGggbbbbdbbbbbbbGgGGGGgGbbbbbbbbbbbssssggnnnnnnnnnnd',
      '...dbgGGGgggGGGgbbbbdbbbbbbbGgGGGGgGbbbbbbbbsssssssggNNNNNNNNNNd',
      '..dbbgGGGgggGGGgbbbbdbbbbbbbGgGGGGgGbbbbbbbbsssssssggdddddddddd.',
      '..dbbgGGgggggGGgbbbbdaaaaaaaGggggggGaaaaaaabsssssssGGd..........',
      '..dbbgGGggGggGGgbbbbdbbbbbbbGGGGGGGGbbbbbbbbsssssddGGd..........',
      '..dbbgGGgggggGGgbbbbbccccccccccccccccccccccbsssssd.dd...........',
      '..dbbgGGGgggGGGgbbbbbccccccccccccccccccccccbddddd...............',
      '...dbgGGGgggGGGgbbbbbbbbbbbbbbbbbbbbbbbbbbbbd...................',
      '...dbggGGGGGGGggbddabbbbabbbbabbbbabbbbabbbbadd.................',
      '...dbbgGGGGGGGgbbbbabbbbabbbbabbbbabbbbabbbbabbd................',
      '....dbggGGGGGggbdbbabbbbabbbbabbbbabbbbabbbbabbd................',
      '....dbbgggggggbbdbbabbbbabbbbabbbbabbbbabbbbabbd................',
      '.....dbbbgggbbbddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaad................',
      '......ddbbbbbdd..ddddddddddSSssssssSSdddddddddd.................',
      '........ddddd.............dSSssssssSSd..........................',
      '.....................ddddddSSssssssSSdddddd.....................',
      '....................dKKKKKKKKKKKKKKKKKKKKKKd....................',
      '....................dkkkkkkkkkkkkkkkkkkkkkkd....................',
      '....................dKKKkkkkkkkkkkkkkkkkKKKd....................',
      '....................dkkkkkkkkkkkkkkkkkkkkkkd....................',
      '....................dkkkkkkkkkkkkkkkkkkkkkkd....................'
    ]
  }
];
