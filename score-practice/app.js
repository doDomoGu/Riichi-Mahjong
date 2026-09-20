const handTemplates = [
  {
    shape: '门清荣和',
    groups: ['123m', '456m', '789p', '234s'],
    pair: '55p',
    yaku: ['立直', '平和'],
    han: 2,
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
    fu: 30,
    fuDetails: ['底符 20 符', '自摸 2 符', '幺九牌雀头 2 符', '待牌/形状 6 符'],
    hint: '根据牌型和役种，先自行判断符数和番数。',
  },
  {
    shape: '役牌刻子',
    groups: ['123m', '789m', '345p', '678s'],
    pair: '22p',
    yaku: ['立直', '役牌'],
    han: 2,
    fu: 40,
    fuDetails: ['底符 20 符', '中张暗刻 8 符', '役牌明刻 4 符', '两面听 8 符'],
    hint: '先计算基本点，再根据庄家/子家和和牌方式换算。',
  },
  {
    shape: '中张暗刻',
    groups: ['111m', '345m', '678p', '234s'],
    pair: '66z',
    yaku: ['立直', '断幺九'],
    han: 2,
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
    fu: 50,
    fuDetails: ['底符 20 符', '幺九暗刻 8 符', '幺九雀头 2 符', '单骑听牌 2 符'],
    hint: '低翻高符时，注意判断是否达到满贯。',
  },
  {
    shape: '高符低翻',
    groups: ['111m', '999p', '789s', '123z'],
    pair: '55z',
    yaku: ['役牌', '混全带幺九'],
    han: 3,
    fu: 70,
    fuDetails: ['底符 20 符', '幺九暗刻 8 符', '幺九明刻 4 符', '字牌刻子 8 符', '雀头/听牌 30 符'],
    hint: '达到满贯后，符数不再改变基本点。',
  },
  {
    shape: '低符高翻',
    groups: ['234m', '456m', '678p', '234s'],
    pair: '55p',
    yaku: ['立直', '一发', '平和', '宝牌'],
    han: 4,
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
    fu: 40,
    fuDetails: ['符数仅用于展示，8～10 翻直接倍满。'],
    hint: '8～10 翻为倍满。',
  },
];

const state = {
  includeHonba: true,
  includeRiichi: true,
  question: null,
  answered: false,
  correct: 0,
  attempted: 0,
};

const $ = (selector) => document.querySelector(selector);

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
    riichiBonus: question.riichiSticks * 1000,
  };
}

function randomQuestion() {
  const template = handTemplates[Math.floor(Math.random() * handTemplates.length)];
  const dealer = Math.random() < 0.25;
  const winType = Math.random() < 0.5 ? 'ron' : 'tsumo';
  const honba = state.includeHonba ? Math.floor(Math.random() * 4) : 0;
  const riichiSticks = state.includeRiichi ? Math.floor(Math.random() * 3) : 0;
  const question = {
    ...template,
    dealer,
    winType,
    honba,
    riichiSticks,
  };
  question.answer = calculatePoints(question);
  return question;
}

function formatPoints(value) {
  return `${value.toLocaleString('zh-CN')} 点`;
}

function renderQuestion() {
  const q = state.question;
  const answer = q.answer;
  $('#role-badge').textContent = q.dealer ? '庄家' : '子家';
  $('#win-badge').textContent = q.winType === 'ron' ? '荣和 · 点炮' : '自摸';
  $('#shape-label').textContent = q.shape;
  $('#groups').innerHTML = q.groups.map((group) => `<span>${group}</span>`).join('');
  $('#pair').textContent = q.pair;
  $('#yaku').innerHTML = q.yaku.map((item) => `<span>${item}</span>`).join('');
  $('#fu-details').innerHTML = '';
  $('#fu-details').hidden = true;
  $('#fu-details-label').textContent = '符数构成（提交后查看）';
  $('#han-value').textContent = '待计算';
  $('#fu-value').textContent = '待计算';
  $('#honba-value').textContent = state.includeHonba ? `${q.honba} 本场` : '未计本场';
  $('#riichi-value').textContent = state.includeRiichi
    ? `${q.riichiSticks} 根供托（另收 ${formatPoints(answer.riichiBonus)}）`
    : '未计供托';
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
    return `${scoreText}点炮者支付 ${formatPoints(a.ron)}。${a.riichiBonus ? `另外获得桌上的 ${formatPoints(a.riichiBonus)} 供托。` : ''}`;
  }
  if (q.dealer) {
    return `${scoreText}三家子家各支付 ${formatPoints(a.each)}。${a.riichiBonus ? `另外获得 ${formatPoints(a.riichiBonus)} 供托。` : ''}`;
  }
  return `${scoreText}两位子家各支付 ${formatPoints(a.child)}，庄家支付 ${formatPoints(a.dealer)}。${a.riichiBonus ? `另外获得 ${formatPoints(a.riichiBonus)} 供托。` : ''}`;
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
        <li><strong>面子：</strong>顺子 0 符；刻子、杠子根据中张牌或幺九字牌，以及明刻/暗刻分别计算。</li>
        <li><strong>雀头：</strong>役牌组成的雀头通常加 2 符。</li>
        <li><strong>听牌形：</strong>边张、坎张、单骑加 2 符，两面听不加符。</li>
      </ul>
      <p class="dialog-note">把所有符相加后，向上取整到十位。平和荣和固定为 30 符，七对子固定为 25 符。</p>
    `,
  },
  points: {
    eyebrow: 'POINTS',
    title: '符数＋番数 → 点数',
    content: `
      <ol>
        <li>先用「符数 × 2<sup>（番数＋2）</sup>」算出基本点。</li>
        <li>达到满贯、跳满、倍满、三倍满或役满时，改用对应的固定基本点。</li>
        <li>荣和：庄家支付基本点×6，子家支付基本点×4。</li>
        <li>自摸：庄家支付基本点×2；子家支付基本点。</li>
        <li>每一笔支付都向上取整到百位。</li>
        <li>本场棒：荣和每本场加 300 点，自摸每位支付者加 100 点；供托立直棒由和牌者额外获得。</li>
      </ol>
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
        <div><strong>2 翻</strong><span>七对子、对对和、三暗刻、三色同顺（门清）、一气通贯（门清）、混全带幺九</span></div>
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
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !$('#guide-dialog').hidden) closeGuide();
  });
  $('#include-honba').addEventListener('change', (event) => {
    state.includeHonba = event.target.checked;
    state.question = randomQuestion();
    renderQuestion();
  });
  $('#include-riichi').addEventListener('change', (event) => {
    state.includeRiichi = event.target.checked;
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
