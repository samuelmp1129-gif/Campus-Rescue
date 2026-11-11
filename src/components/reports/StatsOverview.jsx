import React from 'react';
import { Package, Radio, CheckCircle2 } from 'lucide-react';

export default function StatsOverview({ stats, activeStatusFilter, onQuickStatusFilter }) {
  const total = stats?.total || 0;
  const activos = stats?.activos || 0;
  const devueltos = stats?.devueltos || 0;

  const items = [
    {
      id: 'todos',
      label: 'Total Reportados',
      value: total,
      icon: Package,
      color: 'from-blue-500/10 to-indigo-500/5',
      iconBg: 'bg-blue-500/10 text-blue-600',
      badge: 'Registros totales',
    },
    {
      id: 'activo',
      label: 'Objetos Activos',
      value: activos,
      icon: Radio,
      color: 'from-amber-500/10 to-orange-500/5',
      iconBg: 'bg-amber-500/10 text-amber-600',
      badge: 'En búsqueda',
      pulse: true,
    },
    {
      id: 'devuelto',
      label: 'Devueltos con Éxito',
      value: devueltos,
      icon: CheckCircle2,
      color: 'from-emerald-500/10 to-teal-500/5',
      iconBg: 'bg-emerald-500/10 text-emerald-600',
      badge: `${total > 0 ? Math.round((devueltos / total) * 100) : 0}% resueltos`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeStatusFilter === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onQuickStatusFilter && onQuickStatusFilter(item.id)}
            className={`relative overflow-hidden text-left p-5 rounded-2xl border transition-all duration-300 group cursor-pointer ${
              isActive
                ? 'bg-white border-[#184E77] shadow-md ring-2 ring-[#184E77]/20'
                : 'bg-white/80 backdrop-blur-md border-slate-200/80 hover:shadow-lg hover:border-slate-300'
            }`}
          >
            <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-gradient-to-br ${item.color} blur-2xl group-hover:scale-125 transition-transform duration-500`} />

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {item.label}
                  </span>
                  {item.pulse && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                    </span>
                  )}
                </div>
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {item.value}
                </span>
              </div>

              <div className={`p-3 rounded-xl ${item.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="relative z-10 mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium text-slate-600">{item.badge}</span>
              <span className={`font-semibold transition-opacity ${isActive ? 'text-[#184E77] opacity-100' : 'text-slate-400 opacity-0 group-hover:opacity-100'}`}>
                {isActive ? 'Filtro activo' : 'Filtrar →'}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}