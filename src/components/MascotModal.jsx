
import { useState, useEffect } from 'react';
import { X, Copy, Check, Download, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Mascot } from 'pixora-mascot';
import 'pixora-mascot/style.css';
import './MascotModal.css';

function MascotModal({ mascot, onClose }) {
  const [copied, setCopied] = useState(false);
  const [installCopied, setInstallCopied] = useState(false);

  useEffect(() => {
    if (!mascot) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mascot, onClose]);

  useEffect(() => {
    if (!mascot) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mascot]);

  useEffect(() => {
    setCopied(false);
    setInstallCopied(false);
  }, [mascot]);

  if (!mascot) return null;

  const mascotSlug = mascot.name.toLowerCase().replace(/\s+/g, '-');

  const copyCode = async () => {
    const directions = mascot.assets?.directions
      ? `  directions="/mascots/${mascotSlug}-directions.webp",\n`
      : '';

    const expressions = mascot.assets?.expressions
      ? `  expressions="/mascots/${mascotSlug}-expressions.webp",\n`
      : '';

    const code = `import { Mascot } from 'pixora-mascot';
import 'pixora-mascot/style.css';

function App() {
  return (
    <Mascot
${directions}${expressions}      size={240}
    />
  );
}

export default App;`;

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Unable to copy code:', error);
    }
  };

  const copyInstall = async () => {
    try {
      await navigator.clipboard.writeText('npm install pixora-mascot');
      setInstallCopied(true);

      setTimeout(() => setInstallCopied(false), 2000);
    } catch (error) {
      console.error('Unable to copy install command:', error);
    }
  };

  const downloadSprite = (type) => {
    const file = mascot.assets?.[type];

    if (!file) return;

    const link = document.createElement('a');
    link.href = file;
    link.download = `${mascotSlug}-${type}.webp`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="mascot-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mascot-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <span className="modal-label">MASCOT PREVIEW</span>
            <h2 id="mascot-modal-title">{mascot.name}</h2>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close preview"
          >
            <X size={21} />
          </button>
        </div>

        <div
          className="modal-character-area"
          style={{ backgroundColor: mascot.color }}
        >
          <span className="modal-character-tag">
            {mascot.category}
          </span>

          <div className="modal-character">
            <Mascot
              directions={mascot.assets?.directions}
              expressions={mascot.assets?.expressions}
              expressionFrames={mascot.expressionFrames}
              expressionDuration={
                mascot.interaction?.expressionDuration ?? 1200
              }
              size={240}
            />
          </div>
        </div>

        <div className="modal-details">
          <div className="modal-about">
            <span className="modal-info-label">ABOUT THIS MASCOT</span>
            <p>{mascot.description}</p>
          </div>

          <div className="modal-steps">
            <span className="modal-info-label">GET STARTED IN 3 STEPS</span>

            {/* STEP 1 */}
            <div className="modal-step">
              <div className="modal-step-number">01</div>

              <div className="modal-step-content">
                <h3>Download Sprite Sheets</h3>
                <p>
                  Download the assets you need for your project.
                </p>

                <div className="modal-download-buttons">
                  {['directions', 'expressions'].map((type) =>
                    mascot.assets?.[type] && (
                      <button
                        key={type}
                        className="download-sprite-btn"
                        onClick={() => downloadSprite(type)}
                      >
                        <Download size={16} />
                        {type === 'directions' ? 'Directions' : 'Expressions'}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="modal-step">
              <div className="modal-step-number">02</div>

              <div className="modal-step-content">
                <h3>Install Pixora Package</h3>
                <p>
                  Run this command in your React project's terminal.
                </p>

                <div className="modal-command">
                  <code>npm install pixora-mascot</code>

                  <button onClick={copyInstall} aria-label="Copy install command">
                    {installCopied ? <Check size={17} /> : <Copy size={17} />}
                  </button>
                </div>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="modal-step">
              <div className="modal-step-number">03</div>

              <div className="modal-step-content">
                <h3>Import & Start Using</h3>
                <p>
                  Copy the ready-to-use React component code or read the
                  documentation for detailed instructions.
                </p>

                <div className="modal-step-actions">
                  <button className="copy-code-btn" onClick={copyCode}>
                    {copied ? <Check size={17} /> : <Copy size={17} />}
                    {copied ? 'Copied' : 'Copy Code'}
                  </button>

                  <Link to="/docs" className="modal-docs-link" onClick={onClose}>
                    <BookOpen size={17} />
                    Read Docs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MascotModal;
