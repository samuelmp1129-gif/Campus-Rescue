import reportDomainService from '../services/reportDomainService.js';

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(JSON.stringify(payload));
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 15 * 1024 * 1024) {
        reject(new Error('La imagen o el payload supera el tamaño máximo permitido (15MB).'));
      }
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('JSON inválido en el cuerpo de la petición.'));
      }
    });
    req.on('error', reject);
  });
}

export const reportController = {
  async healthCheck(_req, res) {
    return sendJson(res, 200, {
      status: 'ok',
      service: 'campus-rescue-api',
      timestamp: new Date().toISOString(),
    });
  },

  async listReports(req, res, urlObj) {
    try {
      const queryParams = Object.fromEntries(urlObj.searchParams.entries());
      const result = await reportDomainService.queryReports(queryParams);
      return sendJson(res, 200, result);
    } catch (error) {
      return sendJson(res, error.statusCode || 500, {
        error: error.message || 'Error interno al consultar los reportes.',
      });
    }
  },

  async createReport(req, res) {
    try {
      const body = await parseJsonBody(req);
      const created = await reportDomainService.createNewReport(body);
      return sendJson(res, 201, created);
    } catch (error) {
      return sendJson(res, error.statusCode || 400, {
        error: error.message || 'Error al crear el reporte.',
        details: error.details || null,
      });
    }
  },

  async updateStatus(req, res, reportId) {
    try {
      const body = await parseJsonBody(req);
      const updated = await reportDomainService.changeReportStatus(
        reportId,
        body.status || 'devuelto'
      );
      return sendJson(res, 200, updated);
    } catch (error) {
      return sendJson(res, error.statusCode || 400, {
        error: error.message || 'Error al actualizar el estado del reporte.',
      });
    }
  },

  async updateImage(req, res, reportId) {
    try {
      const body = await parseJsonBody(req);
      const updated = await reportDomainService.changeReportImage(
        reportId,
        body.imageUrl
      );
      return sendJson(res, 200, updated);
    } catch (error) {
      return sendJson(res, error.statusCode || 400, {
        error: error.message || 'Error al actualizar la imagen del reporte.',
      });
    }
  },

  async resetDemo(_req, res) {
    try {
      const seeded = await reportDomainService.resetSeedData();
      return sendJson(res, 200, {
        data: seeded,
        message: 'Datos de demostración restaurados en el servidor.',
      });
    } catch (error) {
      return sendJson(res, 500, {
        error: error.message || 'Error al restaurar los datos en el servidor.',
      });
    }
  },
};

export default reportController;
