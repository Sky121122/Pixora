
import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import InteractiveMascot from '../components/InteractiveMascot';
import MascotModal from '../components/MascotModal';
import mascots from '../data/mascots';
import './MascotLibrary.css';

function MascotLibrary() {
  const [selectedMascot, setSelectedMascot] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [expressionSteps, setExpressionSteps] = useState({});

  const expressionIndices = useRef({});
  const expressionTimers = useRef({});

  const handlePointerMove = (event) => {
    if (event.pointerType === 'touch') return;

    setCursor({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleLibraryClick = () => {
    mascots.forEach((mascot) => {
      const canShowExpression =
        mascot.interaction?.clickEnabled !== false &&
        mascot.assets?.expressions;

      if (!canShowExpression) return;

      const frames = mascot.expressionFrames || [
        0, 1, 2, 3, 4, 5, 6, 7, 8,
      ];

      const currentIndex = expressionIndices.current[mascot.id] || 0;

      setExpressionSteps((previous) => ({
        ...previous,
        [mascot.id]: currentIndex,
      }));

      expressionIndices.current[mascot.id] =
        (currentIndex + 1) % frames.length;

      if (expressionTimers.current[mascot.id]) {
        clearTimeout(expressionTimers.current[mascot.id]);
      }

      const duration =
        mascot.interaction?.expressionDuration ?? 1200;

      expressionTimers.current[mascot.id] = setTimeout(() => {
        setExpressionSteps((previous) => {
          const updated = { ...previous };
          delete updated[mascot.id];
          return updated;
        });

        delete expressionTimers.current[mascot.id];
      }, duration);
    });
  };

  useEffect(() => {
    return () => {
      Object.values(expressionTimers.current).forEach((timer) => {
        clearTimeout(timer);
      });
    };
  }, []);

  return (
    <div className="mascot-library-page">
      <Header />

      <main
        className="library-container"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setCursor(null)}
        onClick={handleLibraryClick}
      >
        <div className="library-heading">
          <span className="section-label">
            THE PIXORA COLLECTION
          </span>

          <h1>
            Meet the <span>mascots.</span>
          </h1>

          <p>
            Find a little personality for your next project.
          </p>
        </div>

        <div className="library-grid">
          {mascots.map((mascot) => (
            <button
              type="button"
              className="library-card"
              key={mascot.id}
              onClick={() => setSelectedMascot(mascot)}
              aria-label={`View ${mascot.name}`}
            >
              <div
                className="library-card-image"
                style={{ backgroundColor: mascot.color }}
              >
                <InteractiveMascot
                  mascot={mascot}
                  cursor={cursor}
                  expressionStep={
                    mascot.assets?.expressions
                      ? expressionSteps[mascot.id]
                      : null
                  }
                />
              </div>

              <div className="library-card-info">
                <h3>{mascot.name}</h3>
                <span>{mascot.category}</span>
              </div>
            </button>
          ))}
        </div>
      </main>

      {selectedMascot && (
        <MascotModal
          mascot={selectedMascot}
          onClose={() => setSelectedMascot(null)}
        />
      )}
    </div>
  );
}

export default MascotLibrary;
