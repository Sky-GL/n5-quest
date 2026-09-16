// ファビコンの元絵（16x16のドット絵）
// タイトルの紋章と同じ意匠——青と紅の盾に白いⅤ——を16pxまで落としたもの。
// もとは金色の「Ｎ５」の字だったが、紋章を入れたので見た目を揃えた。
// 16pxでも形が潰れないよう、枠は1px・Ⅴは2px幅にしている。
// ここから全サイズのPNG / SVG / ICO をビルド時に生成する。
export const ICON = {
  size: 16,
  bg: '#0F0F1E',   // ウィンドウの地色
  pal: {
    g: '#F8D048',  // 金（枠）
    b: '#3A6ABE',  // 青
    r: '#C03A58',  // 紅
    w: '#FFFFFF'   // 白（Ⅴ）
  },
  px: [
    '................',
    '..gggggggggggg..',
    '..gbbbbbrrrrrg..',
    '..gwwbbbrrrwwg..',
    '..gwwbbbrrrwwg..',
    '..gbwwbbrrwwrg..',
    '..gbwwbbrrwwrg..',
    '..gbbwwbrwwrrg..',
    '..gbbwwbrwwrrg..',
    '..gbbbwwwwrrrg..',
    '..ggbbbwwrrrgg..',
    '...ggbbbrrrgg...',
    '....ggbbrrgg....',
    '.....gggggg.....',
    '................',
    '................'
  ]
};
