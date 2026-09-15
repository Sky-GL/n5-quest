// 勇者のドット絵（すべてオリジナル）
// px : 通常ポーズ（24行×24文字）。'.' は透明、その他の文字は pal のキー
// px2: 攻撃ポーズ。剣を頭の上まで振り上げ、腕を伸ばした差分。
//      攻撃アニメの間だけ px2 に差し替えることで、踏み込みだけでなく腕も動く。
// モンスター(12x12)の4倍の密度。表情・陰影・装備の作り分けができる大きさにしている。
//
// パレットの役割
//   h/H 髪(影/明)   s/S 肌(明/影)   e 瞳   w 白目   m 口
//   a/b/c 服(影/中/明)   g/G 金(明/影)   k/K 靴(影/明)
//   n/N 剣身(明/影)   P/p マント(影/明)
export const HEROES = [
  {
    id: 'hero_m', name: 'おとこ', label: 'おとこの ゆうしゃ',
    pal: {
      h: '#5A3A1E', H: '#8B5A2B',
      s: '#F2C9A0', S: '#D9A87C', e: '#2A3A5E', w: '#FFFFFF', m: '#9A6A4A',
      a: '#1F3E6E', b: '#2F5A9E', c: '#5E8FD8',
      g: '#F8D048', G: '#B8860B',
      k: '#3A2A1E', K: '#5A4030',
      n: '#E8ECF8', N: '#A8B0C8',
      P: '#5E1028', p: '#8E2040'
    },
    px: [
      '.......hhhhhhhh.........',
      '......hHHHHHHHHh........',
      '.....hHHHHHHHHHHh.......',
      '.....hHHHHHHHHHHh...nN..',
      '.....hHHggggggHHh...nN..',
      '.....hHssssssssHh...nN..',
      '.....hHswesswesHh...nN..',
      '.....hHswesswesHh...nN..',
      '.....hHssSssSssHh...nN..',
      '.....hHsssmmsssHh...nN..',
      '......hssssssssh....nN..',
      '.........SssS.......nN..',
      '..PPpaaaaaaaaaaaa...nN..',
      '..PPpabbbcggcbbba...nN..',
      '..PPpabbbbggbbbbaassnN..',
      '..PPpabbbbbbbbbbaasGGGG.',
      '..PPpaGggggggggGa...KK..',
      '..PPpabbbbbbbbbba...KK..',
      '...Ppabbba..abbba.......',
      '....Pabbba..abbba.......',
      '.....abbba..abbba.......',
      '.....kKKKk..kKKKk.......',
      '....kkKKKk..kKKKkk......',
      '....kkkkkk..kkkkkk......'
    ],
    px2: [
      '.......hhhhhhhh.....nN..',
      '......hHHHHHHHHh....nN..',
      '.....hHHHHHHHHHHh...nN..',
      '.....hHHHHHHHHHHh...nN..',
      '.....hHHggggggHHh...nN..',
      '.....hHssssssssHh...nN..',
      '.....hHswesswesHh...nN..',
      '.....hHswesswesHh..GGGG.',
      '.....hHssSssSssHh.ssKK..',
      '.....hHsssmmsssHh.ssKK..',
      '......hssssssssh..s.....',
      '.........SssS.....s.....',
      '..PPpaaaaaaaaaaaa.s.....',
      '..PPpabbbcggcbbbaas.....',
      '..PPpabbbbggbbbbaa......',
      '..PPpabbbbbbbbbbaa......',
      '..PPpaGggggggggGa.......',
      '..PPpabbbbbbbbbba.......',
      '...Ppabbba..abbba.......',
      '....Pabbba..abbba.......',
      '.....abbba..abbba.......',
      '.....kKKKk..kKKKk.......',
      '....kkKKKk..kKKKkk......',
      '....kkkkkk..kkkkkk......'
    ]
  },
  {
    id: 'hero_f', name: 'おんな', label: 'おんなの ゆうしゃ',
    pal: {
      h: '#B5762A', H: '#E8B45A',
      s: '#F2C9A0', S: '#D9A87C', e: '#4A2A5E', w: '#FFFFFF', m: '#C06A7A',
      a: '#6E1A42', b: '#A8306A', c: '#D86A9A',
      g: '#F8D048', G: '#B8860B',
      k: '#3A2A1E', K: '#5A4030',
      n: '#E8ECF8', N: '#A8B0C8'
    },
    px: [
      '.......hhhhhhhh.........',
      '......hHHHHHHHHh........',
      '.....hHHHHHHHHHHh.......',
      '.....hHHHHHHHHHHh...nN..',
      '....hHHHggggggHHHh..nN..',
      '....hHHssssssssHHh..nN..',
      '....hHHswesswesHHh..nN..',
      '....hHHswesswesHHh..nN..',
      '....hHHssSssSssHHh..nN..',
      '....hHHsssmmsssHHh..nN..',
      '....hHHhsssssshHHh..nN..',
      '....hHH..SssS..HHh..nN..',
      '...hHaaaaaaaaaaaaHh.nN..',
      '...hHabbbcggcbbbaHh.nN..',
      '...hHabbbbggbbbbaassnN..',
      '...hHabbbbbbbbbbaasGGGG.',
      '...hHaGggggggggGa...KK..',
      '....habbbbbbbbbba...KK..',
      '....abbbbbbbbbbbbba.....',
      '...abbbbbbbbbbbbbbba....',
      '...aaaaaaaaaaaaaaaaa....',
      '.......sss....sss.......',
      '......kKKk...kKKk.......',
      '.....kkkkk..kkkkk.......'
    ],
    px2: [
      '.......hhhhhhhh.....nN..',
      '......hHHHHHHHHh....nN..',
      '.....hHHHHHHHHHHh...nN..',
      '.....hHHHHHHHHHHh...nN..',
      '....hHHHggggggHHHh..nN..',
      '....hHHssssssssHHh..nN..',
      '....hHHswesswesHHh..nN..',
      '....hHHswesswesHHh.GGGG.',
      '....hHHssSssSssHHhssKK..',
      '....hHHsssmmsssHHhssKK..',
      '....hHHhsssssshHHh.s....',
      '....hHH..SssS..HHh.s....',
      '...hHaaaaaaaaaaaaHhs....',
      '...hHabbbcggcbbbaHhs....',
      '...hHabbbbggbbbbaas.....',
      '...hHabbbbbbbbbbaa......',
      '...hHaGggggggggGa.......',
      '....habbbbbbbbbba.......',
      '....abbbbbbbbbbbbba.....',
      '...abbbbbbbbbbbbbbba....',
      '...aaaaaaaaaaaaaaaaa....',
      '.......sss....sss.......',
      '......kKKk...kKKk.......',
      '.....kkkkk..kkkkk.......'
    ]
  }
];
