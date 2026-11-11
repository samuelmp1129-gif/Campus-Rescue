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
    <header className="relative overflow-hidden bg-gradient-to-br from-[#184E77] via-[#1E6091] to-[#168AAD] text-white border-b-4 border-[#52B69A]">
      {/* Elementos decorativos de fondo con los verdes de la paleta */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#D9ED92]/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#52B69A]/30 blur-3xl"
        aria-hidden="true"
      />

      {/* Franja superior con los 10 colores exactos de la paleta */}
      <div className="h-1.5 w-full grid grid-cols-10">
        <div className="bg-[#D9ED92]" />
        <div className="bg-[#B5E48C]" />
        <div className="bg-[#99D98C]" />
        <div className="bg-[#76C893]" />
        <div className="bg-[#52B69A]" />
        <div className="bg-[#34A0A4]" />
        <div className="bg-[#168AAD]" />
        <div className="bg-[#1A759F]" />
        <div className="bg-[#1E6091]" />
        <div className="bg-[#184E77]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 sm:pt-10 sm:pb-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Campus <span className="text-[#D9ED92]">Rescue</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#D9ED92]/90 leading-relaxed">
              Objetos Perdidos en el Campus: conecta de forma rápida y segura con estudiantes,
              docentes y personal administrativo para recuperar o entregar pertenencias extraviadas.
            </p>
          </div>

          {/* Botones minimalistas en el lugar donde estaba Cobertura */}
          <div className="flex items-center gap-3 self-start lg:self-auto">
            {onResetDemoData && (
              <button
                type="button"
                onClick={onResetDemoData}
                title="Restaurar los 4 reportes de ejemplo iniciales"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#D9ED92]/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#B5E48C]" />
                <span>Restaurar Demo</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenCreateModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#52B69A] hover:bg-[#76C893] text-white hover:text-[#184E77] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D9ED92]/50 active:scale-[0.98]"
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
