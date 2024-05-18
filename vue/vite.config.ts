import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: { alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }] },
  envPrefix: 'DODO_',
  server: { port: 8000, open: true }
})
