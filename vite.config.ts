import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  base: '/',
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // 背景层是整个站点里最重的一块，且只有实验室与首页 Hero 用得上，单独切出来
        manualChunks: {
          backgrounds: ['@xihan-ui/backgrounds'],
        },
      },
    },
  },
})
