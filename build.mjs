// src/ のデータとテンプレートを結合して 1ファイルのアプリを出力する
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(root, 'src');
const out = path.join(root, 'n5-quest.html');

const VOCAB_FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const vocab = [];
for (const s of VOCAB_FILES) {
  const m = await import(new URL(`./src/vocab-${s}.js`, import.meta.url));
  vocab.push(...m['VOCAB_' + s.toUpperCase()]);
}
const { KANJI_A } = await import(new URL('./src/kanji-a.js', import.meta.url));
const { KANJI_B } = await import(new URL('./src/kanji-b.js', import.meta.url));
const { GRAMMAR_A } = await import(new URL('./src/grammar-a.js', import.meta.url));
const { GRAMMAR_B } = await import(new URL('./src/grammar-b.js', import.meta.url));
const { MONSTERS: MON_A } = await import(new URL('./src/monsters.js', import.meta.url));
const { MONSTERS_B } = await import(new URL('./src/monsters-b.js', import.meta.url));
const { HEROES } = await import(new URL('./src/heroes.js', import.meta.url));
const { ICON } = await import(new URL('./src/icon.js', import.meta.url));
const { pngOf, icoOf, svgOf } = await import(new URL('./icongen.mjs', import.meta.url));

const kanji = [...KANJI_A, ...KANJI_B];
const grammar = [...GRAMMAR_A, ...GRAMMAR_B];
const MONSTERS = [...MON_A, ...MONSTERS_B];

// --- 検証 ---
const errs = [];

// N5版の心臓部。学習者は漢字が読めない前提なので、
// 画面に出る日本語は「ルビ付きの漢字」か「かな」のどちらかしか許さない。
// ここを機械で担保しておかないと、あとから全データを見直す羽目になる。
const RUBY = /\[([^\[\]|]+)\|([^\[\]|]+)\]/g;
const KANJI_CH = /[々一-鿿]/;
const KANA_ONLY = /^[ぁ-ゟ゠-ヿ]+$/;
function checkRuby(where, s) {
  if (typeof s !== 'string') return;
  RUBY.lastIndex = 0;
  let m;
  while ((m = RUBY.exec(s))) {
    if (!KANJI_CH.test(m[1])) errs.push(`${where} ルビの親文字に漢字がない: ${m[0]}`);
    if (!KANA_ONLY.test(m[2])) errs.push(`${where} ルビがかなではない: ${m[0]}`);
  }
  const bare = s.replace(RUBY, '');
  if (KANJI_CH.test(bare)) {
    const ch = bare.match(new RegExp(KANJI_CH.source, 'g')).join('');
    errs.push(`${where} ふりがなの無い漢字「${ch}」: ${s}`);
  }
  if (/[\[\]]/.test(bare)) errs.push(`${where} ルビの書き方が壊れている: ${s}`);
}
// 出題の穴埋めに使う 【…】 が ちょうど1組あるか
// 「〜から〜まで」のように2か所を同時に問う文型があるので、1〜2組まで許す
function checkMark(where, s) {
  const pairs = s.match(/【[^【】]*】/g) || [];
  const o = (s.match(/【/g) || []).length, c = (s.match(/】/g) || []).length;
  if (o !== c || o !== pairs.length) { errs.push(`${where} 【】の対応が壊れている: ${s}`); return; }
  if (pairs.length < 1 || pairs.length > 2) errs.push(`${where} 【】は1〜2組にする（いまは${pairs.length}組）: ${s}`);
  pairs.forEach(p => { if (p.length < 3) errs.push(`${where} 【】の中が空: ${s}`); });
}

const seen = new Set();
const req = (arr, name, n) => arr.forEach((r, i) => {
  if (!Array.isArray(r) || r.length !== n) { errs.push(`${name}[${i}] フィールド数が ${Array.isArray(r) ? r.length : '?'}（${n}であるべき）: ${r && r[0]}`); return; }
  for (let f = 0; f < n; f++) {
    const v = r[f];
    if (Array.isArray(v)) continue;
    if (typeof v !== 'string') errs.push(`${name}[${i}] 型不正 (field ${f}): ${r[0]}`);
    // 訓読みを持たない漢字（校・気・週など）があるので、そこだけ空を許す
    else if (!v.trim() && !(name === 'kanji' && f === 2)) errs.push(`${name}[${i}] 空フィールド (field ${f}): ${r[0]}`);
  }
  const key = name + ':' + r[0];
  if (seen.has(key)) errs.push(`${name} 重複: ${r[0]}`);
  seen.add(key);
});
req(vocab, 'vocab', 6);
req(kanji, 'kanji', 5);
req(grammar, 'grammar', 6);

// 語彙: 品詞・意味・例文はそのまま画面に出るのでルビが要る
vocab.forEach((r, i) => {
  const w = `vocab[${i}] ${r[0]}`;
  checkRuby(w + ' 品詞', r[2]);
  checkRuby(w + ' 意味', r[3]);
  checkRuby(w + ' 例文', r[5]);
  checkMark(w + ' 例文', r[5]);
  if (!KANA_ONLY.test(r[1])) errs.push(`${w} 読みがかなではない: ${r[1]}`);
});
// 文法
grammar.forEach((r, i) => {
  const w = `grammar[${i}] ${r[0]}`;
  checkRuby(w + ' 接続', r[1]);
  checkRuby(w + ' 意味', r[2]);
  checkRuby(w + ' 例文', r[4]);
  checkRuby(w + ' 注意', r[5]);
  checkMark(w + ' 例文', r[4]);
  if (KANJI_CH.test(r[0])) errs.push(`${w} 文型に漢字が入っている（N5では読めない）`);
});
// 漢字: 字義と、例語の意味にルビが要る。例語そのものは読みが別にあるので対象外
const words = new Map();
kanji.forEach((r, i) => {
  const w = `kanji[${i}] ${r[0]}`;
  if (r[0].length !== 1 || !KANJI_CH.test(r[0])) errs.push(`${w} 見出しが漢字1字ではない`);
  checkRuby(w + ' 字義', r[3]);
  if (!Array.isArray(r[4]) || !r[4].length) { errs.push(`${w} 例語がない`); return; }
  r[4].forEach((j, k) => {
    if (!Array.isArray(j) || j.length !== 4 || j.some(x => !String(x).trim())) { errs.push(`${w} 例語[${k}] のフィールドが不備`); return; }
    checkRuby(`${w} 例語「${j[0]}」意味`, j[2]);
    if (!KANA_ONLY.test(j[1])) errs.push(`${w} 例語「${j[0]}」の読みがかなではない: ${j[1]}`);
    if (!j[0].includes(r[0])) errs.push(`${w} 例語「${j[0]}」に その漢字が入っていない`);
    // 例語は出題項目のIDになるので、字をまたいだ重複は許さない
    if (words.has(j[0])) errs.push(`例語の重複: ${j[0]}（${words.get(j[0])} と ${r[0]} の両方に登録）`);
    else words.set(j[0], r[0]);
  });
});

// ドット絵の検証（モンスター・勇者に共通）: 正方形か、パレットに全色そろっているか
const spriteIds = new Set();
const checkFrame = (kind, id, px, pal) => {
  const n = px.length;
  if (n < 8) errs.push(`${kind}[${id}] 行数が少なすぎる: ${n}`);
  px.forEach((row, y) => {
    if (row.length !== n) errs.push(`${kind}[${id}] 行${y}の長さが ${row.length}（${n}であるべき）`);
    for (const c of row) if (c !== '.' && !pal[c]) errs.push(`${kind}[${id}] 行${y} パレット未定義の文字: ${JSON.stringify(c)}`);
  });
  // 使われていないパレット色は書き間違いのことが多いので警告対象にする
  const used = new Set(px.join('').split('').filter(c => c !== '.'));
  Object.keys(pal).forEach(c => { if (!used.has(c)) errs.push(`${kind}[${id}] 未使用のパレット色: ${c}`); });
};
const checkSprite = (kind, m) => {
  if (spriteIds.has(m.id)) errs.push(`${kind} 重複ID: ${m.id}`);
  spriteIds.add(m.id);
  checkFrame(kind, m.id, m.px, m.pal);
  // 攻撃ポーズは通常ポーズと同じ大きさでないと、差し替えたときに絵がずれる
  if (m.px2) {
    if (m.px2.length !== m.px.length) errs.push(`${kind}[${m.id}] px2 の行数が px と違う`);
    checkFrame(kind + '(攻撃)', m.id, m.px2, m.pal);
  }
};
const AREAS = new Set(['vocab', 'kanji', 'grammar', 'any', 'boss']);
MONSTERS.forEach(m => {
  checkSprite('monster', m);
  if (!AREAS.has(m.area)) errs.push(`monster[${m.id}] 不明な area: ${m.area}`);
  if (!(m.hp > 0)) errs.push(`monster[${m.id}] hp が不正`);
  checkRuby(`monster[${m.id}] 名前`, m.name);
  checkRuby(`monster[${m.id}] 説明`, m.msg);
});
HEROES.forEach(h => {
  checkSprite('hero', h);
  if (!h.name || !h.label) errs.push(`hero[${h.id}] name / label が必要`);
  if (!h.px2) errs.push(`hero[${h.id}] 攻撃ポーズ px2 がない`);
  checkRuby(`hero[${h.id}] 名前`, h.name);
  checkRuby(`hero[${h.id}] 説明`, h.label);
});
if (HEROES.length < 2) errs.push('勇者が2種類そろっていない');
if (ICON.px.length !== ICON.size) errs.push(`icon: 行数が ${ICON.px.length}（${ICON.size}であるべき）`);
ICON.px.forEach((row, y) => {
  if (row.length !== ICON.size) errs.push(`icon: 行${y}の長さが ${row.length}（${ICON.size}であるべき）`);
  for (const c of row) if (c !== '.' && !ICON.pal[c]) errs.push(`icon: 行${y} パレット未定義の文字: ${JSON.stringify(c)}`);
});
['vocab', 'kanji', 'grammar'].forEach(a => {
  if (!MONSTERS.some(m => m.area === a || m.area === 'any')) errs.push(`${a} に出現するモンスターがいない`);
});
if (!MONSTERS.some(m => m.area === 'boss')) errs.push('ボスがいない');
// 取りこぼし再戦と monPool のフォールバックは 'any' がいる前提なので、ここで担保する
if (!MONSTERS.some(m => m.area === 'any')) errs.push("area:'any' のモンスターが1体もいない（取りこぼし再戦で落ちる）");

// 生成事故（ハングル・キリル）検出
const BAD = /[Ѐ-ӿ가-힯]/;
[[vocab, 'vocab'], [kanji, 'kanji'], [grammar, 'grammar']].forEach(([a, n]) =>
  a.forEach((r, i) => { if (BAD.test(JSON.stringify(r))) errs.push(`${n}[${i}] 非日本語文字混入: ${r[0]}`); }));

if (errs.length) {
  console.error('検証エラー ' + errs.length + '件:');
  errs.slice(0, 40).forEach(e => console.error('  - ' + e));
  if (errs.length > 40) console.error('  …ほか ' + (errs.length - 40) + '件');
  process.exit(1);
}

const kanjiWords = kanji.reduce((s, k) => s + k[4].length, 0);
const tpl = fs.readFileSync(path.join(src, 'app.template.html'), 'utf8');
// 1項目1行で出力する。git差分が読め、分割して扱えるようにするため。
const NL = String.fromCharCode(10);
const rows = a => a.map(r => JSON.stringify(r)).join(',' + NL);
const dataJs =
  'const DATA={' + NL +
  '"vocab":[' + NL + rows(vocab) + NL +
  '],' + NL +
  '"kanji":[' + NL + rows(kanji) + NL +
  '],' + NL +
  '"grammar":[' + NL + rows(grammar) + NL +
  ']};' + NL +
  'const MONSTERS=[' + NL + rows(MONSTERS) + NL + '];' + NL +
  'const HEROES=[' + NL + rows(HEROES) + NL + '];';
const inject = '<script>' + dataJs + '</script>';
const html = tpl.replace('<script id="__DATA__"></script>', inject);
if (html === tpl) { console.error('データ差し込み位置が見つかりません'); process.exit(1); }

fs.writeFileSync(out, html, 'utf8');

// n5-quest.html は Artifact用の断片（<!doctype>/<html>/<head>/<body>なし）。
// ここから、通常のWebホスティング用に正しいHTML文書を組み立てる。
const SEP = '</style>';
const splitAt = html.indexOf(SEP) + SEP.length;
if (splitAt < SEP.length) { console.error('</style> が見つかりません'); process.exit(1); }

const head = html.slice(0, splitAt);

// 本文のあと、<script>が2つ続く: 1つ目が差し込んだデータ、2つ目がアプリ本体
const dataStart = html.indexOf('<script>', splitAt);
const dataEnd = html.indexOf('</script>', dataStart) + '</script>'.length;
const appStart = html.indexOf('<script>', dataEnd);
if (dataStart < 0 || appStart < 0) { console.error('scriptタグの位置を特定できません'); process.exit(1); }

const bodyMarkup = html.slice(splitAt, dataStart).replace(/\s+$/, '');
const appJs = html.slice(appStart + '<script>'.length, html.lastIndexOf('</script>'));

const DESC = 'JLPT N5の ことば・かんじ・ぶんぽうを、ドット絵RPGの せんとうで おぼえる がくしゅうアプリ';
const HEAD_BASE =
  '<!doctype html>\n<html lang="ja">\n<head>\n<meta charset="utf-8">\n' +
  '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' +
  '<meta name="description" content="' + DESC + '">\n' +
  '<meta name="color-scheme" content="dark">\n' +
  '<meta name="theme-color" content="#07070F">\n';
// ?v= はブラウザが古いアイコンを握り続けるのを外すため
const V = '1';
const HEAD_ICONS =
  `<link rel="icon" href="./favicon-32.png?v=${V}" sizes="32x32" type="image/png">\n` +
  `<link rel="icon" href="./favicon-16.png?v=${V}" sizes="16x16" type="image/png">\n` +
  `<link rel="icon" href="./favicon.svg?v=${V}" type="image/svg+xml">\n` +
  `<link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png?v=${V}">\n` +
  `<link rel="manifest" href="./site.webmanifest?v=${V}">\n` +
  '<meta name="apple-mobile-web-app-title" content="N5クエスト">\n' +
  '<meta name="mobile-web-app-capable" content="yes">\n';

// ローカル確認用は1ファイル完結のまま（file:// でも動くように）
fs.writeFileSync(path.join(root, 'preview.html'),
  HEAD_BASE + head + '\n</head>\n<body>' + html.slice(splitAt) + '\n</body>\n</html>\n', 'utf8');

// デプロイ用は3分割。データ(大きい)とアプリコードを分けておくと、
// 片方だけ直したときにもう片方を送り直さずに済む。
const distDir = path.join(root, 'dist');
fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(path.join(distDir, 'data.js'), dataJs + '\n', 'utf8');
fs.writeFileSync(path.join(distDir, 'app.js'), appJs.replace(/^\n/, ''), 'utf8');
fs.writeFileSync(path.join(distDir, 'index.html'),
  HEAD_BASE + HEAD_ICONS + head + '\n</head>\n<body>' + bodyMarkup +
  '\n\n<script src="./data.js"></script>\n<script src="./app.js"></script>\n</body>\n</html>\n', 'utf8');

// --- ファビコン一式 ---
const icons = [
  ['favicon-16.png', 16], ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]
];
icons.forEach(([name, size]) => fs.writeFileSync(path.join(distDir, name), pngOf(ICON, size)));
fs.writeFileSync(path.join(distDir, 'favicon.ico'), icoOf(ICON, 32));
fs.writeFileSync(path.join(distDir, 'favicon.svg'), svgOf(ICON), 'utf8');
fs.writeFileSync(path.join(distDir, 'site.webmanifest'), JSON.stringify({
  name: 'N5クエスト', short_name: 'N5クエスト', description: DESC,
  start_url: './', scope: './', display: 'standalone', orientation: 'portrait',
  background_color: '#07070F', theme_color: '#07070F', lang: 'ja',
  icons: [
    { src: './favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    { src: './icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: './icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' }
  ]
}, null, 2), 'utf8');

const kb = f => (fs.statSync(path.join(distDir, f)).size / 1024).toFixed(0) + ' KB';
console.log('OK ' + out + '（Artifact用の断片）');
console.log('OK dist/  index.html ' + kb('index.html') + ' / data.js ' + kb('data.js') + ' / app.js ' + kb('app.js'));
console.log(`  語彙 ${vocab.length} / 漢字 ${kanji.length}字→例語 ${kanjiWords} / 文法 ${grammar.length} / 敵 ${MONSTERS.length} / 勇者 ${HEROES.length}`);
// 出題の単位は 語彙=1語 / 漢字=1字 / 文法=1文型。例語は漢字の学習材料であって項目ではない
console.log(`  出題項目 合計 ${vocab.length + kanji.length + grammar.length}`);
console.log('OK アイコン ' + icons.map(([n]) => n).concat('favicon.ico', 'favicon.svg', 'site.webmanifest').join(' / '));
