import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remoteMusicApp',
      filename: 'remoteEntry.js', // This must match what host app requests
      exposes: {
        './App': './src/App.tsx'
      },
      shared: ['react', 'react-dom', '@mui/material']
    })
  ],
  build: {
    target: 'esnext',
    outDir: 'dist', // Make sure this is set
    assetsDir: 'assets' // This is default but good to confirm
  },
  server: {
    port: 5001, // Must match the port in host app config
    strictPort: true
  }
})