const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const QUESTION_HISTORY_DIR = path.join(ROOT, 'score-practice', 'question-history');
const QUESTION_HISTORY_FILE = path.join(QUESTION_HISTORY_DIR, 'questions.jsonl');
const MAX_BODY_SIZE = 1024 * 1024;

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
  });
  res.end(JSON.stringify(payload));
}

function saveQuestion(req, res) {
  let body = '';
  let tooLarge = false;

  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > MAX_BODY_SIZE && !tooLarge) {
      tooLarge = true;
      sendJson(res, 413, { saved: false });
      req.destroy();
    }
  });

  req.on('end', () => {
    if (tooLarge) return;

    let question;
    try {
      question = JSON.parse(body);
      if (!question || typeof question.questionId !== 'string') {
        throw new Error('invalid question');
      }
    } catch {
      sendJson(res, 400, { saved: false });
      return;
    }

    fs.mkdir(QUESTION_HISTORY_DIR, { recursive: true }, (mkdirError) => {
      if (mkdirError) {
        sendJson(res, 500, { saved: false });
        return;
      }
      fs.appendFile(
        QUESTION_HISTORY_FILE,
        `${JSON.stringify(question)}\n`,
        (writeError) => {
          if (writeError) {
            sendJson(res, 500, { saved: false });
            return;
          }
          sendJson(res, 201, { saved: true, questionId: question.questionId });
        },
      );
    });
  });
}

function handleQuestionsRequest(req, res, pathname) {
  if (pathname !== '/api/questions' && pathname !== '/score-practice/api/questions') {
    return false;
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { saved: false });
    return true;
  }

  saveQuestion(req, res);
  return true;
}

module.exports = handleQuestionsRequest;
