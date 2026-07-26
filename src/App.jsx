import "./App.css";
import { HeroSection } from "./components/hero-section";
import { GallerySection } from "./components/gallery-section";
import { AboutSection } from "./components/about-section";
import { ContactSection } from "./components/contact-section";
import { SiteFooter } from "./components/site-footer";

export default function App() {
  return (
    <div>
      <HeroSection />
      <GallerySection />
      <AboutSection />
      <ContactSection />
      <SiteFooter />
    </div>
  );
}
