import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/reservations": {
        target: "http://localhost:6061",  // Backend server for handling reservations
        changeOrigin: true,
        secure: false,  // Disable SSL verification in development
      },
      "/api/login": {
        target: "http://localhost:6061",  // Backend server for login
        changeOrigin: true,
        secure: false,
      },
      "/api/register": {
        target: "http://localhost:6061",  // Backend server for registration
        changeOrigin: true,
        secure: false,
      },
      // Add more routes here as needed
    }
  }
})