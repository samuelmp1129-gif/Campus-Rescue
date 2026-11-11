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
      cardBg: 'bg-[#184E77]/85 hover:bg-[#184E77] border-[#34A0A4]/60',
      iconBg: 'bg-[#168AAD]/35 text-[#D9ED92] border-[#34A0A4]',
      badgeText: 'Historial Campus',
      badgeColor: 'bg-[#168AAD] text-white border-[#52B69A]',
      activeRing: 'ring-[#D9ED92]',
    },
    {
      id: 'activo',
      label: 'Objetos Activos',
      value: stats.active,
      subtitle: 'Pendientes por reclamar o entregar',
      icon: Clock,
      cardBg: 'bg-[#1E6091]/85 hover:bg-[#1E6091] border-[#99D98C]/60',
      iconBg: 'bg-[#D9ED92]/20 text-[#D9ED92] border-[#B5E48C]/60',
      badgeText: 'En Búsqueda / Custodia',
      badgeColor: 'bg-[#D9ED92] text-[#184E77] border-[#B5E48C]',
      activeRing: 'ring-[#D9ED92]',
    },
    {
      id: 'devuelto',
      label: 'Devueltos con Éxito',
      value: stats.returned,
      subtitle: `Tasa de recuperación del ${stats.recoveryRate}%`,
      icon: CheckCircle2,
      cardBg: 'bg-[#1A759F]/85 hover:bg-[#1A759F] border-[#76C893]/70',
      iconBg: 'bg-[#52B69A]/30 text-[#D9ED92] border-[#76C893]',
      badgeText: `${stats.recoveryRate}% Recuperados`,
      badgeColor: 'bg-[#76C893] text-[#184E77] border-[#B5E48C]',
      activeRing: 'ring-[#D9ED92]',
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
                <p className="text-xs font-bold uppercase tracking-wider text-[#B5E48C]">
                  {card.label}
                </p>
                <div className="mt-2 flex items-baseline gap-2.5 flex-wrap">
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
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

            <p className="mt-3 text-xs text-[#D9ED92]/90 flex items-center justify-between">
              <span>{card.subtitle}</span>
              {onQuickStatusFilter && (
                <span className="text-[11px] text-[#D9ED92] opacity-0 group-hover:opacity-100 transition-opacity font-bold">
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
