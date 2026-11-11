import http from 'node:http';
import handleApiRequest from './routes/reportRoutes.js';

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  handleApiRequest(req, res);
});

server.listen(PORT, () => {
  console.log(
    `[Campus Rescue Backend] Servidor API REST activo en http://localhost:${PORT}/api/reports`
  );
});
