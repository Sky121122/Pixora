import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Heart, Code2, Users } from 'lucide-react';
import './About.css';

function About() {
  return (
    <div className="about-page">
  
      <main className="about-container">

        {/* Hero */}
        <section className="about-hero">
          <div className="about-label">
            <Sparkles size={15} />
            <span>THE STORY BEHIND PIXORA</span>
          </div>

          <h1>
            A little personality
            <br />
            goes a <span>long way.</span>
          </h1>

          <p className="about-hero-description">
            Pixora is a mascot library built to bring life, character,
            and a little fun to digital experiences. Because websites
            and applications deserve more than just pixels.
          </p>

          <div className="about-hero-actions">
            <Link to="/mascots" className="about-primary-btn">
              Explore Mascots <ArrowUpRight size={18} />
            </Link>

            <Link to="/docs" className="about-secondary-btn">
              Read Documentation
            </Link>
          </div>

          <div className="about-hero-decoration">
            <span>PIXORA</span>
            <Sparkles size={34} />
          </div>
        </section>

        {/* What is Pixora */}
        <section className="about-section about-intro">
          <div className="about-section-label">01 / WHAT IS PIXORA?</div>

          <div className="about-intro-content">
            <h2>
              Not just mascots.
              <br />
              <span>Little moments of delight.</span>
            </h2>

            <p>
              Pixora is a collection of interactive, sprite-based mascots
              designed especially for developers and creators. These mascots
              can react to cursor movements and clicks, making ordinary
              interfaces feel more expressive and engaging.
            </p>

            <p>
              Whether you're building a personal portfolio, a landing page,
              or a creative application, Pixora gives you an easy way to add
              a little character to your project.
            </p>
          </div>
        </section>

        {/* Why Pixora */}
        <section className="about-section about-why">
          <div className="about-section-label">02 / WHY WE BUILT IT</div>

          <h2>
            Interfaces should feel
            <br />
            <span>alive, not ordinary.</span>
          </h2>

          <div className="about-why-grid">
            <div className="about-why-card">
              <div className="about-card-icon yellow">
                <Heart size={23} />
              </div>
              <h3>Made with personality</h3>
              <p>
                Small interactive details can make a digital experience
                memorable. Pixora makes those details easy to add.
              </p>
            </div>

            <div className="about-why-card">
              <div className="about-card-icon green">
                <Code2 size={23} />
              </div>
              <h3>Built for developers</h3>
              <p>
                Simple React integration helps developers add interactive
                mascots without building sprite logic from scratch.
              </p>
            </div>

            <div className="about-why-card">
              <div className="about-card-icon coral">
                <Users size={23} />
              </div>
              <h3>For creative projects</h3>
              <p>
                From portfolios to experiments, Pixora gives creators
                another way to make their projects stand out.
              </p>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="about-section about-features">
          <div className="about-section-label">03 / WHAT YOU GET</div>

          <h2>Everything you need to add a mascot.</h2>

          <div className="about-feature-list">
            <div className="about-feature-item">
              <span>01</span>
              <div>
                <h3>Interactive Mascots</h3>
                <p>Mascots that respond to cursor movement and clicks.</p>
              </div>
            </div>

            <div className="about-feature-item">
              <span>02</span>
              <div>
                <h3>Ready-to-use Sprite Sheets</h3>
                <p>Download mascot assets and use them in your own projects.</p>
              </div>
            </div>

            <div className="about-feature-item">
              <span>03</span>
              <div>
                <h3>React Component</h3>
                <p>Install the Pixora package and add a mascot with a simple component.</p>
              </div>
            </div>

            <div className="about-feature-item">
              <span>04</span>
              <div>
                <h3>Developer-friendly Documentation</h3>
                <p>Step-by-step instructions to get started quickly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="about-cta">
          <div className="about-cta-decoration">
            <Sparkles size={30} />
          </div>

          <p>READY TO ADD SOME PERSONALITY?</p>
          <h2>Make your next project a little more alive.</h2>

          <Link to="/mascots" className="about-primary-btn">
            Meet the Mascots <ArrowUpRight size={18} />
          </Link>
        </section>

      </main>

      <footer className="about-footer">
        <span>© {new Date().getFullYear()} Pixora</span>
        <span>Made for creative developers.</span>
      </footer>
    </div>
  );
}

export default About;