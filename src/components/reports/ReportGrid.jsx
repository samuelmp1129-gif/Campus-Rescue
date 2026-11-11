import React from 'react';
import { SearchX, RotateCcw, Plus } from 'lucide-react';
import ReportCard from './ReportCard';
import Button from '../ui/Button';

export default function ReportGrid({
  reports = [],
  onSelectReport,
  onMarkAsReturned,
  onResetFilters,
  onOpenCreateModal,
}) {
  if (reports.length === 0) {
    return (
      <div className="bg-white rounded-2xl border-2 border-dashed border-[#76C893] p-10 sm:p-14 text-center max-w-2xl mx-auto my-4 shadow-sm animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-[#D9ED92]/60 border border-[#99D98C] text-[#184E77] flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-8 h-8 text-[#168AAD]" />
        </div>
        <h3 className="text-lg sm:text-xl font-extrabold text-[#184E77]">
          No se encontraron objetos con los filtros seleccionados
        </h3>
        <p className="mt-2 text-sm text-[#1E6091] max-w-md mx-auto leading-relaxed">
          Intenta ajustar los términos de búsqueda, cambiar la categoría o ubicación,
          o registra un nuevo reporte si extraviaste o encontraste una pertenencia.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {onResetFilters && (
            <Button
              variant="outline"
              size="md"
              icon={RotateCcw}
              onClick={onResetFilters}
            >
              Restablecer filtros
            </Button>
          )}
          {onOpenCreateModal && (
            <Button
              variant="primary"
              size="md"
              icon={Plus}
              onClick={onOpenCreateModal}
            >
              + Crear Reporte
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      aria-label="Listado de objetos reportados"
    >
      {reports.map((report) => (
        <ReportCard
          key={report.id}
          report={report}
          onSelectReport={onSelectReport}
          onMarkAsReturned={onMarkAsReturned}
        />
      ))}
    </div>
  );
}
