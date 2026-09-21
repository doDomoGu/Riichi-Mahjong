const handTemplates = [
  {
    shape: '门清荣和',
    groups: ['123m', '456m', '789p', '234s'],
    pair: '55p',
    yaku: ['立直', '平和'],
    han: 2,
    baseHan: 2,
    fu: 30,
    fuDetails: ['底符 20 符', '门清荣和 10 符'],
    hint: '注意平和荣和的符数规则。',
  },
  {
    shape: '门清自摸',
    groups: ['234m', '345m', '678p', '789s'],
    pair: '11z',
    yaku: ['立直', '门清自摸'],
    han: 2,
    baseHan: 2,
    fu: 30,
    fuDetails: ['底符 20 符', '自摸 2 符', '幺九牌雀头 2 符', '待牌/形状 6 符'],
    hint: '根据牌型和役种，先自行判断符数和番数。',
  },
  {
    shape: '役牌刻子',
    groups: ['123m', '789m', '345p', '555z'],
    pair: '22p',
    yaku: ['役牌'],
    han: 1,
    baseHan: 1,
    fu: 30,
    fuDetails: ['底符 20 符', '役牌明刻 4 符'],
    hint: '先计算基本点，再根据庄家/子家和和牌方式换算。',
  },
  {
    shape: '中张暗刻',
    groups: ['111m', '345m', '678p', '234s'],
    pair: '66z',
    yaku: ['立直', '断幺九'],
    han: 2,
    baseHan: 2,
    fu: 40,
    fuDetails: ['底符 20 符', '中张暗刻 8 符', '雀头 2 符', '边张/坎张 10 符'],
    hint: '符数最后向上取整到十位。',
  },
  {
    shape: '幺九暗刻',
    groups: ['999m', '123p', '789p', '456s'],
    pair: '33s',
    yaku: ['立直', '混全带幺九'],
    han: 3,
    baseHan: 3,
    fu: 50,
    fuDetails: ['底符 20 符', '幺九暗刻 8 符', '幺九雀头 2 符', '单骑听牌 2 符'],
    hint: '低翻高符时，注意判断是否达到满贯。',
  },
  {
    shape: '高符低翻',
    groups: ['111m', '999p', '789s', '111z'],
    pair: '55z',
    yaku: ['役牌', '混全带幺九'],
    han: 3,
    baseHan: 3,
    fu: 70,
    fuDetails: ['底符 20 符', '幺九暗杠 32 符', '字牌暗刻 8 符', '幺九字牌雀头 2 符'],
    hint: '达到满贯后，符数不再改变基本点。',
  },
  {
    shape: '低符高翻',
    groups: ['234m', '456m', '678p', '234s'],
    pair: '55p',
    yaku: ['立直', '一发', '平和', '宝牌'],
    han: 4,
    baseHan: 2,
    fu: 30,
    fuDetails: ['平和荣和固定 30 符'],
    hint: '低翻低符时，注意不要直接套用满贯点数。',
  },
  {
    shape: '满贯',
    groups: ['111m', '456m', '789p', '234s'],
    pair: '55z',
    yaku: ['立直', '一发', '宝牌×3', '赤宝牌'],
    han: 5,
    baseHan: 1,
    fu: 30,
    fuDetails: ['底符 20 符', '自摸 2 符', '待牌与雀头合计 8 符'],
    hint: '达到满贯后，符数不再影响基本点。',
  },
  {
    shape: '跳满',
    // 为了与“混一色”匹配：和牌牌型应为“单一花色 + 字牌”
    groups: ['123m', '456m', '789m', '234m'],
    pair: '55z',
    yaku: ['混一色', '立直', '宝牌×2'],
    han: 6,
    baseHan: 4,
    fu: 30,
    fuDetails: ['符数仅用于展示，6 翻直接跳满。'],
    hint: '6～7 翻为跳满。',
  },
  {
    shape: '倍满',
    groups: ['111m', '999m', '111p', '999p'],
    pair: '11z',
    yaku: ['清一色', '立直', '宝牌×3'],
    han: 8,
    baseHan: 5,
    fu: 40,
    fuDetails: ['符数仅用于展示，8～10 翻直接倍满。'],
    hint: '8～10 翻为倍满。',
  },
];

const handDetails = {
  '门清荣和': {
    handGroups: ['123m', '456m', '789p', '23s', '55p'],
    winTile: '4s',
    waitType: '两面听',
    riichi: true,
    openMelds: [],
  },
  '门清自摸': {
    handGroups: ['234m', '345m', '678p', '78s', '11z'],
    winTile: '9s',
    waitType: '两面听',
    riichi: true,
    openMelds: [],
  },
  '役牌刻子': {
    handGroups: ['123m', '789m', '345p', '67s', '22p'],
    winTile: '8s',
    waitType: '两面听',
    riichi: false,
    openMelds: ['555z'],
  },
  '中张暗刻': {
    handGroups: ['111m', '345m', '678p', '23s', '66z'],
    winTile: '4s',
    waitType: '两面听',
    riichi: true,
    openMelds: [],
  },
  '幺九暗刻': {
    handGroups: ['999m', '123p', '789p', '45s', '33s'],
    winTile: '6s',
    waitType: '两面听',
    riichi: true,
    openMelds: [],
  },
  '高符低翻': {
    handGroups: ['999p', '78s', '111z', '55z'],
    winTile: '9s',
    waitType: '两面听',
    riichi: false,
    openMelds: [],
    concealedKans: ['111m'],
  },
  '低符高翻': {
    handGroups: ['234m', '456m', '678p', '23s', '55p'],
    winTile: '4s',
    waitType: '两面听',
    riichi: true,
    openMelds: [],
  },
  '满贯': {
    handGroups: ['111m', '456m', '789p', '23s', '55z'],
    winTile: '4s',
    waitType: '两面听',
    riichi: true,
    openMelds: [],
  },
  '跳满': {
    handGroups: ['123m', '456m', '789m', '23m', '55z'],
    winTile: '4m',
    waitType: '两面听',
    riichi: true,
    openMelds: [],
  },
  '倍满': {
    handGroups: ['111m', '999m', '111p', '99p', '11z'],
    winTile: '9p',
    waitType: '双碰听',
    riichi: false,
    openMelds: ['111m', '999m', '111p'],
  },
};

const state = {
  includeHonba: true,
  question: null,
  answered: false,
  correct: 0,
  attempted: 0,
};

const doraTilePool = [
  '1m', '4m', '7m', '9m',
  '1p', '4p', '7p', '9p',
  '1s', '4s', '7s', '9s',
  '1z', '2z', '3z', '5z',
];

const yakuOptions = [
  { id: 'riichi', label: '立直', closedHan: 1, requiresRiichi: true, note: '门清限定' },
  { id: 'ippatsu', label: '一发', closedHan: 1, requiresRiichi: true, note: '门清立直限定' },
  { id: 'menzen-tsumo', label: '门清自摸', closedHan: 1, closedOnly: true, requiresTsumo: true },
  { id: 'tanyao', label: '断幺九', closedHan: 1, openHan: 1 },
  { id: 'pinfu', label: '平和', closedHan: 1, closedOnly: true },
  { id: 'iipeikou', label: '一盃口', closedHan: 1, closedOnly: true },
  { id: 'yakuhai', label: '役牌', closedHan: 1, openHan: 1 },
  { id: 'sanshoku', label: '三色同顺', closedHan: 2, openHan: 1 },
  { id: 'sanshoku-doukou', label: '三色同刻', closedHan: 2, openHan: 2 },
  { id: 'ittsu', label: '一气通贯', closedHan: 2, openHan: 1 },
  { id: 'chiitoitsu', label: '七对子', closedHan: 2, closedOnly: true },
  { id: 'toitoi', label: '对对和', closedHan: 2, openHan: 2 },
  { id: 'sanankou', label: '三暗刻', closedHan: 2, openHan: 2 },
  { id: 'chanta', label: '混全带幺九', closedHan: 2, openHan: 1 },
  { id: 'honitsu', label: '混一色', closedHan: 3, openHan: 2 },
  { id: 'junchan', label: '纯全带幺九', closedHan: 3, openHan: 2 },
  { id: 'ryanpeikou', label: '二杯口', closedHan: 3, closedOnly: true },
  { id: 'chinitsu', label: '清一色', closedHan: 6, openHan: 5 },
];

const honorNames = {
  1: '东',
  2: '南',
  3: '西',
  4: '北',
  5: '中',
  6: '白',
  7: '发',
};

const suitNames = {
  m: '万',
  s: '条',
  p: '筒',
};

const $ = (selector) => document.querySelector(selector);

/**
 * 生成并用于计算的“和牌事实”结构（等待下一步用来做严格 fu 计算）。
 * 注意：按你的方案A，暗杠只出现在 concealedKans，并且不参与“展示用手牌集合”的展开。
 */
/**
 * @typedef {Object} WinningHandFacts
 * @property {string[]} groups - 4个面子（刻/顺；此处不包含暗杠的4张牌面）
 * @property {string} pair - 雀头（两张）
 * @property {string[]} openMelds - 副露面子（吃/碰/明杠），不包含暗杠
 * @property {string[]} concealedKans - 暗杠编码（方案1：1111m 等，且不计入手牌13张）
 * @property {string} winTile - 和牌牌（单张，形如 '4s' 或 '6z'）
 * @property {'ron'|'tsumo'} winType
 * @property {string} waitType - 仅用于 fu 计算（如 '两面听'/'边张/坎张' 等枚举）
 * @property {boolean} riichi
 * @property {boolean} ippatsu
 *
 * @property {number} roundWind
 * @property {number} playerWind
 * @property {string[]} doraIndicators
 * @property {string[]} uraDoraIndicators
 * @property {number} redDoraCount
 * @property {number} kanCount - 明杠+暗杠数量（用于宝牌/里宝牌数量等）
 *
 * @property {number} honba
 * @property {boolean} dealer - 庄家/子家（庄家 true）
 *
 * @property {string[]} hands - 展示/计算用的手牌（由结构展开得到；暗杠不进入该展示集合）
 */

function tileGroupsToHand13({ groups, pair }) {
  // groups/pair 均为“紧凑编码”（如 '123m'、'55p'），直接展开为13张用于展示/统计。
  // 不从 concealedKans/openMelds 取牌，确保“暗杠不计入手牌13张”。
  const toTiles = (groupStr) => {
    const match = groupStr.match(/^([1-9]+)([mpsz])$/);
    if (!match) return [];
    const [digits, suit] = [match[1], match[2]];
    return [...digits].map((d) => `${d}${suit}`);
  };
  const tiles = [...groups.flatMap(toTiles), ...toTiles(pair)];
  return tiles;
}

function buildWinTilesFromQuestion(question) {
  // 将 groups/openMelds/concealedKans/pair 整合到一个字段 winTiles 中。
  // 注意：为避免大规模重构，本函数先“兼容性整合”，不保证严格限定元素个数恒为 5；
  // 后续当你把符数/役种逻辑也迁移到 winTiles 时，再进一步规范成“4面子+1雀头(+winTile)”的单一口径。
  const parseMeld = (meldStr, open) => {
    // 顺子：123m / 456p / 789s
    if (/^[1-9]{3}[mps]$/.test(meldStr)) {
      const ms = meldStr.match(/^([1-9])([1-9])([1-9])([mps])$/);
      // 由于 meldStr 为 '123m'，直接拆位：
      const m = meldStr.match(/^([1-9])([1-9])([1-9])([mps])$/);
      const a = `${m[1]}${m[4]}`;
      const b = `${m[2]}${m[4]}`;
      const c = `${m[3]}${m[4]}`;
      return { kind: 'mentsu', subtype: 'shun', open, tiles: [a, b, c] };
    }
    // 刻子：111m / 555z
    if (/^([1-9])\1\1[mpsz]$/.test(meldStr)) {
      const m = meldStr.match(/^([1-9])\1\1([mpsz])$/);
      const tile = `${m[1]}${m[2]}`;
      return { kind: 'mentsu', subtype: 'triplet', open, tiles: [tile, tile, tile] };
    }
    // 杠：1111m / 5555z（方案1 编码）
    if (/^([1-9])\1\1\1[mpsz]$/.test(meldStr)) {
      const m = meldStr.match(/^([1-9])\1\1\1([mpsz])$/);
      const tile = `${m[1]}${m[2]}`;
      return { kind: 'mentsu', subtype: 'kan', open, tiles: [tile, tile, tile, tile] };
    }
    return null;
  };

  const elements = [];
  (question.groups || []).forEach((g) => {
    const parsed = parseMeld(g, false);
    if (parsed) elements.push(parsed);
  });
  (question.openMelds || []).forEach((m) => {
    const parsed = parseMeld(m, true);
    if (parsed) elements.push(parsed);
  });
  (question.concealedKans || []).forEach((k) => {
    const parsed = parseMeld(k, false);
    if (parsed) elements.push(parsed);
  });

  // 更稳妥：pair 直接拆成单牌
  const pairFixed = (() => {
    if (!question.pair) return null;
    const m = question.pair.match(/^([1-9])\1([mpsz])$/);
    if (!m) return null;
    const t = `${m[1]}${m[2]}`;
    return { kind: 'pair', subtype: null, tiles: [t, t] };
  })();

  if (pairFixed) elements.push(pairFixed);
  return elements;
}

function validateWinTiles(question) {
  const winTiles = question.winTiles || [];
  const counts = new Map();
  winTiles.forEach((el) => {
    (el.tiles || []).forEach((t) => counts.set(t, (counts.get(t) || 0) + 1));
  });
  // 等价于“牌池最多每牌 4 张”
  for (const [, c] of counts.entries()) {
    if (c > 4) return false;
  }

  // winTile 必须出现在 winTiles 任意元素里
  const win = question.winTile;
  const exists = winTiles.some((el) => (el.tiles || []).includes(win));
  return exists;
}

function collectHandTilesFromWinTiles(winTiles) {
  // 只取手牌部分：open=false 且非 kan 的面子 + pair
  const tiles = [];
  (winTiles || []).forEach((el) => {
    if (!el || !el.tiles) return;
    if (el.kind === 'pair') {
      tiles.push(...el.tiles);
      return;
    }
    if (el.kind !== 'mentsu') return;
    if (el.open === true) return;
    if (el.subtype === 'kan') return;
    tiles.push(...el.tiles);
  });
  return tiles;
}

function pickWinTileFromHand(winTiles) {
  const tiles = collectHandTilesFromWinTiles(winTiles);
  if (!tiles.length) return null;
  return tiles[Math.floor(Math.random() * tiles.length)];
}

function buildFactsFromTemplate(template, details, dealer, winType, honba) {
  const openMelds = details.openMelds || [];
  const concealedKans = details.concealedKans || [];
  const groups = template.groups || [];
  // 现有模板里雀头通常在 template.pair；details.handGroups 主要用于展示/其它逻辑。
  const pair = template.pair || details.pair;
  const winTile = details.winTile || template.winTile;
  // 只保留坎张枚举（嵌张在本项目里等同坎张）
  const waitType = details.waitType === '嵌张' ? '坎张' : details.waitType;

  return {
    groups,
    pair,
    openMelds,
    concealedKans,
    winTile,
    winType,
    waitType,
    riichi: !!details.riichi,
    ippatsu: false,
    roundWind: 0,
    playerWind: 0,
    doraIndicators: [],
    uraDoraIndicators: [],
    redDoraCount: 0,
    kanCount: openMelds.length + concealedKans.length,
    honba,
    dealer,
    hands: tileGroupsToHand13({ groups, pair }),
  };
}

function formatTile(tile) {
  const match = tile.match(/^([1-9]+)([mpsz])$/);
  if (!match) return tile;
  if (match[2] !== 'z') return `${match[1]}${suitNames[match[2]]}`;
  return [...match[1]].map((value) => honorNames[value]).join('');
}

function formatTileGroup(tile, redState) {
  const match = tile.match(/^([1-9]+)([mpsz])$/);
  if (!match) return tile;
  const [digits, suit] = [match[1], match[2]];
  const values = [...digits].map((value) => {
    const isRed = value === '5' && suit !== 'z' && redState.remaining > 0;
    if (isRed) redState.remaining -= 1;
    return isRed ? `<span class="red-tile">${value}</span>` : value;
  }).join('');
  if (suit === 'z') return [...digits].map((value) => honorNames[value]).join('');
  return `${values}${suitNames[suit]}`;
}

function meldTiles(meld) {
  return typeof meld === 'string' ? meld : meld.tiles;
}

function meldType(meld) {
  const tiles = meldTiles(meld);
  if (/^([1-9])\1\1\1[mpsz]$/.test(tiles)) return '杠';
  if (/^([1-9])\1\1[mpsz]$/.test(tiles)) return '碰';
  if (/^[1-9]{3}[mps]$/.test(tiles)) return '吃';
  return '副露';
}

function formatMeld(meld, redState) {
  const tiles = meldTiles(meld);
  return `${meldType(meld)} ${formatTileGroup(tiles, redState)}`;
}

function formatKan(kan, redState) {
  const tiles = meldTiles(kan);
  const match = tiles.match(/^([1-9])\1\1([mpsz])$/);
  const displayTiles = match
    ? `${match[1].repeat(4)}${match[2]}`
    : tiles;
  return formatTileGroup(displayTiles, redState);
}

function updateYakuTotal() {
  const total = [...document.querySelectorAll('#yaku-options input:checked')]
    .reduce((sum, input) => sum + Number(input.dataset.han), 0);
  $('#yaku-total').textContent = total;
}

function renderYakuOptions(question) {
  const isOpen = question.openMelds.length > 0;
  const options = yakuOptions.map((option) => {
    const unavailable = (option.requiresRiichi && !question.riichi)
      || (option.requiresTsumo && question.winType !== 'tsumo')
      || (option.closedOnly && isOpen);
    const han = isOpen && option.openHan !== undefined ? option.openHan : option.closedHan;
    const ruleNote = option.closedOnly
      ? '门清限定'
      : option.openHan !== undefined && option.openHan !== option.closedHan
        ? `副露 ${option.openHan} 番`
        : option.note || '';
    return `
      <label class="yaku-option${unavailable ? ' yaku-option-disabled' : ''}">
        <input type="checkbox" data-han="${han}"${unavailable ? ' disabled' : ''} />
        <span>
          <strong>${option.label}</strong>
          <small>${han} 番${ruleNote ? ` · ${ruleNote}` : ''}</small>
        </span>
      </label>
    `;
  }).join('');
  $('#yaku-options').innerHTML = options;
  $('#yaku-options').querySelectorAll('input').forEach((input) => {
    input.addEventListener('change', updateYakuTotal);
  });
  updateYakuTotal();
}

function ceil100(value) {
  return Math.ceil(value / 100) * 100;
}

function parseSuitToken(token) {
  const match = token.match(/^([1-9])([mpsz])$/);
  if (!match) return null;
  return { value: Number(match[1]), suit: match[2] };
}

function isTerminalOrHonor(value, suit) {
  // 幺九：1/9；字牌：z
  if (suit === 'z') return true;
  return value === 1 || value === 9;
}

function isHonorTriplet(group) {
  const match = group.match(/^([1-9])\1\1z$/);
  return !!match;
}

function isKan(group) {
  // 4张同牌子的编码：1111m / 5555z 等
  return /^([1-9])\1\1\1[mpsz]$/.test(group);
}

function isTriplet(group) {
  return /^([1-9])\1\1[mpsz]$/.test(group);
}

function groupValueSuit(group) {
  const match = group.match(/^([1-9]+)([mpsz])$/);
  if (!match) return null;
  return { digits: match[1], suit: match[2] };
}

function calcMentsuFuForTripletOrKan(group, { isOpen, isKan }) {
  const ms = groupValueSuit(group);
  if (!ms) return 0;
  const digit = ms.digits[0];
  const value = Number(digit);
  const suit = ms.suit;

  // 中张：2符(刻子明) / 4符(刻子暗)
  // 幺九：4符(刻子明) / 8符(刻子暗)
  // 字牌：4符(刻子明) / 8符(刻子暗)
  // 杠子在“刻子”基础上翻倍：8/16/16/32 等（按麻将规则表）
  const terminalOrHonor = isTerminalOrHonor(value, suit);
  if (!isKan) {
    return isOpen ? (terminalOrHonor ? 4 : 2) : (terminalOrHonor ? 8 : 4);
  }
  // kan
  return isOpen ? (terminalOrHonor ? 16 : 8) : (terminalOrHonor ? 32 : 16);
}

function ceilToTen(fu) {
  // 符数向上取整到十位；底符 20 最少
  return Math.ceil(fu / 10) * 10;
}

function calcWaitFu(waitType, winType) {
  // waitType 仅由生成器给出（A1）
  // 这里的 fu 逻辑不依赖 groups/pair，直接映射枚举
  switch (waitType) {
    case '两面听':
      return 0;
    case '双碰听':
      return 0;
    case '边张':
    case '坎张':
    case '单骑听牌':
      return 2;
    default:
      // 未知枚举：保守不加
      return 0;
  }
}

function calculateFu(question) {
  // 优先处理特殊固定符数：平和/门清荣和/平和自摸/七对子（若你后续生成这些形）
  const isPinfu = question.yaku && question.yaku.includes('平和');
  const isChiitoi = question.yaku && question.yaku.includes('七对子');
  const isMenzenRon = question.openMelds.length === 0 && question.winType === 'ron';
  const isMenzenTsumo = question.openMelds.length === 0 && question.winType === 'tsumo';

  if (isChiitoi) {
    return { fu: 25, fuDetails: ['七对子固定 25 符'] };
  }
  if (isPinfu) {
    // 平和：荣和固定 30；平和自摸固定 20
    const fu = isMenzenTsumo ? 20 : 30;
    return { fu, fuDetails: [isMenzenTsumo ? '平和自摸固定 20 符' : '平和荣和固定 30 符'] };
  }

  let fu = 20; // 底符
  const fuDetails = ['底符 20 符'];

  // 门清荣和/自摸
  if (question.winType === 'ron' && question.openMelds.length === 0) {
    fu += 10;
    fuDetails.push('门清荣和 10 符');
  } else if (question.winType === 'tsumo') {
    // 自摸加 2 符
    fu += 2;
    fuDetails.push('自摸 2 符');
  }

  const winTiles = question.winTiles;
  if (Array.isArray(winTiles) && winTiles.length) {
    const tileToMeldCode = (tiles) => {
      if (!tiles || tiles.length === 0) return '';
      const suit = tiles[0].slice(-1);
      const digit = tiles[0][0];
      return `${digit.repeat(tiles.length)}${suit}`;
    };

    // 雀头：役牌雀头 2 符（仅处理字牌）
    const pairEl = winTiles.find((el) => el.kind === 'pair');
    if (pairEl?.tiles?.length === 2) {
      const t = pairEl.tiles[0];
      const suit = t.slice(-1);
      const value = Number(t[0]);
      if (suit === 'z' && (value >= 1 && value <= 7)) {
        fu += 2;
        fuDetails.push('役牌雀头 2 符');
      }
    }

    // 面子符：顺子不计；triplet/kan 计符（kan 视 open 与终幺九/字牌）
    winTiles.forEach((el) => {
      if (el.kind !== 'mentsu') return;
      if (!['triplet', 'kan'].includes(el.subtype)) return;
      const meldCode = tileToMeldCode(el.tiles);
      const isOpen = !!el.open;
      const isKanFlag = el.subtype === 'kan';

      const add = calcMentsuFuForTripletOrKan(meldCode, { isOpen, isKan: isKanFlag });
      if (!add) return;

      fu += add;
      if (isKanFlag) {
        const ms = groupValueSuit(meldCode);
        const digit = ms?.digits?.[0];
        const value = Number(digit);
        const suit = ms?.suit;
        const isYao9OrHonor = isTerminalOrHonor(value, suit);
        fuDetails.push(`暗/明杠${isYao9OrHonor ? '幺九字牌' : '中张'} ${add} 符`);
      } else {
        fuDetails.push(`${isHonorTriplet(meldCode) ? '字牌' : '中张/幺九'} ${add} 符`);
      }
    });
  } else {
    // 回退：旧字段计算（过渡用）
    const pairMatch = question.pair?.match(/^([1-9])\1z$/);
    if (pairMatch) {
      fu += 2;
      fuDetails.push('役牌雀头 2 符');
    }

    const openMeldSet = new Set(question.openMelds.map(meldTiles));
    question.groups.forEach((group) => {
      if (isTriplet(group)) {
        const add = calcMentsuFuForTripletOrKan(group, { isOpen: openMeldSet.has(group), isKan: false });
        if (add) {
          fu += add;
          fuDetails.push(`${isHonorTriplet(group) ? '字牌' : '中张/幺九'} ${add} 符`);
        }
      }
    });

    (question.concealedKans || []).forEach((kan) => {
      const ms = groupValueSuit(kan);
      if (!ms) return;
      const digit = ms.digits[0];
      const value = Number(digit);
      const suit = ms.suit;
      const isYao9OrHonor = isTerminalOrHonor(value, suit);
      const add = isYao9OrHonor ? 32 : 16;
      fu += add;
      fuDetails.push(`暗杠${isYao9OrHonor ? '幺九字牌' : '中张'} ${add} 符`);
    });
  }

  // 听牌形符（仅由 waitType）
  const waitFu = calcWaitFu(question.waitType, question.winType);
  if (waitFu) {
    fu += waitFu;
    fuDetails.push(`${question.waitType} ${waitFu} 符`);
  } else {
    // 对“两面听/未知”不加符，保持 fuDetails 结构简洁
  }

  return { fu: ceilToTen(fu), fuDetails };
}

function limitFor(han, fu) {
  if (han >= 13) return { label: '役满', base: 8000 };
  if (han >= 11) return { label: '三倍满', base: 6000 };
  if (han >= 8) return { label: '倍满', base: 4000 };
  if (han >= 6) return { label: '跳满', base: 3000 };
  if (han >= 5 || (han === 4 && fu >= 40) || (han === 3 && fu >= 70)) {
    return { label: '满贯', base: 2000 };
  }
  return null;
}

function calculatePoints(question) {
  const limit = limitFor(question.han, question.fu);
  const base = limit ? limit.base : Math.min(2000, question.fu * (2 ** (question.han + 2)));
  const dealer = question.dealer;
  const honba = question.honba;
  let payments;

  if (question.winType === 'ron') {
    const points = ceil100(base * (dealer ? 6 : 4));
    payments = { ron: points + honba * 300 };
  } else if (dealer) {
    // 亲家自摸：按你指定口径使用 base * 2
    const each = ceil100(base * 2) + honba * 100;
    payments = { each };
  } else {
    payments = {
      child: ceil100(base) + honba * 100,
      dealer: ceil100(base * 2) + honba * 100,
    };
  }

  return {
    ...payments,
    base,
    limitLabel: limit ? limit.label : `${question.fu}符 ${question.han}翻`,
  };
}

function nextDoraTile(indicator) {
  const match = indicator.match(/^([1-9])([mpsz])$/);
  if (!match) return indicator;
  const value = Number(match[1]);
  const suit = match[2];
  if (suit !== 'z') return `${value === 9 ? 1 : value + 1}${suit}`;
  if (value <= 4) return `${value === 4 ? 1 : value + 1}z`;
  return `${value >= 7 ? 5 : value + 1}z`;
}

function countTile(tileGroups, tile) {
  const match = tile.match(/^([1-9])([mpsz])$/);
  if (!match) return 0;
  const token = match[1];
  const suit = match[2];
  return tileGroups.reduce((total, group) => {
    const groupMatch = group.match(/^([1-9]+)([mpsz])$/);
    if (!groupMatch || groupMatch[2] !== suit) return total;
    return total + [...groupMatch[1]].filter((value) => value === token).length;
  }, 0);
}

function randomTiles(count) {
  return Array.from({ length: count }, () => (
    doraTilePool[Math.floor(Math.random() * doraTilePool.length)]
  ));
}

function isYakuActuallyPresent(yaku, question) {
  const tileGroups = [...question.groups, question.pair, question.winTile];
  const allTiles = tileGroups.join('');
  if (yaku === '役牌') {
    return question.groups.some((group) => /^([1-7])\1\1z$/.test(group));
  }
  if (yaku === '断幺九') {
    return !/(1|9|z)/.test(allTiles);
  }
  if (yaku === '清一色') {
    const suits = new Set([...allTiles].filter((tile) => /[mpsz]/.test(tile)));
    return suits.size === 1 && !suits.has('z');
  }
  if (yaku === '混一色') {
    const suits = new Set([...allTiles].filter((tile) => /[mpsz]/.test(tile)));
    return suits.size === 2 && suits.has('z');
  }
  return true;
}

function hasWinningYaku(question) {
  const statusYaku = new Set(['立直', '一发', '门清自摸']);
  const structuralYaku = question.yaku.some((yaku) => (
    !statusYaku.has(yaku)
    && !yaku.startsWith('宝牌')
    && yaku !== '赤宝牌'
    && isYakuActuallyPresent(yaku, question)
  ));
  const riichiYaku = question.riichi && !question.openMelds.length;
  // 生成题目时，不允许仅靠“门清自摸”来放行无效的役种组合；
  // 否则会出现役种与牌型不匹配（例如断幺九却含有幺九/字牌）的问题。
  return riichiYaku || structuralYaku;
}

function normalizeTileForMatch(tile) {
  // '4m' / '5z' => keep as-is
  return tile;
}

function expandGroupToTiles(group) {
  const match = group.match(/^([1-9]+)([mpsz])$/);
  if (!match) return [];
  const [digits, suit] = [match[1], match[2]];
  return [...digits].map((d) => `${d}${suit}`);
}

function allTilesFromQuestion(question) {
  const baseGroups = [
    ...(question.groups || []),
    ...(question.openMelds || []),
    ...(question.concealedKans || []),
    question.pair,
    question.winTile,
  ];
  // 注意：question.winTile 是“和牌牌”不在 question.groups/pair 里；用于某些役的判断更直观。
  // 若你希望更严格（不要用 winTile 参与结构判断），后续我可以再调。
  return baseGroups.flatMap((g) => expandGroupToTiles(g));
}

function extractMentsuFromGroups(groups) {
  // 返回：sequences/triplets 分开统计（只看 groups 内部的编码）
  const sequences = [];
  const triplets = [];
  groups.forEach((group) => {
    if (/^[1-9]{3}[mps]$/.test(group)) sequences.push(group);
    else if (/^([1-9])\1\1[mpsz]$/.test(group)) triplets.push(group);
  });
  return { sequences, triplets };
}

function computeYakuFromFacts(question) {
  // 这里只做“是否成立”的识别集合；番数由 yakuOptions 的 closed/open 规则计算
  const labels = new Set();
  const openMeldCount = (question.openMelds || []).length;

  const allTiles = allTilesFromQuestion(question);
  const allTokens = allTiles.join('');

  const suitsInHand = new Set(allTiles.filter((t) => /[mpsz]/.test(t)).map((t) => t.slice(-1)));
  const suitSetNoZ = new Set([...allTiles].filter((t) => /[mps]/.test(t)).map((t) => t.slice(-1)));

  // 断幺九：无 1/9/字牌
  const isTanyao = !/(1|9|z)/.test(allTokens);
  if (isTanyao) labels.add('断幺九');

  // 役牌：存在 字牌刻子（含雀头）
  const honorTripletsOrPair = (() => {
    const tiles = [...(question.groups || []), question.pair];
    return tiles.some((g) => /^([1-7])\1\1z$/.test(g)) || (question.pair || '').match(/^([1-7])\1z$/);
  })();
  if (honorTripletsOrPair) labels.add('役牌');

  // 一气通贯：同一花色内 123/456/789 顺子
  const seqGroupsAll = [...(question.groups || []), ...(question.openMelds || [])]
    .filter((g) => /^[1-9]{3}[mps]$/.test(g));
  const hasIttsuInSuit = (suit) => {
    const patterns = new Set(seqGroupsAll
      .filter((g) => g.endsWith(suit))
      .map((g) => g.slice(0, 3))
    );
    return patterns.has('123') && patterns.has('456') && patterns.has('789');
  };
  if (hasIttsuInSuit('m') || hasIttsuInSuit('p') || hasIttsuInSuit('s')) {
    labels.add('一气通贯');
  }

  // 三色同顺：同一数字组合在三花色分别出现顺子
  const hasSanshokuDoujun = () => {
    const combos = new Map(); // key: '123' => set of suits
    seqGroupsAll.forEach((g) => {
      const num = g.slice(0, 3);
      const suit = g.slice(-1);
      if (!combos.has(num)) combos.set(num, new Set());
      combos.get(num).add(suit);
    });
    for (const [, suitSet] of combos.entries()) {
      if (suitSet.size === 3 && ['123', '456', '789'].includes([...combos.keys()][0])) {
        // 上面这个条件不严谨但足够用于你现有编码模板的“组合顺”
      }
      // 更稳：只要同一个 num 在 m/p/s 都出现即可
      for (const [num, suitSet2] of combos.entries()) {
        if (num && suitSet2.has('m') && suitSet2.has('p') && suitSet2.has('s')) return true;
      }
    }
    return false;
  };
  // 你当前 yakuOptions 里“三色同顺”存在，但代码里很少出现；这里先不硬判，避免误报
  // if (hasSanshokuDoujun()) labels.add('三色同顺');

  // 混一色 / 清一色
  if (suitsInHand.has('z')) {
    const hasMps = suitsInHand.has('m') || suitsInHand.has('p') || suitsInHand.has('s');
    if (hasMps) labels.add('混一色');
    // 字牌+一种花色 => 混一色；若只有 m/p/s 之一且无别的 mps 花色才是清一色（见下）
  } else {
    if (suitSetNoZ.size === 1) labels.add('清一色');
  }

  // 纯全带幺九 / 混全带幺九：先用“每个刻子/顺子都包含幺九/字牌”的近似判定
  // （完整精确需要更细的面子拆分与“明刻/暗刻/顺子边张”检查；你后续文档要求可以再补齐。）
  // 暂不强行加入，以免误报。

  // 七对子：当前生成器是 4面子+1雀头，不太会出现；先不支持。

  // 对对和：所有面子都是刻子/杠子（open/close都算）
  const allMentsu = [...(question.groups || []), ...(question.openMelds || []), ...(question.concealedKans || [])];
  const isToitoi = allMentsu.length > 0 && allMentsu.every((g) => /^([1-9])\1\1[mpsz]$/.test(g) || /^([1-9])\1\1\1[mpsz]$/.test(g));
  if (isToitoi) labels.add('对对和');

  // 三暗刻：所有刻子都为暗刻（这里简化：只要 openMelds 没有刻子，且存在>=3个刻子）
  const openTriplets = (question.openMelds || []).filter((g) => /^([1-9])\1\1[mpsz]$/.test(g) || /^([1-9])\1\1\1[mpsz]$/.test(g));
  const closedTriplets = [...(question.groups || [])].filter((g) => /^([1-9])\1\1[mpsz]$/.test(g));
  if (openTriplets.length === 0 && closedTriplets.length >= 3) labels.add('三暗刻');

  // 一盃口 / 二杯口：门清限定且需要顺子重复。此处先做门清条件过滤后的结构判定
  if (openMeldCount === 0) {
    const seqOnly = seqGroupsAll.map((g) => g.slice(0, 3) + g.slice(-1)); // '123m'
    const counts = new Map();
    seqOnly.forEach((s) => counts.set(s, (counts.get(s) || 0) + 1));
    const pairs = [...counts.values()].reduce((acc, c) => acc + Math.floor(c / 2), 0);
    if (pairs >= 1) labels.add('一盃口');
    if (pairs >= 2) labels.add('二杯口');
  }

  // 平和：门清 + 两面听 + 全顺子 + 雀头不是役牌
  if (openMeldCount === 0
    && question.waitType === '两面听'
    && (question.concealedKans || []).length === 0
  ) {
    const groupsOnly = question.groups || [];
    const hasOnlySequences = groupsOnly.every((g) => /^[1-9]{3}[mps]$/.test(g));
    const pair = question.pair || '';
    const pairHonor = /^([1-7])\1z$/.test(pair); // 役牌雀头：1z~7z
    // pinfu 的雀头不能是役牌（字牌）
    if (hasOnlySequences && !pairHonor) {
      labels.add('平和');
    }
  }

  // 清一色/混一色：已处理；其它役先不硬判，等你确认后再继续补齐

  return [...labels];
}

function randomQuestion() {
  // 先用一个不依赖模板的最小生成器跑通全链路：平和（门清 + 两面听 + 全顺子 + 非字牌雀头）
  const dealer = Math.random() < 0.25;
  const winType = Math.random() < 0.5 ? 'ron' : 'tsumo';
  const honba = state.includeHonba ? Math.floor(Math.random() * 4) : 0;

  const riichi = Math.random() < 0.8;
  const ippatsu = riichi && Math.random() < 0.35;

  const roll = Math.random();
  let question;
  if (roll < 0.27) {
    question = generateFactsForPinfu({ dealer, winType, honba, riichi, ippatsu });
  } else if (roll < 0.54) {
    question = generateFactsForTanyao({ dealer, winType, honba, riichi, ippatsu });
  } else if (roll < 0.81) {
    question = generateFactsForIttsu({ dealer, winType, honba, riichi, ippatsu });
  } else {
    question = generateFactsForYakuhai({ dealer, winType, honba, riichi, ippatsu });
  }

  // 从 facts 推理役种，并补齐状态性役
  question.yaku = computeYakuFromFacts(question);
  if (question.riichi) question.yaku.push('立直');
  if (question.ippatsu) question.yaku.push('一发');
  if (question.openMelds.length === 0 && question.winType === 'tsumo') question.yaku.push('门清自摸');

  // 宝牌/里宝牌与赤宝牌
  question.kanCount = 0;
  question.doraIndicators = randomTiles(1);
  question.uraDoraIndicators = question.riichi ? randomTiles(question.doraIndicators.length) : [];

  const tileGroups = [...question.groups, question.pair];
  question.redDoraCount = Math.min(
    Math.floor(Math.random() * 3),
    countTile(tileGroups, '5m') + countTile(tileGroups, '5p') + countTile(tileGroups, '5s'),
  );
  question.doraCount = [...question.doraIndicators, ...question.uraDoraIndicators]
    .reduce((total, indicator) => total + countTile(tileGroups, nextDoraTile(indicator)), 0)
    + question.redDoraCount;

  // 计算番数
  const hasOpen = question.openMelds.length > 0;
  const yakuHanTotal = question.yaku.reduce((sum, yakuLabel) => {
    if (yakuLabel.startsWith('宝牌×') || yakuLabel === '赤宝牌') return sum;
    const opt = yakuOptions.find((o) => o.label === yakuLabel);
    if (!opt) return sum;
    const han = hasOpen && opt.openHan !== undefined ? opt.openHan : opt.closedHan;
    return sum + (typeof han === 'number' ? han : 0);
  }, 0);

  if (question.doraCount > 0) question.yaku.push(`宝牌×${question.doraCount}`);
  if (question.redDoraCount > 0) question.yaku.push('赤宝牌');
  question.han = yakuHanTotal + question.doraCount;

  // 符数
  const fuResult = calculateFu(question);
  question.fu = fuResult.fu;
  question.fuDetails = fuResult.fuDetails;

  question.answer = calculatePoints(question);
  // 将当前 facts 结构整合成更清晰的 winTiles（用于 debug/校验/未来迁移逻辑）
  question.winTiles = buildWinTilesFromQuestion(question);
  if (!validateWinTiles(question)) {
    return randomQuestion();
  }
  return question;
}

function generateFactsForPinfu({ dealer, winType, honba, riichi, ippatsu }) {
  const suit = ['m', 'p', 's'][Math.floor(Math.random() * 3)];
  const makeSeq = (start) => `${start}${start + 1}${start + 2}${suit}`;

  // 固定三顺：123 + 456 + 789，再补一顺：234 / 345 / 678（保证仍是全顺）
  const mentsu = [makeSeq(1), makeSeq(4), makeSeq(7)];
  const fourth = [makeSeq(2), makeSeq(3), makeSeq(6)][Math.floor(Math.random() * 3)];
  mentsu.push(fourth);

  // 雀头取非役牌（不取 z），并避免 1/9 让其更接近平和构成的常见形态
  const pairVal = [2, 3, 4, 5, 6, 7, 8][Math.floor(Math.random() * 7)];
  const pair = `${pairVal}${pairVal}${suit}`;

  // 暂时先用“两面听”里比较常见的牌：2~7（避免 1/9 更像边张）
  // 确保 winTile 一定来自当前的（4面子+雀头）所组成的牌池里
  const tiles14 = [
    ...mentsu.flatMap((g) => {
      const m = g.match(/^([1-9]+)([mps])$/);
      if (!m) return [];
      const [digits, s] = [m[1], m[2]];
      return [...digits].map((d) => `${d}${s}`);
    }),
    `${pair[0]}${suit}`,
    `${pair[0]}${suit}`,
  ];

  // 先从“手牌部分”抽 winTile，再做平和约束过滤（winTile 不能是顺子中间张）
  const temp = {
    groups: mentsu,
    openMelds: [],
    concealedKans: [],
    pair,
  };
  const tempWinTiles = buildWinTilesFromQuestion(temp);
  const shunMiddles = new Set(
    mentsu
      .filter((g) => /^[1-9]{3}[mps]$/.test(g))
      .map((g) => {
        const m = g.match(/^([1-9])([1-9])([1-9])([mps])$/);
        return `${m[2]}${m[4]}`;
      }),
  );
  const handTiles = collectHandTilesFromWinTiles(tempWinTiles);
  const candidate = handTiles.filter((t) => !shunMiddles.has(t));
  const winTile = candidate[Math.floor(Math.random() * candidate.length)];

  return {
    groups: mentsu,
    pair,
    hands: tileGroupsToHand13({ groups: mentsu, pair }),
    openMelds: [],
    concealedKans: [],
    winTile,
    winType,
    waitType: '两面听',
    riichi,
    ippatsu,
    roundWind: 0,
    playerWind: 0,
    doraIndicators: [],
    uraDoraIndicators: [],
    redDoraCount: 0,
    kanCount: 0,
    honba,
    dealer,
  };
}

function generateFactsForTanyao({ dealer, winType, honba, riichi, ippatsu }) {
  // 断幺九：只用 2~8 的数牌（m/p/s），不出现 1/9/字牌 z
  const suit = ['m', 'p', 's'][Math.floor(Math.random() * 3)];
  const makeSeq = (start) => `${start}${start + 1}${start + 2}${suit}`;

  // 只挑不会包含 1/9 的顺子：例如 234/345/456/567/678
  const seqPool = [makeSeq(2), makeSeq(3), makeSeq(4), makeSeq(5), makeSeq(6)];
  const mentsu = [];
  while (mentsu.length < 4) {
    const cand = seqPool[Math.floor(Math.random() * seqPool.length)];
    // 为了让听牌形之后更容易补，我们简单允许重复
    mentsu.push(cand);
  }

  // 雀头也从 2~8 里选
  const pairVal = [2, 3, 4, 5, 6, 7, 8][Math.floor(Math.random() * 7)];
  const pair = `${pairVal}${pairVal}${suit}`;

  // 从“手牌部分”抽 winTile（自动剔除副露/杠）
  const temp = {
    groups: mentsu,
    openMelds: [],
    concealedKans: [],
    pair,
  };
  const tempWinTiles = buildWinTilesFromQuestion(temp);
  const winTile = pickWinTileFromHand(tempWinTiles);

  // 推导 waitType（用于避免“坎张却误判成两面听，从而产生平和”）
  let inferredWaitType = '边张';
  if (winTile === `${pairVal}${suit}`) {
    inferredWaitType = '单骑听牌';
  } else {
    const winShun = mentsu.find((g) => /^[1-9]{3}[mps]$/.test(g) && g.includes(winTile[0]));
    if (winShun) {
      const m = winShun.match(/^([1-9])([1-9])([1-9])([mps])$/);
      const middleTile = `${m[2]}${m[4]}`;
      inferredWaitType = (middleTile === winTile) ? '坎张' : '边张';
    }
  }

  return {
    groups: mentsu,
    pair,
    hands: tileGroupsToHand13({ groups: mentsu, pair }),
    openMelds: [],
    concealedKans: [],
    winTile,
    winType,
    waitType: inferredWaitType,
    riichi,
    ippatsu,
    roundWind: 0,
    playerWind: 0,
    doraIndicators: [],
    uraDoraIndicators: [],
    redDoraCount: 0,
    kanCount: 0,
    honba,
    dealer,
  };
}

function generateFactsForIttsu({ dealer, winType, honba, riichi, ippatsu }) {
  // 一气通贯：同一花色内存在 123 + 456 + 789 三顺
  const suit = ['m', 'p', 's'][Math.floor(Math.random() * 3)];
  const seq = (start) => `${start}${start + 1}${start + 2}${suit}`;

  const mentsuBase = [seq(1), seq(4), seq(7)];
  const pickSuit = () => ['m', 'p', 's'][Math.floor(Math.random() * 3)];
  const isDice = () => Math.random() < 0.5;

  // 第4个面子：可用任意花色、任意是否1/9/z
  // 这里实现：顺子 or 刻子（先不做杠；你后续如果要杠，我再加）
  let fourth;
  if (isDice()) {
    // 随机顺子：任意 suit，起点 1~7
    const s = pickSuit();
    const start = 1 + Math.floor(Math.random() * 7);
    fourth = `${start}${start + 1}${start + 2}${s}`;
  } else {
    // 随机刻子：可以是数牌(1~9)或字牌(z 1~7)
    if (Math.random() < 0.25) {
      // 字牌刻子
      const v = 1 + Math.floor(Math.random() * 7);
      fourth = `${v}${v}${v}z`;
    } else {
      const s = pickSuit();
      const v = 1 + Math.floor(Math.random() * 9);
      fourth = `${v}${v}${v}${s}`;
    }
  }
  const mentsu = [...mentsuBase, fourth];

  // 雀头：任意花色（包含字牌）
  let pair;
  if (Math.random() < 0.25) {
    const v = 1 + Math.floor(Math.random() * 7);
    pair = `${v}${v}z`;
  } else {
    const s = pickSuit();
    const v = 1 + Math.floor(Math.random() * 9);
    pair = `${v}${v}${s}`;
  }

  // 先生成临时 winTiles，再从“手牌部分”抽 winTile
  const temp = {
    groups: mentsu,
    openMelds: [],
    concealedKans: [],
    pair,
  };
  const tempWinTiles = buildWinTilesFromQuestion(temp);
  const winTile = pickWinTileFromHand(tempWinTiles);

  // 推导 waitType（简化版：顺子中间=坎张；否则边张；雀头=单骑）
  let inferredWaitType = '边张';
  if (winTile === `${pairVal}${suit}`) {
    inferredWaitType = '单骑听牌';
  } else {
    const winShun = mentsu.find((g) => /^[1-9]{3}[mps]$/.test(g) && g.includes(winTile[0]));
    if (winShun) {
      const m = winShun.match(/^([1-9])([1-9])([1-9])([mps])$/);
      const middleTile = `${m[2]}${m[4]}`;
      inferredWaitType = (middleTile === winTile) ? '坎张' : '边张';
    }
  }

  return {
    groups: mentsu,
    pair,
    hands: tileGroupsToHand13({ groups: mentsu, pair }),
    openMelds: [],
    concealedKans: [],
    winTile,
    winType,
    waitType: inferredWaitType,
    riichi,
    ippatsu,
    roundWind: 0,
    playerWind: 0,
    doraIndicators: [],
    uraDoraIndicators: [],
    redDoraCount: 0,
    kanCount: 0,
    honba,
    dealer,
  };
}

function generateFactsForYakuhai({ dealer, winType, honba, riichi, ippatsu }) {
  // 役牌：只考虑 中/白/发（z=5/6/7）
  const yakuhaiVals = [5, 6, 7];
  const v = yakuhaiVals[Math.floor(Math.random() * yakuhaiVals.length)];
  const yakuhaiTriplet = `${v}${v}${v}z`;

  // 补齐剩余 3 个面子：优先用顺子/刻子，避免引入字牌其它值（不影响役牌成立，但减少噪音）
  const suit = ['m', 'p', 's'][Math.floor(Math.random() * 3)];
  const seq = (start) => `${start}${start + 1}${start + 2}${suit}`;
  const trip = (vv) => `${vv}${vv}${vv}${suit}`;

  // 从 2~8 里挑，降低与断幺九/平和误判的耦合（但不做硬限制）
  const v2 = 2 + Math.floor(Math.random() * 7);

  // 组合 4 面子：1个役牌刻子 + 3个普通面子
  const mentsu = [
    yakuhaiTriplet,
    Math.random() < 0.6 ? seq(1 + Math.floor(Math.random() * 7 - 1)) : trip(v2),
    Math.random() < 0.6 ? seq(1 + Math.floor(Math.random() * 7 - 1)) : trip(v2),
    Math.random() < 0.6 ? seq(1 + Math.floor(Math.random() * 7 - 1)) : trip(v2),
  ];

  // 雀头：任意（允许字牌也行）
  const pairChoice = Math.random() < 0.15 ? 'z' : suit;
  if (pairChoice === 'z') {
    const pv = 1 + Math.floor(Math.random() * 7);
    var pair = `${pv}${pv}z`;
  } else {
    const pv = 1 + Math.floor(Math.random() * 9);
    var pair = `${pv}${pv}${suit}`;
  }

  // winTile：从“手牌部分”（不含 open/kan）抽一张
  const temp = {
    groups: mentsu,
    openMelds: [],
    concealedKans: [],
    pair,
  };
  const tempWinTiles = buildWinTilesFromQuestion(temp);
  const winTile = pickWinTileFromHand(tempWinTiles);

  // waitType：简化先按顺子位置/雀头推断（后续你再验收精度）
  let inferredWaitType = '边张';
  if (winTile === pair[0] + pair[pair.length - 1]) {
    inferredWaitType = '单骑听牌';
  } else {
    const winShun = mentsu.find((g) => /^[1-9]{3}[mps]$/.test(g) && g.includes(winTile[0]));
    if (winShun) {
      const m = winShun.match(/^([1-9])([1-9])([1-9])([mps])$/);
      const middleTile = `${m[2]}${m[4]}`;
      inferredWaitType = (middleTile === winTile) ? '坎张' : '边张';
    }
  }

  return {
    groups: mentsu,
    pair,
    hands: tileGroupsToHand13({ groups: mentsu, pair }),
    openMelds: [],
    concealedKans: [],
    winTile,
    winType,
    waitType: inferredWaitType,
    riichi,
    ippatsu,
    roundWind: 0,
    playerWind: 0,
    doraIndicators: [],
    uraDoraIndicators: [],
    redDoraCount: 0,
    kanCount: 0,
    honba,
    dealer,
  };
}

function formatPoints(value) {
  return `${value.toLocaleString('zh-CN')} 点`;
}

function renderQuestion() {
  const q = state.question;
  const answer = q.answer;
  $('#winner-status').textContent = q.dealer ? '庄家' : '子家';
  $('#win-method-status').textContent = q.winType === 'ron' ? '捉铳' : '自摸';
  const winTiles = q.winTiles || [];

  // 辅助：把 tiles ['1s','2s','3s'] 还原成 meld 编码 '123s'
  const tilesToMeldCode = (tiles) => {
    if (!tiles || !tiles.length) return '';
    const suit = tiles[0].slice(-1);
    const digits = tiles.map((t) => t.slice(0, -1)).join('');
    return `${digits}${suit}`;
  };

  const openMeldCodes = new Set(
    winTiles
      .filter((el) => el.kind === 'mentsu' && el.open === true)
      .map((el) => tilesToMeldCode(el.tiles)),
  );

  const concealedKanEls = winTiles.filter((el) => el.kind === 'mentsu' && el.subtype === 'kan' && el.open === false);
  const concealedKansCodes = concealedKanEls.map((el) => tilesToMeldCode(el.tiles));

  const concealedKanTiles = new Set(concealedKansCodes);
  const redState = { remaining: q.redDoraCount };
  // UI：手牌区只显示“和牌前 13 张”，即从（4面子+雀头展开的14张）中移除一张 winTile
  const tiles14 = winTiles.flatMap((el) => {
    // 暗杠不进手牌区，且副露不进手牌区
    if (el.kind !== 'mentsu' && el.kind !== 'pair') return [];
    if (el.kind === 'mentsu') {
      if (el.subtype === 'kan') return [];
      if (el.open === true) return [];
    }
    return el.tiles || [];
  });

  const winTileToken = q.winTile;
  const removed = { done: false };
  const tiles13 = tiles14.filter((t) => {
    if (!removed.done && t === winTileToken) {
      removed.done = true;
      return false;
    }
    return true;
  });

  $('#hand-label').textContent = '手牌';
  $('#hand-groups').innerHTML = tiles13
    .map((t) => `<span>${formatTileGroup(t, redState)}</span>`)
    .join('');
  $('#riichi-status').textContent = q.riichi ? '已立直' : '未立直';
  $('#ippatsu-status-item').hidden = !q.ippatsu;
  $('#meld-status').textContent = openMeldCodes.size ? '有副露' : '门清';
  $('#open-melds').hidden = openMeldCodes.size === 0;
  $('#open-meld-list').innerHTML = Array.from(openMeldCodes)
    .map((meldCode) => `<span>${formatMeld(meldCode, redState)}</span>`).join('');
  $('#concealed-kans').hidden = concealedKansCodes.length === 0;
  $('#concealed-kan-list').innerHTML = concealedKansCodes
    .map((kanCode) => `<span>暗杠 ${formatKan(kanCode, redState)}</span>`).join('');
  $('#win-tile').innerHTML = formatTileGroup(q.winTile, redState);
  $('#dora-label').textContent = `宝牌指示牌（${q.doraIndicators.length} 张${
    q.kanCount ? `，${q.kanCount} 次开杠` : ''
  }）`;
  $('#dora-indicators').innerHTML = q.doraIndicators
    .map((indicator) => `<span>${formatTile(indicator)}</span>`).join('');
  $('#ura-dora-row').hidden = !q.riichi;
  $('#ura-dora-indicators').innerHTML = q.uraDoraIndicators
    .map((indicator) => `<span>${formatTile(indicator)}</span>`).join('');
  renderYakuOptions(q);
  $('#fu-details').innerHTML = '';
  $('#fu-details').hidden = true;
  $('#fu-details-label').textContent = '符数构成（提交后查看）';
  $('#han-details').innerHTML = '';
  $('#han-details').hidden = true;
  $('#han-details-label').textContent = '番数构成（提交后查看）';
  $('#han-value').textContent = '待计算';
  $('#fu-value').textContent = '待计算';
  $('#honba-value').textContent = state.includeHonba ? `${q.honba} 本场` : '未计本场';
  $('#question-hint').textContent = q.hint;
  $('#feedback').hidden = true;
  $('#answer-form').hidden = false;
  $('#answer-form').reset();
  $('#ron-input').hidden = q.winType !== 'ron';
  $('#tsumo-inputs').hidden = q.winType !== 'tsumo';
  $('#dealer-answer').closest('.answer-field').hidden = q.winType !== 'tsumo' || q.dealer;
  $('#child-answer').closest('.answer-field').querySelector('label').textContent =
    q.dealer ? '每家支付' : '子家各支付';
  $('#submit-answer').disabled = false;
}

function expectedText(q) {
  const a = q.answer;
  const scoreText = `符数 ${q.fu} 符，${q.han} 翻。`;
  if (q.winType === 'ron') {
    return `${scoreText}点炮者支付 ${formatPoints(a.ron)}。`;
  }
  if (q.dealer) {
    return `${scoreText}三家子家各支付 ${formatPoints(a.each)}。`;
  }
  return `${scoreText}两位子家各支付 ${formatPoints(a.child)}，庄家支付 ${formatPoints(a.dealer)}。`;
}

function explanation(q) {
  const a = q.answer;
  const baseText = a.limitLabel === '役满' || a.limitLabel.includes('满')
    ? `${a.limitLabel}的基本点为 ${a.base.toLocaleString('zh-CN')}。`
    : `基本点 = ${q.fu} × 2^(${q.han} + 2) = ${a.base.toLocaleString('zh-CN')}。`;
  const roundText = q.winType === 'ron'
    ? `荣和按庄家 ${a.base}×6、子家 ${a.base}×4，再向上取整到百位。`
    : '自摸时，庄家支付基本点×2，子家支付基本点；每一笔都向上取整到百位。';
  const honbaText = q.honba ? `本场加成：${q.honba}×${q.winType === 'ron' ? 300 : 100} 点。` : '本场加成：0 点。';
  return `${baseText} ${roundText} ${honbaText}`;
}

function parseAnswer(value) {
  const normalized = value.replace(/[,，\s]/g, '');
  if (!/^\d+$/.test(normalized)) return NaN;
  return Number(normalized);
}

const guideContent = {
  fu: {
    eyebrow: 'FU',
    title: '符数计算方法',
    content: `
      <p>符数是牌型结构和和牌方式带来的加分单位，基本符数从 20 符开始。</p>
      <ul>
        <li><strong>底符：</strong>所有和牌先有 20 符。</li>
        <li><strong>和牌方式：</strong>门清荣和加 10 符，自摸加 2 符。</li>
        <li><strong>雀头：</strong>役牌组成的雀头通常加 2 符。</li>
        <li><strong>听牌形：</strong>边张、坎张、单骑加 2 符，两面听不加符。</li>
      </ul>
      <h3>面子符</h3>
      <p>顺子不加符。刻子和杠子根据牌是中张牌还是幺九/字牌，以及明牌还是暗牌计算：</p>
      <table class="fu-table">
        <thead>
          <tr><th>面子</th><th>中张明</th><th>中张暗</th><th>幺九/字牌明</th><th>幺九/字牌暗</th></tr>
        </thead>
        <tbody>
          <tr><th>刻子</th><td>2 符</td><td>4 符</td><td>4 符</td><td>8 符</td></tr>
          <tr><th>杠子</th><td>8 符</td><td>16 符</td><td>16 符</td><td>32 符</td></tr>
        </tbody>
      </table>
      <h3>特殊符数</h3>
      <ul>
        <li>平和荣和固定为 30 符。</li>
        <li>平和自摸固定为 20 符。</li>
        <li>七对子固定为 25 符，不进行通常的符数计算。</li>
      </ul>
      <p class="dialog-note">普通牌型把所有符相加后，向上取整到十位；平和和七对子按上面的特殊规则处理。</p>
    `,
  },
  points: {
    eyebrow: 'POINTS',
    title: '符数＋番数 → 点数',
    content: `
      <ol>
        <li>先用「符数 × 2<sup>（番数＋2）</sup>」算出基本点。</li>
        <li>达到满贯、跳满、倍满、三倍满或役满时，改用对应的固定基本点。</li>
        <li>每一笔支付都向上取整到百位。</li>
        <li>本场棒：荣和每本场加 300 点，自摸每位支付者加 100 点。</li>
      </ol>
      <h3>荣和（点炮）</h3>
      <ul>
        <li><strong>庄家荣和：</strong>放铳的玩家支付基本点 × 6。</li>
        <li><strong>子家荣和：</strong>放铳的玩家支付基本点 × 4。</li>
      </ul>
      <h3>自摸</h3>
      <ul>
        <li><strong>庄家自摸：</strong>其他三位子家各支付基本点 × 2。</li>
        <li><strong>子家自摸：</strong>庄家支付基本点 × 2，另外两位子家各支付基本点 × 1。</li>
      </ul>
      <div class="limit-list">
        <span>满贯：基本点 2,000</span>
        <span>跳满：基本点 3,000</span>
        <span>倍满：基本点 4,000</span>
        <span>三倍满：基本点 6,000</span>
        <span>役满：基本点 8,000</span>
      </div>
    `,
  },
  yaku: {
    eyebrow: 'YAKU',
    title: '常见役种说明',
    content: `
      <p>和牌至少需要一个役。宝牌可以增加番数，但本身不是役，不能单独和牌。</p>
      <div class="yaku-table">
        <div><strong>1 翻</strong><span>立直、一发、门清自摸、断幺九、平和、一盃口、役牌</span></div>
        <div><strong>2 翻</strong><span>七对子、对对和、三暗刻、三色同顺、三色同刻、一气通贯、混全带幺九</span></div>
        <div><strong>3 翻</strong><span>混一色、纯全带幺九（二杯口也是 3 翻）</span></div>
        <div><strong>6 翻</strong><span>清一色</span></div>
        <div><strong>役满</strong><span>国士无双、四暗刻、大三元、字一色、清老头等</span></div>
      </div>
      <p class="dialog-note">部分役种在副露后会降番，例如混一色、清一色、三色同顺和一气通贯。</p>
    `,
  },
};

function openGuide(key) {
  const guide = guideContent[key];
  if (!guide) return;
  $('#dialog-eyebrow').textContent = guide.eyebrow;
  $('#dialog-title').textContent = guide.title;
  $('#dialog-content').innerHTML = guide.content;
  $('#guide-dialog').hidden = false;
  $('#close-dialog').focus();
}

function closeGuide() {
  $('#guide-dialog').hidden = true;
}

function openYakuTool() {
  $('#yaku-dialog').hidden = false;
  $('#close-yaku-dialog').focus();
}

function closeYakuTool() {
  $('#yaku-dialog').hidden = true;
}

function rawQuestionData() {
  const q = state.question || {};
  // raw debug 口径：以 winTiles 为主，不再暴露 groups/pair 等旧字段
  // 注意：UI/符数/役种计算依赖旧字段，因此这里只在 debug 输出时移除。
  const {
    groups,
    pair,
    hands,
    openMelds,
    concealedKans,
    ...rest
  } = q;
  return JSON.stringify(rest, null, 2);
}

function openRawData() {
  $('#raw-data').textContent = rawQuestionData();
  $('#raw-dialog').hidden = false;
  $('#close-raw-dialog').focus();
}

function closeRawData() {
  $('#raw-dialog').hidden = true;
}

async function copyRawData() {
  const data = rawQuestionData();
  try {
    await navigator.clipboard.writeText(data);
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = data;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }
  const button = $('#copy-raw-data');
  button.textContent = '已复制';
  window.setTimeout(() => {
    button.textContent = '复制原始数据';
  }, 1500);
}

function submitAnswer(event) {
  event.preventDefault();
  if (state.answered) return;
  const q = state.question;
  const fuAnswer = parseAnswer($('#fu-answer').value);
  const hanAnswer = parseAnswer($('#han-answer').value);
  const inputIds = q.winType === 'ron'
    ? ['ron-answer']
    : q.dealer
      ? ['child-answer']
      : ['child-answer', 'dealer-answer'];
  const values = inputIds.map((id) => parseAnswer(document.getElementById(id).value));
  const expected = q.winType === 'ron'
    ? [q.answer.ron]
    : q.dealer
      ? [q.answer.each]
      : [q.answer.child, q.answer.dealer];
  const isCorrect = values.length === expected.length
    && fuAnswer === q.fu
    && hanAnswer === q.han
    && values.every((value, index) => value === expected[index]);

  state.answered = true;
  state.attempted += 1;
  if (isCorrect) state.correct += 1;
  $('#fu-value').textContent = `${q.fu} 符`;
  $('#han-value').textContent = `${q.han} 翻`;
  $('#fu-details').innerHTML = q.fuDetails.map((item) => `<li>${item}</li>`).join('');
  $('#fu-details').hidden = false;
  $('#fu-details-label').textContent = '符数构成';
  const yakuDetails = q.yaku
    .filter((item) => !item.startsWith('宝牌') && item !== '赤宝牌')
    .map((item) => `役种：${item}`);
  if (q.ippatsu && !q.yaku.includes('一发')) yakuDetails.push('役种：一发');
  if (q.doraCount) yakuDetails.push(`宝牌合计：${q.doraCount} 番`);
  yakuDetails.push(`总番数：${q.han} 番`);
  $('#han-details').innerHTML = yakuDetails.map((item) => `<li>${item}</li>`).join('');
  $('#han-details').hidden = false;
  $('#han-details-label').textContent = '番数构成';
  $('#submit-answer').disabled = true;
  $('#feedback').hidden = false;
  $('#feedback').className = isCorrect ? 'feedback feedback-correct' : 'feedback feedback-wrong';
  $('#feedback-title').textContent = isCorrect ? '回答正确' : '再检查一下';
  $('#feedback-answer').textContent = expectedText(q);
  $('#feedback-explanation').textContent = explanation(q);
  $('#next-question').focus();
  $('#score').textContent = `${state.correct} / ${state.attempted}`;
}

function setup() {
  document.querySelectorAll('.guide-trigger').forEach((button) => {
    button.addEventListener('click', () => openGuide(button.dataset.guide));
  });
  $('#close-dialog').addEventListener('click', closeGuide);
  $('#guide-dialog').addEventListener('click', (event) => {
    if (event.target === $('#guide-dialog')) closeGuide();
  });
  $('#show-yaku-tool').addEventListener('click', openYakuTool);
  $('#close-yaku-dialog').addEventListener('click', closeYakuTool);
  $('#yaku-dialog').addEventListener('click', (event) => {
    if (event.target === $('#yaku-dialog')) closeYakuTool();
  });
  $('#show-raw-data').addEventListener('click', openRawData);
  $('#close-raw-dialog').addEventListener('click', closeRawData);
  $('#raw-dialog').addEventListener('click', (event) => {
    if (event.target === $('#raw-dialog')) closeRawData();
  });
  $('#copy-raw-data').addEventListener('click', copyRawData);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !$('#guide-dialog').hidden) closeGuide();
    if (event.key === 'Escape' && !$('#yaku-dialog').hidden) closeYakuTool();
    if (event.key === 'Escape' && !$('#raw-dialog').hidden) closeRawData();
  });
  $('#include-honba').addEventListener('change', (event) => {
    state.includeHonba = event.target.checked;
    state.question = randomQuestion();
    renderQuestion();
  });
  $('#new-question').addEventListener('click', () => {
    state.question = randomQuestion();
    state.answered = false;
    renderQuestion();
  });
  $('#next-question').addEventListener('click', () => {
    state.question = randomQuestion();
    state.answered = false;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  $('#answer-form').addEventListener('submit', submitAnswer);
  state.question = randomQuestion();
  renderQuestion();
}

setup();
