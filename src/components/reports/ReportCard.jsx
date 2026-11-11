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
      className={`group relative aspect-[3/4] w-full rounded-3xl overflow-hidden cursor-pointer select-none bg-[#202B38] border transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-[#2878B5] focus:ring-offset-2 ${
        isReturned
          ? 'border-[#34495E]/30 opacity-90 hover:opacity-100 shadow-sm'
          : 'border-[#FFFFFF] hover:border-[#2878B5]/60 shadow-sm hover:shadow-xl hover:shadow-[#202B38]/20 hover:-translate-y-1'
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
            ? 'grayscale-[60%] opacity-75 group-hover:grayscale-[40%]'
            : ''
        }`}
      />

      {/* 2. ESTADO BASE (SIN HOVER): DEGRADADO INFERIOR PERMANENTE CON SOLO TIPO Y TÍTULO */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#202B38] via-[#202B38]/75 to-transparent flex flex-col justify-end p-5 transition-all duration-300 ease-out group-hover:opacity-0 group-hover:translate-y-2 group-focus-within:opacity-0"
        aria-hidden="true"
      >
        <div className="mb-2 flex items-center gap-2">
          <TypeBadge type={report.type} size="sm" />
          {isReturned && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#34495E] text-[#FFFFFF] border border-[#E8EDF2]/30">
              <CheckCircle2 className="w-3 h-3 text-[#2878B5]" />
              Devuelto
            </span>
          )}
        </div>

        <h3
          className={`text-base sm:text-[17px] font-semibold tracking-[-0.015em] leading-snug text-[#FFFFFF] line-clamp-2 drop-shadow-sm ${
            isReturned ? 'line-through decoration-[#E8EDF2]/60 text-[#E8EDF2]/90' : ''
          }`}
        >
          {report.title}
        </h3>
      </div>

      {/* 3. CAPA HOVER TIPO PINTEREST (OPACIDAD PROFUNDA 95% + BACKDROP BLUR PARA MÁXIMA LEGIBILIDAD) */}
      <div className="absolute inset-0 bg-[#202B38]/95 backdrop-blur-md opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 ease-out flex flex-col justify-between p-5 text-[#FFFFFF]">
        {/* ARRIBA: Badges claros de Tipo y Estado */}
        <div className="flex items-center justify-between gap-2 transform -translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-300 ease-out">
          <TypeBadge type={report.type} size="sm" />
          <StatusBadge status={report.status} size="sm" />
        </div>

        {/* CENTRO: Categoría, título, descripción breve truncada, ubicación y fechas en dd/mm/yyyy */}
        <div className="my-auto py-3 transform translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-300 delay-75 ease-out">
          <CategoryBadge
            category={report.category}
            className="bg-[#E8EDF2] text-[#202B38] border-[#FFFFFF]/40 mb-2.5"
          />

          <h3 className="text-base sm:text-[17px] font-semibold tracking-[-0.015em] leading-snug text-[#FFFFFF] line-clamp-2">
            {report.title}
          </h3>

          <p className="mt-2 text-xs font-normal text-[#E8EDF2] line-clamp-3 leading-relaxed">
            {report.description}
          </p>

          <div className="mt-3.5 pt-3 border-t border-[#34495E] space-y-1.5 text-xs">
            <div className="flex items-center gap-2 font-medium text-[#FFFFFF]">
              <MapPin className="w-3.5 h-3.5 text-[#2878B5] shrink-0" />
              <span className="truncate" title={report.location}>
                {report.location}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[#E8EDF2]/90 font-normal">
              <Calendar className="w-3.5 h-3.5 text-[#2878B5] shrink-0" />
              <span>Reporte: {formatDate(report.date)}</span>
            </div>

            {isReturned && (
              <div className="flex items-center gap-2 text-[#FFFFFF] font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2878B5] shrink-0" />
                <span>
                  Reclamado: {formatDate(report.claimedDate || report.date)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ABAJO: Botones de acción integrados (Ver detalle y Marcar como devuelto) */}
        <div className="flex flex-col gap-2 transform translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-300 delay-100 ease-out">
          <button
            type="button"
            onClick={handleDetailButtonClick}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-[#34495E] hover:bg-[#34495E]/80 text-[#FFFFFF] border border-[#E8EDF2]/25 transition-colors focus:outline-none"
          >
            <Eye className="w-3.5 h-3.5 text-[#E8EDF2] shrink-0" />
            <span>Ver detalle completo</span>
          </button>

          {!isReturned ? (
            <button
              type="button"
              onClick={handleMarkReturnedClick}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-[#2878B5] hover:bg-[#FFFFFF] text-[#FFFFFF] hover:text-[#202B38] border border-[#2878B5] shadow-sm transition-all duration-200 active:scale-[0.98] focus:outline-none"
            >
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Marcar como devuelto</span>
            </button>
          ) : (
            <div className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-[#34495E]/70 text-[#E8EDF2] border border-[#E8EDF2]/20">
              <UserCheck className="w-3.5 h-3.5 text-[#2878B5] shrink-0" />
              <span>Caso resuelto · Devuelto</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
