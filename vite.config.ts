import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: 'http://0.0.0.0:8080',
    proxy: {
      '/strapi-api': {
        target: 'http://127.0.0.1:1337',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/strapi-api/, ''),
      },
    },
  },
});
