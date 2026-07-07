// Simple threaded static file server with HTTP Range support.
// Use for local preview only.
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = 8765;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";
  // prevent path traversal
  const filePath = path.normalize(path.join(ROOT, urlPath));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end("Forbidden"); return;
  }
  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404); res.end("Not Found"); return;
    }
    const type = MIME[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    const total = stat.size;
    const range = req.headers.range;
    if (range) {
      const m = /bytes=(\d*)-(\d*)/.exec(range);
      let start = m && m[1] ? parseInt(m[1], 10) : 0;
      let end = m && m[2] ? parseInt(m[2], 10) : total - 1;
      if (end >= total) end = total - 1;
      if (start > end) { res.writeHead(416); res.end(); return; }
      res.writeHead(206, {
        "Content-Type": type,
        "Content-Range": `bytes ${start}-${end}/${total}`,
        "Accept-Ranges": "bytes",
        "Content-Length": end - start + 1,
        "Cache-Control": "no-cache",
      });
      fs.createReadStream(filePath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Type": type,
        "Content-Length": total,
        "Accept-Ranges": "bytes",
        "Cache-Control": "no-cache",
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
}).listen(PORT, "0.0.0.0", () => {
  console.log(`Preview server (range-enabled) on http://0.0.0.0:${PORT}/`);
});
