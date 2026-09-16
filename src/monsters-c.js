// 「あいさつの みち」に出る敵（すべてオリジナル）
//
// はじめての人むけの章（かいわ）を足したぶん、章ボスが足りなくなった。
// 章ボスは全章ちがう相手にする決まりなので、この道の住人を2体ふやす。
//
// 12x12 で描いてから EPX で 24x24 に上げ、外周に輪郭を1px足してある。
// ほかの敵と同じ手順なので、見え方の粗さがそろう。
export const MONSTERS_C = [
  {
    id: 'aisatsudori', name: 'アイサツドリ', en: 'Bowbird', area: 'phrase', hp: 4,
    msg: 'あうたびに ぺこりと おじぎを して くる。',
    pal: { d: '#14142A', a: '#D2782E', b: '#8A4415', c: '#FFEBC8' },
    px: [
      '.......ddaaaaaadd.......',
      '......daaaaaaaaaad......',
      '.....ddaaaaaaaaaadd.....',
      '....daaaaaaaaaaaaaad....',
      '....daaaccaaaaccaaad....',
      '...daaaaccaaaaccaaaad...',
      '...daaaaaaaaaaaaaaaad...',
      '....daaaaaaaaaaaaaad....',
      '.....daaaabbbbaaaad.....',
      '.....daaaabbbbaaaad.....',
      '...ddaaaaaaaaaaaaaadd...',
      '..daaaaaaaaaaaaaaaaaad..',
      '..daaaaccccccccccaaaad..',
      '.daaaaccccccccccccaaaad.',
      '.daaaaccccccccccccaaaad.',
      '.daaaaaccccccccccaaaaad.',
      '.daaaaaccccccccccaaaaad.',
      '..daaaaaaccccccaaaaaad..',
      '..daaaaaaaaaaaaaaaaaad..',
      '...ddaaaaaaaaaaaaaadd...',
      '.....dbbbbddddbbbbd.....',
      '......dbbd....dbbd......',
      '.......dd......dd.......',
      '........................'
    ]
  },
  {
    id: 'desumaru', name: 'デスマル', en: 'Desu Blob', area: 'phrase', hp: 5,
    msg: 'ぶんの おわりに くっついて はなれない。',
    pal: { d: '#14142A', a: '#3A7BC8', b: '#1E4A80', c: '#DCEBFF' },
    px: [
      '.....ddaaaaaaaaaadd.....',
      '....daaaaaaaaaaaaaad....',
      '...ddaaaaaaaaaaaaaadd...',
      '..daaaaaaaaaaaaaaaaaad..',
      '..daaaaaaaaaaaaaaaaaad..',
      '.daaaaaaaaaaaaaaaaaaaad.',
      '.daaaaccaaaaaaaaccaaaad.',
      '.daaaaccaaaaaaaaccaaaad.',
      '.daaaaaaaaaaaaaaaaaaaad.',
      '.daaaaaaaaaaaaaaaaaaaad.',
      '.daaaaaaccccccccaaaaaad.',
      '.daaaaaaccccccccaaaaaad.',
      '.daaaaaaaaaaaaaaaaaaaad.',
      '..daaaaaaaaaaaaaaaaaad..',
      '..daaaaaaaaaaaaaaaaaad..',
      '...daaaaaaaaaaaaaaaad...',
      '...daaabbbbbbbbbbaaad...',
      '....dabbbbbbbbbbbbad....',
      '.....dbbbbbbbbbbbbd.....',
      '......dbbbbbbbbbbd......',
      '......dbbbbbbbbbbd......',
      '.......ddbbbbbbdd.......',
      '.........dddddd.........',
      '........................'
    ]
  }
];
