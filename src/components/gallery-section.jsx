import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { artworks, categories } from "../data/artworks";
import { Card, CardContent } from "./card";

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

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filteredArtworks = useMemo(() => {
    return filterArtworks(artworks, selectedCategory, query);
  }, [selectedCategory, query]);

  return (
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
            className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
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
              <Link to={`/artwork/${art.slug}`} className="card-link">
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
                      <div className="card-badges">
                        {art.sold && <span className="card-sold">Sold</span>}
                        <span className="card-category">{art.category}</span>
                      </div>
                    </div>
                    <p className="card-description">{art.description}</p>
                  </CardContent>
                </Card>
              </Link>
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
  );
}
