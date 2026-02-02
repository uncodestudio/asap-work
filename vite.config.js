// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false,
    
    lib: {
      entry: 'main.js',
      formats: ['es'],
      fileName: 'main'
    },
    
    rollupOptions: {
      output: {
        // Bundle tout en un seul fichier
        inlineDynamicImports: true, // ← CLEF pour tout bundler
        
        entryFileNames: 'main.js',
        assetFileNames: '[name].[ext]'
      }
    },
    
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn'] // Supprime les logs
      }
    }
  },
  
  server: {
    port: 3000,
    open: false,
    cors: true
  }
})