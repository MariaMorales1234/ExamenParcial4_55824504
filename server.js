const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

// Crear el servidor
const server = http.createServer((req, res) => {
    console.log(req.method, req.url);
    
    // Ruta del archivo a servir (index.html por defecto)
    let filePath = "./public" + (req.url === "/" ? "/index.html" : req.url);
    let extname = path.extname(filePath);

    // Tipos MIME básicos
    const mimeTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpg",
        ".gif": "image/gif",
    };

    // Verificar extensión y asignar tipo de contenido
    let contentType = mimeTypes[extname] || "text/plain";

    // Leer el archivo y responder
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === "ENOENT") {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("<h1>404 - Página no encontrada</h1>");
            } else {
                res.writeHead(500);
                res.end("Error interno del servidor");
            }
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, "utf-8");
        }
    });
});

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});