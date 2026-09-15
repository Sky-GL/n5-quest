// ファビコンの元絵（16x16のドット絵）
// タイトルロゴと同じ「金色のN5」を、ゲームのウィンドウ色の上に置く。
// 16pxでも読めるよう、線を2px幅にして太らせている。
// ここから全サイズのPNG / SVG / ICO をビルド時に生成する。
export const ICON = {
  size: 16,
  bg: '#0F0F1E',   // ウィンドウの地色
  pal: { g: '#F8D048' },  // 金
  px: [
    '................',
    '................',
    '.gg...gg.gggggg.',
    '.ggg..gg.gggggg.',
    '.ggg..gg.gg.....',
    '.ggg..gg.gg.....',
    '.gg.g.gg.ggggg..',
    '.gg.g.gg.gggggg.',
    '.gg.g.gg.....gg.',
    '.gg..ggg.....gg.',
    '.gg..ggg.....gg.',
    '.gg..ggg.gg..gg.',
    '.gg...gg.gggggg.',
    '.gg...gg..gggg..',
    '................',
    '................'
  ]
};
