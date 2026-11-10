import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // The site uses the local library source; dist is generated only for publishing.
    alias: [
      {
        find: 'pixora-mascot/style.css',
        replacement: fileURLToPath(new URL('./pixora-mascot/src/Mascot.css', import.meta.url)),
      },
      {
        find: /^pixora-mascot$/,
        replacement: fileURLToPath(new URL('./pixora-mascot/src/index.js', import.meta.url)),
      },
    ],
  },
})
