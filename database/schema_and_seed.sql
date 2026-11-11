-- =============================================================================
-- CAMPUS RESCUE: ESQUEMA RELACIONAL SQL Y DATOS DE INICIALIZACIÓN (PostgreSQL)
-- =============================================================================

-- 1. Creación de Tipos Enumerados (Dominio del Modelo de Datos)
DO $$ BEGIN
    CREATE TYPE report_type_enum AS ENUM ('perdido', 'encontrado');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE report_status_enum AS ENUM ('activo', 'devuelto');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE report_category_enum AS ENUM (
        'Electrónica',
        'Documentos',
        'Ropa y Accesorios',
        'Libros y Cuadernos',
        'Otros'
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- 2. Tabla Principal de Reportes (reports)
CREATE TABLE IF NOT EXISTS reports (
    id              VARCHAR(64) PRIMARY KEY,
    type            report_type_enum NOT NULL,
    title           VARCHAR(160) NOT NULL,
    category        report_category_enum NOT NULL DEFAULT 'Otros',
    description     TEXT NOT NULL CHECK (char_length(trim(description)) > 0),
    location        VARCHAR(180) NOT NULL CHECK (char_length(trim(location)) > 0),
    report_date     DATE NOT NULL DEFAULT CURRENT_DATE,
    contact_name    VARCHAR(120) NOT NULL,
    contact_phone   VARCHAR(60) NOT NULL,
    contact_alias   VARCHAR(200) NOT NULL,
    status          report_status_enum NOT NULL DEFAULT 'activo',
    claimed_date    DATE NULL,
    image_url       TEXT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_claimed_date_consistency CHECK (
        (status = 'activo' AND claimed_date IS NULL)
        OR (status = 'devuelto' AND claimed_date IS NOT NULL)
    )
);

-- 3. Índices para Búsqueda y Filtrado en Tiempo Real
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports (status);
CREATE INDEX IF NOT EXISTS idx_reports_type ON reports (type);
CREATE INDEX IF NOT EXISTS idx_reports_category ON reports (category);
CREATE INDEX IF NOT EXISTS idx_reports_location ON reports (location);
CREATE INDEX IF NOT EXISTS idx_reports_report_date ON reports (report_date DESC);

-- 4. Datos Semilla Iniciales (4 Reportes de Ejemplo Requeridos)
INSERT INTO reports (
    id,
    type,
    title,
    category,
    description,
    location,
    report_date,
    contact_name,
    contact_phone,
    contact_alias,
    status,
    claimed_date,
    image_url
) VALUES
(
    'cr-1001',
    'encontrado',
    'Mochila negra con termo',
    'Ropa y Accesorios',
    'Se encontró una mochila negra marca Targus en las mesas de estudio grupal del segundo piso de la Biblioteca. En el bolsillo lateral izquierdo tiene un termo metálico gris mate de 750 ml y un llavero con cinta institucional.',
    'Biblioteca',
    '2026-11-10',
    'Laura Gómez',
    '300 456 7890',
    'Laura Gómez · 300 456 7890',
    'activo',
    NULL,
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80'
),
(
    'cr-1002',
    'perdido',
    'Audífonos Inalámbricos Sony WH-1000XM4',
    'Electrónica',
    'Olvidé mis audífonos de diadema color negro mate dentro de su estuche rígido gris al finalizar la práctica de programación. El estuche tiene un sticker pequeño de React en la parte trasera y el cable USB-C adentro.',
    'Bloque 4 - Laboratorio 2',
    '2026-11-09',
    'Carlos Restrepo',
    '315 890 1234',
    'Carlos Restrepo · 315 890 1234',
    'activo',
    NULL,
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80'
),
(
    'cr-1003',
    'encontrado',
    'Carné Estudiantil y Portadocumentos Azul',
    'Documentos',
    'Encontré un portadocumentos de cuero azul oscuro con carné estudiantil de la Facultad de Ingeniería y tarjeta de transporte integrado cerca de la fila de pagos de la cafetería.',
    'Cafetería Central',
    '2026-11-11',
    'Sofía Medina',
    '310 234 5678',
    'Sofía Medina · 310 234 5678',
    'activo',
    NULL,
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80'
),
(
    'cr-1004',
    'perdido',
    'Cuaderno de Cálculo Multivariable y Apuntes',
    'Libros y Cuadernos',
    'Cuaderno argollado de pasta dura con todos los apuntes del semestre de Cálculo Multivariable y un separador magnético. Quedó en la tercera fila de butacas tras la conferencia de ciencias.',
    'Auditorio Principal',
    '2026-11-07',
    'Mateo Vargas',
    '320 987 6543',
    'Mateo Vargas · 320 987 6543',
    'devuelto',
    '2026-11-10',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80'
)
ON CONFLICT (id) DO NOTHING;
