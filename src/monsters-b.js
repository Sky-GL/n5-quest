// 敵キャラのドット絵 その2（すべてオリジナル）
// 形式は monsters.js と同じ。12行×12文字、'.' は透明
export const MONSTERS_B = [
  // ---- 語彙の森 ----
  {
    id: 'ruigigoke', name: 'ソックリゴケ', area: 'vocab', hp: 3,
    msg: 'にた いみの ことばに ばけて ふえていく。',
    pal: { a: '#5E6B22', b: '#8EA83A', c: '#C8D46A', d: '#1E2210' },
    px: [
      '....aaaa....',
      '..aabbbbaa..',
      '.abbccccbba.',
      'abbcdccdcbba',
      'abbcccccccba',
      'abbccccccbba',
      '.abbccccbba.',
      '..abbccbba..',
      '.aabbbbbbaa.',
      'aabbbbbbbbaa',
      'aa.aaaaaa.aa',
      '.a..a..a..a.'
    ]
  },
  {
    id: 'katakanabachi', name: 'カタカナバチ', area: 'vocab', hp: 4,
    msg: 'カタカナの ことばを あつめる はち。',
    pal: { a: '#C8A02A', b: '#2A2418', c: '#9EC8E0', d: '#E85A2A' },
    px: [
      '...aaaaaa...',
      '..addaaddaa.',
      '...aaaaaa...',
      'cc..aaaa..cc',
      'ccc.aaaa.ccc',
      'cc..bbbb..cc',
      '...aaaaaa...',
      '...bbbbbb...',
      '...aaaaaa...',
      '...bbbbbb...',
      '....aaaa....',
      '.....bb.....'
    ]
  },
  // ---- 漢字の遺跡 ----
  {
    id: 'bushuhebi', name: 'ブシュヘビ', area: 'kanji', hp: 4,
    msg: 'かんじの ぶひんに わかれて、また まきつく。',
    pal: { a: '#2E6B4A', b: '#4FA86E', c: '#C8E8A0', d: '#F0D030' },
    px: [
      '......aaa...',
      '.....abbba..',
      '.....adbda..',
      '.....abbba..',
      '....abbba...',
      '...abbba....',
      '..abbba.....',
      '..abbba.....',
      '...abbba....',
      '....abccba..',
      '.....abccba.',
      '......abccb.'
    ]
  },
  {
    id: 'jukugogani', name: 'ジュクゴガニ', area: 'kanji', hp: 5,
    msg: 'ふたつの はさみで かんじを くみあわせる。',
    pal: { a: '#A83A2A', b: '#E06A4A', c: '#F8C8A0', d: '#2A1810' },
    px: [
      'aa........aa',
      'abba....abba',
      'abba....abba',
      '.aa......aa.',
      '..a.aaaa.a..',
      '..aabbbbaa..',
      '.abbdbbdbba.',
      'abbbbbbbbbba',
      'abbccccccbba',
      '.abbbbbbbba.',
      '..aaaaaaaa..',
      '.a..a..a..a.'
    ]
  },
  // ---- 文法の塔 ----
  {
    id: 'joshikurage', name: 'ジョシクラゲ', area: 'grammar', hp: 3,
    msg: '「は」と「が」の あいだを ただよっている。',
    pal: { a: '#5A3A8E', b: '#8E6ACE', c: '#D8C8F0', d: '#F8D048' },
    px: [
      '...aaaaaa...',
      '.aabbbbbbaa.',
      'abbccccccbba',
      'abcdcccdcbba',
      'abbccccccbba',
      '.abbbbbbbba.',
      '..aabbbbaa..',
      '.a.a.aa.a.a.',
      '.b.b..bb..b.',
      '..b.b..b.b..',
      '.b..b...b.b.',
      '..b..b...b..'
    ]
  },
  {
    id: 'keigokishi', name: 'テイネイキシ', area: 'grammar', hp: 5,
    msg: '「です・ます」で いうまで みちを あけない。',
    pal: { a: '#4A5470', b: '#8E9AB8', c: '#D8DEF0', d: '#C83A3A', e: '#F8D048' },
    px: [
      '.....dd.....',
      '....dddd....',
      '...aaaaaa...',
      '..abbbbbba..',
      '..abbbbbba..',
      '..acccccca..',
      '..abbbbbba..',
      '...aaaaaa...',
      '.aabbeebbaa.',
      'aabbbeebbbaa',
      'aabbbbbbbbaa',
      '.aa......aa.'
    ]
  },
  // ---- どこにでも出る ----
  {
    id: 'carelesskoumori', name: 'ケアレスコウモリ', area: 'any', hp: 3,
    msg: 'わかったはずの もんだいを もちさる。',
    pal: { a: '#3A2E4E', b: '#6E5A8E', c: '#F0C830' },
    px: [
      '.a........a.',
      '.aa......aa.',
      '.aaa.aa.aaa.',
      'aaaaaaaaaaaa',
      'abbacaacabba',
      'abbbaaaaabba',
      '.bbbaaaabbb.',
      '..bbaaaabb..',
      '...aaaaaa...',
      '....aaaa....',
      '....a..a....',
      '............'
    ]
  },
  {
    id: 'nemukegumo', name: 'ネムケグモ', area: 'any', hp: 4,
    msg: 'よる おそくに あらわれて、あたまを ぼんやりさせる。',
    pal: { a: '#2E2A3E', b: '#5A5470', c: '#C83A5A', d: '#8E88A8' },
    px: [
      'd..........d',
      '.d........d.',
      '..d.d..d.d..',
      '...ddaadd...',
      '..daaaaaad..',
      '.daabbbbaad.',
      'daabcbbcbaad',
      '.aabbbbbbaa.',
      '.aabbbbbbaa.',
      '..aabbbbaa..',
      '..d.aaaa.d..',
      '.d...aa...d.'
    ]
  },
  // ---- ボス ----
  {
    id: 'moshinomaou', name: 'タメシノマオウ', area: 'boss', hp: 12,
    msg: 'ほんばんと おなじ すがたで、ちからを うつしだす。',
    pal: { a: '#4A1030', b: '#8E2050', c: '#E85A7A', d: '#F8D048' },
    px: [
      'aa........aa',
      'aaa......aaa',
      '.aaa....aaa.',
      '..aaaaaaaa..',
      '.abbbbbbbba.',
      'abbdbbbbdbba',
      'abbbbbbbbbba',
      'abbccccccbba',
      '.abbccccbba.',
      'aabbbbbbbbaa',
      'aa.aaaaaa.aa',
      '.a..a..a..a.'
    ]
  }
];
