// proxy-server.js
// 本地代理服务器，用于解决微信开发者工具无法访问本地 IP 的问题
// 使用方法：node proxy-server.js
// 然后修改 miniprogram/utils/api.js 中的 API_BASE_URL 为 'http://localhost:3000/proxy'

const http = require('http');
const url = require('url');

const TARGET_SERVER = 'http://172.16.1.221:6999';
const PROXY_PORT = 3000;

const server = http.createServer((req, res) => {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 解析目标 URL
  const targetUrl = TARGET_SERVER + req.url.replace('/proxy', '');
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} -> ${targetUrl}`);

  // 转发请求到目标服务器
  const options = {
    hostname: url.parse(targetUrl).hostname,
    port: url.parse(targetUrl).port,
    path: url.parse(targetUrl).path,
    method: req.method,
    headers: {
      'Content-Type': req.headers['content-type'] || 'application/json'
    }
  };

  const proxyReq = http.request(options, (proxyRes) => {
    // 设置响应头
    res.writeHead(proxyRes.statusCode, {
      'Content-Type': proxyRes.headers['content-type'] || 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    // 转发响应数据
    proxyRes.on('data', (chunk) => {
      res.write(chunk);
    });

    proxyRes.on('end', () => {
      res.end();
      console.log(`[${new Date().toISOString()}] Response: ${proxyRes.statusCode}`);
    });
  });

  proxyReq.on('error', (err) => {
    console.error(`[${new Date().toISOString()}] Proxy error:`, err);
    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Proxy error', message: err.message }));
  });

  // 转发请求体
  req.on('data', (chunk) => {
    proxyReq.write(chunk);
  });

  req.on('end', () => {
    proxyReq.end();
  });
});

server.listen(PROXY_PORT, () => {
  console.log(`代理服务器运行在 http://localhost:${PROXY_PORT}`);
  console.log(`目标服务器: ${TARGET_SERVER}`);
  console.log(`使用方法: 将 API_BASE_URL 改为 'http://localhost:${PROXY_PORT}/proxy'`);
});
