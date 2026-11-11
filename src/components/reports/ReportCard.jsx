import React from 'react';
import {
  MapPin,
  Calendar,
  CheckCircle2,
  Eye,
  UserCheck,
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

  const handleDetailButtonClick = (event) => {
    event.stopPropagation();
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
      className={`group relative aspect-[3/4] w-full rounded-3xl overflow-hidden cursor-pointer select-none bg-[#184E77] border-2 transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-[#34A0A4] focus:ring-offset-2 ${
        isReturned
          ? 'border-[#76C893]/80 opacity-85 hover:opacity-100 shadow-md'
          : 'border-[#99D98C]/70 hover:border-[#52B69A] shadow-md hover:shadow-2xl hover:shadow-[#184E77]/25 hover:-translate-y-1'
      }`}
    >
      {/* 1. IMAGEN DE FONDO (100% DEL CONTENEDOR CON ZOOM SUTIL EN HOVER) */}
      <img
        src={imageSrc}
        alt={report.title}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = FALLBACK_IMAGE_URL;
        }}
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
          isReturned
            ? 'grayscale-[55%] opacity-80 group-hover:grayscale-[30%]'
            : ''
        }`}
      />

      {/* 2. ESTADO BASE (SIN HOVER): DEGRADADO INFERIOR PERMANENTE CON SOLO TIPO Y TÍTULO */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#184E77]/95 via-[#184E77]/55 to-transparent flex flex-col justify-end p-5 transition-all duration-300 ease-out group-hover:opacity-0 group-hover:translate-y-2 group-focus-within:opacity-0"
        aria-hidden="true"
      >
        <div className="mb-2 flex items-center gap-2">
          <TypeBadge type={report.type} size="sm" />
          {isReturned && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#52B69A]/90 text-white">
              <CheckCircle2 className="w-3 h-3 text-[#D9ED92]" />
              Devuelto
            </span>
          )}
        </div>

        <h3
          className={`text-lg font-extrabold tracking-tight text-white line-clamp-2 drop-shadow-sm ${
            isReturned ? 'line-through decoration-[#99D98C]/80 text-white/90' : ''
          }`}
        >
          {report.title}
        </h3>
      </div>

      {/* 3. CAPA HOVER TIPO PINTEREST (TRASLÚCIDA OSCURA CON BACKDROP BLUR) */}
      <div className="absolute inset-0 bg-[#184E77]/85 backdrop-blur-md opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 ease-out flex flex-col justify-between p-5 text-white">
        {/* ARRIBA: Badges claros de Tipo y Estado */}
        <div className="flex items-center justify-between gap-2 transform -translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-300 ease-out">
          <TypeBadge type={report.type} size="sm" />
          <StatusBadge status={report.status} size="sm" />
        </div>

        {/* CENTRO: Categoría, título, descripción breve truncada, ubicación y fecha */}
        <div className="my-auto py-3 transform translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-300 delay-75 ease-out">
          <CategoryBadge
            category={report.category}
            className="bg-[#D9ED92] text-[#184E77] border-[#B5E48C] mb-2.5"
          />

          <h3 className="text-lg font-extrabold leading-snug text-white line-clamp-2">
            {report.title}
          </h3>

          <p className="mt-2 text-xs text-[#D9ED92]/90 line-clamp-3 leading-relaxed">
            {report.description}
          </p>

          <div className="mt-3.5 pt-3 border-t border-[#52B69A]/40 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 font-bold text-[#B5E48C]">
              <MapPin className="w-3.5 h-3.5 text-[#D9ED92] shrink-0" />
              <span className="truncate" title={report.location}>
                {report.location}
              </span>
            </div>

            <div className="flex items-center gap-2 text-white/85 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#76C893] shrink-0" />
              <span>{formatDate(report.date)}</span>
            </div>
          </div>
        </div>

        {/* ABAJO: Botones de acción integrados (Ver detalle y Marcar como devuelto) */}
        <div className="flex flex-col gap-2 transform translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-300 delay-100 ease-out">
          <button
            type="button"
            onClick={handleDetailButtonClick}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white/15 hover:bg-white/25 text-white border border-white/25 transition-colors focus:outline-none"
          >
            <Eye className="w-3.5 h-3.5 text-[#D9ED92] shrink-0" />
            <span>Ver detalle completo</span>
          </button>

          {!isReturned ? (
            <button
              type="button"
              onClick={handleMarkReturnedClick}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold bg-[#52B69A] hover:bg-[#76C893] text-white hover:text-[#184E77] border border-[#76C893] shadow-sm transition-all duration-200 active:scale-[0.98] focus:outline-none"
            >
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Marcar como devuelto</span>
            </button>
          ) : (
            <div className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#52B69A]/30 text-[#D9ED92] border border-[#76C893]/60">
              <UserCheck className="w-3.5 h-3.5 text-[#B5E48C] shrink-0" />
              <span>Caso resuelto · Devuelto</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
