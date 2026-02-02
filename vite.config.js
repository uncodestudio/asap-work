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
        manualChunks: (id) => {
          if (id.includes('modules/')) {
            const match = id.match(/modules\/([^.]+)\.js/)
            return match ? match[1] : null
          }
        },
        
        chunkFileNames: '[name].js',
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    },
    
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  
  server: {
    port: 3000,
    open: false,
    cors: true
  }
})