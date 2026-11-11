import React from 'react';
import { Plus, RotateCcw, ShieldCheck } from 'lucide-react';
import campusLogo from '../../assets/campusLogo.svg';
import Button from '../ui/Button';

export default function Navbar({ onOpenCreateModal, onResetDemoData }) {
  return (
    <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b-2 border-[#99D98C]/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Identidad de Marca */}
        <div className="flex items-center gap-3">
          <img
            src={campusLogo}
            alt="Logo Campus Rescue"
            className="w-10 h-10 rounded-xl shadow-sm shadow-[#184E77]/20"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight text-[#184E77]">
                Campus <span className="text-[#168AAD]">Rescue</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#D9ED92] text-[#184E77] border border-[#99D98C]">
                <ShieldCheck className="w-3 h-3 text-[#1A759F]" />
                Comunidad Universitaria
              </span>
            </div>
            <p className="text-xs text-[#1E6091] hidden sm:block font-medium">
              Centro de Objetos Perdidos y Encontrados en el Campus
            </p>
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="flex items-center gap-2.5">
          {onResetDemoData && (
            <button
              type="button"
              onClick={onResetDemoData}
              title="Restaurar los 4 reportes de ejemplo iniciales"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#184E77] hover:bg-[#D9ED92]/50 border border-[#99D98C]/70 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#168AAD]" />
              <span className="hidden sm:inline">Restaurar Demo</span>
            </button>
          )}

          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={onOpenCreateModal}
          >
            <span>+ Crear Reporte</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
