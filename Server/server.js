const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 8080;

function serveStaticFile(res, filePath, contentType) {
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('404: Page Not Found', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}

const server = http.createServer((req, res) => {

    let basePath;
    let reqPath

    if (req.url.startsWith('/assets/')) {
        basePath = path.join(__dirname, '../web/assets');
        reqPath = req.url.substring('/assets'.length);
    } else if (req.url.startsWith('/games/')) {
        basePath = path.join(__dirname, '../web/games');
        reqPath = req.url.substring('/games'.length);
    }else {
        basePath = path.join(__dirname, '../web/templates');
        reqPath = req.url === '/' ? '/index.html' : req.url;
    }

    const filePath = path.join(basePath, reqPath);

    const ext = path.extname(filePath);
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
    };
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    serveStaticFile(res, filePath, contentType);
});

server.listen(port, hostname, () => {});


// Using library open to open the browser directly
import('open').then(openModule => {
    openModule.default(`http://localhost:8080`).then();
})
