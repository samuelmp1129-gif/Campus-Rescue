import React from 'react';
import {
  CheckCircle2,
  Clock,
  Search,
  Sparkles,
  Tag,
} from 'lucide-react';

/**
 * Badge para el Tipo de Reporte usando la paleta (#202B38 · #34495E · #2878B5 · #E8EDF2 · #FFFFFF):
 * - 'perdido': #202B38 con borde #34495E y texto #FFFFFF
 * - 'encontrado': #2878B5 con texto #FFFFFF
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
        className={`inline-flex items-center font-bold rounded-full bg-[#202B38] text-[#FFFFFF] border border-[#34495E] shadow-sm ${sizeClasses} ${className}`}
      >
        <Search className="w-3.5 h-3.5 text-[#E8EDF2] shrink-0" />
        Perdido
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center font-bold rounded-full bg-[#2878B5] text-[#FFFFFF] border border-[#E8EDF2]/40 shadow-sm ${sizeClasses} ${className}`}
    >
      <Sparkles className="w-3.5 h-3.5 text-[#FFFFFF] shrink-0" />
      Encontrado
    </span>
  );
}

/**
 * Badge para el Estado del Reporte:
 * - 'activo': #E8EDF2 con texto #202B38 y punto de pulso #2878B5
 * - 'devuelto': #2878B5 / #34495E con icono de Check en #FFFFFF
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
        className={`inline-flex items-center font-bold rounded-full bg-[#2878B5] text-[#FFFFFF] border border-[#FFFFFF]/50 shadow-sm ${sizeClasses} ${className}`}
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-[#FFFFFF] stroke-[2.5] shrink-0" />
        Devuelto
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center font-bold rounded-full bg-[#E8EDF2] text-[#202B38] border border-[#34495E]/30 shadow-sm ${sizeClasses} ${className}`}
    >
      <span className="w-2 h-2 rounded-full bg-[#2878B5] animate-pulse shrink-0" />
      <Clock className="w-3 h-3 text-[#34495E] shrink-0" />
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
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#E8EDF2] text-[#202B38] border border-[#34495E]/20 ${className}`}
    >
      <Tag className="w-3 h-3 text-[#2878B5] shrink-0" />
      {category}
    </span>
  );
}

export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-[#E8EDF2] text-[#202B38] border-[#34495E]/25',
    indigo: 'bg-[#2878B5]/15 text-[#202B38] border-[#2878B5]/40',
    rose: 'bg-[#202B38] text-[#FFFFFF] border-[#34495E]',
    emerald: 'bg-[#2878B5] text-[#FFFFFF] border-[#34495E]',
    amber: 'bg-[#E8EDF2] text-[#202B38] border-[#34495E]/30',
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
