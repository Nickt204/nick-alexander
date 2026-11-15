import profilePic from "../../public/images/profile-pic-nick.png";

export function AboutSection() {
  return (
    <section id="about" className="about-section">
      <p className="section-label">About</p>
      <h2 className="section-title">The artist behind the work</h2>
      <div className="about-body">
        <img
          src={profilePic}
          alt="Nick Alexander"
          className="about-profile-pic"
        />
        <div className="about-content">
        <p>
          Nick Alexander is an abstract artist with roots in graffiti, whose
          work explores the relationship between urban decay and the natural
          world. Drawing inspiration from neglected cityscapes, weathered
          surfaces and forgotten spaces, his paintings reveal beauty in the
          overlooked and unexpected.
        </p>
        <p>
          Combining layered colours, fragmented forms and rich textures,
          Alexander creates dynamic compositions that reflect the interplay
          between man-made environments and nature’s persistent ability to
          reclaim them. Rust, erosion, peeling posters and the accidental marks
          left by time become sources of inspiration, transforming elements of
          decay into something vibrant and compelling.
        </p>
        <p>
          His work celebrates the beauty of imperfection and the unexpected,
          inviting viewers to reconsider familiar environments and discover a
          sense of hope, renewal and optimism in places often overlooked.
        </p>
        </div>
      </div>
    </section>
  );
}
