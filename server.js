const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = parseInt(process.env.PORT) || 8080;

http.createServer((req, res) => {
  const filePath = path.join(process.cwd(), 'index.html');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Try __dirname
      fs.readFile(path.join(__dirname, 'index.html'), (err2, data2) => {
        if (err2) { res.writeHead(500); res.end('index.html not found: ' + filePath); return; }
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(data2);
      });
      return;
    }
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', () => console.log('Listening on 0.0.0.0:' + PORT + ' (PORT env=' + process.env.PORT + ')'));
