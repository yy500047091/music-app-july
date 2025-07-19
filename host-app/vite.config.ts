import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'hostApp',
      remotes: {
        // Make sure this URL matches your remote app's server port and path
        remoteMusicApp: 'http://localhost:5001/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom', '@mui/material']
    })
  ],
  server: {
    port: 3000, // Different from remote app
    strictPort: true
  }
})