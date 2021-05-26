import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import autoCSSModulePlugin from 'vite-plugin-auto-css-modules';

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
    alias: [{ find: /^~/, replacement: '' }],
  },
});
