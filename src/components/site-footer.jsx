export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-brand">Nick Alexander Studio</p>
        <nav className="footer-nav">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="footer-links">
          <a href="mailto:nickalexanderstudio@gmail.com">nickalexanderstudio@gmail.com</a>
          <a
            href="https://www.instagram.com/___nickalexander___?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Nick Alexander. All rights reserved.</p>
      </div>
    </footer>
  );
}
