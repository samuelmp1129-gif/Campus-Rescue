import React from 'react';
import { Sparkles, MapPin } from 'lucide-react';
import StatsBar from './StatsBar';

export default function Header({
  stats,
  activeStatusFilter,
  onQuickStatusFilter,
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9ED92]/20 border border-[#B5E48C]/50 text-[#D9ED92] text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D9ED92]" />
              <span>Plataforma Estudiantil de Objetos Perdidos</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Campus <span className="text-[#D9ED92]">Rescue</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#D9ED92]/90 leading-relaxed">
              Objetos Perdidos en el Campus: conecta de forma rápida y segura con estudiantes,
              docentes y personal administrativo para recuperar o entregar pertenencias extraviadas.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-white bg-[#184E77]/80 border border-[#52B69A] px-3.5 py-2.5 rounded-xl self-start lg:self-auto shadow-sm">
            <MapPin className="w-4 h-4 text-[#D9ED92] shrink-0" />
            <span>
              Cobertura activa: <strong className="text-[#B5E48C]">Biblioteca, Laboratorios, Cafetería y Auditorios</strong>
            </span>
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
