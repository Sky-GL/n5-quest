// 見た目が紛らわしいかなの組。
//
// 誤答を70字からランダムに引くと、初学者が実際に取り違える組（さ/ち、ね/れ/わ、
// シ/ツ、ソ/ン …）が選択肢に並ぶ確率は4〜8%しかない。
// つまり96%は「ぜんぜん似ていない3つ」から選ばされていて、本番で必要な
// 「見分ける力」を一度も練習しないまま進んでしまう。
// ここに組を持たせて、誤答の一部を必ず似た字から取るようにする。
//
// 1つの字が複数の組に入ってよい（さ は き とも ち とも紛らわしい）。
export const CONFUSE_GROUPS = [
  // --- ひらがな：形が似ている ---
  'さちき',
  'ねれわを',
  'るろ',
  'ぬめ',
  'はほま',
  'いりこ',
  'くへ',
  'つうら',
  'しつ',
  'たな',
  'にこ',
  'すむ',
  'そん',
  'あおめ',
  'けは',
  'よま',
  'のめ',
  'ふら',

  // --- カタカナ：ひらがな以上に取り違えやすい ---
  'シツミ',
  'ソンノ',
  'クタワ',
  'スヌ',
  'チテ',
  'ナメ',
  'フワウ',
  'マア',
  'ルレ',
  'コユ',
  'ケセ',
  'ハヘ',
  'ロヨ',
  'サセ',
  'ニエ',
  'トヒ'
];

// 濁点・半濁点だけの違いも、初学者にとっては立派な見分け対象。
// 「は・ば・ぱ」のような一族は機械的に作れるので、表に手で書かない。
const VOICED = {
  'か': 'が', 'き': 'ぎ', 'く': 'ぐ', 'け': 'げ', 'こ': 'ご',
  'さ': 'ざ', 'し': 'じ', 'す': 'ず', 'せ': 'ぜ', 'そ': 'ぞ',
  'た': 'だ', 'ち': 'ぢ', 'つ': 'づ', 'て': 'で', 'と': 'ど',
  'は': 'ば', 'ひ': 'び', 'ふ': 'ぶ', 'へ': 'べ', 'ほ': 'ぼ'
};
const HANDAKU = { 'は': 'ぱ', 'ひ': 'ぴ', 'ふ': 'ぷ', 'へ': 'ぺ', 'ほ': 'ぽ' };

const toKata = s => [...s].map(c => String.fromCharCode(c.charCodeAt(0) + 0x60)).join('');

// 清音・濁音・半濁音の一族を、ひらがなとカタカナの両方で作る
export function dakutenGroups() {
  const out = [];
  for (const base of Object.keys(VOICED)) {
    const g = base + VOICED[base] + (HANDAKU[base] || '');
    out.push(g, toKata(g));
  }
  return out;
}

// 字 → 紛らわしい相手の配列。
// known を渡すと、そこに無い字を落とす。落とすのは自動生成した濁音一族だけで、
// 手で書いた CONFUSE_GROUPS は落とさない（誤字を黙って消したくないので、
// そちらは build.mjs 側で厳しく突き合わせる）。
export function buildConfuseMap(known) {
  const map = {};
  const ok = c => !known || known.has(c);
  const add = (a, b) => {
    if (a === b) return;
    (map[a] = map[a] || []);
    if (map[a].indexOf(b) < 0) map[a].push(b);
  };
  const feed = (groups, filter) => groups.forEach(g => {
    const cs = [...g].filter(c => !filter || ok(c));
    cs.forEach(a => cs.forEach(b => add(a, b)));
  });
  feed(CONFUSE_GROUPS, false);
  feed(dakutenGroups(), true);
  return map;
}
