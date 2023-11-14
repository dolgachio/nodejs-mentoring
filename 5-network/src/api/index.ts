import http from "http";

export function start(port: number) {
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello, World!');
    });

    console.log(`========> Server is listening on PORT: ${port}`)
    server.listen(port);
}