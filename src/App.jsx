import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { HeroSection } from "./components/hero-section";
import { GallerySection } from "./components/gallery-section";
import { AboutSection } from "./components/about-section";
import { ContactSection } from "./components/contact-section";
import { SiteFooter } from "./components/site-footer";
import { ArtworkPage } from "./components/artwork-page";

function HomePage() {
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/artwork/:slug" element={<ArtworkPage />} />
      </Routes>
    </BrowserRouter>
  );
}
