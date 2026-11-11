import reportRepository from '../repositories/reportRepository.js';
import {
  getTodayISO,
  normalizeText,
  resolveReportImage,
} from '../../src/utils/formatters.js';

export class ReportDomainService {
  async queryReports(queryParams = {}) {
    const allReports = await reportRepository.findAll();

    const {
      search = '',
      category = 'Todas',
      location = 'Todas',
      type = 'todos',
      status = 'todos',
      page = 1,
      limit = 50,
    } = queryParams;

    const normalizedQuery = normalizeText(search);
    const normalizedLocation = normalizeText(location);

    const filtered = allReports.filter((report) => {
      if (normalizedQuery) {
        const matchesTitle = normalizeText(report.title).includes(normalizedQuery);
        const matchesLocation = normalizeText(report.location).includes(normalizedQuery);
        const matchesDesc = normalizeText(report.description).includes(normalizedQuery);
        const matchesCategory = normalizeText(report.category).includes(normalizedQuery);
        const matchesContact = normalizeText(report.contactAlias).includes(normalizedQuery);

        if (
          !matchesTitle &&
          !matchesLocation &&
          !matchesDesc &&
          !matchesCategory &&
          !matchesContact
        ) {
          return false;
        }
      }

      if (category && category !== 'Todas' && report.category !== category) {
        return false;
      }

      if (location && location !== 'Todas') {
        const reportLocNorm = normalizeText(report.location);
        if (
          report.location !== location &&
          !reportLocNorm.includes(normalizedLocation)
        ) {
          return false;
        }
      }

      if (type && type !== 'todos' && report.type !== type) {
        return false;
      }

      if (status && status !== 'todos' && report.status !== status) {
        return false;
      }

      return true;
    });

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedData = filtered.slice(startIndex, startIndex + limitNum);

    return {
      data: paginatedData,
      meta: {
        total: allReports.length,
        filteredTotal: filtered.length,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.max(1, Math.ceil(filtered.length / limitNum)),
      },
    };
  }

  async createNewReport(payload = {}) {
    const errors = {};

    const title = String(payload.title || '').trim();
    const description = String(payload.description || '').trim();
    const location = String(payload.location || '').trim();

    if (!title) {
      errors.title = 'El título del objeto es obligatorio.';
    }
    if (!description) {
      errors.description = 'La descripción es obligatoria.';
    }
    if (!location) {
      errors.location = 'La ubicación en el campus es obligatoria.';
    }

    if (Object.keys(errors).length > 0) {
      const validationError = new Error(
        'Error de validación en el servidor: descripción y ubicación son obligatorias.'
      );
      validationError.statusCode = 400;
      validationError.details = errors;
      throw validationError;
    }

    const contactName =
      String(payload.contactName || '').trim() || 'Estudiante Campus';
    const contactPhone =
      String(payload.contactPhone || '').trim() || 'Recepción Central';
    const status = payload.status === 'devuelto' ? 'devuelto' : 'activo';
    const category = payload.category || 'Otros';

    const newReport = {
      id: payload.id || `cr-${Date.now()}`,
      type: payload.type === 'encontrado' ? 'encontrado' : 'perdido',
      title,
      category,
      description,
      location,
      date: payload.date || getTodayISO(),
      contactName,
      contactPhone,
      contactAlias:
        String(payload.contactAlias || '').trim() ||
        `${contactName} · ${contactPhone}`,
      status,
      claimedDate:
        status === 'devuelto' ? payload.claimedDate || getTodayISO() : null,
      imageUrl: resolveReportImage(payload.imageUrl, category),
    };

    return reportRepository.create(newReport);
  }

  async changeReportStatus(id, status = 'devuelto') {
    const validStatus = status === 'activo' ? 'activo' : 'devuelto';
    const claimedDate = validStatus === 'devuelto' ? getTodayISO() : null;

    const updated = await reportRepository.updateStatus(
      id,
      validStatus,
      claimedDate
    );

    if (!updated) {
      const notFoundError = new Error(`El reporte con ID "${id}" no existe.`);
      notFoundError.statusCode = 404;
      throw notFoundError;
    }

    return updated;
  }

  async changeReportImage(id, imageUrl) {
    if (!imageUrl || typeof imageUrl !== 'string') {
      const err = new Error('Se requiere una imagen válida.');
      err.statusCode = 400;
      throw err;
    }

    const updated = await reportRepository.updateImage(id, imageUrl);
    if (!updated) {
      const notFoundError = new Error(`El reporte con ID "${id}" no existe.`);
      notFoundError.statusCode = 404;
      throw notFoundError;
    }

    return updated;
  }

  async resetSeedData() {
    return reportRepository.resetToSeed();
  }
}

export default new ReportDomainService();
