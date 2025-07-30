import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'element-plus', 'pinia'],
          echarts: ['echarts'],
          animations: ['animate.css']
        }
      }
    }
  }
});