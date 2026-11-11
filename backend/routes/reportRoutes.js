import { URL } from 'node:url';
import reportController from '../controllers/reportController.js';

export async function handleApiRequest(req, res, next) {
  const rawUrl = req.url || '/';

  if (!rawUrl.startsWith('/api')) {
    if (typeof next === 'function') return next();
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
    return res.end();
  }

  const urlObj = new URL(rawUrl, 'http://localhost');
  const pathname = urlObj.pathname.replace(/\/+$/, '');

  // GET /api/health
  if (req.method === 'GET' && pathname === '/api/health') {
    return reportController.healthCheck(req, res);
  }

  // GET /api/reports
  if (req.method === 'GET' && pathname === '/api/reports') {
    return reportController.listReports(req, res, urlObj);
  }

  // POST /api/reports
  if (req.method === 'POST' && pathname === '/api/reports') {
    return reportController.createReport(req, res);
  }

  // POST /api/reports/reset
  if (req.method === 'POST' && pathname === '/api/reports/reset') {
    return reportController.resetDemo(req, res);
  }

  // PATCH /api/reports/:id/status
  const statusMatch = pathname.match(/^\/api\/reports\/([^/]+)\/status$/);
  if (req.method === 'PATCH' && statusMatch) {
    const reportId = decodeURIComponent(statusMatch[1]);
    return reportController.updateStatus(req, res, reportId);
  }

  // PATCH /api/reports/:id/image
  const imageMatch = pathname.match(/^\/api\/reports\/([^/]+)\/image$/);
  if (req.method === 'PATCH' && imageMatch) {
    const reportId = decodeURIComponent(imageMatch[1]);
    return reportController.updateImage(req, res, reportId);
  }

  res.writeHead(404, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  });
  return res.end(
    JSON.stringify({
      error: `Endpoint no encontrado: ${req.method} ${pathname}`,
    })
  );
}

export default handleApiRequest;
