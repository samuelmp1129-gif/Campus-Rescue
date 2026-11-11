import { DEFAULT_CATEGORY_IMAGES, FALLBACK_IMAGE_URL } from './constants';

export { FALLBACK_IMAGE_URL };

/**
 * Formatea una fecha YYYY-MM-DD a un formato legible en español (ej: "10 nov 2026")
 */
export function formatDate(dateString) {
  if (!dateString) return 'Fecha no especificada';
  try {
    const parts = String(dateString).split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      if (!isNaN(date.getTime())) {
        return new Intl.DateTimeFormat('es-ES', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }).format(date);
      }
    }
    const fallbackDate = new Date(dateString);
    if (!isNaN(fallbackDate.getTime())) {
      return new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(fallbackDate);
    }
    return dateString;
  } catch {
    return dateString;
  }
}

/**
 * Retorna la fecha actual en formato YYYY-MM-DD para inputs tipo date
 */
export function getTodayISO() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Normaliza texto eliminando tildes y pasando a minúsculas para búsquedas insensibles a acentos
 */
export function normalizeText(text = '') {
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Obtiene la URL de imagen adecuada o un placeholder de Unsplash según la categoría
 */
export function resolveReportImage(imageUrl, category) {
  const trimmed = imageUrl ? String(imageUrl).trim() : '';
  if (trimmed) return trimmed;
  return DEFAULT_CATEGORY_IMAGES[category] || FALLBACK_IMAGE_URL;
}
