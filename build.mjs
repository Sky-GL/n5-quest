// src/ のデータとテンプレートを結合して 1ファイルのアプリを出力する
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(root, 'src');
const out = path.join(root, 'n5-quest.html');

const errs0 = [];   // 章を組む前に出た検証エラー。あとで errs に合流させる
const VOCAB_FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const vocab = [];
// ファイルごとの区切りは、そのまま「章」の区切りになる。
// 章データを別に持たずファイル構成から起こすので、データ側の書き換えが要らない。
const parts = {};
for (const s of VOCAB_FILES) {
  const m = await import(new URL(`./src/vocab-${s}.js`, import.meta.url));
  parts['vocab-' + s] = m['VOCAB_' + s.toUpperCase()];
  vocab.push(...parts['vocab-' + s]);
}
const { KANA_A } = await import(new URL('./src/kana-a.js', import.meta.url));
const { KANA_B } = await import(new URL('./src/kana-b.js', import.meta.url));
const { toRomaji } = await import(new URL('./src/romaji.js', import.meta.url));
const { buildConfuseMap, CONFUSE_GROUPS } = await import(new URL('./src/confuse.js', import.meta.url));
const { KANJI_A } = await import(new URL('./src/kanji-a.js', import.meta.url));
const { KANJI_B } = await import(new URL('./src/kanji-b.js', import.meta.url));
const { PHRASE_A } = await import(new URL('./src/phrase-a.js', import.meta.url));
const { PHRASE_B } = await import(new URL('./src/phrase-b.js', import.meta.url));
const { GRAMMAR_A } = await import(new URL('./src/grammar-a.js', import.meta.url));
const { GRAMMAR_B } = await import(new URL('./src/grammar-b.js', import.meta.url));
const { MONSTERS: MON_A } = await import(new URL('./src/monsters.js', import.meta.url));
const { MONSTERS_B } = await import(new URL('./src/monsters-b.js', import.meta.url));
const { MONSTERS_C } = await import(new URL('./src/monsters-c.js', import.meta.url));
const { HEROES } = await import(new URL('./src/heroes.js', import.meta.url));
const { ICON } = await import(new URL('./src/icon.js', import.meta.url));
const { CREST } = await import(new URL('./src/crest.js', import.meta.url));
const { pngOf, icoOf, svgOf } = await import(new URL('./icongen.mjs', import.meta.url));

const kana = [...KANA_A, ...KANA_B];
const kanji = [...KANJI_A, ...KANJI_B];
const grammar = [...GRAMMAR_A, ...GRAMMAR_B];
const phrase = [...PHRASE_A, ...PHRASE_B];
const MONSTERS = [...MON_A, ...MONSTERS_B, ...MONSTERS_C];
/* 文字は「46音がさき、濁音・半濁音・拗音はあと」。
   国際交流基金や Tofugu の入門手順と同じ切り方にする。
   71字をいちどに出すと、46音を覚えきる前に濁点と拗音が混ざって、
   どれも中途半端なまま次へ行ってしまう。
   ファイルを分けずにここで割るのは、この区別が文字そのものの性質だから。 */
const DAKUTEN = /[がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ]/;
const isExtraKana = c => [...c].length > 1 || DAKUTEN.test(c);
const splitKana = a => [a.filter(r => !isExtraKana(r[0])), a.filter(r => isExtraKana(r[0]))];
const [HIRA_BASIC, HIRA_EXTRA] = splitKana(KANA_A);
const [KATA_BASIC, KATA_EXTRA] = splitKana(KANA_B);
parts['kana-a'] = HIRA_BASIC; parts['kana-a2'] = HIRA_EXTRA;
parts['kana-b'] = KATA_BASIC; parts['kana-b2'] = KATA_EXTRA;
parts['kanji-a'] = KANJI_A; parts['kanji-b'] = KANJI_B;
/* 入門の骨組み。
   「AはBです」「AはBじゃありません」「〜に いきます」といった
   主語・助詞・述語の超基礎だけを、はじめての人むけの章に取り分ける。
   かな → かいわ → ここ、で N5 の文法につながる。
   新しく書き起こさず N5 側から抜くのは、同じ文型を二重に持たせないため。 */
const BASIC_G = [
  '〜は〜です', '〜じゃありません', '〜か（しつもん）', '〜の', '〜も', '〜を',
  '〜に（ばしょ）', '〜へ', '〜で（ばしょ）', '〜が あります', '〜が います',
  '〜ます', '〜ません', '〜ました', '〜に いきます'
];
{
  const have = new Set([...GRAMMAR_A, ...GRAMMAR_B].map(r => r[0]));
  BASIC_G.forEach(n => { if (!have.has(n)) errs0.push(`BASIC_G の「${n}」が文法データに無い`); });
}
const isBasicG = r => BASIC_G.includes(r[0]);
parts['grammar-0'] = [...GRAMMAR_A, ...GRAMMAR_B].filter(isBasicG);
parts['grammar-a'] = GRAMMAR_A.filter(r => !isBasicG(r));
parts['grammar-b'] = GRAMMAR_B.filter(r => !isBasicG(r));
parts['phrase-a'] = PHRASE_A; parts['phrase-b'] = PHRASE_B;

// --- 章（ステージ）---
// 並びが そのまま学習順になる。やさしいものと、すぐ使うものを先に置く。
// ことば → 動き → 助詞 → ようす … と、語彙と文法を交互に挟んで飽きにくくしている。
const CHAP_ORDER = [
  // かなは JLPT N5 の出題範囲ではなく、その手前の準備。だから先頭に置く
  ['kana-a',    'kana',    'ひらがな 46おん',               'Hiragana: the 46 sounds'],
  ['kana-a2',   'kana',    'ひらがな だくてんと ようおん',  'Hiragana: voiced & combined'],
  ['kana-b',    'kana',    'カタカナ 46おん',               'Katakana: the 46 sounds'],
  ['kana-b2',   'kana',    'カタカナ だくてんと ようおん',  'Katakana: voiced & combined'],
  // ここまでが「はじめての人」の範囲。かなを読めるようにして、口に出せる文を持たせる
  ['phrase-a',  'phrase',  'あいさつと じこしょうかい',     'Greetings & Introductions'],
  ['phrase-b',  'phrase',  'おみせと たずねる',             'Shops & Asking'],
  // ここが かな・かいわ から N5 への橋
  ['grammar-0', 'grammar', 'きほんの かたち',               'Basic Sentence Patterns'],
  ['vocab-a',   'vocab',   'ひとと からだ',                 'People & Body'],
  ['vocab-b',   'vocab',   'まいにちの うごき',             'Everyday Actions'],
  ['grammar-a', 'grammar', 'ぶんぽう：てにをはと きほん',   'Grammar: Particles & Basics'],
  ['vocab-c',   'vocab',   'ようすを あらわす ことば',      'Describing Things'],
  ['kanji-a',   'kanji',   'かんじ：かずと とき',           'Kanji: Numbers & Time'],
  ['vocab-d',   'vocab',   'たべものと いえの もの',        'Food & Home'],
  ['vocab-e',   'vocab',   'ひにちと かず',                 'Dates & Numbers'],
  ['grammar-b', 'grammar', 'ぶんぽう：どうしの かたち',     'Grammar: Verb Forms'],
  ['vocab-f',   'vocab',   'まちと のりもの',               'Town & Travel'],
  ['kanji-b',   'kanji',   'かんじ：しぜんと くらし',       'Kanji: Nature & Life'],
  ['vocab-g',   'vocab',   'がっこうと しごと',             'School & Work'],
  ['vocab-h',   'vocab',   'つなぎことばと あいさつ',       'Connectors & Greetings']
];
// 章ボスは全章ちがう相手にする。同じ敵が何度も「ぬし」として出てくると、
// せっかくの区切りが「またこいつか」になってしまう。
// その分野の敵 → どこにでも出る敵 → 残り、の順に、使っていないものから取る。
const usedBoss = new Set();
const pickChapBoss = (sec, last) => {
  if (last) {
    const b = MONSTERS.find(m => m.area === 'boss' && !usedBoss.has(m.id)) || MONSTERS.find(m => m.area === 'boss');
    usedBoss.add(b.id);
    return b.id;
  }
  const tiers = [
    MONSTERS.filter(m => m.area === sec),
    MONSTERS.filter(m => m.area === 'any'),
    MONSTERS.filter(m => m.area !== 'boss')
  ];
  for (const t of tiers) {
    const m = t.find(x => !usedBoss.has(x.id));
    if (m) { usedBoss.add(m.id); return m.id; }
  }
  return MONSTERS[0].id;
};
const ID_PREFIX = { kana: 'n:', vocab: 'v:', kanji: 'k:', grammar: 'g:', phrase: 'p:' };
const CHAPTERS = CHAP_ORDER.map(([file, sec, name, en], i) => ({
  id: file, sec, name, en,
  boss: pickChapBoss(sec, i === CHAP_ORDER.length - 1),
  ids: (parts[file] || []).map(r => ID_PREFIX[sec] + r[0])
}));

// --- 検証 ---
const errs = [...errs0];

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
/* 例文のローマ字（sentRomaji）は、区切りの直前の は・へ を助詞とみなして
   wa・e と読む。「はは」のように語そのものが は で終わる文節が
   ルビ無しで書かれると、haha が ha wa になって読みが壊れる。
   語はルビ [漢字|よみ] で書くという決まりを、ここで守らせる。 */
// 読みが は・へ で終わる語は、ローマ字にするとき判断が分かれる。
//   PARTICLE_SOUND … 語の中の は だが、読みは「わ」。助詞と同じ音なので何もしなくてよい
//   WORD_TAIL       … 読みが「は」のまま。ルビ無しで書くと ha が wa に化ける
// 新しい語が増えたら、下の検査がどちらかに分類するよう促す
const PARTICLE_SOUND = new Set(['では', 'または', 'こんにちは', 'こんばんは']);
const WORD_TAIL = new Set(['はは']);
function checkParticle(where, s) {
  if (!s) return;
  // ルビの中は語なので見ない。空文字に置くと前後がつながって
  // 元の文に無い語ができてしまうので、区切りに置きかえる
  String(s).replace(/\[[^\[\]|]+\|[^\[\]|]+\]/g, ' ')
    .split(/[\s　]+/)
    .forEach(chunk => {
      const c = chunk.replace(/[。、！？【】]/g, '');
      if (WORD_TAIL.has(c)) {
        errs.push(`${where} 「${c}」は語なので、ルビ付きの漢字で書く（助詞の は と区別できない）: ${s}`);
      }
    });
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
req(kana, 'kana', 5);
req(vocab, 'vocab', 6);
req(kanji, 'kanji', 6);
req(grammar, 'grammar', 6);

// かな: 見出しはかな1字、ローマ字は変換器と突き合わせる。
// ここで検算しておけば、変換器を直したときに壊れた箇所がビルドで分かる
const KANA_ONE = /^[ぁ-ゖァ-ヺ]$/;
kana.forEach((r, i) => {
  const w = `kana[${i}] ${r[0]}`;
  if (!KANA_ONE.test(r[0])) errs.push(`${w} 見出しがかな1字ではない`);
  if (toRomaji(r[0]) !== r[1]) errs.push(`${w} ローマ字が変換結果と違う: ${r[1]}（変換は ${toRomaji(r[0])}）`);
  if (!KANA_ONLY.test(r[2])) errs.push(`${w} 例語がかなだけではない: ${r[2]}`);
  if (toRomaji(r[2]) !== r[3]) errs.push(`${w} 例語のローマ字が違う: ${r[3]}（変換は ${toRomaji(r[2])}）`);
  if (!/^[ -~]+$/.test(r[4])) errs.push(`${w} 英語が半角英字ではない: ${r[4]}`);
});

// 紛らわしいかなの表。書いた字がデータに無いと、誤答が作れず黙って効かなくなる
const KANA_HAVE = new Set(kana.map(r => r[0]));
const CONFUSE_MAP = buildConfuseMap(KANA_HAVE);
{
  // 手で書いた組は1字も取りこぼさない（誤字はここで落とす）
  const miss = [...new Set([...CONFUSE_GROUPS.join('')].filter(c => !KANA_HAVE.has(c)))];
  if (miss.length) errs.push(`confuse.js の表にデータへ無いかながある: ${miss.join('')}`);
  const orphan = Object.keys(CONFUSE_MAP).filter(c => !KANA_HAVE.has(c));
  if (orphan.length) errs.push(`紛らわしい表に、データに無い字が残っている: ${orphan.join('')}`);
}

// 語彙: 品詞・意味・例文はそのまま画面に出るのでルビが要る
vocab.forEach((r, i) => {
  const w = `vocab[${i}] ${r[0]}`;
  checkRuby(w + ' 品詞', r[2]);
  checkRuby(w + ' 意味', r[3]);
  checkRuby(w + ' 例文', r[5]);
  checkMark(w + ' 例文', r[5]);
  checkParticle(w + ' 例文', r[5]);
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
  checkParticle(w + ' 例文', r[4]);
  if (KANJI_CH.test(r[0])) errs.push(`${w} 文型に漢字が入っている（N5では読めない）`);
});
// 収録すべき漢字は、もらった一覧表（11行103字）そのもの。
// 並び順も含めてここに写してあるので、字を足し引きしたらビルドで気づける。
const N5_KANJI_LIST = [
  '一二三四五六七八九十',
  '百千万円時年月日',
  '上下右左中北南東西',
  '人今休会何先入出分前',
  '午半友口古名国土外多',
  '大天女子学安小少山川',
  '店後手新書木本来校',
  '母毎気水火父生男白目',
  '社空立耳聞花行見言話',
  '語読買足車週道金長間',
  '雨電食飲駅高魚'
].join('');
{
  const want = [...N5_KANJI_LIST];
  const have = new Set(kanji.map(r => r[0]));
  const missing = want.filter(c => !have.has(c));
  const extra = kanji.map(r => r[0]).filter(c => want.indexOf(c) < 0);
  if (missing.length) errs.push(`一覧表にあるのに未収録の漢字: ${missing.join('')}`);
  if (extra.length) errs.push(`一覧表にない漢字が入っている: ${extra.join('')}`);
  if (have.size !== want.length) errs.push(`漢字の字数が ${have.size}（${want.length}であるべき）`);
}

// 漢字: 字義と、例語の意味にルビが要る。例語そのものは読みが別にあるので対象外
const words = new Map();
kanji.forEach((r, i) => {
  const w = `kanji[${i}] ${r[0]}`;
  if (r[0].length !== 1 || !KANJI_CH.test(r[0])) errs.push(`${w} 見出しが漢字1字ではない`);
  checkRuby(w + ' 字義', r[3]);
  // 字義の英語。ここが無いと、日本語がまったく初めての人は
  // 「この かんじの いみは？」の選択肢が読めても意味が取れない
  if (!/^[ -~]+$/.test(r[4])) errs.push(`${w} 字義の英語が半角英字ではない: ${r[4]}`);
  if (!Array.isArray(r[5]) || !r[5].length) { errs.push(`${w} 例語がない`); return; }
  r[5].forEach((j, k) => {
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
// は・へ で終わる読みが増えたら、必ずどちらかに分類させる。
// 分類しないまま通すと、例文のローマ字が黙って壊れる
[...vocab.map(v => [v[0], v[1]]), ...kanji.flatMap(k => k[5].map(w => [w[0], w[1]]))]
  .forEach(([w, r]) => {
    if (!/[はへ]$/.test(r) || [...r].length < 2) return;
    if (PARTICLE_SOUND.has(r) || WORD_TAIL.has(r)) return;
    errs.push(`「${w}（${r}）」の読みが は・へ で終わる。build.mjs の PARTICLE_SOUND か WORD_TAIL に入れること`);
  });

/* かいわの文の検証。
   はじめての人が読むので かんじは使わない（ふりがなを読むにも かなが要る）。
   いみ・ばめん も かな で書く。 */
{
  const seen = new Set(), seenEn = new Map();
  phrase.forEach((r, i) => {
    const w = `phrase[${i}] ${r[0]}`;
    if (r.length !== 4) errs.push(`${w} は [文, いみ, English, ばめん] の4つにする`);
    r.forEach((f, n) => { if (!f) errs.push(`${w} の ${n + 1}番目が空`); });
    if (KANJI_CH.test(r[0])) errs.push(`${w} かいわの文に漢字は使わない（かなだけで書く）`);
    if (KANJI_CH.test(r[1])) errs.push(`${w} いみに漢字は使わない`);
    if (KANJI_CH.test(r[3])) errs.push(`${w} ばめんに漢字は使わない`);
    if (!/[A-Za-z]/.test(r[2])) errs.push(`${w} 英語がない`);
    if (seen.has(r[0])) errs.push(`${w} が重複している`);
    // 英語から日本語を選ばせる出題があるので、英語が重なると正解が2つになる
    if (seenEn.has(r[2])) errs.push(`${w} の英語が phrase[${seenEn.get(r[2])}] と同じ: ${r[2]}`);
    seenEn.set(r[2], i);
    seen.add(r[0]);
    checkParticle(w, r[0]);
  });
}

const AREAS = new Set(['kana', 'phrase', 'vocab', 'kanji', 'grammar', 'any', 'boss']);
MONSTERS.forEach(m => {
  checkSprite('monster', m);
  if (!AREAS.has(m.area)) errs.push(`monster[${m.id}] 不明な area: ${m.area}`);
  if (!(m.hp > 0)) errs.push(`monster[${m.id}] hp が不正`);
  // 英語版では戦闘ログに英語名が出る。抜けると英語だけ空欄になる
  if (!m.en) errs.push(`monster[${m.id}] 英語名 en が必要`);
  checkRuby(`monster[${m.id}] 名前`, m.name);
  checkRuby(`monster[${m.id}] 説明`, m.msg);
});
HEROES.forEach(h => {
  checkSprite('hero', h);
  if (!h.name || !h.label) errs.push(`hero[${h.id}] name / label が必要`);
  if (!h.en) errs.push(`hero[${h.id}] 英語名 en が必要`);
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
if (CREST.px.length !== CREST.size) errs.push(`crest: 行数が ${CREST.px.length}（${CREST.size}であるべき）`);
CREST.px.forEach((row, y) => {
  if (row.length !== CREST.size) errs.push(`crest: 行${y}の長さが ${row.length}（${CREST.size}であるべき）`);
  for (const c of row) if (c !== '.' && !CREST.pal[c]) errs.push(`crest: 行${y} パレット未定義の文字: ${JSON.stringify(c)}`);
});
['kana', 'vocab', 'kanji', 'grammar'].forEach(a => {
  if (!MONSTERS.some(m => m.area === a || m.area === 'any')) errs.push(`${a} に出現するモンスターがいない`);
});
if (!MONSTERS.some(m => m.area === 'boss')) errs.push('ボスがいない');

// 章の検証。全項目がどこかの章に1回だけ入っていないと、進めても埋まらない章が出る
{
  const sprite = new Set(MONSTERS.map(m => m.id));
  const bossSeen = new Map();
  const all = new Set();
  CHAPTERS.forEach(c => {
    if (!c.ids.length) errs.push(`章[${c.id}] に項目がない`);
    if (!sprite.has(c.boss)) errs.push(`章[${c.id}] のボス ${c.boss} が見つからない`);
    if (bossSeen.has(c.boss)) errs.push(`章ボスの重複: ${c.boss}（${bossSeen.get(c.boss)} と ${c.id}）`);
    else bossSeen.set(c.boss, c.id);
    c.ids.forEach(id => {
      if (all.has(id)) errs.push(`章[${c.id}] 項目の重複: ${id}`);
      all.add(id);
    });
  });
  const total = kana.length + vocab.length + kanji.length + grammar.length + phrase.length;
  if (all.size !== total) errs.push(`章に入っていない項目がある（章 ${all.size} / 全体 ${total}）`);
}
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

const kanjiWords = kanji.reduce((s, k) => s + k[5].length, 0);
const tpl = fs.readFileSync(path.join(src, 'app.template.html'), 'utf8');
// 1項目1行で出力する。git差分が読め、分割して扱えるようにするため。
const NL = String.fromCharCode(10);
const rows = a => a.map(r => JSON.stringify(r)).join(',' + NL);
// ローマ字の変換器はソースをそのまま埋め込む。
// アプリとビルド検証で実装が二重にならないようにするため。
const romajiJs = fs.readFileSync(path.join(src, 'romaji.js'), 'utf8').replace(/^export /gm, '');
const dataJs =
  romajiJs + NL +
  'const DATA={' + NL +
  '"kana":[' + NL + rows(kana) + NL +
  '],' + NL +
  '"vocab":[' + NL + rows(vocab) + NL +
  '],' + NL +
  '"kanji":[' + NL + rows(kanji) + NL +
  '],' + NL +
  '"grammar":[' + NL + rows(grammar) + NL +
  '],' + NL +
  '"phrase":[' + NL + rows(phrase) + NL +
  ']};' + NL +
  'const MONSTERS=[' + NL + rows(MONSTERS) + NL + '];' + NL +
  'const HEROES=[' + NL + rows(HEROES) + NL + '];' + NL +
  'const CHAPTERS=[' + NL + rows(CHAPTERS) + NL + '];' + NL +
  'const CREST=' + JSON.stringify(CREST) + ';' + NL +
  'const CONFUSE=' + JSON.stringify(CONFUSE_MAP) + ';';
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
const V = '2';   // 紋章の意匠に描き替えたので、古いアイコンを握らせない
const HEAD_ICONS =
  `<link rel="icon" href="./favicon-32.png?v=${V}" sizes="32x32" type="image/png">\n` +
  `<link rel="icon" href="./favicon-16.png?v=${V}" sizes="16x16" type="image/png">\n` +
  `<link rel="icon" href="./favicon.svg?v=${V}" type="image/svg+xml">\n` +
  `<link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png?v=${V}">\n` +
  `<link rel="manifest" href="./site.webmanifest?v=${V}">\n` +
  '<meta name="apple-mobile-web-app-title" content="N5クエスト">\n' +
  '<meta name="mobile-web-app-capable" content="yes">\n' +
  // iOS 16.3以前は manifest の display を見ないので、こちらが無いと
  // ホーム画面に追加してもブラウザのまま開く。
  // ホーム画面のアプリとして開けないと、Safariの7日ルールで進捗が消えうる。
  '<meta name="apple-mobile-web-app-capable" content="yes">\n' +
  '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n';

// ローカル確認用は1ファイル完結のまま（file:// でも動くように）
fs.writeFileSync(path.join(root, 'preview.html'),
  HEAD_BASE + head + '\n</head>\n<body>' + html.slice(splitAt) + '\n</body>\n</html>\n', 'utf8');

// デプロイ用は3分割。データ(大きい)とアプリコードを分けておくと、
// 片方だけ直したときにもう片方を送り直さずに済む。
const distDir = path.join(root, 'dist');
fs.mkdirSync(distDir, { recursive: true });
// 出力したJSが構文として通るか、書き出す前に確かめる。
// テンプレートの文字列に生の改行が紛れると、ブラウザで初めて真っ白になって気づく。
[['data.js', dataJs], ['app.js', appJs]].forEach(([name, code]) => {
  try { new Function(code); }
  catch (e) { console.error(`${name} の構文エラー: ${e.message}`); process.exit(1); }
});
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
console.log(`  かな ${kana.length} / かいわ ${phrase.length} / 語彙 ${vocab.length} / 漢字 ${kanji.length}字→例語 ${kanjiWords} / 文法 ${grammar.length} / 敵 ${MONSTERS.length} / 勇者 ${HEROES.length}`);
console.log(`  章 ${CHAPTERS.length}（${CHAPTERS.map(c => c.ids.length).join('/')}）`);
// 出題の単位は 語彙=1語 / 漢字=1字 / 文法=1文型。例語は漢字の学習材料であって項目ではない
console.log(`  出題項目 合計 ${kana.length + vocab.length + kanji.length + grammar.length + phrase.length}`);
console.log('OK アイコン ' + icons.map(([n]) => n).concat('favicon.ico', 'favicon.svg', 'site.webmanifest').join(' / '));
