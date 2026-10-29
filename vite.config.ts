import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    process.env.ANALYZE
      ? visualizer({
          filename: 'step8-baseline/bundle/stats.html',
          open: false,
          gzipSize: true,
          brotliSize: true,
        })
      : null,
  ].filter(Boolean) as any,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('recharts') || id.includes('d3')) {
              return 'vendor-charts';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'vendor-query';
            }
            if (id.includes('jspdf') || id.includes('html2canvas')) {
              return 'vendor-pdf';
            }
            if (id.includes('zod')) {
              return 'vendor-zod';
            }
            if (id.includes('@google/genai')) {
              return 'vendor-genai';
            }
            if (id.includes('dompurify')) {
              return 'vendor-purify';
            }
            if (id.includes('firebase')) {
              return 'vendor-firebase';
            }
            if (id.includes('three')) {
              return 'vendor-three';
            }
            return 'vendor-core';
          }
        },
      },
    },
  },
});
