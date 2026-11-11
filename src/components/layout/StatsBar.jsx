import React from 'react';
import { ClipboardList, Clock, CheckCircle2, Check } from 'lucide-react';

export default function StatsBar({ stats, activeStatusFilter, onQuickStatusFilter }) {
  const cards = [
    {
      id: 'todos',
      label: 'Total Reportados',
      value: stats.total,
      subtitle: `${stats.lostCount} perdidos · ${stats.foundCount} encontrados`,
      icon: ClipboardList,
    },
    {
      id: 'activo',
      label: 'Objetos Activos',
      value: stats.active,
      subtitle: 'Pendientes por reclamar · En custodia',
      icon: Clock,
    },
    {
      id: 'devuelto',
      label: 'Devueltos con Éxito',
      value: stats.returned,
      subtitle: `${stats.recoveryRate}% recuperados · Casos resueltos`,
      icon: CheckCircle2,
    },
  ];

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      aria-label="Resumen de métricas del campus"
    >
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected = activeStatusFilter === card.id;

        return (
          <div
            key={card.id}
            onClick={() => onQuickStatusFilter && onQuickStatusFilter(card.id)}
            role={onQuickStatusFilter ? 'button' : undefined}
            tabIndex={onQuickStatusFilter ? 0 : undefined}
            onKeyDown={(e) => {
              if (onQuickStatusFilter && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onQuickStatusFilter(card.id);
              }
            }}
            className={`group relative rounded-2xl p-5 backdrop-blur-md transition-all duration-300 ease-out select-none ${
              onQuickStatusFilter
                ? 'cursor-pointer hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#2878B5]'
                : ''
            } ${
              isSelected
                ? 'bg-white/20 border border-[#2878B5] shadow-xl shadow-[#202B38]/30 -translate-y-0.5'
                : 'bg-white/10 hover:bg-white/15 border border-white/15 shadow-md shadow-[#202B38]/15'
            }`}
          >
            {/* Cabecera de la tarjeta: Título Title Case + Número de alto impacto + Contenedor de Icono */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-[#E8EDF2] tracking-normal">
                  {card.label}
                </p>
                <p className="mt-2 text-4xl sm:text-5xl font-black text-[#FFFFFF] tracking-tight tabular-nums leading-none">
                  {card.value}
                </p>
              </div>

              <div
                className={`rounded-xl p-2.5 transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#2878B5] text-[#FFFFFF] shadow-md shadow-[#2878B5]/35 scale-105'
                    : 'bg-white/10 text-[#E8EDF2] group-hover:bg-white/15 group-hover:text-[#FFFFFF]'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2]" />
              </div>
            </div>

            {/* Pie de tarjeta: Subtítulo limpio de una línea + Indicador interactivo */}
            <div className="mt-4 flex items-center justify-between gap-2">
              <p className="text-xs text-[#E8EDF2]/80 truncate">
                {card.subtitle}
              </p>

              {onQuickStatusFilter && (
                <div className="shrink-0">
                  {isSelected ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#2878B5] text-[#FFFFFF] shadow-sm">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                      <span>Filtrado</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-[#E8EDF2]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Filtrar →
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
