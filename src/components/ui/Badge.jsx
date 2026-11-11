import React from 'react';
import {
  CheckCircle2,
  Clock,
  Search,
  Sparkles,
  Tag,
} from 'lucide-react';

/**
 * Badge para el Tipo de Reporte usando la paleta Coolors:
 * - 'perdido': #184E77 (Navy profundo) con acento #D9ED92 (Lima suave)
 * - 'encontrado': #168AAD / #34A0A4 (Azul Bondi / Turquesa) con texto blanco
 */
export function TypeBadge({ type, size = 'md', className = '' }) {
  const isLost = type === 'perdido';

  const sizeClasses =
    size === 'sm'
      ? 'px-2.5 py-0.5 text-xs gap-1'
      : 'px-3 py-1 text-xs gap-1.5';

  if (isLost) {
    return (
      <span
        className={`inline-flex items-center font-bold rounded-full bg-[#184E77] text-[#D9ED92] border border-[#1E6091] shadow-sm ${sizeClasses} ${className}`}
      >
        <Search className="w-3.5 h-3.5 text-[#D9ED92] shrink-0" />
        Perdido
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center font-bold rounded-full bg-[#168AAD] text-white border border-[#34A0A4] shadow-sm ${sizeClasses} ${className}`}
    >
      <Sparkles className="w-3.5 h-3.5 text-[#D9ED92] shrink-0" />
      Encontrado
    </span>
  );
}

/**
 * Badge para el Estado del Reporte usando la paleta Coolors:
 * - 'activo': #D9ED92 / #B5E48C con texto #184E77
 * - 'devuelto': #52B69A / #76C893 (Verde brillante) con icono de Check
 */
export function StatusBadge({ status, size = 'md', className = '' }) {
  const isReturned = status === 'devuelto';

  const sizeClasses =
    size === 'sm'
      ? 'px-2.5 py-0.5 text-xs gap-1'
      : 'px-3 py-1 text-xs gap-1.5';

  if (isReturned) {
    return (
      <span
        className={`inline-flex items-center font-bold rounded-full bg-[#52B69A] text-white border border-[#76C893] shadow-sm shadow-[#52B69A]/30 ${sizeClasses} ${className}`}
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-[#D9ED92] stroke-[2.5] shrink-0" />
        Devuelto
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center font-bold rounded-full bg-[#D9ED92] text-[#184E77] border border-[#B5E48C] shadow-sm ${sizeClasses} ${className}`}
    >
      <span className="w-2 h-2 rounded-full bg-[#168AAD] animate-pulse shrink-0" />
      <Clock className="w-3 h-3 text-[#184E77] shrink-0" />
      Activo
    </span>
  );
}

/**
 * Badge para mostrar la Categoría del objeto
 */
export function CategoryBadge({ category, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#D9ED92]/55 text-[#184E77] border border-[#99D98C] ${className}`}
    >
      <Tag className="w-3 h-3 text-[#1A759F] shrink-0" />
      {category}
    </span>
  );
}

export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-[#D9ED92]/40 text-[#184E77] border-[#99D98C]',
    indigo: 'bg-[#168AAD]/15 text-[#184E77] border-[#34A0A4]',
    rose: 'bg-[#184E77] text-[#D9ED92] border-[#1E6091]',
    emerald: 'bg-[#52B69A] text-white border-[#76C893]',
    amber: 'bg-[#D9ED92] text-[#184E77] border-[#B5E48C]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
        variants[variant] || variants.default
      } ${className}`}
    >
      {children}
    </span>
  );
}
