import { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import MascotSprite from './MascotSprite';
import mascots from '../data/mascots';
import './SpritePlayground.css';

function SpritePlayground() {
  const mascot = mascots[0];

  const [directionFrame, setDirectionFrame] = useState(4);
  const [expressionFrame, setExpressionFrame] = useState(0);

  const [activeExpression, setActiveExpression] = useState(null);
  const [nextExpression, setNextExpression] = useState(0);

  const [previewMode, setPreviewMode] = useState('directions');

  const frameNumbers = Array.from(
    { length: 9 },
    (_, index) => index
  );

  // Automatically return after temporary expression
  useEffect(() => {
    if (activeExpression === null) return;

    const timer = setTimeout(() => {
      setActiveExpression(null);
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeExpression]);

  // Reset everything
  const resetFrames = () => {
    setDirectionFrame(4);
    setExpressionFrame(0);
    setActiveExpression(null);
    setNextExpression(0);
    setPreviewMode('directions');
  };

  // Mouse movement controls direction
  const handlePointerMove = (event) => {
    if (activeExpression !== null) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const column = x < 0.33 ? 0 : x > 0.67 ? 2 : 1;
    const row = y < 0.33 ? 0 : y > 0.67 ? 2 : 1;

    const frameIndex = row * 3 + column;

    setDirectionFrame(frameIndex);
    setPreviewMode('directions');
  };

  // Clicking mascot triggers expressions
  const handleMascotClick = () => {
    setActiveExpression(nextExpression);
    setNextExpression((prev) => (prev + 1) % 9);
  };

  // Select direction manually
  const selectDirection = (frame) => {
    setDirectionFrame(frame);
    setPreviewMode('directions');
    setActiveExpression(null);
  };

  // Select expression manually
  const selectExpression = (frame) => {
    setExpressionFrame(frame);
    setPreviewMode('expressions');
    setActiveExpression(null);
  };

  // Determine which sprite sheet to display
  const currentType =
    activeExpression !== null
      ? 'expressions'
      : previewMode;

  const currentFrame =
    activeExpression !== null
      ? activeExpression
      : previewMode === 'expressions'
        ? expressionFrame
        : directionFrame;

  return (
    <section className="sprite-playground" id="playground">
      <div className="playground-container">

        {/* Heading */}
        <div className="playground-heading">
          <span className="section-label">
            <span></span>
            DEVELOPER PLAYGROUND
          </span>

          <h2>
            Test your <span>mascot.</span>
          </h2>

          <p>
            Experiment with individual sprite frames
            before integrating your character.
          </p>
        </div>

        {/* Main Preview */}
        <div className="playground-preview">

          <div className="playground-preview-header">
            <span>{mascot.name} / Move your mouse / Click on Avatar</span>

            <button onClick={resetFrames}>
              <RotateCcw size={15} />
              Reset
            </button>
          </div>

          <div
            className="playground-character"
            style={{ backgroundColor: mascot.color }}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => {
              if (activeExpression === null) {
                setDirectionFrame(4);
                setPreviewMode('directions');
              }
            }}
            onClick={handleMascotClick}
          >
            <MascotSprite
              mascot={mascot}
              type={currentType}
              frameIndex={currentFrame}
              size={220}
            />
          </div>

        
        </div>

        {/* Direction Selector */}
        <div className="frame-selector">

          <div className="frame-selector-heading">
            <div>
              <span className="frame-number">01</span>
              <h3>Direction Frames</h3>
            </div>

            <span>directions.png</span>
          </div>

          <p className="frame-description">
            Move your cursor or select a frame to change
            the character's gaze direction.
          </p>

          <div className="frame-grid">
            {frameNumbers.map((frame) => (
              <button
                key={frame}
                className={`frame-option ${
                  directionFrame === frame &&
                  previewMode === 'directions' &&
                  activeExpression === null
                    ? 'active'
                    : ''
                }`}
                onClick={() => selectDirection(frame)}
              >
                <span>{frame}</span>
                <small>Frame {frame + 1}</small>
              </button>
            ))}
          </div>

        </div>

        {/* Expression Selector */}
        <div className="frame-selector">

          <div className="frame-selector-heading">
            <div>
              <span className="frame-number">02</span>
              <h3>Expression Frames</h3>
            </div>

            <span>expressions.png</span>
          </div>

          <p className="frame-description">
            Select a frame to change the character's
            facial expression.
          </p>

          <div className="frame-grid">
            {frameNumbers.map((frame) => (
              <button
                key={frame}
                className={`frame-option ${
                  expressionFrame === frame &&
                  previewMode === 'expressions' &&
                  activeExpression === null
                    ? 'active'
                    : ''
                }`}
                onClick={() => selectExpression(frame)}
              >
                <span>{frame}</span>
                <small>Frame {frame + 1}</small>
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default SpritePlayground;