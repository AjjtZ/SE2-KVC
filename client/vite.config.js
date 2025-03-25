import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const preserveDirectives = () => {
  return {
    name: 'preserve-directives',
    transform(code, id) {
      if (id.includes('client/src')) {
        const preservedCode = code.replace(/"use client";/g, '');
        return { code: preservedCode, map: null };
      }
      return null;
    },
  };
};

export default defineConfig({
  root: 'client',
  plugins: [react(), preserveDirectives()],
  build: {
    outDir: '../dist',
    sourcemap: false,
    rollupOptions: {
      input: 'client/index.html',
      external: ['@fortawesome/free-solid-svg-icons'],
    },
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
