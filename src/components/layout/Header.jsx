import React from 'react';
import { Plus, RotateCcw } from 'lucide-react';
import StatsBar from './StatsBar';

export default function Header({
  stats,
  activeStatusFilter,
  onQuickStatusFilter,
  onOpenCreateModal,
  onResetDemoData,
}) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-[#202B38] via-[#34495E] to-[#202B38] text-[#FFFFFF] border-b border-[#2878B5]/40">
      {/* Elementos decorativos de fondo */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#2878B5]/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#2878B5]/15 blur-3xl"
        aria-hidden="true"
      />

      {/* Franja superior con los 5 colores de la paleta */}
      <div className="h-1 w-full grid grid-cols-5">
        <div className="bg-[#202B38]" />
        <div className="bg-[#34495E]" />
        <div className="bg-[#2878B5]" />
        <div className="bg-[#E8EDF2]" />
        <div className="bg-[#FFFFFF]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-9 pb-9 sm:pt-11 sm:pb-11">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#FFFFFF]">
              Campus <span className="text-[#2878B5]">Rescue</span>
            </h1>
            <p className="mt-2 text-sm sm:text-[15px] font-normal text-[#E8EDF2]/80 leading-relaxed">
              Conecta de forma rápida y segura con estudiantes, docentes y personal
              administrativo para recuperar o entregar pertenencias extraviadas.
            </p>
          </div>

          {/* Botones minimalistas en la parte superior derecha */}
          <div className="flex items-center gap-2.5 self-start lg:self-auto">
            {onResetDemoData && (
              <button
                type="button"
                onClick={onResetDemoData}
                title="Restaurar los 4 reportes de ejemplo iniciales"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#E8EDF2]/75 hover:text-[#FFFFFF] hover:bg-white/10 transition-colors focus:outline-none"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#E8EDF2]/70" />
                <span>Restaurar Demo</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenCreateModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#2878B5] hover:bg-[#FFFFFF] text-[#FFFFFF] hover:text-[#202B38] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E8EDF2]/40 active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5 shrink-0" />
              <span>Crear Reporte</span>
            </button>
          </div>
        </div>

        {/* 3 Tarjetas de Métricas Superiores */}
        <StatsBar
          stats={stats}
          activeStatusFilter={activeStatusFilter}
          onQuickStatusFilter={onQuickStatusFilter}
        />
      </div>
    </header>
  );
}
