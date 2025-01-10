// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  css: {
    postcss: './postcss.config.js', // Pastikan PostCSS sudah dikonfigurasi dengan benar
  },
  plugins: [react()],
});
