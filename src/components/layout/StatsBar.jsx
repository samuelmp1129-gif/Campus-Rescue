import React from 'react';
import { ClipboardList, Clock, CheckCircle2, Check } from 'lucide-react';

export default function StatsBar({ stats, activeStatusFilter, onQuickStatusFilter }) {
  const cards = [
    {
      id: 'todos',
      label: 'Total Reportados',
      value: stats?.total || 0,
      subtitle: `${stats?.lostCount || 0} perdidos · ${stats?.foundCount || 0} encontrados`,
      icon: ClipboardList,
    },
    {
      id: 'activo',
      label: 'Objetos Activos',
      value: stats?.active || 0,
      subtitle: 'Pendientes por reclamar',
      icon: Clock,
    },
    {
      id: 'devuelto',
      label: 'Devueltos con Éxito',
      value: stats?.returned || 0,
      subtitle: `Tasa recuperación: ${stats?.recoveryRate || 0}%`,
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
          <button
            key={card.id}
            type="button"
            onClick={() => onQuickStatusFilter && onQuickStatusFilter(card.id)}
            className={`group relative text-left rounded-2xl p-5 transition-all duration-300 border cursor-pointer backdrop-blur-md ${
              isSelected
                ? 'bg-white/25 border-[#D9ED92] shadow-xl shadow-black/10 ring-2 ring-[#D9ED92]/60 -translate-y-0.5'
                : 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/40'
            }`}
          >
            {/* Encabezado de la tarjeta */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#D9ED92]">
                  {card.label}
                </p>
                <div className="mt-1.5">
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                    {card.value}
                  </span>
                </div>
              </div>

              <div
                className={`p-2.5 rounded-xl transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#D9ED92] text-[#184E77]'
                    : 'bg-white/10 text-[#D9ED92] group-hover:bg-white/20'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>

            {/* Pie de la tarjeta bien alineado */}
            <div className="mt-4 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs text-[#D9ED92]/90">
              <span className="truncate pr-2 font-medium">{card.subtitle}</span>

              {onQuickStatusFilter && (
                <div className="shrink-0">
                  {isSelected ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D9ED92] text-[#184E77] shadow-sm">
                      <Check className="w-3 h-3 stroke-[3]" />
                      Filtrado
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
                      Filtrar →
                    </span>
                  )}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}