import React from 'react';
import {
  Search,
  Tag,
  MapPin,
  Filter,
  Plus,
  RotateCcw,
  X,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { CATEGORIES } from '../../utils/constants';
import Button from '../ui/Button';

export default function ReportFilters({
  filters,
  onFilterChange,
  onResetFilters,
  onOpenCreateModal,
  locations = [],
  totalCount = 0,
  filteredCount = 0,
}) {
  const hasActiveFilters =
    filters.search.trim() !== '' ||
    filters.category !== 'Todas' ||
    filters.location !== 'Todas' ||
    filters.type !== 'todos' ||
    filters.status !== 'todos';

  const typeOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'perdido', label: 'Perdidos', dot: 'bg-[#184E77]' },
    { value: 'encontrado', label: 'Encontrados', dot: 'bg-[#168AAD]' },
  ];

  const statusOptions = [
    { value: 'todos', label: 'Todos', icon: null },
    { value: 'activo', label: 'Solo Activos', icon: Clock },
    { value: 'devuelto', label: 'Solo Devueltos', icon: CheckCircle2 },
  ];

  return (
    <section
      aria-label="Barra de búsqueda y filtros"
      className="bg-white rounded-2xl shadow-md shadow-[#184E77]/5 border-2 border-[#99D98C]/70 p-4 sm:p-6 mb-8"
    >
      {/* Fila superior: Búsqueda + Dropdowns + Botón Crear Reporte */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3.5 items-end">
        {/* Input de búsqueda libre */}
        <div className="lg:col-span-5">
          <label
            htmlFor="filter-search"
            className="block text-xs font-bold uppercase tracking-wider text-[#184E77] mb-1.5"
          >
            Buscar objeto
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-[#168AAD] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="filter-search"
              type="text"
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              placeholder="Buscar por nombre, ubicación o descripción (ej: mochila, biblioteca)..."
              className="w-full rounded-xl border border-[#99D98C] bg-[#D9ED92]/15 focus:bg-white pl-10 pr-9 py-2.5 text-sm text-[#184E77] placeholder:text-[#1A759F]/60 transition-all focus:outline-none focus:border-[#168AAD] focus:ring-2 focus:ring-[#34A0A4]/25"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => onFilterChange('search', '')}
                aria-label="Limpiar búsqueda"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-[#1A759F] hover:text-[#184E77] hover:bg-[#D9ED92]/50"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filtro Dropdown por Categoría */}
        <div className="lg:col-span-2">
          <label
            htmlFor="filter-category"
            className="block text-xs font-bold uppercase tracking-wider text-[#184E77] mb-1.5"
          >
            Categoría
          </label>
          <div className="relative">
            <Tag className="w-4 h-4 text-[#168AAD] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              id="filter-category"
              value={filters.category}
              onChange={(e) => onFilterChange('category', e.target.value)}
              className="w-full rounded-xl border border-[#99D98C] bg-[#D9ED92]/15 focus:bg-white pl-9 pr-3 py-2.5 text-sm text-[#184E77] font-medium transition-all focus:outline-none focus:border-[#168AAD] focus:ring-2 focus:ring-[#34A0A4]/25"
            >
              <option value="Todas">Todas las categorías</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filtro Dropdown por Ubicación */}
        <div className="lg:col-span-3">
          <label
            htmlFor="filter-location"
            className="block text-xs font-bold uppercase tracking-wider text-[#184E77] mb-1.5"
          >
            Ubicación en el Campus
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-[#168AAD] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              id="filter-location"
              value={filters.location}
              onChange={(e) => onFilterChange('location', e.target.value)}
              className="w-full rounded-xl border border-[#99D98C] bg-[#D9ED92]/15 focus:bg-white pl-9 pr-3 py-2.5 text-sm text-[#184E77] font-medium transition-all focus:outline-none focus:border-[#168AAD] focus:ring-2 focus:ring-[#34A0A4]/25"
            >
              <option value="Todas">Todas las ubicaciones</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botón destacado + Crear Reporte */}
        <div className="lg:col-span-2">
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={onOpenCreateModal}
            className="w-full py-2.5"
          >
            <span>+ Crear Reporte</span>
          </Button>
        </div>
      </div>

      {/* Fila inferior: Segmentos de Tipo, Estado y Contador de resultados */}
      <div className="mt-4 pt-4 border-t border-[#99D98C]/40 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Filtro por Tipo: Todos | Perdidos | Encontrados */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E6091] flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#34A0A4]" />
              Tipo:
            </span>
            <div
              className="inline-flex rounded-xl bg-[#D9ED92]/35 p-1 border border-[#99D98C]/80"
              role="group"
              aria-label="Filtrar por tipo de reporte"
            >
              {typeOptions.map((option) => {
                const active = filters.type === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onFilterChange('type', option.value)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      active
                        ? 'bg-[#184E77] text-[#D9ED92] shadow-sm'
                        : 'text-[#184E77] hover:bg-[#B5E48C]/40'
                    }`}
                  >
                    {option.dot && (
                      <span
                        className={`w-2 h-2 rounded-full ${
                          active ? 'bg-[#D9ED92]' : option.dot
                        }`}
                      />
                    )}
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filtro por Estado: Todos | Solo Activos | Solo Devueltos */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E6091]">
              Estado:
            </span>
            <div
              className="inline-flex rounded-xl bg-[#D9ED92]/35 p-1 border border-[#99D98C]/80"
              role="group"
              aria-label="Filtrar por estado del reporte"
            >
              {statusOptions.map((option) => {
                const active = filters.status === option.value;
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onFilterChange('status', option.value)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      active
                        ? option.value === 'devuelto'
                          ? 'bg-[#52B69A] text-white shadow-sm'
                          : 'bg-[#1A759F] text-white shadow-sm'
                        : 'text-[#184E77] hover:bg-[#B5E48C]/40'
                    }`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Resumen de resultados y limpiar filtros */}
        <div className="flex items-center justify-between lg:justify-end gap-3 text-xs text-[#1E6091]">
          <span>
            Mostrando <strong className="text-[#184E77]">{filteredCount}</strong> de{' '}
            <strong className="text-[#184E77]">{totalCount}</strong> reportes
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-bold text-[#184E77] bg-[#D9ED92] hover:bg-[#B5E48C] border border-[#99D98C] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#1A759F]" />
              Limpiar filtros
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
