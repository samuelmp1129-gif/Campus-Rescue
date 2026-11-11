import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import handleApiRequest from './backend/routes/reportRoutes.js';

/**
 * Plugin que conecta el enrutador del Backend (`backend/routes/reportRoutes.js`)
 * bajo el prefijo `/api`, permitiendo desarrollar y probar la arquitectura
 * Cliente-Servidor completa con `npm run dev` o con `npm run backend` por separado.
 */
function campusRescueBackendPlugin() {
  return {
    name: 'campus-rescue-api-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/api')) {
          return handleApiRequest(req, res, next);
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/api')) {
          return handleApiRequest(req, res, next);
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), campusRescueBackendPlugin()],
});
