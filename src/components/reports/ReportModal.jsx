import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Calendar,
  Tag,
  User,
  Image as ImageIcon,
  CheckCircle2,
  Search,
  Sparkles,
  Copy,
  Check,
  ShieldCheck,
  FileText,
  Clock,
} from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Input, Select, Textarea } from '../ui/Input';
import { TypeBadge, StatusBadge, CategoryBadge } from '../ui/Badge';
import {
  CATEGORIES,
  SUGGESTED_LOCATIONS,
} from '../../utils/constants';
import {
  formatDate,
  getTodayISO,
  resolveReportImage,
  FALLBACK_IMAGE_URL,
} from '../../utils/formatters';

const INITIAL_FORM_STATE = {
  type: 'perdido',
  title: '',
  category: CATEGORIES[0],
  description: '',
  location: '',
  date: getTodayISO(),
  contactAlias: '',
  status: 'activo',
  imageUrl: '',
};

/**
 * Modal de Creación de Reporte con validación estricta en tiempo real y al enviar.
 */
export function CreateReportModal({ isOpen, onClose, onCreateReport }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        ...INITIAL_FORM_STATE,
        date: getTodayISO(),
      });
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El nombre del objeto es obligatorio (ej: "Mochila Targus").';
    }

    if (!formData.description.trim()) {
      newErrors.description =
        'La descripción del objeto es obligatoria. Incluye detalles como color, marca o señales particulares.';
    }

    if (!formData.location.trim()) {
      newErrors.location =
        'La ubicación es obligatoria (ej: "Biblioteca" o "Bloque 4 - Laboratorio 2").';
    }

    if (!formData.contactAlias.trim()) {
      newErrors.contactAlias =
        'El alias o dato de contacto es obligatorio para coordinar la entrega.';
    }

    if (!formData.date) {
      newErrors.date = 'Selecciona la fecha del reporte.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newReport = {
      id: `cr-${Date.now()}`,
      type: formData.type,
      title: formData.title.trim(),
      category: formData.category,
      description: formData.description.trim(),
      location: formData.location.trim(),
      date: formData.date,
      contactAlias: formData.contactAlias.trim(),
      status: formData.status,
      imageUrl: resolveReportImage(formData.imageUrl, formData.category),
    };

    onCreateReport(newReport);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Crear Nuevo Reporte"
      subtitle="Completa los datos para registrar un objeto perdido o encontrado en el campus."
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} noValidate className="p-6 space-y-5">
        {/* Selección de Tipo de Reporte: Perdido vs Encontrado */}
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-[#202B38] mb-2">
            Tipo de Reporte <span className="text-rose-600">*</span>
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleChange('type', 'perdido')}
              className={`flex items-center justify-center gap-2.5 p-3.5 rounded-xl border-2 text-sm font-bold transition-all ${
                formData.type === 'perdido'
                  ? 'border-[#202B38] bg-[#202B38] text-[#FFFFFF] shadow-sm'
                  : 'border-[#34495E]/25 bg-[#FFFFFF] text-[#34495E] hover:bg-[#E8EDF2]'
              }`}
            >
              <Search
                className={`w-4 h-4 shrink-0 ${
                  formData.type === 'perdido' ? 'text-[#E8EDF2]' : 'text-[#34495E]'
                }`}
              />
              <span>Objeto Perdido</span>
            </button>

            <button
              type="button"
              onClick={() => handleChange('type', 'encontrado')}
              className={`flex items-center justify-center gap-2.5 p-3.5 rounded-xl border-2 text-sm font-bold transition-all ${
                formData.type === 'encontrado'
                  ? 'border-[#2878B5] bg-[#2878B5] text-[#FFFFFF] shadow-sm'
                  : 'border-[#34495E]/25 bg-[#FFFFFF] text-[#34495E] hover:bg-[#E8EDF2]'
              }`}
            >
              <Sparkles
                className={`w-4 h-4 shrink-0 ${
                  formData.type === 'encontrado' ? 'text-[#FFFFFF]' : 'text-[#2878B5]'
                }`}
              />
              <span>Objeto Encontrado</span>
            </button>
          </div>
        </div>

        {/* Nombre del Objeto y Categoría */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="report-title"
            label="Nombre del Objeto"
            required
            placeholder='Ej: Mochila Targus, Calculadora Casio...'
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            error={errors.title}
          />

          <Select
            id="report-category"
            label="Categoría"
            required
            icon={Tag}
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </div>

        {/* Ubicación (Obligatoria) + Sugerencias rápidas */}
        <div>
          <Input
            id="report-location"
            label="Ubicación en el Campus"
            required
            icon={MapPin}
            placeholder='Ej: Biblioteca, Bloque 4 - Laboratorio 2...'
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            error={errors.location}
          />
          <div className="mt-2 flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-semibold text-[#34495E]">
              Ubicaciones frecuentes:
            </span>
            {SUGGESTED_LOCATIONS.slice(0, 4).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => handleChange('location', loc)}
                className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#E8EDF2] hover:bg-[#2878B5] text-[#202B38] hover:text-[#FFFFFF] border border-[#34495E]/20 transition-colors"
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Descripción (Obligatoria) */}
        <Textarea
          id="report-description"
          label="Descripción Detallada"
          required
          rows={3}
          placeholder="Describe características clave: marca, color, contenido, distintivos o el lugar exacto donde se resguarda..."
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          error={errors.description}
        />

        {/* Fecha y Alias de Contacto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="report-date"
            type="date"
            label="Fecha del Suceso"
            required
            icon={Calendar}
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            error={errors.date}
          />

          <Input
            id="report-contact"
            label="Alias o Dato de Contacto"
            required
            icon={User}
            placeholder='Ej: @juan_perez o WhatsApp: 3001234567'
            value={formData.contactAlias}
            onChange={(e) => handleChange('contactAlias', e.target.value)}
            error={errors.contactAlias}
          />
        </div>

        {/* Estado inicial e Imagen opcional */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            id="report-status"
            label="Estado del Reporte"
            icon={Clock}
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            <option value="activo">Activo (Pendiente de entrega)</option>
            <option value="devuelto">Devuelto (Ya entregado)</option>
          </Select>

          <Input
            id="report-image"
            type="url"
            label="URL de Imagen (Opcional)"
            icon={ImageIcon}
            placeholder="https://images.unsplash.com/..."
            helperText="Si se deja vacío, se asignará una imagen de referencia automática."
            value={formData.imageUrl}
            onChange={(e) => handleChange('imageUrl', e.target.value)}
          />
        </div>

        {/* Botones de Acción del Formulario */}
        <div className="pt-4 border-t border-[#E8EDF2] flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" icon={CheckCircle2}>
            Guardar Reporte
          </Button>
        </div>
      </form>
    </Modal>
  );
}

/**
 * Modal de Detalle Completo del Objeto
 */
export function ReportDetailModal({
  report,
  isOpen,
  onClose,
  onMarkAsReturned,
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [report, isOpen]);

  if (!report) return null;

  const isReturned = report.status === 'devuelto';
  const imageSrc = resolveReportImage(report.imageUrl, report.category);

  const handleCopyContact = () => {
    if (navigator?.clipboard && report.contactAlias) {
      navigator.clipboard.writeText(report.contactAlias).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detalle del Reporte"
      subtitle={`ID de registro: ${report.id}`}
      maxWidth="max-w-2xl"
    >
      <div className="overflow-hidden">
        {/* Imagen destacada superior */}
        <div className="relative h-64 sm:h-72 w-full bg-[#202B38]">
          <img
            src={imageSrc}
            alt={report.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_IMAGE_URL;
            }}
            className={`w-full h-full object-cover ${
              isReturned ? 'grayscale-[30%] opacity-90' : ''
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#202B38]/95 via-[#202B38]/30 to-transparent" />

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
            <TypeBadge type={report.type} />
            <StatusBadge status={report.status} />
          </div>

          <div className="absolute bottom-4 left-6 right-6 text-[#FFFFFF]">
            <CategoryBadge
              category={report.category}
              className="bg-[#E8EDF2] text-[#202B38] mb-2"
            />
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {report.title}
            </h3>
          </div>
        </div>

        {/* Contenido detallado */}
        <div className="p-6 space-y-6">
          {/* Banner si ya fue devuelto */}
          {isReturned && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-[#E8EDF2] border border-[#2878B5]/40 text-[#202B38]">
              <ShieldCheck className="w-6 h-6 text-[#2878B5] shrink-0" />
              <div>
                <p className="text-sm font-extrabold">
                  ¡Este objeto ya fue devuelto con éxito!
                </p>
                <p className="text-xs text-[#34495E] mt-0.5 font-medium">
                  El reporte se mantiene en el historial del campus como caso resuelto.
                </p>
              </div>
            </div>
          )}

          {/* Descripción completa */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#202B38] flex items-center gap-1.5 mb-2">
              <FileText className="w-4 h-4 text-[#2878B5]" />
              Descripción del Objeto
            </h4>
            <p className="text-sm sm:text-base text-[#202B38] leading-relaxed bg-[#E8EDF2]/60 rounded-xl p-4 border border-[#34495E]/15">
              {report.description}
            </p>
          </div>

          {/* Grilla de Ubicación y Fecha */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#E8EDF2]/60 border border-[#34495E]/15">
              <span className="text-xs font-bold uppercase tracking-wider text-[#34495E] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#2878B5]" />
                Ubicación Reportada
              </span>
              <p className="mt-1 text-sm sm:text-base font-extrabold text-[#202B38]">
                {report.location}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#E8EDF2]/60 border border-[#34495E]/15">
              <span className="text-xs font-bold uppercase tracking-wider text-[#34495E] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#2878B5]" />
                Fecha del Reporte
              </span>
              <p className="mt-1 text-sm sm:text-base font-extrabold text-[#202B38]">
                {formatDate(report.date)} ({report.date})
              </p>
            </div>
          </div>

          {/* Tarjeta destacada de Contacto para reclamar o entregar */}
          <div className="p-5 rounded-2xl bg-[#E8EDF2] border-2 border-[#2878B5]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-xl bg-[#202B38] text-[#FFFFFF] shadow-sm shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#2878B5]">
                  Contacto para Reclamar / Coordinar Entrega
                </span>
                <p className="text-base sm:text-lg font-extrabold text-[#202B38] mt-0.5 break-all">
                  {report.contactAlias}
                </p>
                <p className="text-xs text-[#34495E] mt-0.5 font-medium">
                  Comunícate con este estudiante o encargado indicando detalles del objeto.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyContact}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#202B38] hover:bg-[#2878B5] text-[#FFFFFF] border border-[#34495E] transition-colors shrink-0 self-start sm:self-center shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#E8EDF2]" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar contacto</span>
                </>
              )}
            </button>
          </div>

          {/* Acciones inferiores del Modal */}
          <div className="pt-4 border-t border-[#E8EDF2] flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3">
            <Button variant="outline" onClick={onClose}>
              Cerrar ventana
            </Button>

            {!isReturned && (
              <Button
                variant="success"
                icon={CheckCircle2}
                onClick={() => onMarkAsReturned(report.id)}
              >
                Marcar como Devuelto
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CreateReportModal;
