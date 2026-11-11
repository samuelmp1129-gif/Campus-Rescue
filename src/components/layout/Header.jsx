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
    <header className="relative overflow-hidden bg-gradient-to-br from-[#202B38] via-[#34495E] to-[#202B38] text-[#FFFFFF] border-b-4 border-[#2878B5]">
      {/* Elementos decorativos de fondo */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#2878B5]/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#2878B5]/15 blur-3xl"
        aria-hidden="true"
      />

      {/* Franja superior con los 5 colores exactos de la paleta */}
      <div className="h-1.5 w-full grid grid-cols-5">
        <div className="bg-[#202B38]" />
        <div className="bg-[#34495E]" />
        <div className="bg-[#2878B5]" />
        <div className="bg-[#E8EDF2]" />
        <div className="bg-[#FFFFFF]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 sm:pt-10 sm:pb-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#FFFFFF]">
              Campus <span className="text-[#2878B5]">Rescue</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#E8EDF2] leading-relaxed">
              Objetos Perdidos en el Campus: conecta de forma rápida y segura con estudiantes,
              docentes y personal administrativo para recuperar o entregar pertenencias extraviadas.
            </p>
          </div>

          {/* Botones minimalistas en la parte superior derecha */}
          <div className="flex items-center gap-3 self-start lg:self-auto">
            {onResetDemoData && (
              <button
                type="button"
                onClick={onResetDemoData}
                title="Restaurar los 4 reportes de ejemplo iniciales"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#E8EDF2]/80 hover:text-[#FFFFFF] hover:bg-[#34495E]/70 transition-colors focus:outline-none"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#E8EDF2]/70" />
                <span>Restaurar Demo</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenCreateModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#2878B5] hover:bg-[#FFFFFF] text-[#FFFFFF] hover:text-[#202B38] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E8EDF2]/50 active:scale-[0.98]"
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
