
import { useEffect, useRef, useState } from 'react';
import MascotSprite from './MascotSprite';

function InteractiveMascot({ mascot, cursor, expressionStep }) {
  const mascotRef = useRef(null);
  const [directionFrame, setDirectionFrame] = useState(4);

  const cursorEnabled =
    mascot.interaction?.cursorEnabled !== false;

  const expressionFrames = mascot.expressionFrames || [
    0, 1, 2, 3, 4, 5, 6, 7, 8,
  ];

  const showingExpression =
    expressionStep !== null && expressionStep !== undefined;

  useEffect(() => {
    if (!cursorEnabled || !cursor || !mascotRef.current) {
      setDirectionFrame(4);
      return;
    }

    const rect = mascotRef.current.getBoundingClientRect();

    const x = (cursor.x - rect.left) / rect.width;
    const y = (cursor.y - rect.top) / rect.height;

    const column = x < 0.33 ? 0 : x > 0.67 ? 2 : 1;
    const row = y < 0.33 ? 0 : y > 0.67 ? 2 : 1;

    setDirectionFrame(row * 3 + column);
  }, [cursor, cursorEnabled]);

  const currentFrame = showingExpression
    ? expressionFrames[expressionStep % expressionFrames.length]
    : directionFrame;

  const currentType = showingExpression
    ? 'expressions'
    : 'directions';

  return (
    <div className="interactive-mascot" ref={mascotRef}>
      <MascotSprite
        mascot={mascot}
        type={currentType}
        frameIndex={currentFrame}
        size={130}
      />
    </div>
  );
}

export default InteractiveMascot;
