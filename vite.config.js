import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  css: {
    // eslint-disable-next-line no-undef
    postcss: path.resolve(__dirname, 'postcss.config.mjs'),
  },
})
