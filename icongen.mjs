// ドット絵からファビコン一式を生成する（ビルド時のみ使用。外部依存なし）
// PNGはNode標準のzlibだけで組み立てる。sharp等を入れずに済ませるため。
import zlib from 'node:zlib';

// --- CRC32（PNGのチャンク検査用） ---
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();
function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

// RGBA画素列(Buffer, w*h*4) から8bit RGBAのPNGを作る
export function encodePng(w, h, rgba) {
  const stride = w * 4;
  const raw = Buffer.alloc((stride + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (stride + 1)] = 0;                       // フィルタなし
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;    // bit depth
  ihdr[9] = 6;    // color type: RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

const hex = c => [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];

// ドット絵を size x size に最近傍で拡大して RGBA を作る
function rasterize(icon, size) {
  const n = icon.size;
  const bg = hex(icon.bg);
  const pal = {};
  for (const k of Object.keys(icon.pal)) pal[k] = hex(icon.pal[k]);
  const out = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    const sy = Math.min(n - 1, Math.floor(y * n / size));
    for (let x = 0; x < size; x++) {
      const sx = Math.min(n - 1, Math.floor(x * n / size));
      const ch = icon.px[sy][sx];
      const c = pal[ch] || bg;
      const o = (y * size + x) * 4;
      out[o] = c[0]; out[o + 1] = c[1]; out[o + 2] = c[2]; out[o + 3] = 255;
    }
  }
  return out;
}

export const pngOf = (icon, size) => encodePng(size, size, rasterize(icon, size));

// PNGを1枚だけ収めたICO（ブラウザが既定で取りに来る /favicon.ico 用）
export function icoOf(icon, size = 32) {
  const png = pngOf(icon, size);
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);   // reserved
  header.writeUInt16LE(1, 2);   // type: icon
  header.writeUInt16LE(1, 4);   // count
  const entry = Buffer.alloc(16);
  entry[0] = size === 256 ? 0 : size;   // width（256は0で表す）
  entry[1] = size === 256 ? 0 : size;   // height
  entry[2] = 0;                          // パレット色数
  entry[3] = 0;                          // reserved
  entry.writeUInt16LE(1, 4);             // color planes
  entry.writeUInt16LE(32, 6);            // bits per pixel
  entry.writeUInt32LE(png.length, 8);    // データ長
  entry.writeUInt32LE(6 + 16, 12);       // データ開始位置
  return Buffer.concat([header, entry, png]);
}

// 同じドット絵をSVGでも出す（高解像度で滲まない）
export function svgOf(icon) {
  const n = icon.size;
  const rects = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const c = icon.pal[icon.px[y][x]];
      if (!c) continue;
      // 横に連続する同色を1つのrectにまとめる
      let w = 1;
      while (x + w < n && icon.px[y][x + w] === icon.px[y][x]) w++;
      rects.push(`<rect x="${x}" y="${y}" width="${w}" height="1" fill="${c}"/>`);
      x += w - 1;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges">` +
    `<rect width="${n}" height="${n}" fill="${icon.bg}"/>${rects.join('')}</svg>\n`;
}
