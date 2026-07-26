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
│   ├── App.jsx          # Main app — all components and page sections live here currently
│   ├── App.css          # All component and section styles
│   ├── index.css        # Global CSS variables, typography, base styles
│   ├── main.jsx         # React entry point
│   └── assets/          # Static assets (hero image, SVGs)
├── public/              # Public assets served directly
├── images/              # Artwork images referenced in App.jsx
├── IMAGES_ROUGH/        # Raw/unprocessed image source files
├── index.html           # HTML entry point
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

Artwork data is currently hardcoded in `src/App.jsx` in the `artworks` array:

| Title | Year | Medium | Category |
|---|---|---|---|
| Stairway to Daybreak | 2026 | Acrylic on canvas | Painting |
| Chroma Crumble | 2025 | Digital illustration | Digital |
| Eden Collapse | 2025 | Mixed media | Mixed Media |
| Arcadian Shift | 2024 | Oil pastel | Drawing |
| Carousel | 2024 | Ink and wash | Drawing |
| Paradise | 2023 | Digital collage | Digital |

Gallery filter categories: All, Painting, Digital, Mixed Media, Drawing.

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
