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
          <div className="hero-eyebrow">
            <span className="hero-artist-name">Nick Alexander</span>
            <span className="hero-eyebrow-divider" />
            <span className="hero-commission-tag">Available for commissions</span>
          </div>

          <div className="hero-title-wrap">
            <span className="hero-na-watermark" aria-hidden="true">NA</span>
            <h1 className="hero-title">
              <span className="hero-title-line hero-title-bright">Artwork</span>
              <span className="hero-title-line hero-title-muted">with texture,</span>
              <span className="hero-title-line hero-title-bright">feeling, and</span>
              <span className="hero-title-line hero-title-bright">
                beautiful <span className="hero-title-underline">chaos.</span>
              </span>
            </h1>
          </div>

          <p className="hero-description">
            Works made from instinct and material — painting, photography, and
            objects that sit between the familiar and the strange.
          </p>

          <div className="button-row button-row--stacked">
            <Button asChild>
              <a href="#work">View the work</a>
            </Button>
            <Button asChild variant="outline">
              <a href="#contact">Get in touch</a>
            </Button>
          </div>

          <div className="hero-stats">
            <span>12 works available</span>
            <span className="hero-stats-dot">·</span>
            <span>Est. 2021</span>
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
            <h2>Utopia</h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
