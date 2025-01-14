import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',    // Määrittää testien ympäristön
    globals: true,           // Ota käyttöön globaalit testifunktiot kuten 'test' ja 'expect'
    setupFiles: './testSetup.js',  // Tiedosto, jossa voidaan tehdä alustus ennen testejä
  },
})
