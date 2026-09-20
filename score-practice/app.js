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
    groups: ['123m', '456m', '789p', '234s'],
    pair: '55p',
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
    handGroups: ['123m', '456m', '789p', '23s', '55p'],
    winTile: '4s',
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
  const menzenTsumoYaku = question.winType === 'tsumo' && !question.openMelds.length;
  return riichiYaku || menzenTsumoYaku || structuralYaku;
}

function randomQuestion() {
  const template = handTemplates[Math.floor(Math.random() * handTemplates.length)];
  const dealer = Math.random() < 0.25;
  const winType = Math.random() < 0.5 ? 'ron' : 'tsumo';
  const honba = state.includeHonba ? Math.floor(Math.random() * 4) : 0;
  const question = {
    ...template,
    ...handDetails[template.shape],
    dealer,
    winType,
    honba,
    concealedKans: handDetails[template.shape].concealedKans || [],
    kanCount: Math.floor(Math.random() * 3),
    ippatsu: false,
  };
  if (!hasWinningYaku(question)) {
    return randomQuestion();
  }
  question.ippatsu = question.riichi && Math.random() < 0.35;
  question.yaku = question.yaku.filter((item) => item !== '一发');
  if (question.ippatsu) question.yaku.push('一发');
  question.doraIndicators = randomTiles(1 + question.kanCount);
  question.uraDoraIndicators = question.riichi
    ? randomTiles(question.doraIndicators.length)
    : [];
  const tileGroups = [...question.groups, question.pair];
  question.redDoraCount = Math.min(Math.floor(Math.random() * 3), countTile(tileGroups, '5m')
    + countTile(tileGroups, '5p') + countTile(tileGroups, '5s'));
  question.doraCount = [...question.doraIndicators, ...question.uraDoraIndicators]
    .reduce((total, indicator) => total + countTile(tileGroups, nextDoraTile(indicator)), 0)
    + question.redDoraCount;
  question.han = template.baseHan + (question.ippatsu ? 1 : 0) + question.doraCount;
  if (question.shape === '满贯') {
    question.fu = 40;
    question.fuDetails = [
      '底符 20 符',
      question.winType === 'ron' ? '门清荣和 10 符' : '自摸 2 符',
      '役牌雀头 2 符',
      '中张暗刻 8 符',
    ];
  }
  question.answer = calculatePoints(question);
  return question;
}

function formatPoints(value) {
  return `${value.toLocaleString('zh-CN')} 点`;
}

function renderQuestion() {
  const q = state.question;
  const answer = q.answer;
  $('#winner-status').textContent = q.dealer ? '庄家' : '子家';
  $('#win-method-status').textContent = q.winType === 'ron' ? '捉铳' : '自摸';
  const openMelds = new Set(q.openMelds.map(meldTiles));
  const concealedKans = q.concealedKans || [];
  const concealedKanTiles = new Set(concealedKans.map(meldTiles));
  const redState = { remaining: q.redDoraCount };
  const concealedGroups = q.handGroups
    .filter((group) => !openMelds.has(group) && !concealedKanTiles.has(group));
  $('#hand-label').textContent = '手牌';
  $('#hand-groups').innerHTML = concealedGroups
    .map((group) => `<span>${formatTileGroup(group, redState)}</span>`).join('');
  $('#riichi-status').textContent = q.riichi ? '已立直' : '未立直';
  $('#ippatsu-status-item').hidden = !q.ippatsu;
  $('#meld-status').textContent = q.openMelds.length ? '有副露' : '门清';
  $('#open-melds').hidden = !q.openMelds.length;
  $('#open-meld-list').innerHTML = q.openMelds
    .map((meld) => `<span>${formatMeld(meld, redState)}</span>`).join('');
  $('#concealed-kans').hidden = !concealedKans.length;
  $('#concealed-kan-list').innerHTML = concealedKans
    .map((kan) => `<span>暗杠 ${formatKan(kan, redState)}</span>`).join('');
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
  return JSON.stringify(state.question, null, 2);
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
