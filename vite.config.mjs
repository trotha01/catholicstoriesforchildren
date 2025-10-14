import { defineConfig } from 'vite';
import elmPlugin from 'vite-plugin-elm';

export default defineConfig({
  plugins: [
    elmPlugin({ cwd: process.cwd() })
  ],
  // Serve static-only assets from `public/static/` (these files are copied
  // verbatim into the dist/ output). Build output will go to `dist/` which
  // makes `dist/` safe to remove on every build.
  publicDir: 'public/static',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        thankyou: 'thankyou.html'
      }
    },
    outDir: 'dist',
    // safe to wipe dist on each build
    emptyOutDir: true
  },
  base: '/'
});