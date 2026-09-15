// 敵キャラのドット絵データ（すべてオリジナル）
// px: 12行×12文字。'.' は透明、その他の文字は pal のキー
// area: どのダンジョンに出るか（vocab / kanji / grammar / any / boss）
export const MONSTERS = [
  {
    id: 'kotonoha', name: 'ことのはガ', area: 'vocab', hp: 3,
    msg: 'ひらひらと ことばを まきちらしている。',
    pal: { a: '#3E8E4A', b: '#6FCE6A', c: '#BFF07A', d: '#14240F' },
    px: [
      '....a..a....',
      '...aa..aa...',
      '..aabbbbaa..',
      '.aabbccbbaa.',
      '.abbccccbba.',
      'aabbccccbbaa',
      'aabbcddcbbaa',
      '.abbccccbba.',
      '..abbccbba..',
      '...aabbaa...',
      '....a..a....',
      '............'
    ]
  },
  {
    id: 'goiworm', name: 'ゴイワーム', area: 'vocab', hp: 4,
    msg: 'ずかんの ページを かじって そだった。',
    pal: { a: '#7A4E9E', b: '#B47FD8', c: '#E4C6F5', d: '#18102A' },
    px: [
      '.....bbb....',
      '....bcccb...',
      '....bcdcb...',
      '....bcccb...',
      '.....bbb....',
      '....aaaaa...',
      '...aabbbaa..',
      '..aabbbbbaa.',
      '.aabbbbbbbaa',
      '.aabbbbbbbaa',
      '..aaabbbaaa.',
      '....aaaaa...'
    ]
  },
  {
    id: 'fudeobake', name: 'ふでおばけ', area: 'kanji', hp: 3,
    msg: 'すみを たらしながら ういている。',
    pal: { a: '#8B5A2B', b: '#C89050', c: '#1C1C2E', e: '#F0E060' },
    px: [
      '.....aa.....',
      '.....aa.....',
      '....abba....',
      '....abba....',
      '...abbbba...',
      '...abbbba...',
      '..acccccca..',
      '..cceccecc..',
      '..cccccccc..',
      '...cccccc...',
      '....cccc....',
      '.....cc.....'
    ]
  },
  {
    id: 'kanjigolem', name: 'カンジゴーレム', area: 'kanji', hp: 5,
    msg: 'からだが すべて へんと つくりで できている。',
    pal: { a: '#5A6472', b: '#8C97A8', c: '#D2DAE6', d: '#E8603A' },
    px: [
      '..aaaaaaaa..',
      '.abbbbbbbba.',
      '.abcbbbbcba.',
      '.abdbbbbdba.',
      '.abbbccbbba.',
      '.abbbbbbbba.',
      '..aabbbbaa..',
      'aaaabbbbaaaa',
      'abbaabbaabba',
      'aaaabbbbaaaa',
      '...aa..aa...',
      '..aaa..aaa..'
    ]
  },
  {
    id: 'bunporobo', name: 'ブンポウロボ', area: 'grammar', hp: 4,
    msg: 'せつぞくの きそくを まもらせようとしてくる。',
    pal: { a: '#33528C', b: '#7CA6E0', c: '#FF5A4A' },
    px: [
      '...aaaaaa...',
      '..abbbbbba..',
      '..abcbbcba..',
      '..abbbbbba..',
      '..abbccbba..',
      '...aaaaaa...',
      '..aaaaaaaa..',
      '.abaaaaaaba.',
      '.abaaaaaaba.',
      '..aaaaaaaa..',
      '...aa..aa...',
      '..aaa..aaa..'
    ]
  },
  {
    id: 'jokenryu', name: 'ジョウケンリュウ', area: 'grammar', hp: 5,
    msg: 'じょうけんを みたさないと とおしてくれない。',
    pal: { a: '#1E6E5E', b: '#37A88E', c: '#8FE0CC', d: '#F8D048' },
    px: [
      '..aa....aa..',
      '..aa....aa..',
      '.aaaaaaaaaa.',
      '.abbbbbbbba.',
      '.abdbbbbdba.',
      '.abbbbbbbba.',
      '.aabbbbbbaa.',
      '..acccccca..',
      '..acacacac..',
      '..acccccca..',
      '...aaaaaa...',
      '....a..a....'
    ]
  },
  {
    id: 'machigai', name: 'マチガイドクロ', area: 'any', hp: 4,
    msg: 'にどめの まちがいを まちかまえている。',
    pal: { a: '#E8E4D8', b: '#20202E' },
    px: [
      '...aaaaaa...',
      '..aaaaaaaa..',
      '.aaaaaaaaaa.',
      '.aabbaabbaa.',
      '.aabbaabbaa.',
      '.aaaaaaaaaa.',
      '..aaabbaaa..',
      '...aaaaaa...',
      '..a.a.a.a...',
      '..aaaaaaa...',
      '..a.a.a.a...',
      '............'
    ]
  },
  {
    id: 'wasureme', name: 'ワスレメダマ', area: 'any', hp: 3,
    msg: 'みつめていると おぼえたことを わすれそうになる。',
    pal: { a: '#3A2E6E', b: '#6B58C4', c: '#FFFFFF', d: '#1A1020' },
    px: [
      '....aaaa....',
      '..aabbbbaa..',
      '.abbccccbba.',
      '.abcccccccba',
      'abbcccddccbb',
      'abbcccddccbb',
      'abbccccccccb',
      '.abbccccbba.',
      '..aabbbbaa..',
      '...a.aa.a...',
      '..a...a...a.',
      '.a....a....a'
    ]
  },
  {
    id: 'goukaku', name: 'ゴウカクノツカイ', area: 'boss', hp: 10,
    msg: 'ごうかくの しるしを もって まちうけている。',
    pal: { a: '#C8A030', b: '#F0D878', c: '#FFFFFF', d: '#3A2E10' },
    px: [
      '....aaaa....',
      '...abbbba...',
      '..abbccbba..',
      '..abcddcba..',
      '..abbccbba..',
      '...abbbba...',
      '.aaabbbbaaa.',
      'aabbbbbbbbaa',
      '.aabbbbbbaa.',
      '..aabbbbaa..',
      '...aa..aa...',
      '..aa....aa..'
    ]
  }
];
