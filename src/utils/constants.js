export const STORAGE_KEY = 'campus_rescue_reports_v3';

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
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
  'Documentos':
    'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80',
  'Ropa y Accesorios':
    'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=900&q=80',
  'Libros y Cuadernos':
    'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80',
  'Otros':
    'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80',
};

export const FALLBACK_IMAGE_URL =
  'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=900&q=80';

export const INITIAL_FILTERS = {
  search: '',
  category: 'Todas',
  location: 'Todas',
  type: 'todos',
  status: 'todos',
};
