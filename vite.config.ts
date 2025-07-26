import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '127.0.0.1', // Force IPv4 to fix localhost connection issues
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    chunkSizeWarningLimit: 600, // Increase limit to 600KB for rich text editor
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  base: './', // Use relative paths for static file deployment
});
