import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Calendar,
  Tag,
  User,
  Phone,
  Upload,
  Camera,
  Trash2,
  CheckCircle2,
  Search,
  Sparkles,
  Copy,
  Check,
  ShieldCheck,
  FileText,
  Clock,
  AlertCircle,
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
  extractContactDetails,
  resolveReportImage,
  processDeviceImageFile,
  FALLBACK_IMAGE_URL,
} from '../../utils/formatters';

const INITIAL_FORM_STATE = {
  type: 'perdido',
  title: '',
  category: CATEGORIES[0],
  description: '',
  location: '',
  date: getTodayISO(),
  contactName: '',
  contactPhone: '',
  status: 'activo',
  imageUrl: '',
};

/**
 * Modal de Creación de Reporte con carga de imagen desde el dispositivo y validación estricta.
 */
export function CreateReportModal({ isOpen, onClose, onCreateReport }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [selectedFileName, setSelectedFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        ...INITIAL_FORM_STATE,
        date: getTodayISO(),
      });
      setErrors({});
      setSelectedFileName('');
      setIsDragging(false);
    }
  }, [isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleImageFileSelect = async (file) => {
    if (!file) return;
    try {
      const dataUrl = await processDeviceImageFile(file);
      setFormData((prev) => ({ ...prev, imageUrl: dataUrl }));
      setSelectedFileName(file.name);
      if (errors.imageUrl) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.imageUrl;
          return next;
        });
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        imageUrl: error.message || 'No se pudo cargar la imagen desde el dispositivo.',
      }));
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageFileSelect(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      handleImageFileSelect(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, imageUrl: '' }));
    setSelectedFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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

    if (!formData.contactName.trim()) {
      newErrors.contactName = 'El nombre de la persona de contacto es obligatorio.';
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = 'El número de contacto es obligatorio.';
    }

    if (!formData.date) {
      newErrors.date = 'Selecciona la fecha del reporte.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const nameClean = formData.contactName.trim();
    const phoneClean = formData.contactPhone.trim();

    const newReport = {
      id: `cr-${Date.now()}`,
      type: formData.type,
      title: formData.title.trim(),
      category: formData.category,
      description: formData.description.trim(),
      location: formData.location.trim(),
      date: formData.date,
      contactName: nameClean,
      contactPhone: phoneClean,
      contactAlias: `${nameClean} · ${phoneClean}`,
      status: formData.status,
      claimedDate: formData.status === 'devuelto' ? getTodayISO() : null,
      imageUrl: resolveReportImage(formData.imageUrl, formData.category),
    };

    await onCreateReport(newReport);
    onClose();
  };

  const hasValidationErrors = Object.keys(errors).length > 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Crear nuevo reporte"
      subtitle="Completa los datos para registrar un objeto perdido o encontrado en el campus."
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} noValidate className="p-6 space-y-5">
        {/* Alerta visual superior si el usuario intenta guardar con campos obligatorios vacíos */}
        {hasValidationErrors && (
          <div
            role="alert"
            className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs"
          >
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-rose-900">
                Por favor completa los campos obligatorios antes de guardar
              </p>
              <p className="mt-0.5 text-rose-700">
                La descripción detallada y la ubicación en el campus son indispensables para publicar el reporte.
              </p>
            </div>
          </div>
        )}

        {/* Selección de Tipo de Reporte: Perdido vs Encontrado */}
        <div>
          <span className="block text-[13px] font-medium text-[#34495E] mb-2">
            Tipo de reporte <span className="text-rose-500">*</span>
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleChange('type', 'perdido')}
              className={`flex items-center justify-center gap-2.5 p-3 rounded-xl border text-sm font-medium transition-all ${
                formData.type === 'perdido'
                  ? 'border-[#202B38] bg-[#202B38] text-[#FFFFFF] shadow-sm'
                  : 'border-[#34495E]/20 bg-[#FFFFFF] text-[#34495E] hover:bg-[#E8EDF2]/60'
              }`}
            >
              <Search
                className={`w-4 h-4 shrink-0 ${
                  formData.type === 'perdido' ? 'text-[#E8EDF2]' : 'text-[#34495E]'
                }`}
              />
              <span>Objeto perdido</span>
            </button>

            <button
              type="button"
              onClick={() => handleChange('type', 'encontrado')}
              className={`flex items-center justify-center gap-2.5 p-3 rounded-xl border text-sm font-medium transition-all ${
                formData.type === 'encontrado'
                  ? 'border-[#2878B5] bg-[#2878B5] text-[#FFFFFF] shadow-sm'
                  : 'border-[#34495E]/20 bg-[#FFFFFF] text-[#34495E] hover:bg-[#E8EDF2]/60'
              }`}
            >
              <Sparkles
                className={`w-4 h-4 shrink-0 ${
                  formData.type === 'encontrado' ? 'text-[#FFFFFF]' : 'text-[#2878B5]'
                }`}
              />
              <span>Objeto encontrado</span>
            </button>
          </div>
        </div>

        {/* Nombre del Objeto y Categoría */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="report-title"
            label="Nombre del objeto"
            required
            placeholder="Ej: Mochila Targus, Calculadora Casio..."
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
            label="Ubicación en el campus"
            required
            icon={MapPin}
            placeholder="Ej: Biblioteca, Bloque 4 - Laboratorio 2..."
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            error={errors.location}
          />
          <div className="mt-2 flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-normal text-[#34495E]/70">
              Sugerencias:
            </span>
            {SUGGESTED_LOCATIONS.slice(0, 4).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => handleChange('location', loc)}
                className="text-xs font-normal px-2.5 py-0.5 rounded-md bg-[#E8EDF2]/80 hover:bg-[#2878B5] text-[#34495E] hover:text-[#FFFFFF] border border-[#34495E]/15 transition-colors"
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Descripción (Obligatoria) */}
        <Textarea
          id="report-description"
          label="Descripción detallada"
          required
          rows={3}
          placeholder="Describe características clave: marca, color, contenido, distintivos o el lugar exacto donde se resguarda..."
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          error={errors.description}
        />

        {/* Nombre de la Persona y Número de Contacto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="report-contact-name"
            label="Nombre de la persona"
            required
            icon={User}
            placeholder="Ej: Juan Pérez"
            value={formData.contactName}
            onChange={(e) => handleChange('contactName', e.target.value)}
            error={errors.contactName}
          />

          <Input
            id="report-contact-phone"
            label="Número de contacto"
            required
            icon={Phone}
            placeholder="Ej: 300 123 4567"
            value={formData.contactPhone}
            onChange={(e) => handleChange('contactPhone', e.target.value)}
            error={errors.contactPhone}
          />
        </div>

        {/* Fecha y Estado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="report-date"
            type="date"
            label="Fecha del reporte"
            required
            icon={Calendar}
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            error={errors.date}
          />

          <Select
            id="report-status"
            label="Estado del reporte"
            icon={Clock}
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            <option value="activo">Activo</option>
            <option value="devuelto">Devuelto</option>
          </Select>
        </div>

        {/* Selector de Imagen desde el Dispositivo (Click o Drag & Drop + Vista Previa) */}
        <div>
          <label className="block text-[13px] font-medium text-[#34495E] mb-1.5">
            Fotografía del objeto (cargar desde tu dispositivo)
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />

          {!formData.imageUrl ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
                isDragging
                  ? 'border-[#2878B5] bg-[#2878B5]/10'
                  : 'border-[#34495E]/25 bg-[#E8EDF2]/45 hover:bg-[#E8EDF2]/80 hover:border-[#2878B5]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#202B38] text-[#FFFFFF] flex items-center justify-center shadow-sm">
                <Upload className="w-4 h-4 text-[#E8EDF2]" />
              </div>
              <div className="text-center">
                <p className="text-xs sm:text-sm font-medium text-[#202B38]">
                  Haz clic para subir una foto desde tu dispositivo
                </p>
                <p className="text-xs font-normal text-[#34495E]/70 mt-0.5">
                  o arrastra y suelta una imagen aquí (JPG, PNG o WEBP)
                </p>
              </div>
            </div>
          ) : (
            <div className="relative flex items-center gap-4 p-3 rounded-2xl bg-[#E8EDF2]/70 border border-[#2878B5]/35">
              <img
                src={formData.imageUrl}
                alt="Vista previa del objeto"
                className="w-20 h-20 rounded-xl object-cover border border-[#34495E]/15 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#202B38] truncate">
                  {selectedFileName || 'Imagen cargada desde el dispositivo'}
                </p>
                <p className="text-xs font-normal text-[#34495E]/80 mt-0.5">
                  Lista para guardarse con el reporte.
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#202B38] hover:bg-[#2878B5] text-[#FFFFFF] transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Cambiar foto</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FFFFFF] hover:bg-rose-50 text-[#34495E] hover:text-rose-600 border border-[#34495E]/20 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Quitar</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {errors.imageUrl && (
            <p className="mt-1.5 text-xs font-medium text-rose-600">
              {errors.imageUrl}
            </p>
          )}
        </div>

        {/* Botones de Acción del Formulario */}
        <div className="pt-4 border-t border-[#E8EDF2] flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" icon={CheckCircle2}>
            Guardar reporte
          </Button>
        </div>
      </form>
    </Modal>
  );
}

/**
 * Modal de Detalle Completo del Objeto (incluye opción para subir/cambiar foto desde el dispositivo)
 */
export function ReportDetailModal({
  report,
  isOpen,
  onClose,
  onMarkAsReturned,
  onUpdateReportImage,
}) {
  const [copied, setCopied] = useState(false);
  const detailFileInputRef = useRef(null);

  useEffect(() => {
    setCopied(false);
  }, [report, isOpen]);

  if (!report) return null;

  const isReturned = report.status === 'devuelto';
  const imageSrc = resolveReportImage(report.imageUrl, report.category);
  const { name: contactName, phone: contactPhone } = extractContactDetails(report);

  const handleCopyContact = () => {
    if (navigator?.clipboard && contactPhone) {
      navigator.clipboard.writeText(contactPhone).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReplaceImageFromDevice = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !onUpdateReportImage) return;
    try {
      const dataUrl = await processDeviceImageFile(file);
      await onUpdateReportImage(report.id, dataUrl);
    } catch (error) {
      console.error('Error al actualizar la imagen:', error);
    } finally {
      if (detailFileInputRef.current) {
        detailFileInputRef.current.value = '';
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detalle del reporte"
      subtitle={`ID de registro: ${report.id}`}
      maxWidth="max-w-2xl"
    >
      <div className="overflow-hidden">
        {/* Imagen destacada superior + Botón para cambiar foto desde el dispositivo */}
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#202B38]/95 via-[#202B38]/35 to-transparent" />

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
            <TypeBadge type={report.type} />
            <div className="flex items-center gap-2">
              {onUpdateReportImage && (
                <>
                  <input
                    ref={detailFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleReplaceImageFromDevice}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => detailFileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#202B38]/85 hover:bg-[#2878B5] text-[#FFFFFF] border border-[#E8EDF2]/30 backdrop-blur-sm transition-colors shadow-sm"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#E8EDF2]" />
                    <span>Subir foto</span>
                  </button>
                </>
              )}
              <StatusBadge status={report.status} />
            </div>
          </div>

          <div className="absolute bottom-4 left-6 right-6 text-[#FFFFFF]">
            <CategoryBadge
              category={report.category}
              className="bg-[#E8EDF2]/95 text-[#202B38] mb-2"
            />
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
              {report.title}
            </h3>
          </div>
        </div>

        {/* Contenido detallado */}
        <div className="p-6 space-y-5">
          {/* Banner si ya fue devuelto */}
          {isReturned && (
            <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-[#E8EDF2]/80 border border-[#2878B5]/30 text-[#202B38]">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#2878B5] shrink-0" />
                <div>
                  <p className="text-sm font-semibold">
                    Objeto reclamado y devuelto con éxito
                  </p>
                  <p className="text-xs font-normal text-[#34495E]/85 mt-0.5">
                    Fecha de reclamación:{' '}
                    <span className="font-semibold text-[#202B38]">
                      {formatDate(report.claimedDate || report.date)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Descripción completa */}
          <div>
            <h4 className="text-[13px] font-medium text-[#34495E] flex items-center gap-1.5 mb-2">
              <FileText className="w-4 h-4 text-[#2878B5]" />
              Descripción del objeto
            </h4>
            <p className="text-sm sm:text-[15px] font-normal text-[#202B38]/90 leading-relaxed bg-[#E8EDF2]/50 rounded-xl p-4 border border-[#34495E]/10">
              {report.description}
            </p>
          </div>

          {/* Grilla de Ubicación, Fecha del Reporte y Fecha de Reclamación (en formato dd/mm/yyyy) */}
          <div
            className={`grid grid-cols-1 ${
              isReturned ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
            } gap-4`}
          >
            <div className="p-4 rounded-xl bg-[#E8EDF2]/50 border border-[#34495E]/10">
              <span className="text-xs font-normal text-[#34495E]/80 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#2878B5]" />
                Ubicación
              </span>
              <p className="mt-1 text-sm sm:text-base font-semibold text-[#202B38]">
                {report.location}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#E8EDF2]/50 border border-[#34495E]/10">
              <span className="text-xs font-normal text-[#34495E]/80 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#2878B5]" />
                Fecha del reporte
              </span>
              <p className="mt-1 text-sm sm:text-base font-semibold text-[#202B38] tabular-nums">
                {formatDate(report.date)}
              </p>
            </div>

            {isReturned && (
              <div className="p-4 rounded-xl bg-[#2878B5]/10 border border-[#2878B5]/30">
                <span className="text-xs font-medium text-[#2878B5] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2878B5]" />
                  Fecha de reclamación
                </span>
                <p className="mt-1 text-sm sm:text-base font-semibold text-[#202B38] tabular-nums">
                  {formatDate(report.claimedDate || report.date)}
                </p>
              </div>
            )}
          </div>

          {/* Cuadro de Contacto minimalista: SOLO Nombre de la persona y Número de contacto */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#E8EDF2]/80 border border-[#2878B5]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#202B38] text-[#FFFFFF] flex items-center justify-center shadow-sm shrink-0">
                <User className="w-5 h-5 text-[#E8EDF2]" />
              </div>

              <div className="space-y-0.5">
                <p className="text-sm sm:text-base font-semibold text-[#202B38]">
                  {contactName}
                </p>
                <p className="text-sm font-medium text-[#2878B5] flex items-center gap-1.5 tabular-nums">
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>{contactPhone}</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyContact}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-[#202B38] hover:bg-[#2878B5] text-[#FFFFFF] transition-colors shrink-0 self-start sm:self-center shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#E8EDF2]" />
                  <span>Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar número</span>
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
                Marcar como devuelto
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CreateReportModal;
