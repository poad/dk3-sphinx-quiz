import solidPlugin from '@solidjs/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [solidPlugin()],
  base: './',
  server: {
    port: 3000,
  },
});
