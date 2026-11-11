import React from 'react';
import { ClipboardList, Clock, CheckCircle2, TrendingUp } from 'lucide-react';

export default function StatsBar({ stats, activeStatusFilter, onQuickStatusFilter }) {
  const cards = [
    {
      id: 'todos',
      label: 'Total Reportados',
      value: stats.total,
      subtitle: `${stats.lostCount} perdidos · ${stats.foundCount} encontrados activos`,
      icon: ClipboardList,
      cardBg: 'bg-[#202B38]/85 hover:bg-[#202B38] border-[#34495E]',
      iconBg: 'bg-[#34495E] text-[#E8EDF2] border-[#2878B5]/40',
      badgeText: 'Historial Campus',
      badgeColor: 'bg-[#34495E] text-[#E8EDF2] border-[#E8EDF2]/25',
      activeRing: 'ring-[#E8EDF2]',
    },
    {
      id: 'activo',
      label: 'Objetos Activos',
      value: stats.active,
      subtitle: 'Pendientes por reclamar o entregar',
      icon: Clock,
      cardBg: 'bg-[#34495E]/80 hover:bg-[#34495E] border-[#E8EDF2]/25',
      iconBg: 'bg-[#202B38] text-[#E8EDF2] border-[#E8EDF2]/20',
      badgeText: 'En Búsqueda / Custodia',
      badgeColor: 'bg-[#E8EDF2] text-[#202B38] border-[#FFFFFF]',
      activeRing: 'ring-[#E8EDF2]',
    },
    {
      id: 'devuelto',
      label: 'Devueltos con Éxito',
      value: stats.returned,
      subtitle: `Tasa de recuperación del ${stats.recoveryRate}%`,
      icon: CheckCircle2,
      cardBg: 'bg-[#2878B5]/30 hover:bg-[#2878B5]/45 border-[#2878B5]',
      iconBg: 'bg-[#2878B5] text-[#FFFFFF] border-[#E8EDF2]/30',
      badgeText: `${stats.recoveryRate}% Recuperados`,
      badgeColor: 'bg-[#2878B5] text-[#FFFFFF] border-[#E8EDF2]/40',
      activeRing: 'ring-[#FFFFFF]',
    },
  ];

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      aria-label="Resumen de métricas del campus"
    >
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected = activeStatusFilter === card.id && card.id !== 'todos';

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
            className={`group relative rounded-2xl border p-5 transition-all duration-200 backdrop-blur-sm shadow-lg ${
              card.cardBg
            } ${onQuickStatusFilter ? 'cursor-pointer hover:-translate-y-0.5' : ''} ${
              isSelected ? `ring-2 ${card.activeRing}` : ''
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#E8EDF2]">
                  {card.label}
                </p>
                <div className="mt-2 flex items-baseline gap-2.5 flex-wrap">
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#FFFFFF]">
                    {card.value}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${card.badgeColor}`}
                  >
                    {card.id === 'devuelto' && (
                      <TrendingUp className="w-3 h-3 shrink-0" />
                    )}
                    {card.badgeText}
                  </span>
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border ${card.iconBg} transition-transform group-hover:scale-105`}
              >
                <Icon className="w-6 h-6" />
              </div>
            </div>

            <p className="mt-3 text-xs text-[#E8EDF2]/85 flex items-center justify-between">
              <span>{card.subtitle}</span>
              {onQuickStatusFilter && (
                <span className="text-[11px] text-[#FFFFFF] opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                  {isSelected ? 'Filtro activo' : 'Filtrar →'}
                </span>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
