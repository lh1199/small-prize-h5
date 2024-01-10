import {defineConfig} from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    build: {
        rollupOptions: {
            output: {
                // 在这里修改静态资源路径
                chunkFileNames: 'static/assets/js/[name]-[hash].js',
                entryFileNames: 'static/assets/js/[name]-[hash].js',
                assetFileNames: 'static/assets/[ext]/[name]-[hash].[ext]',
            }
        }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // server: {
    //   cors: true,
    //   proxy: {
    //     '/card': {
    //       target: 'https://tp2.shouzhuanpai.com',//目标服务器地址
    //       changeOrigin: true,
    //     },
    //   }
    // },
    base:'./',
})
