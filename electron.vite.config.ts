import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'development' ? '/' : './',
  root: 'src/renderer',
  build: {
    outDir: '../../out/renderer',
  }
})
