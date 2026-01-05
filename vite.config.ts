
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';
  import { VitePWA } from 'vite-plugin-pwa';

  export default defineConfig({
    plugins: [react(), VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'FoodPro ERP',
        short_name: 'FoodPro',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        icons: [{ src: 'pwa-192.png', sizes: '192x192', type: 'image/png' }]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\/api\/v1\/.*schema.*/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'mdm-schemas', expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 } }
          },
          {
            urlPattern: /\/api\/v1\/telemetry.*/,
            handler: 'NetworkOnly'
          }
        ]
      }
    })],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });