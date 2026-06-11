import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // или другой ваш плагин, если он там был прописан

export default defineConfig({
  plugins: [react()],
  base: '/SCI-portal-0/',
})
