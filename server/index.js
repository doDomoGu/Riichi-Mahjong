const http = require('http');
const httpProxy = require('http-proxy');
const listenWithFallback = require('../scripts/listen-with-fallback');

const PORT = Number(process.env.PORT) || 8080;
const WIND_TARGET = process.env.WIND_TARGET || 'http://127.0.0.1:3001';
const SCORE_PRACTICE_TARGET = process.env.SCORE_PRACTICE_TARGET || 'http://127.0.0.1:3002';
const HOME_TARGET = process.env.HOME_TARGET || 'http://127.0.0.1:3000';

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  ws: true,
});

const scorePracticeProxy = httpProxy.createProxyServer({
  changeOrigin: true,
});

const homeProxy = httpProxy.createProxyServer({
  changeOrigin: true,
});

proxy.on('error', (error, req, res) => {
  if (res && !res.headersSent) {
    res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('风向盘服务暂不可用，请先启动 wind 模块。');
  } else if (res && res.destroy) {
    res.destroy();
  }
  console.error('wind proxy error:', error.message);
});

function proxyWind(req, res) {
  req.url = req.url.replace(/^\/wind(?=\/|$)/, '') || '/';
  proxy.web(req, res, { target: WIND_TARGET });
}

function proxyScorePractice(req, res) {
  req.url = req.url.replace(/^\/score-practice(?=\/|$)/, '') || '/';
  scorePracticeProxy.web(req, res, { target: SCORE_PRACTICE_TARGET });
}

function proxyHome(req, res) {
  if (req.url === '/home.css') req.url = '/style.css';
  homeProxy.web(req, res, { target: HOME_TARGET });
}

function handleRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/wind') {
    res.writeHead(301, { Location: '/wind/' });
    res.end();
    return;
  }

  if (url.pathname === '/score-practice') {
    res.writeHead(301, { Location: '/score-practice/' });
    res.end();
    return;
  }

  if (url.pathname.startsWith('/score-practice/')) {
    proxyScorePractice(req, res);
    return;
  }

  if (url.pathname === '/' || url.pathname === '/index.html'
    || url.pathname === '/style.css' || url.pathname === '/home.css') {
    proxyHome(req, res);
    return;
  }

  if (url.pathname === '/wind' || url.pathname.startsWith('/wind/')) {
    proxyWind(req, res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not Found');
}

const server = http.createServer(handleRequest);

server.on('upgrade', (req, socket, head) => {
  if (!req.url.startsWith('/wind/')) {
    socket.destroy();
    return;
  }
  req.url = req.url.replace(/^\/wind(?=\/|$)/, '') || '/';
  proxy.ws(req, socket, head, { target: WIND_TARGET });
});

scorePracticeProxy.on('error', (error, req, res) => {
  if (res && !res.headersSent) {
    res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('点数计算服务暂不可用，请先启动 score-practice 服务。');
  } else if (res && res.destroy) {
    res.destroy();
  }
  console.error('score-practice proxy error:', error.message);
});

homeProxy.on('error', (error, req, res) => {
  if (res && !res.headersSent) {
    res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('首页服务暂不可用，请先启动 home 服务。');
  } else if (res && res.destroy) {
    res.destroy();
  }
  console.error('home proxy error:', error.message);
});

listenWithFallback(server, PORT, '0.0.0.0', (actualPort) => {
  console.log(`立直麻将工具集已启动：http://localhost:${actualPort}/`);
  console.log(`首页入口：http://localhost:${actualPort}/`);
  console.log(`风向盘入口：http://localhost:${actualPort}/wind/`);
  console.log(`点数练习入口：http://localhost:${actualPort}/score-practice/`);
});
