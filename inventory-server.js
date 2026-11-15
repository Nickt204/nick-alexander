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
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3001;
const ARTWORKS_PATH = path.join(__dirname, "src", "data", "artworks.js");
const STORE = "https://nickalexander.bigcartel.com/product";

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

// ── Read the current artworks.js so slug and buyUrl can be preserved ─────────
async function loadExisting() {
  try {
    const mod = await import(`${pathToFileURL(ARTWORKS_PATH).href}?t=${Date.now()}`);
    return mod.artworks || [];
  } catch {
    return [];
  }
}

const titleKey = (t) => String(t || "").trim().toLowerCase();

function slugify(title) {
  return String(title || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Keep the ${STORE} template form for Big Cartel links; write anything else as a plain string
function formatBuyUrl(url) {
  return url.startsWith(`${STORE}/`)
    ? `\`\${STORE}/${url.slice(STORE.length + 1)}\``
    : JSON.stringify(url);
}

// ── Format artworks array back to artworks.js ────────────────────────────────
function toArtworksJs(artworks, existing = []) {
  const existingByTitle = new Map(existing.map((e) => [titleKey(e.title), e]));
  const usedSlugs = new Set();

  const items = artworks.map((a) => {
    const prev = existingByTitle.get(titleKey(a.title));

    // Reuse the existing slug so artwork page URLs don't change; make new ones unique
    let slug = prev?.slug || slugify(a.title) || "artwork";
    const base = slug;
    for (let n = 2; usedSlugs.has(slug); n++) slug = `${base}-${n}`;
    usedSlugs.add(slug);

    const fields = [
      `    slug: ${JSON.stringify(slug)}`,
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
    if (prev?.buyUrl) {
      fields.push(`    buyUrl: ${formatBuyUrl(prev.buyUrl)}`);
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
  const cats = `[${["All", ...sorted].map((c) => JSON.stringify(c)).join(", ")}]`;

  return (
    `const STORE = ${JSON.stringify(STORE)};\n\n` +
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

  // ── GET /api/artworks — current artworks.js in the inventory's format ────
  if (req.method === "GET" && req.url.split("?")[0] === "/api/artworks") {
    loadExisting().then((existing) => {
      const rows = existing.map((a, i) => ({
        id: i + 1,
        title: a.title || "",
        year: a.year || "",
        medium: a.medium || "",
        category: a.category || "",
        image: a.image || "",
        location: a.location || "",
        price: a.price ?? null,
        status: a.sold ? "sold" : "available",
        notes: a.description || "",
      }));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(rows));
    });
    return;
  }

  // ── POST /save — write artworks.js ────────────────────────────────────────
  if (req.method === "POST" && req.url === "/save") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const artworks = JSON.parse(body);
        const output = toArtworksJs(artworks, await loadExisting());
        fs.writeFileSync(ARTWORKS_PATH, output, "utf8");
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

  // Images now live in public/images
  const baseDir = urlPath.startsWith("/images/")
    ? path.join(__dirname, "public")
    : __dirname;
  const filePath = path.join(baseDir, urlPath);

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
