const http = require("http");
const fs = require("fs");
const path = require("path");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);

    if (req.method == "GET") {
        let fileUrl;
        if (req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        const filePath = path.resolve(`./public${fileUrl}`);
        const fileExtension = path.extname(filePath);

        if (fileExtension == ".html") {
            fs.access(filePath, (err) => {
                if (err) {
                    res.statusCode = 404;
                    res.setHeader("Content-Type", "text/html");
                    res.end('<html><body><h1>Error 404: ' + fileUrl + ' not found</h1></body></html>')
                    return
                }
                res.statusCode = 200;
                res.setHeader("Content-type", "text/html");
                fs.createReadStream(filePath).pipe(res);                
            })
        } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/html");
            res.end('<html><body><h1>Error 404: ' + fileUrl + ' not an HTML file</h1></body></html>')            
        }
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end('<html><body><h1>Error 404: ' + req.method + ' is not supported</h1></body></html>')
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});