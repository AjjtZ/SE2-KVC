import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Custom Rollup plugin to preserve directives
const preserveDirectives = () => {
  return {
    name: 'preserve-directives',
    transform(code, id) {
      if (id.includes('client/src')) {
        // Logic to preserve "use client" directives
        const preservedCode = code.replace(/"use client";/g, '');
        return { code: preservedCode, map: null };
      }
      return null;
    },
  };
};

export default defineConfig({
  root: 'client', // Set 'client' as the root directory
  plugins: [react(), preserveDirectives()],
  build: {
    outDir: '../dist', // Output in root-level 'dist'
    emptyOutDir: true, // Ensure the output directory is emptied before building
    rollupOptions: {
      input: '../index.html', // Ensure the correct entry file
    },
  },
  server: {
    port: 3000, // Adjust as needed
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    setupFiles: './test/components/setUp/setUpTests.jsx',
    environment: 'jsdom',
  },
});