export const STORAGE_KEY = 'campus_rescue_reports_v1';

export const REPORT_TYPES = {
  PERDIDO: 'perdido',
  ENCONTRADO: 'encontrado',
};

export const REPORT_STATUS = {
  ACTIVO: 'activo',
  DEVUELTO: 'devuelto',
};

export const CATEGORIES = [
  'Electrónica',
  'Documentos',
  'Ropa y Accesorios',
  'Libros y Cuadernos',
  'Otros',
];

export const SUGGESTED_LOCATIONS = [
  'Biblioteca',
  'Bloque 4 - Laboratorio 2',
  'Cafetería Central',
  'Auditorio Principal',
  'Edificio de Ingeniería - Piso 3',
  'Zona Deportiva / Gimnasio',
  'Plazoleta de Estudiantes',
  'Parqueadero Norte',
];

export const DEFAULT_CATEGORY_IMAGES = {
  'Electrónica':
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  'Documentos':
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80',
  'Ropa y Accesorios':
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
  'Libros y Cuadernos':
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80',
  'Otros':
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
};

export const FALLBACK_IMAGE_URL =
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80';

export const INITIAL_FILTERS = {
  search: '',
  category: 'Todas',
  location: 'Todas',
  type: 'todos',
  status: 'todos',
};
