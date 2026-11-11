import React from 'react';
import { Plus, RotateCcw } from 'lucide-react';

/**
 * Barra de control inferior sutil y minimalista (pie de página)
 * con las acciones "Restaurar Demo" y "Crear Reporte".
 */
export default function Navbar({ onOpenCreateModal, onResetDemoData }) {
  return (
    <footer className="mt-12 border-t border-[#99D98C]/50 bg-white/70 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500 text-center sm:text-left">
          <span className="font-semibold text-[#184E77]">Campus Rescue</span> —
          Objetos Perdidos en el Campus · Haz clic en cualquier tarjeta para ver el detalle.
        </div>

        {/* Acciones minimalistas en la parte inferior */}
        <div className="flex items-center gap-3">
          {onResetDemoData && (
            <button
              type="button"
              onClick={onResetDemoData}
              title="Restaurar los 4 reportes de ejemplo iniciales"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-[#184E77] hover:bg-slate-100/80 transition-colors focus:outline-none"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Restaurar Demo</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenCreateModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#1A759F] hover:bg-[#184E77] text-[#D9ED92] hover:text-white shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#34A0A4]/40 active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5 shrink-0" />
            <span>Crear Reporte</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
