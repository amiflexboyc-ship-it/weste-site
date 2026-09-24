import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteAiBackendPlugin } from './server/viteAiPlugin.js';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteAiBackendPlugin(),
  ],
  base: '/weste-site/',
});