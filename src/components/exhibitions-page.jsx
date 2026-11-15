import { useEffect } from "react";
import { Link } from "react-router-dom";
import { exhibitions } from "../data/exhibitions";
import { Navbar } from "./navbar";
import { SiteFooter } from "./site-footer";

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
}

// Groups the flat list into [{ year, items }] with the newest year first.
// Items keep the order they were written in within each year.
function groupByYear(list) {
  const groups = new Map();
  list.forEach((item) => {
    if (!groups.has(item.year)) groups.set(item.year, []);
    groups.get(item.year).push(item);
  });
  return [...groups.entries()]
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, items]) => ({ year, items }));
}

export function ExhibitionsPage() {
  const groups = groupByYear(exhibitions);

  // Start at the top of the page when arriving from a scrolled home page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="exhibitions-page-wrap">
        <Navbar />

        <div className="artwork-back-row">
          <Link to="/" className="artwork-back-link">
            <ArrowLeftIcon />
            Back to home
          </Link>
        </div>

        <header className="exhibitions-header">
          <p className="section-label">Exhibitions</p>
          <h1 className="exhibitions-title">Where the work has been shown</h1>
        </header>

        <div className="exhibitions-body">
          {groups.map(({ year, items }) => (
            <section key={year} className="exhibitions-year-group">
              <h2 className="exhibitions-year">{year}</h2>
              <ul className="exhibitions-list">
                {items.map((item) => (
                  <li key={`${item.title}-${item.venue}`} className="exhibition-item">
                    <h3 className="exhibition-title">{item.title}</h3>
                    <p
                      className={
                        item.type === "Solo Exhibition"
                          ? "exhibition-type exhibition-type--solo"
                          : "exhibition-type"
                      }
                    >
                      {item.type}
                    </p>
                    <p className="exhibition-venue">
                      {item.venue}, {item.location}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
