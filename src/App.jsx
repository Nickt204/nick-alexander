import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

function Button({ asChild, variant, className = "", children, ...props }) {
  const classes = [
    "btn",
    variant === "outline" ? "btn-outline" : "btn-primary",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (asChild) {
    const child = React.Children.only(children);
    return React.cloneElement(child, {
      className: [classes, child.props.className || ""].filter(Boolean).join(" "),
      ...props,
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

function Card({ className = "", children, ...props }) {
  return (
    <div className={["card", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

function CardContent({ className = "", children, ...props }) {
  return (
    <div className={["card-content", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

const artworks = [
  {
    title: "Stairway to daybreak",
    year: "2026",
    medium: "Acrylic on canvas",
    category: "Painting",
    image: "/images/stairway-to-day-break.webp",
    description:
      "A layered abstract composition exploring sunset light, movement, memory, and the lingering feeling of staying awake until sunrise.",
  },
  {
    title: "Chroma Crumble",
    year: "2025",
    medium: "Digital illustration",
    category: "Digital",
    image: "/images/chroma-crumble.webp",
    description: "A moody digital piece exploring memory, movement, and fragments of light.",
  },
  {
    title: "Eden Collapse",
    year: "2025",
    medium: "Mixed media",
    category: "Mixed Media",
    image: "/images/eden-collapse.webp",
    description: "Texture-heavy composition inspired by stillness, domestic space, and silence.",
  },
  {
    title: "Arcadian Shift",
    year: "2024",
    medium: "Oil pastel",
    category: "Drawing",
    image: "/images/arcadian-shift.webp",
    description: "Warm tones and loose marks capture the feeling of late afternoon light.",
  },
  {
    title: "Carousel",
    year: "2024",
    medium: "Ink and wash",
    category: "Drawing",
    image: "/images/carousel.webp",
    description: "A minimal figurative work balancing negative space with expressive line.",
  },
  {
    title: "Paradise",
    year: "2023",
    medium: "Digital collage",
    category: "Digital",
    image: "/images/paradise.webp",
    description: "Layered collage using bold shapes, visual noise, and dreamlike color.",
  },
];

const categories = ["All", "Painting", "Digital", "Mixed Media", "Drawing"];

function filterArtworks(items, selectedCategory, query) {
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((art) => {
    const matchesCategory =
      selectedCategory === "All" || art.category === selectedCategory;
    const searchableText = `${art.title} ${art.medium} ${art.description} ${art.category} ${art.year}`.toLowerCase();
    const matchesQuery =
      normalizedQuery === "" || searchableText.includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });
}

function SearchIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

function SparklesIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3z" />
      <path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14z" />
      <path d="M5 13l.9 2.1L8 16l-2.1.9L5 19l-.9-2.1L2 16l2.1-.9L5 13z" />
    </svg>
  );
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filteredArtworks = useMemo(() => {
    return filterArtworks(artworks, selectedCategory, query);
  }, [selectedCategory, query]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-50">
      <section className="hero-section">
        <nav className="navbar">
          <div className="nav-brand">
            <img src="/images/na-logo-black.webp" alt="NA logo" className="nav-logo" />
          </div>
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-grid">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-copy"
          >
            <p className="tagline">
              Contemporary artwork, personal experiments, and visual stories
            </p>
            <h1 className="hero-title">
              Artwork with texture, feeling, and a little beautiful chaos.
            </h1>
            <p className="hero-description">
              A curated portfolio of paintings, drawings, digital pieces, and
              mixed-media work. Replace these sample pieces with your own images
              and descriptions.
            </p>
            <div className="button-row">
              <Button asChild>
                <a href="#work">View the work</a>
              </Button>
              <Button asChild variant="outline">
                <a href="#contact">Get in touch</a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="hero-card"
          >
            <img
              src="/images/utopia.webp"
              alt="Featured artwork"
              className="hero-image"
            />
            <div className="hero-card-info">
              <p>Featured</p>
              <h2>Midnight Bloom</h2>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="work" className="work-section">
        <div className="work-header">
          <div>
            <p className="section-label">Selected Work</p>
            <h2 className="section-title">Gallery</h2>
          </div>
          <div className="search-box">
            <SearchIcon className="h-4 w-4" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search artwork..."
              className="search-input"
            />
          </div>
        </div>

        <div className="filters">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`filter-btn ${
                selectedCategory === category ? "active" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="artwork-grid">
          {filteredArtworks.length > 0 ? (
            filteredArtworks.map((art, index) => (
              <motion.article
                key={art.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
              >
                <Card>
                  <img src={art.image} alt={art.title} className="card-image" />
                  <CardContent>
                    <div className="card-header">
                      <div>
                        <h3>{art.title}</h3>
                        <p className="card-meta">
                          {art.medium} · {art.year}
                        </p>
                      </div>
                      <span className="card-category">{art.category}</span>
                    </div>
                    <p className="card-description">{art.description}</p>
                  </CardContent>
                </Card>
              </motion.article>
            ))
          ) : (
            <div className="no-results">
              No artwork matched your search. Try a different title, medium,
              year, or category.
            </div>
          )}
        </div>
      </section>

      <section id="about" className="about-section">
        <p className="section-label">About</p>
        <h2 className="section-title">The artist behind the work</h2>
        <div className="about-content">
          <p>
            I create artwork that blends emotion, texture, and visual
            storytelling. My practice moves between traditional and digital
            methods, often exploring atmosphere, identity, memory, and color.
          </p>
          <p>
            This portfolio is built to be easy to personalize: add your own bio,
            replace the images, update the artwork details, and link your
            socials or shop.
          </p>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <p className="section-label">Contact</p>
        <h2 className="section-title">
          Interested in commissions, prints, or collaborations?
        </h2>
        <div className="contact-actions">
          <Button asChild>
            <a href="mailto:your.email@example.com">Email me</a>
          </Button>
          <Button asChild variant="outline">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
