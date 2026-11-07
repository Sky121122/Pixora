
import { ArrowUpRight, Sparkles } from 'lucide-react';
import './Hero.css';
import MascotSprite from './MascotSprite';
import mascots from '../data/mascots';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero">

      <div className="hero-container">

        {/* Left Content */}
        <div className="hero-content">

          <div className="hero-tag">
            <Sparkles size={15} />
            <span>THE MASCOT LIBRARY FOR DEVELOPERS</span>
          </div>

          <h1>
            Give your website
            <br />
            a little <span>personality.</span>
          </h1>

          <p className="hero-description">
            Meet your new favorite website companion.
            Discover interactive mascots, bring them to life,
            and add a little magic to your projects.
          </p>

          <div className="hero-buttons">

              <Link to="/mascots" className="hero-primary-btn">
                Explore Mascots
                <ArrowUpRight size={19} />
              </Link>

            <a href="#docs" className="hero-secondary-btn">
              Read Documentation
            </a>

          </div>

          <div className="hero-note">
            <span className="hero-note-dot"></span>
            <span>Free to explore. Easy to integrate.</span>
          </div>

        </div>

        {/* Right Mascot Showcase */}
        <div className="hero-visual">

          <div className="hero-decoration hero-decoration-one"></div>
          <div className="hero-decoration hero-decoration-two"></div>

          <div className="mascot-showcase">

            <div className="showcase-header">
              <span>MEET YOUR NEW BUDDY</span>
              <span className="showcase-status">
                <span></span>
                LIVE
              </span>
            </div>

            <div className="mascot-display">

              <div className="mascot-sparkle sparkle-one">✦</div>
              <div className="mascot-sparkle sparkle-two">✳</div>

              <div className="mascot-character">
                <div className="mascot-character">
                  <MascotSprite
                    mascot={mascots[0]}
                    type="directions"
                    frameIndex={4}
                    size={180}
                  />
                </div>
              </div>

              <div className="mascot-caption">
                <span>Curious Cat</span>
                <span>✦</span>
              </div>

            </div>

            <div className="showcase-footer">
              <span>01 / 08 CHARACTERS</span>
              <span>MADE TO INTERACT ↗</span>
            </div>

          </div>

          {/* Floating Labels */}
          <div className="floating-label floating-label-top">
            <span>✦</span>
            Expressive
          </div>

          <div className="floating-label floating-label-bottom">
            <span>↗</span>
            Interactive
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;
