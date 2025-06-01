import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import history from 'connect-history-api-fallback';
import path from 'path'

export default defineConfig({
  plugins: [react(),
    {
      name: 'html-fallback',
      configureServer(server) {
        server.middlewares.use(
          history({
            disableDotRule: true,
            htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
          })
        );
      },
    },],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server:{
    proxy:{
      "/api":{
        target:"http://localhost:5000",
      },
    },
  },
})