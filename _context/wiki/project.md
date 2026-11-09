# Project Overview

## What this project is

The Nick Alexander website is an artist portfolio and brand platform for Nick Alexander — a contemporary artist working across painting, drawing, digital illustration, and mixed media.

The site is more than a gallery. It is designed to:

- Tell the story behind the work — process, ideas, inspiration
- Build a personal connection between visitors and the Nick Alexander brand
- Communicate artistic identity through the design itself (the site's aesthetic mirrors the artwork)
- Grow over time with new work, exhibitions, news, and creative insights

The visual identity is dark, minimal, and considered — matching the moody, textured feel of the artwork.

## Main goals and objectives

1. **Increase sales** — of original works, prints, and commissions
2. **Elevate profile and perception** — make Nick Alexander look professional and credible
3. **Brand coherence** — the website design is an extension of the artwork, reinforcing the brand
4. **Encourage enquiries and commissions** — clear routes to contact
5. **Grow as a resource** — new work, exhibitions, and process insights added over time

## Key audience

- Art collectors and buyers (primary)
- People interested in commissions or collaborations
- Galleries, curators, and press
- General audience discovering Nick's work online

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build tool | Vite |
| Animation | Framer Motion |
| Styling | Plain CSS (no utility framework like Tailwind) |
| Language | JSX (no TypeScript) |

## Project structure

```
nick-alexander/
├── src/
│   ├── App.jsx               # Main app — all components and page sections live here currently
│   ├── App.css               # All component and section styles
│   ├── index.css             # Global CSS variables, typography, base styles
│   ├── main.jsx              # React entry point
│   ├── assets/               # Static assets (hero image, SVGs)
│   ├── components/           # React components (gallery, hero, about, contact, etc.)
│   └── data/
│       └── artworks.js       # Single source of truth for all artwork data
├── public/                   # Copied as-is into the built site
│   ├── images/               # Artwork images (gallery-1 to gallery-5 are show photos, not for sale)
│   └── _redirects            # Netlify rule so artwork page links work (see deployment.md)
├── IMAGES_ROUGH/             # Raw/unprocessed image source files
├── inventory.html            # Private inventory management UI
├── inventory-server.js       # Local Node server — serves inventory and writes artworks.js
├── index.html                # HTML entry point
└── package.json
```

## Page sections (current)

| Section | Description |
|---|---|
| **Hero** | Full-width intro with animated headline, tagline, featured artwork card, and two CTAs |
| **Gallery** | Filterable, searchable grid of artwork cards (category + text search) |
| **About** | Short artist bio section |
| **Contact** | CTA section with email and Instagram links |

## Known artwork (current)

Artwork data lives in `src/data/artworks.js` and is the single source of truth for both the website gallery and the inventory. Each artwork object supports: `title`, `year`, `medium`, `category`, `image`, `description`, `price`, `location`, `sold`.

| Title | Year | Medium | Category | Status |
|---|---|---|---|---|
| Stairway to Daybreak | 2026 | Acrylic on canvas | Painting | Available |
| Chroma Crumble | 2025 | Digital illustration | Digital | Available |
| Eden Collapse | 2025 | Mixed media | Mixed Media | Available |
| Arcadian Shift | 2024 | Oil pastel | Drawing | Available |
| Carousel | 2024 | Ink and wash | Drawing | **Sold** |
| Paradise | 2023 | Digital collage | Digital | Available |
| Utopia | — | — | — | Available |
| Vestige | — | — | — | Available |

Gallery filter categories: All, Painting, Digital, Mixed Media, Drawing.

When `sold: true` is set on an artwork, a red **Sold** badge appears on its gallery card on the website.

## Inventory system

A private artwork inventory tool for Nick and Michelle to manage the catalogue.

| File | Purpose |
|---|---|
| `inventory.html` | Inventory UI — thumbnails, title, year, medium, category, location, price, status, notes |
| `inventory-server.js` | Local Node.js server — serves the inventory app and writes saves directly to `artworks.js` |
| `src/data/artworks.js` | Written to on every save — website gallery updates automatically |

**To run:**
```
npm run inventory
```
Then open **http://localhost:3001** in a browser.

**Workflow:**
1. Run `npm run inventory`
2. Make changes in the UI (edit, add, delete artwork)
3. Click **⬆ Save to artworks.js** — writes directly to `src/data/artworks.js`
4. Commit and push — `git add src/data/artworks.js && git commit -m "Update inventory" && git push`
5. Other person runs `git pull` to get the latest

**Notes:**
- The server only needs to be running while actively using the inventory
- Vite dev server (`npm run dev`) runs separately on port 5173 and is unaffected
- `gallery-1.webp` through `gallery-5.webp` in `public/images/` are art show photos, not inventory items
- Nick and Michelle both need the repo cloned locally to use the inventory; GitHub Desktop is recommended for non-terminal Git workflow

## Design system

The site uses a dark theme throughout (`#070707` background). Key CSS variables are in `src/index.css`. Notable design tokens in use:

- **Accent colour:** Amber/yellow (`#fbbf24`) used for section labels
- **Typography:** Inter, system-ui fallback chain
- **Cards:** Rounded (28px), dark (`#0f0f0f`), subtle border, hover lift + image scale
- **Buttons:** Pill-shaped (999px radius), primary = white/black, outline = transparent

## Areas likely to grow

- More artwork added to the gallery over time
- Blog or process/insights section (Nick's creative process, studio notes)
- Exhibitions and news section
- Potential e-commerce or print-on-demand integration
- Social links (Instagram is referenced but not yet linked)
