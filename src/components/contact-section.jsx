import { Button } from "./button";

export function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <p className="section-label">Contact</p>
      <h2 className="section-title">
        Interested in commissions, prints, or collaborations?
      </h2>
      <div className="contact-actions">
        <Button asChild>
          <a href="mailto:nickalexanderstudio@gmail.com">Email me</a>
        </Button>
        <Button asChild variant="outline">
          <a
            href="https://www.instagram.com/___nickalexander___?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </Button>
      </div>
    </section>
  );
}
