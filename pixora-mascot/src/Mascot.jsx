
import { useEffect, useRef, useState } from 'react';
import './Mascot.css';

function Mascot({
  directions,
  expressions,
  expressionFrames = [0, 1, 2, 3, 4, 5, 6, 7, 8],
  size = 120,
  expressionDuration = 1200,
}) {
  const [directionFrame, setDirectionFrame] = useState(4);
  const [expressionFrame, setExpressionFrame] = useState(null);
  const [expressionIndex, setExpressionIndex] = useState(0);

  const expressionTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (expressionTimer.current) {
        clearTimeout(expressionTimer.current);
      }
    };
  }, []);

  const handlePointerMove = (event) => {
    if (!directions || expressionFrame !== null) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const column = x < 0.33 ? 0 : x > 0.67 ? 2 : 1;
    const row = y < 0.33 ? 0 : y > 0.67 ? 2 : 1;

    setDirectionFrame(row * 3 + column);
  };

  const handlePointerLeave = () => {
    setDirectionFrame(4);
  };

  const handleClick = () => {
    if (!expressions || expressionFrames.length === 0) return;

    if (expressionTimer.current) {
      clearTimeout(expressionTimer.current);
    }

    const nextIndex = expressionIndex % expressionFrames.length;

    setExpressionFrame(expressionFrames[nextIndex]);
    setExpressionIndex((previous) => previous + 1);

    expressionTimer.current = setTimeout(() => {
      setExpressionFrame(null);
      expressionTimer.current = null;
    }, expressionDuration);
  };

  const currentFrame =
    expressionFrame !== null ? expressionFrame : directionFrame;

  const currentSheet =
    expressionFrame !== null && expressions
      ? expressions
      : directions || expressions;

  if (!currentSheet) return null;

  const row = Math.floor(currentFrame / 3);
  const column = currentFrame % 3;

  return (
    <div
      className="pixora-mascot"
     style={{
                width: size,
                height: size,
                backgroundImage: `url("${currentSheet}")`,
                backgroundSize: '300% 300%',
                backgroundPosition: `${column * 50}% ${row * 50}%`,
                backgroundRepeat: 'no-repeat',
                transition: 'none',
                }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleClick();
        }
      }}
      aria-label="Interactive Pixora mascot"
    />
  );
}

export default Mascot;
