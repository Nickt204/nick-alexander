import { motion } from "framer-motion";
import { Button } from "./button";
import { Navbar } from "./navbar";
import { artworks } from "../data/artworks";

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
          <div className="hero-title-wrap">
            <div className="hero-logo-wrap">
              <img
                src="/images/na-logo-black.webp"
                alt=""
                className="hero-logo"
              />
            </div>
            <h1 className="hero-title">
              <span>Accidental landscapes</span>
              <span>Inspired by fragments</span>
              <span>of the forgotten.</span>
            </h1>
          </div>

          <p className="hero-description">
            Abstract and typographic landscapes inspired by the overlooked and
            unsung corners of our world, giving forgotten surfaces, accidental
            marks and unnoticed details a chance to shine, and finding beauty,
            hope and optimism in the things we might otherwise pass by.
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
            <span>{artworks.filter((a) => !a.sold).length} works available</span>
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
