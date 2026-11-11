import { normalizeText } from './formatters';

/**
 * Filtra la lista de reportes según búsqueda libre, categoría, ubicación, tipo y estado.
 */
export function filterReports(reports = [], filters = {}) {
  const {
    search = '',
    category = 'Todas',
    location = 'Todas',
    type = 'todos',
    status = 'todos',
  } = filters;

  const normalizedQuery = normalizeText(search);
  const normalizedLocationFilter = normalizeText(location);

  return reports.filter((report) => {
    // 1. Búsqueda por texto libre (título, ubicación o descripción)
    if (normalizedQuery) {
      const matchesTitle = normalizeText(report.title).includes(normalizedQuery);
      const matchesLocation = normalizeText(report.location).includes(normalizedQuery);
      const matchesDescription = normalizeText(report.description).includes(normalizedQuery);
      const matchesCategory = normalizeText(report.category).includes(normalizedQuery);
      const matchesContact = normalizeText(report.contactAlias).includes(normalizedQuery);

      if (
        !matchesTitle &&
        !matchesLocation &&
        !matchesDescription &&
        !matchesCategory &&
        !matchesContact
      ) {
        return false;
      }
    }

    // 2. Filtro por Categoría
    if (category && category !== 'Todas' && report.category !== category) {
      return false;
    }

    // 3. Filtro por Ubicación
    if (location && location !== 'Todas') {
      const reportLocNormalized = normalizeText(report.location);
      if (
        report.location !== location &&
        !reportLocNormalized.includes(normalizedLocationFilter)
      ) {
        return false;
      }
    }

    // 4. Filtro por Tipo ('todos' | 'perdido' | 'encontrado')
    if (type && type !== 'todos' && report.type !== type) {
      return false;
    }

    // 5. Filtro por Estado ('todos' | 'activo' | 'devuelto')
    if (status && status !== 'todos' && report.status !== status) {
      return false;
    }

    return true;
  });
}

/**
 * Extrae las ubicaciones únicas presentes en los reportes actuales para poblar el filtro Dropdown
 */
export function getUniqueLocations(reports = []) {
  const seen = new Set();
  const locations = [];

  reports.forEach((report) => {
    const loc = report.location ? report.location.trim() : '';
    if (loc && !seen.has(loc.toLowerCase())) {
      seen.add(loc.toLowerCase());
      locations.push(loc);
    }
  });

  return locations.sort((a, b) => a.localeCompare(b, 'es'));
}

/**
 * Calcula las métricas principales del campus
 */
export function calculateStats(reports = []) {
  const total = reports.length;
  const active = reports.filter((r) => r.status === 'activo').length;
  const returned = reports.filter((r) => r.status === 'devuelto').length;
  const lostCount = reports.filter((r) => r.type === 'perdido' && r.status === 'activo').length;
  const foundCount = reports.filter((r) => r.type === 'encontrado' && r.status === 'activo').length;

  return {
    total,
    active,
    returned,
    lostCount,
    foundCount,
    recoveryRate: total > 0 ? Math.round((returned / total) * 100) : 0,
  };
}
