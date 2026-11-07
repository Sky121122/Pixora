
# Pixora Mascot

Interactive sprite-based mascots for React applications.

Give your website personality with animated mascots that follow the cursor and react to clicks.

## Installation

```bash
npm install pixora-mascot
```

## Import

```jsx
import { Mascot } from 'pixora-mascot';
import 'pixora-mascot/style.css';
```

## Basic Usage

```jsx
import { Mascot } from 'pixora-mascot';
import 'pixora-mascot/style.css';

function App() {
  return (
    <div>
      <Mascot
        directions="/mascots/cat-directions.webp"
        expressions="/mascots/cat-expressions.webp"
        size={150}
      />
    </div>
  );
}

export default App;
```

## Props

| Prop | Description | Default |
|---|---|---|
| directions | Direction sprite sheet URL | undefined |
| expressions | Expression sprite sheet URL | undefined |
| expressionFrames | Expression frame sequence | [0-8] |
| size | Mascot width and height in pixels | 120 |
| expressionDuration | Expression display duration in ms | 1200 |

## Features

- Cursor-following animations
- Click-triggered expressions
- Custom sprite sheets
- Configurable size
- Lightweight React component

## Requirements

- React 18 or later
- React DOM 18 or later

## License

MIT
```

### 2. Important: CSS import

In projects using your package, developers must import:

```jsx
import 'pixora-mascot/style.css';
```

This loads the package's compiled CSS.

### 3. Rebuild the package

From the `pixora-mascot` directory:

```bash
npm run build
```

Once this is done, we'll move to the next step: **publishing `pixora-mascot` on npm**, so anyone can install it using `npm install pixora-mascot`.

