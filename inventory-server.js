/**
 * Nick Alexander — Inventory Server
 *
 * Serves inventory.html and saves changes directly to src/data/artworks.js
 *
 * Usage:  node inventory-server.js
 * Then open:  http://localhost:3001
 */

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3001;

// Mime types for static file serving
const MIME = {
  ".html": "text/html",
  ".js":   "application/javascript",
  ".css":  "text/css",
  ".webp": "image/webp",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg":  "image/svg+xml",
  ".json": "application/json",
};

// ── Format artworks array back to artworks.js ────────────────────────────────
function toArtworksJs(artworks) {
  const items = artworks.map((a) => {
    const fields = [
      `    title: ${JSON.stringify(a.title)}`,
      `    year: ${JSON.stringify(a.year || "")}`,
      `    medium: ${JSON.stringify(a.medium || "")}`,
      `    category: ${JSON.stringify(a.category || "")}`,
      `    image: ${JSON.stringify(a.image || "")}`,
      `    description: ${JSON.stringify(a.notes || "")}`,
    ];
    if (a.price !== null && a.price !== undefined && a.price !== "") {
      fields.push(`    price: ${Number(a.price)}`);
    }
    if (a.location) {
      fields.push(`    location: ${JSON.stringify(a.location)}`);
    }
    if (a.status === "sold") {
      fields.push(`    sold: true`);
    }
    return `  {\n${fields.join(",\n")},\n  }`;
  });

  // Derive categories from data, preserving known order
  const ORDER = ["Painting", "Digital", "Mixed Media", "Drawing"];
  const found = [...new Set(artworks.map((a) => a.category).filter(Boolean))];
  const sorted = [
    ...ORDER.filter((c) => found.includes(c)),
    ...found.filter((c) => !ORDER.includes(c)),
  ];
  const cats = JSON.stringify(["All", ...sorted]);

  return (
    `export const artworks = [\n${items.join(",\n")},\n];\n\n` +
    `export const categories = ${cats};\n`
  );
}

// ── Request handler ──────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  // CORS headers so the page can POST even on localhost
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // ── POST /save — write artworks.js ────────────────────────────────────────
  if (req.method === "POST" && req.url === "/save") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const artworks = JSON.parse(body);
        const output = toArtworksJs(artworks);
        const dest = path.join(__dirname, "src", "data", "artworks.js");
        fs.writeFileSync(dest, output, "utf8");
        console.log(`[${new Date().toLocaleTimeString()}] artworks.js updated (${artworks.length} items)`);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true }));
      } catch (err) {
        console.error("Save failed:", err.message);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
    });
    return;
  }

  // ── GET — serve static files ──────────────────────────────────────────────
  let urlPath = req.url.split("?")[0];
  if (urlPath === "/") urlPath = "/inventory.html";

  const filePath = path.join(__dirname, urlPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n  Nick Alexander — Inventory Server`);
  console.log(`  Open: http://localhost:${PORT}\n`);
});
