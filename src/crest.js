// タイトルの後ろに敷く紋章（56x56のドット絵）
// 青と紅で四分割した盾にローマ数字の「Ⅴ」、上に交差した剣の刃先と星、下にリボン。
// 漢字の「五」も試したが、N5学習者がこれから習う字を紋章で読ませるのは筋が悪く、
// タイトルも算用数字の「Ｎ５」なので、ローマ数字で揃えている。
// ファビコン(icon.js)とは別物。あちらは16pxで読ませる字、こちらは飾り。
export const CREST = {
  size: 56,
  pal: {
    g: '#F8D048',   // 金
    y: '#FFF0A8',   // 金のハイライト（内側の細線）
    o: '#B8860B',   // 金の陰（四分割の境目）
    b: '#3A6ABE',   // 青（上）
    B: '#24477E',   // 青（下・陰）
    r: '#C03A58',   // 紅（上）
    R: '#7E1E38',   // 紅（下・陰）
    s: '#C3CAE6',   // 剣の刃
    S: '#79809E',   // 刃の陰
    w: '#FFFFFF',   // 白（Ⅴ）
    k: '#14142A'    // 縁取り
  },
  px: [
    '...........................y............................',
    '..........................yyy...........................',
    '.........................yyyyy..........................',
    '....Sss...................yyy.....................ssSS..',
    '.....Sss...................y.....................ssSS...',
    '......Sss.......................................ssSS....',
    '.......Sss.....................................ssSS.....',
    '........Sss...................................ssSS......',
    '.........SsggggggggggggggggggggggggggggggggggssSS.......',
    '..........SggggggggggggggggggggggggggggggggggsSS........',
    '...........ggggggggggggggggggggggggggggggggggSS.........',
    '...........yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyS..........',
    '...........gggybbbbbbbbbbbboorrrrrrrrrrrryggg...........',
    '...........gggybbbbbbbbbbbboorrrrrrrrrrrryggg...........',
    '...........gggybbbbbbbbbbbboorrrrrrrrrrrryggg...........',
    '...........gggybbbbbbbbbbbboorrrrrrrrrrrryggg...........',
    '...........gggybbbbbbbbbbbboorrrrrrrrrrrryggg...........',
    '...........gggybbkkkkkkkkkboorkkkkkkkkkrryggg...........',
    '...........gggybbkwwwwwwwkboorkwwwwwwwkrryggg...........',
    '...........gggybbkwwwwwwwkboorkwwwwwwwkrryggg...........',
    '...........gggybbkwwwwwwwkboorkwwwwwwwkrryggg...........',
    '...........gggybbkkwwwwwkkboorkkwwwwwkkrryggg...........',
    '...........gggybbbkwwwwwkkboorkkwwwwwkrrryggg...........',
    '...........gggybbbkkwwwwwkboorkwwwwwkkrrryggg...........',
    '...........gggybbbbkwwwwwkbookkwwwwwkrrrryggg...........',
    '...........gggybbbbkwwwwwkkookwwwwwkkrrrryggg...........',
    '...........gggybbbbkkwwwwwkookwwwwwkrrrrryggg...........',
    '...........gggybbbbbkwwwwwkkkkwwwwwkrrrrryggg...........',
    '...........gggybbbbbkkwwwwwkkwwwwwkkrrrrryggg...........',
    '...........gggyooooookwwwwwkkwwwwwkooooooyggg...........',
    '...........gggyooooookwwwwwkkwwwwwkooooooyggg...........',
    '...........gggyRRRRRRkkwwwwwwwwwwkkBBBBBByggg...........',
    '...........gggyRRRRRRRkwwwwwwwwwwkBBBBBBByggg...........',
    '...........gggyRRRRRRRkwwwwwwwwwwkBBBBBBByggg...........',
    '...........gggyRRRRRRRkkwwwwwwwwkkBBBBBBByggg...........',
    '...........gggyRRRRRRRRkwwwwwwwwkBBBBBBBByggg...........',
    '...........gggyRRRRRRRRkwwwwwwwwkBBBBBBBByggg...........',
    '...........ggggyRRRRRRRkkwwwwwwkkBBBBBBBygggg...........',
    '............ggggyRRRRRRRkwwwwwwkBBBBBBBygggg............',
    '.............gggyRRRRRRRkkwwwwwkBBBBBBByggg.............',
    '.............ggggyRRRRRRRkkkkkkkBBBBBBygggg.............',
    '..............ggggyRRRRRRRRooBBBBBBBBygggg..............',
    '...............ggggyRRRRRRRooBBBBBBBygggg...............',
    '.........gggggggggggyRRRRRRooBBBBBByggggggggggg.........',
    '........rrrrrrrrrggggyRRRRRooBBBBByggggrrrrrrrrr........',
    '.......RRRRRRRRRRRggggyRRRRooBBBByggggRRRRRRRRRRR.......',
    '........RRRRRRRRRRRggggyRRRooBBByggggRRRRRRRRRRR........',
    '.........gggggggggggggggyRRooBByggggggggggggggg.........',
    '.....................gggggyooyggggg.....................',
    '.......................gggggggggg.......................',
    '.........................gggggg.........................',
    '........................................................',
    '........................................................',
    '........................................................',
    '........................................................',
    '........................................................'
  ]
};
