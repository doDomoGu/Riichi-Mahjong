const http = require('http');
const fs = require('fs');
const path = require('path');
const listenWithFallback = require('../../scripts/listen-with-fallback');

const PORT = Number(process.env.PORT) || 3002;
const ROOT = path.join(__dirname, '..');

const staticFiles = {
  '/': ['index.html', 'text/html; charset=utf-8'],
  '/index.html': ['index.html', 'text/html; charset=utf-8'],
  '/style.css': ['style.css', 'text/css; charset=utf-8'],
  '/app.js': ['app.js', 'text/javascript; charset=utf-8'],
};

// tiles/ 下是牌面 SVG 图片，文件名固定为字母数字组合（如 Man5-Dora.svg），
// 用白名单正则校验，避免把任意路径拼进 fs.readFile。
const TILE_IMAGE_PATTERN = /^\/tiles\/[A-Za-z0-9-]+\.svg$/;

function sendFile(res, relativePath, contentType) {
  fs.readFile(path.join(ROOT, relativePath), (error, content) => {
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

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const file = staticFiles[url.pathname];
  if (req.method === 'GET' && file) {
    sendFile(res, file[0], file[1]);
    return;
  }

  if (req.method === 'GET' && TILE_IMAGE_PATTERN.test(url.pathname)) {
    sendFile(res, url.pathname.slice(1), 'image/svg+xml');
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not Found');
});

listenWithFallback(server, PORT, '127.0.0.1', (actualPort) => {
  console.log(`点数计算服务已启动：http://127.0.0.1:${actualPort}`);
});
