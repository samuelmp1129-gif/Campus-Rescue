import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/layout/Header';
import ReportFilters from './components/reports/ReportFilters';
import ReportGrid from './components/reports/ReportGrid';
import {
  CreateReportModal,
  ReportDetailModal,
} from './components/reports/ReportModal';
import Toast from './components/ui/Toast';
import initialReports from './data/initialData';
import { INITIAL_FILTERS } from './utils/constants';
import {
  filterReports,
  getUniqueLocations,
  calculateStats,
} from './utils/filters';
import { formatDate } from './utils/formatters';
import {
  getReports,
  createReport,
  updateReportStatus,
  updateReportImage,
  resetDemoReports,
} from './services/reportService';

export default function App() {
  const [reports, setReports] = useState(initialReports);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [toast, setToast] = useState(null);

  // Carga inicial asíncrona a través de la capa de servicio desacoplada
  useEffect(() => {
    let isMounted = true;
    getReports()
      .then((data) => {
        if (isMounted && Array.isArray(data)) {
          setReports(data);
        }
      })
      .catch((error) => {
        console.error('Error cargando reportes:', error);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-ocultar notificación Toast después de 4.5 segundos
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Métricas en tiempo real
  const stats = useMemo(() => calculateStats(reports), [reports]);

  // Lista dinámica de ubicaciones disponibles para el filtro Dropdown
  const uniqueLocations = useMemo(() => getUniqueLocations(reports), [reports]);

  // Reportes filtrados según barra de control
  const filteredReports = useMemo(
    () => filterReports(reports, filters),
    [reports, filters]
  );

  // Reporte activo para el Modal de Detalle
  const selectedReport = useMemo(
    () => reports.find((item) => item.id === selectedReportId) || null,
    [reports, selectedReportId]
  );

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const handleQuickStatusFilter = (statusValue) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status === statusValue ? 'todos' : statusValue,
    }));
  };

  const handleCreateReport = async (newReportPayload) => {
    const savedReport = await createReport(newReportPayload);
    setReports((prevReports) => [savedReport, ...prevReports]);
    setToast({
      type: 'success',
      title: '¡Reporte publicado con éxito!',
      message: `"${savedReport.title}" se registró en ${savedReport.location}.`,
    });
  };

  const handleMarkAsReturned = async (reportId) => {
    const targetReport = reports.find((r) => r.id === reportId);
    if (!targetReport || targetReport.status === 'devuelto') return;

    const updated = await updateReportStatus(reportId, 'devuelto');

    setReports((prevReports) =>
      prevReports.map((item) => (item.id === reportId ? updated : item))
    );

    setToast({
      type: 'success',
      title: '¡Confirmado! Objeto marcado como Devuelto',
      message: `"${updated.title}" fue reclamado el ${formatDate(updated.claimedDate)}.`,
      actionLabel: 'Deshacer cambio',
      onAction: async () => {
        const reverted = await updateReportStatus(reportId, 'activo');
        setReports((prevReports) =>
          prevReports.map((item) => (item.id === reportId ? reverted : item))
        );
      },
    });
  };

  const handleUpdateReportImage = async (reportId, newImageUrl) => {
    const updated = await updateReportImage(reportId, newImageUrl);
    if (!updated) return;

    setReports((prevReports) =>
      prevReports.map((item) => (item.id === reportId ? updated : item))
    );

    setToast({
      type: 'success',
      title: 'Fotografía actualizada',
      message: `Se cargó la nueva imagen desde tu dispositivo para "${updated.title}".`,
    });
  };

  const handleResetDemoData = async () => {
    const resetData = await resetDemoReports();
    setReports(resetData);
    setFilters(INITIAL_FILTERS);
    setSelectedReportId(null);
    setToast({
      type: 'info',
      title: 'Datos de demostración restaurados',
      message: 'Se han recargado los 4 reportes iniciales del campus.',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#E8EDF2] text-[#202B38]">
      {/* Encabezado Principal con botones minimalistas arriba a la derecha */}
      <Header
        stats={stats}
        activeStatusFilter={filters.status}
        onQuickStatusFilter={handleQuickStatusFilter}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onResetDemoData={handleResetDemoData}
      />

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Barra de Control (Búsqueda y Filtros) */}
        <ReportFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
          locations={uniqueLocations}
          totalCount={reports.length}
          filteredCount={filteredReports.length}
        />

        {/* Grid de Reportes */}
        <ReportGrid
          reports={filteredReports}
          onSelectReport={(report) => setSelectedReportId(report.id)}
          onMarkAsReturned={handleMarkAsReturned}
          onResetFilters={handleResetFilters}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
        />
      </main>

      {/* Modal de Registro de Nuevo Reporte */}
      <CreateReportModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateReport={handleCreateReport}
      />

      {/* Modal de Detalle Completo del Objeto */}
      <ReportDetailModal
        report={selectedReport}
        isOpen={Boolean(selectedReport)}
        onClose={() => setSelectedReportId(null)}
        onMarkAsReturned={handleMarkAsReturned}
        onUpdateReportImage={handleUpdateReportImage}
      />

      {/* Notificación Flotante (Confirmación visual) */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
