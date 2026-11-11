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
      <div className="bg-[#FFFFFF] rounded-2xl border border-dashed border-[#34495E]/25 p-10 sm:p-14 text-center max-w-2xl mx-auto my-4 shadow-sm animate-fade-in">
        <div className="w-14 h-14 rounded-2xl bg-[#E8EDF2] border border-[#34495E]/10 text-[#202B38] flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-7 h-7 text-[#2878B5] stroke-[1.75]" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-[#202B38]">
          No se encontraron objetos con los filtros seleccionados
        </h3>
        <p className="mt-2 text-sm font-normal text-[#34495E]/80 max-w-md mx-auto leading-relaxed">
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
              Crear reporte
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
