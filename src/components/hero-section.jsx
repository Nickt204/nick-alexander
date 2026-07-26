import { motion } from "framer-motion";
import { Button } from "./button";
import { Navbar } from "./navbar";

export function HeroSection() {
  return (
    <section className="hero-section">
      <Navbar />

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
  );
}
