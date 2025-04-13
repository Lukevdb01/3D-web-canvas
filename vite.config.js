// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/3D-web-canvas/',
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        // 🔧 Zorgt voor voorspelbare asset paths
        entryFileNames: `assets/3D-web-canvas/[name].[hash].js`,
        chunkFileNames: `assets/3D-web-canvas/[name].[hash].js`,
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
            return 'assets/3D-web-canvas/images/[name].[hash][extname]'
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/3D-web-canvas/css/[name].[hash][extname]'
          }
          return 'assets/3D-web-canvas/[name].[hash][extname]'
        },
      },
    },
  }
})
