import { useParams, Link } from "react-router-dom";
import { artworks } from "../data/artworks";
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

export function ArtworkPage() {
  const { slug } = useParams();
  const art = artworks.find((a) => a.slug === slug);

  if (!art) {
    return (
      <div className="artwork-not-found">
        <Navbar />
        <div className="artwork-not-found-body">
          <p>Artwork not found.</p>
          <Link to="/" className="btn btn-outline">Back to gallery</Link>
        </div>
      </div>
    );
  }

  const subject = encodeURIComponent(`Enquiry about "${art.title}"`);
  const body = encodeURIComponent(
    `Hi Nick,\n\nI'm interested in purchasing "${art.title}" (${art.year}).\n\nPlease let me know the next steps.\n\nThanks`
  );
  const mailtoHref = `mailto:nickalexanderart@gmail.com?subject=${subject}&body=${body}`;

  return (
    <div>
      <div className="artwork-page-wrap">
        <Navbar />

        <div className="artwork-back-row">
          <Link to="/" className="artwork-back-link">
            <ArrowLeftIcon />
            Back to gallery
          </Link>
        </div>

        <div className="artwork-detail">
          <div className="artwork-detail-image-wrap">
            <img src={art.image} alt={art.title} className="artwork-detail-image" />
          </div>

          <div className="artwork-detail-info">
            <p className="section-label">{art.category} · {art.year}</p>
            <h1 className="artwork-detail-title">{art.title}</h1>
            <p className="artwork-detail-medium">{art.medium}</p>

            {art.description ? (
              <p className="artwork-detail-description">{art.description}</p>
            ) : null}

            <div className="artwork-detail-divider" />

            <div className="artwork-detail-purchase">
              {art.sold ? (
                <div className="artwork-detail-sold-block">
                  <span className="card-sold artwork-sold-badge">Sold</span>
                  <p className="artwork-detail-sold-note">
                    This piece has been sold. <a href="#contact">Contact Nick</a> to enquire about similar works or commissions.
                  </p>
                </div>
              ) : (
                <div className="artwork-detail-buy-block">
                  {art.price && (
                    <p className="artwork-detail-price">£{art.price.toLocaleString()}</p>
                  )}
                  <div className="artwork-detail-actions">
                    <a href={mailtoHref} className="btn btn-primary">
                      Enquire to buy
                    </a>
                    <Link to="/" className="btn btn-outline">
                      View more work
                    </Link>
                  </div>
                  <p className="artwork-detail-note">
                    All sales are handled directly with the artist. Shipping and collection can be arranged.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
