import process from 'node:process';
import { URL, fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import Unocss from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  },
  plugins: [react(), Unocss()],
  server: {
    host: '0.0.0.0',
    port: 1997,
    open: true
  },
  preview: {
    port: 9725
  },
  build: {
    reportCompressedSize: false,
    sourcemap: true,
    commonjsOptions: {
      ignoreTryCatch: false
    }
  }
});
