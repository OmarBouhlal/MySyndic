import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "fc06-196-119-172-181.ngrok-free.app", // Autorise ce domaine ngrok
      "localhost", // Autorise localhost (optionnel)
    ],

  },
})
