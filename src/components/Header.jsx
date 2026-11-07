
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-icon">P</span>
          <span className="brand-name">
            pixora<span>.</span>
          </span>
        </Link>

        <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/mascots" onClick={closeMenu}>Explore</Link>
          <a href="/#about"  onClick={closeMenu}>About</a>
          <Link to="/docs" onClick={closeMenu}>Documentation</Link>
          <a
            href="https://github.com/Sky121122/pixora-mascot"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </nav>

        <div className="header-actions">
          <Link
            to="/mascots"
            className="header-cta"
            onClick={closeMenu}
          >
            Explore Mascots
            <ArrowUpRight size={17} />
          </Link>

          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
