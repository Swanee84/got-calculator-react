import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import autoCSSModulePlugin from 'vite-plugin-auto-css-modules';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), autoCSSModulePlugin()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@@', replacement: path.resolve(__dirname, './assets') },
    ],
  },
  server: {
    port: 10081,
  },
});
