
import { useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import mascots from '../data/mascots';
import MascotModal from './MascotModal';
import MascotSprite from './MascotSprite';
import './Gallery.css';

function Gallery() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMascot, setSelectedMascot] = useState(null);

  const categories = [
    'All',
    ...new Set(mascots.map((mascot) => mascot.category)),
  ];

  const filteredMascots = mascots.filter((mascot) => {
    const matchesSearch =
      mascot.name.toLowerCase().includes(search.toLowerCase()) ||
      mascot.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === 'All' ||
      mascot.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const displayedMascots = filteredMascots.slice(0, 4);

  return (
    <section className="gallery" id="explore">
      <div className="gallery-container">

        <div className="gallery-heading">
          <div>
            <span className="section-label">
              <span></span>
              THE COLLECTION
            </span>

            <h2>
              Find your <span>character.</span>
            </h2>

            <p>
              A collection of expressive little companions
              ready to bring your website to life.
            </p>
          </div>

          <span className="gallery-count">
            {String(displayedMascots.length).padStart(2, '0')} CHARACTERS
          </span>
        </div>

        <div className="gallery-toolbar">
          <div className="gallery-search">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search mascots..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${
                  activeCategory === category ? 'active' : ''
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {displayedMascots.length > 0 ? (
          <>
            <div className="mascot-grid">
              {displayedMascots.map((mascot) => (
                <article className="mascot-card" key={mascot.id}>
                  <div
                    className="mascot-card-visual"
                    style={{ backgroundColor: mascot.color }}
                  >
                    <span className="mascot-tag">
                      {mascot.tag}
                    </span>

                    <div className="mascot-avatar">
                      <MascotSprite
                        mascot={mascot}
                        type={
                          mascot.assets?.directions
                            ? 'directions'
                            : 'expressions'
                        }
                        frameIndex={4}
                        size={170}
                      />
                    </div>

                    <button
                      className="mascot-preview-btn"
                      aria-label={`Preview ${mascot.name}`}
                      onClick={() => setSelectedMascot(mascot)}
                    >
                      <ArrowUpRight size={20} />
                    </button>
                  </div>

                  <div className="mascot-card-info">
                    <div>
                      <h3>{mascot.name}</h3>
                      <span>{mascot.category}</span>
                    </div>

                    <p>{mascot.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="gallery-footer">
              <Link to="/mascots" className="gallery-see-more">
                See More Mascots
                <ArrowUpRight size={19} />
              </Link>
            </div>
          </>
        ) : (
          <div className="gallery-empty">
            <span>🔍</span>
            <h3>No mascots found</h3>
            <p>Try another name or category.</p>

            <button
              onClick={() => {
                setSearch('');
                setActiveCategory('All');
              }}
            >
              Clear filters
            </button>
          </div>
        )}

      </div>

      {selectedMascot && (
        <MascotModal
          mascot={selectedMascot}
          onClose={() => setSelectedMascot(null)}
        />
      )}
    </section>
  );
}

export default Gallery;
