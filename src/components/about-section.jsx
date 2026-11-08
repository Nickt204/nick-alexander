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
          I'm an abstract artist with strong roots in graffiti and a unique
          perspective shaped by my experiences in both the urban and natural
          worlds. I create paintings that explore the delicate interplay between
          urban decay and nature's reclaiming force.
        </p>
        <p>
          Influenced by neglected cityscapes, crumbling walls, and the vibrant
          textures of forgotten spaces, I create visually dynamic works that
          evoke the feeling of nature overtaking abandoned environments. My
          paintings are a fusion of organic patterns, fragmented forms, and
          layered colours that mirror the organic growth found in places left
          untended, where weeds push through cracks in concrete, and rust and
          decay transform into new forms of beauty.
        </p>
        <p>
          Through my art, I reflect on the resilience of nature, inviting
          viewers to consider how urban spaces, though deteriorating, can give
          birth to new, unexpected life. My abstract style captures the raw,
          untamed beauty of this transformation, bridging the manmade and the
          natural, and creating works that are both a commentary on urban
          decline and a celebration of nature's ability to reclaim.
        </p>
        <p>
          Each piece I create is an exploration of texture, colour, and form,
          evoking both the chaos of the city and the serenity found in the
          wilderness. My work invites viewers to see beauty in the overlooked,
          the decayed, and the forgotten, offering a unique, introspective look
          at the spaces where the urban and natural worlds converge.
        </p>
        </div>
      </div>
    </section>
  );
}
