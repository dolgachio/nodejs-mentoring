const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const port = 3333;

const pagePath = path.resolve(__dirname, 'public/page.html');

const server = http.createServer((req, res) => {

    fs.readFile(pagePath, (error, data) => {
        const parsedUrl = url.parse(req.url);
        console.log('parsedUrl: ', parsedUrl);
        console.error(error);

        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(data);

        return res.end();
    })

});

server.listen(port, () => {
    console.log(`server listens on ${port} port.`);
});