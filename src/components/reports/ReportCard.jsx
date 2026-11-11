import React from 'react';
import {
  MapPin,
  Calendar,
  CheckCircle2,
  Eye,
  UserCheck,
  ShieldCheck,
} from 'lucide-react';
import { TypeBadge, StatusBadge, CategoryBadge } from '../ui/Badge';
import {
  formatDate,
  resolveReportImage,
  FALLBACK_IMAGE_URL,
} from '../../utils/formatters';

export default function ReportCard({
  report,
  onSelectReport,
  onMarkAsReturned,
}) {
  const isReturned = report.status === 'devuelto';
  const imageSrc = resolveReportImage(report.imageUrl, report.category);

  const handleCardClick = () => {
    onSelectReport(report);
  };

  const handleMarkReturnedClick = (event) => {
    event.stopPropagation();
    if (!isReturned && onMarkAsReturned) {
      onMarkAsReturned(report.id);
    }
  };

  return (
    <article
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`Ver detalles de ${report.title}`}
      className={`group relative flex flex-col rounded-2xl bg-white border-2 transition-all duration-300 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#34A0A4] ${
        isReturned
          ? 'border-[#76C893] bg-[#D9ED92]/15 opacity-90 hover:opacity-100 shadow-sm'
          : 'border-[#99D98C]/80 hover:border-[#168AAD] shadow-sm hover:shadow-xl hover:shadow-[#184E77]/10 hover:-translate-y-1'
      }`}
    >
      {/* Contenedor de Imagen y Badges Superiores */}
      <div className="relative h-48 w-full overflow-hidden bg-[#184E77]/10">
        <img
          src={imageSrc}
          alt={report.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_IMAGE_URL;
          }}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            isReturned ? 'grayscale-[30%] contrast-95' : ''
          }`}
        />

        {/* Gradiente con el azul profundo #184E77 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#184E77]/75 via-[#184E77]/15 to-transparent" />

        {/* Badges de Tipo y Estado */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <TypeBadge type={report.type} />
          <StatusBadge status={report.status} />
        </div>

        {/* Marca de agua / Banner para reportes Devueltos */}
        {isReturned && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-r from-[#52B69A] via-[#34A0A4] to-[#168AAD] backdrop-blur-sm text-white px-3.5 py-1.5 flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider shadow-sm z-10">
            <ShieldCheck className="w-4 h-4 text-[#D9ED92] shrink-0" />
            <span>Resuelto / Devuelto a su dueño</span>
          </div>
        )}

        {/* Categoría flotante si está activo */}
        {!isReturned && (
          <div className="absolute bottom-3 left-3 z-10">
            <CategoryBadge
              category={report.category}
              className="bg-white/95 backdrop-blur-sm shadow-sm"
            />
          </div>
        )}
      </div>

      {/* Cuerpo de la Tarjeta */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {isReturned && (
            <div className="mb-2">
              <CategoryBadge category={report.category} />
            </div>
          )}

          <h3
            className={`text-base sm:text-lg font-extrabold leading-snug line-clamp-1 transition-colors ${
              isReturned
                ? 'text-[#1E6091]/80 line-through decoration-[#52B69A]'
                : 'text-[#184E77] group-hover:text-[#168AAD]'
            }`}
          >
            {report.title}
          </h3>

          <p className="mt-1.5 text-xs sm:text-sm text-[#1E6091] line-clamp-2 leading-relaxed">
            {report.description}
          </p>

          {/* Metadatos: Ubicación (con icono de mapa) y Fecha */}
          <div className="mt-4 pt-3 border-t border-[#99D98C]/40 space-y-2 text-xs text-[#1E6091]">
            <div className="flex items-center gap-2 font-bold text-[#184E77]">
              <MapPin className="w-4 h-4 text-[#34A0A4] shrink-0" />
              <span className="truncate" title={report.location}>
                {report.location}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 text-[#1A759F]">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#52B69A] shrink-0" />
                {formatDate(report.date)}
              </span>

              <span className="inline-flex items-center gap-1 text-[#168AAD] font-bold group-hover:translate-x-0.5 transition-transform">
                <Eye className="w-3.5 h-3.5" />
                Ver detalle
              </span>
            </div>
          </div>
        </div>

        {/* Pie de tarjeta: Botón de Acción */}
        <div className="mt-4 pt-3 border-t border-[#99D98C]/40">
          {!isReturned ? (
            <button
              type="button"
              onClick={handleMarkReturnedClick}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#D9ED92]/55 hover:bg-[#52B69A] text-[#184E77] hover:text-white border border-[#76C893] hover:border-[#34A0A4] transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-[#52B69A]/25 active:scale-[0.99]"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Marcar como Devuelto</span>
            </button>
          ) : (
            <div className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#B5E48C]/40 text-[#184E77] border border-[#76C893]">
              <UserCheck className="w-4 h-4 text-[#34A0A4] shrink-0" />
              <span>Caso Cerrado · Objeto Devuelto</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
