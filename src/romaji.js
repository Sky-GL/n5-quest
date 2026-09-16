// かな → ローマ字。
// 「日本語が完全に初めて」の人は、かなも読みの選択肢も読めない。
// ローマ字はデータに持たず、ここで実行時に変換する（805語の読みにもそのまま効く）。
//
// このファイルはビルド時に data.js へそのまま埋め込まれ、アプリからも
// build.mjs の検証からも同じ実装が使われる。二重に持たないための作り。
export const KANA_BASE = {
  'あ':'a','い':'i','う':'u','え':'e','お':'o',
  'か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko',
  'が':'ga','ぎ':'gi','ぐ':'gu','げ':'ge','ご':'go',
  'さ':'sa','し':'shi','す':'su','せ':'se','そ':'so',
  'ざ':'za','じ':'ji','ず':'zu','ぜ':'ze','ぞ':'zo',
  'た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to',
  'だ':'da','ぢ':'ji','づ':'zu','で':'de','ど':'do',
  'な':'na','に':'ni','ぬ':'nu','ね':'ne','の':'no',
  'は':'ha','ひ':'hi','ふ':'fu','へ':'he','ほ':'ho',
  'ば':'ba','び':'bi','ぶ':'bu','べ':'be','ぼ':'bo',
  'ぱ':'pa','ぴ':'pi','ぷ':'pu','ぺ':'pe','ぽ':'po',
  'ま':'ma','み':'mi','む':'mu','め':'me','も':'mo',
  'や':'ya','ゆ':'yu','よ':'yo',
  'ら':'ra','り':'ri','る':'ru','れ':'re','ろ':'ro',
  'わ':'wa','ゐ':'i','ゑ':'e','を':'o',
  'ゔ':'vu'
};
const SMALL_Y = { 'ゃ':'ya', 'ゅ':'yu', 'ょ':'yo' };
const SMALL_V = { 'ぁ':'a', 'ぃ':'i', 'ぅ':'u', 'ぇ':'e', 'ぉ':'o' };

// カタカナはコードポイントをずらすだけでひらがなに重なる
function toHira(ch) {
  const c = ch.charCodeAt(0);
  return (c >= 0x30A1 && c <= 0x30F6) ? String.fromCharCode(c - 0x60) : ch;
}

export function toRomaji(s) {
  const t = [...String(s || '')];
  const out = [];
  for (let i = 0; i < t.length; i++) {
    const ch = toHira(t[i]);
    const nx = toHira(t[i + 1] || '');
    const base = KANA_BASE[ch];

    // 拗音（きゃ・しゅ・ちょ …）
    if (base && SMALL_Y[nx]) {
      const y = SMALL_Y[nx];
      if (base === 'shi') out.push('sh' + y[1]);
      else if (base === 'chi') out.push('ch' + y[1]);
      else if (base === 'ji') out.push('j' + y[1]);
      else out.push(base.slice(0, -1) + y);
      i++;
      continue;
    }
    // 外来語の小さい母音（ファ・ティ・ウィ …）
    if (base && SMALL_V[nx]) {
      const v = SMALL_V[nx];
      if (ch === 'う') out.push('w' + v);
      else if (base.length === 1) out.push(base === v ? v : base + v);
      else out.push(base.slice(0, -1) + v);
      i++;
      continue;
    }
    // 促音（っ）は次の子音を重ねる。「っち」は tchi
    if (ch === 'っ') {
      const b2 = KANA_BASE[toHira(t[i + 1] || '')] || '';
      if (b2) out.push(b2[0] === 'c' ? 't' : b2[0]);
      continue;
    }
    // 長音（ー）は直前の母音をのばす
    if (ch === 'ー') {
      const prev = out[out.length - 1] || '';
      const v = prev.slice(-1);
      if ('aiueo'.indexOf(v) >= 0) out.push(v);
      continue;
    }
    // ん。母音と y の前は n' にして「きんいろ→kin'iro」の読み違いを防ぐ
    if (ch === 'ん') {
      const b2 = KANA_BASE[toHira(t[i + 1] || '')] || '';
      out.push(/^[aiueoy]/.test(b2) ? "n'" : 'n');
      continue;
    }
    out.push(base !== undefined ? base : t[i]);
  }
  return out.join('');
}
