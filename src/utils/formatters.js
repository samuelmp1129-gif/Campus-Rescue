import { DEFAULT_CATEGORY_IMAGES, FALLBACK_IMAGE_URL } from './constants.js';

export { FALLBACK_IMAGE_URL };

/**
 * Formatea cualquier fecha YYYY-MM-DD estrictamente al formato dd/mm/yyyy
 */
export function formatDate(dateString) {
  if (!dateString) return '—';
  const raw = String(dateString).trim();

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
    return raw;
  }

  const parts = raw.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
  }

  try {
    const date = new Date(raw);
    if (!isNaN(date.getTime())) {
      const d = String(date.getDate()).padStart(2, '0');
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const y = date.getFullYear();
      return `${d}/${m}/${y}`;
    }
  } catch {
    // fallback
  }

  return raw;
}

/**
 * Retorna la fecha actual en formato YYYY-MM-DD para inputs nativos
 */
export function getTodayISO() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Extrae limpiamente el nombre de la persona y el número de contacto
 */
export function extractContactDetails(report) {
  if (!report) return { name: 'Estudiante', phone: '—' };

  if (report.contactName && report.contactPhone) {
    return {
      name: report.contactName.trim(),
      phone: report.contactPhone.trim(),
    };
  }

  const raw = String(report.contactAlias || '').trim();
  if (!raw) return { name: 'Contacto Campus', phone: '—' };

  if (raw.includes('·')) {
    const [left, right] = raw.split('·').map((s) => s.trim());
    const cleanPhone = right
      .replace(/^(whatsapp|tel|celular|contacto)\s*:\s*/i, '')
      .trim();
    const cleanName = left.replace(/^@/, '').replace(/_/g, ' ').trim();
    return {
      name: cleanName || 'Estudiante',
      phone: cleanPhone || right,
    };
  }

  return {
    name: report.contactName || 'Estudiante',
    phone: raw,
  };
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
 * Obtiene la URL de imagen o Data URL cargada desde el dispositivo, o asigna una imagen realista por defecto
 */
export function resolveReportImage(imageUrl, category) {
  const trimmed = imageUrl ? String(imageUrl).trim() : '';
  if (trimmed) return trimmed;
  return DEFAULT_CATEGORY_IMAGES[category] || FALLBACK_IMAGE_URL;
}

/**
 * Lee un archivo de imagen desde el dispositivo del usuario (File),
 * lo optimiza/redimensiona en un canvas para no saturar almacenamiento o red,
 * y devuelve una promesa con el Data URL (base64).
 */
export function processDeviceImageFile(file, maxDimension = 1000, quality = 0.84) {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('No se seleccionó ningún archivo.'));
    }

    if (!file.type.startsWith('image/')) {
      return reject(
        new Error('El archivo seleccionado debe ser una imagen (JPG, PNG, WEBP).')
      );
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl !== 'string') {
        return reject(new Error('No se pudo leer la imagen seleccionada.'));
      }

      const img = new Image();
      img.onload = () => {
        try {
          let { width, height } = img;
          if (width > maxDimension || height > maxDimension) {
            if (width >= height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const optimizedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(optimizedDataUrl);
        } catch {
          resolve(dataUrl);
        }
      };

      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    };

    reader.onerror = () =>
      reject(new Error('Error al cargar el archivo desde el dispositivo.'));

    reader.readAsDataURL(file);
  });
}
