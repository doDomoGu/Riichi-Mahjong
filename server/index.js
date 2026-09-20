const fs = require('fs');
const http = require('http');
const path = require('path');
const httpProxy = require('http-proxy');

const ROOT = path.join(__dirname, '..');
const PORT = Number(process.env.PORT) || 8081;
const WIND_TARGET = process.env.WIND_TARGET || 'http://127.0.0.1:3000';

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  ws: true,
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

function sendFile(res, relativePath, contentType) {
  const filePath = path.join(ROOT, relativePath);
  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(error.code === 'ENOENT' ? 404 : 500);
      res.end(error.code === 'ENOENT' ? 'Not Found' : 'Internal Server Error');
      return;
    }
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
    });
    res.end(content);
  });
}

function proxyWind(req, res) {
  req.url = req.url.replace(/^\/wind(?=\/|$)/, '') || '/';
  proxy.web(req, res, { target: WIND_TARGET });
}

function handleRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/wind') {
    res.writeHead(301, { Location: '/wind/' });
    res.end();
    return;
  }

  if (url.pathname === '/wind' || url.pathname.startsWith('/wind/')) {
    proxyWind(req, res);
    return;
  }

  const staticFiles = {
    '/': ['index.html', 'text/html; charset=utf-8'],
    '/index.html': ['index.html', 'text/html; charset=utf-8'],
    '/home.css': ['home.css', 'text/css; charset=utf-8'],
    '/score-practice/': ['score-practice/index.html', 'text/html; charset=utf-8'],
    '/score-practice/index.html': ['score-practice/index.html', 'text/html; charset=utf-8'],
    '/score-practice/style.css': ['score-practice/style.css', 'text/css; charset=utf-8'],
    '/score-practice/app.js': ['score-practice/app.js', 'text/javascript; charset=utf-8'],
  };
  const file = staticFiles[url.pathname];
  if (file) {
    sendFile(res, file[0], file[1]);
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

server.listen(PORT, '0.0.0.0', () => {
  console.log(`立直麻将工具集已启动：http://localhost:${PORT}/`);
  console.log(`风向盘入口：http://localhost:${PORT}/wind/`);
  console.log(`点数练习入口：http://localhost:${PORT}/score-practice/`);
});
