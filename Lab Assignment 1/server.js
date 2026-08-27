const http = require("http");

const server = http.createServer((req, res) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);

    res.setHeader("Content-Type", "text/plain");

    switch (req.url) {
        case "/":
            res.statusCode = 200;
            res.end("Welcome to Node Server");
            break;

        case "/about":
            res.statusCode = 200;
            res.end("About Page");
            break;

        case "/contact":
            res.statusCode = 200;
            res.end("Contact Page");
            break;

        default:
            res.statusCode = 404;
            res.end("404 - Page Not Found");
    }
});

server.listen(3000, () => {
    console.log(`Server running at 3000`);
});