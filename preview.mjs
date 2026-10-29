import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('./dist/', import.meta.url));
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.png':'image/png','.mp4':'video/mp4','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8'};
const server = http.createServer((request, response) => {
 let pathname;
 try {pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);} catch {response.writeHead(400).end(); return;}
 const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
 const relative = path.relative(root, file);
 if (relative.startsWith('..') || path.isAbsolute(relative)) {response.writeHead(403).end(); return;}
 fs.stat(file, (error, stat) => {
  if (error || !stat.isFile()) {response.writeHead(404).end(); return;}
  response.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
  response.setHeader('Accept-Ranges', 'bytes');
  const range = request.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
  let start = 0;
  let end = stat.size - 1;
  if (range) {
   start = Number(range[1]);
   if (range[2]) end = Math.min(Number(range[2]), end);
   if (start > end || start >= stat.size) {response.writeHead(416, {'Content-Range': `bytes */${stat.size}`}).end(); return;}
   response.statusCode = 206;
   response.setHeader('Content-Range', `bytes ${start}-${end}/${stat.size}`);
  }
  response.setHeader('Content-Length', end - start + 1);
  if (request.method === 'HEAD') {response.end(); return;}
  const stream = fs.createReadStream(file, {start, end});
  stream.on('error', () => response.destroy());
  response.on('close', () => stream.destroy());
  stream.pipe(response);
 });
});
server.on('error', error => {console.error(error.code === 'EADDRINUSE' ? 'El puerto 4173 está ocupado. Cierra la otra vista previa e inténtalo de nuevo.' : error.message); process.exitCode = 1;});
server.listen(4173, '127.0.0.1', () => console.log('Taberna Variantes: http://127.0.0.1:4173'));
