import React from 'react';
import { Plus, RotateCcw } from 'lucide-react';

export default function Navbar({ onOpenCreateModal, onResetDemoData }) {
  return (
    <footer className="mt-12 border-t border-[#34495E]/20 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-[#34495E] text-center sm:text-left">
          <span className="font-semibold text-[#202B38]">Campus Rescue</span> —
          Objetos Perdidos en el Campus
        </div>

        <div className="flex items-center gap-3">
          {onResetDemoData && (
            <button
              type="button"
              onClick={onResetDemoData}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#34495E] hover:text-[#202B38] hover:bg-[#E8EDF2] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Demo</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenCreateModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#2878B5] hover:bg-[#202B38] text-[#FFFFFF] shadow-sm transition-all duration-200"
          >
            <Plus className="w-3.5 h-3.5 shrink-0" />
            <span>Crear Reporte</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
