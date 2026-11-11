import React from 'react';
import {
  CheckCircle2,
  Clock,
  Search,
  Sparkles,
  Tag,
} from 'lucide-react';

export function TypeBadge({ type, size = 'md', className = '' }) {
  const isLost = type === 'perdido';

  const sizeClasses =
    size === 'sm'
      ? 'px-2.5 py-0.5 text-[11px] gap-1'
      : 'px-3 py-1 text-xs gap-1.5';

  if (isLost) {
    return (
      <span
        className={`inline-flex items-center font-medium tracking-wide rounded-full bg-[#202B38]/90 text-[#FFFFFF] border border-[#34495E]/80 shadow-sm ${sizeClasses} ${className}`}
      >
        <Search className="w-3 h-3 text-[#E8EDF2]/90 shrink-0" />
        Perdido
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center font-medium tracking-wide rounded-full bg-[#2878B5] text-[#FFFFFF] border border-[#E8EDF2]/30 shadow-sm ${sizeClasses} ${className}`}
    >
      <Sparkles className="w-3 h-3 text-[#FFFFFF] shrink-0" />
      Encontrado
    </span>
  );
}

export function StatusBadge({ status, size = 'md', className = '' }) {
  const isReturned = status === 'devuelto';

  const sizeClasses =
    size === 'sm'
      ? 'px-2.5 py-0.5 text-[11px] gap-1'
      : 'px-3 py-1 text-xs gap-1.5';

  if (isReturned) {
    return (
      <span
        className={`inline-flex items-center font-medium tracking-wide rounded-full bg-[#2878B5] text-[#FFFFFF] border border-[#FFFFFF]/35 shadow-sm ${sizeClasses} ${className}`}
      >
        <CheckCircle2 className="w-3 h-3 text-[#FFFFFF] stroke-[2] shrink-0" />
        Devuelto
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center font-medium tracking-wide rounded-full bg-[#E8EDF2]/95 text-[#202B38] border border-[#34495E]/20 shadow-sm ${sizeClasses} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#2878B5] animate-pulse shrink-0" />
      <Clock className="w-3 h-3 text-[#34495E] shrink-0" />
      Activo
    </span>
  );
}

export function CategoryBadge({ category, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#E8EDF2] text-[#34495E] border border-[#34495E]/15 ${className}`}
    >
      <Tag className="w-3 h-3 text-[#2878B5] shrink-0" />
      {category}
    </span>
  );
}

export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-[#E8EDF2] text-[#202B38] border-[#34495E]/20',
    indigo: 'bg-[#2878B5]/15 text-[#202B38] border-[#2878B5]/30',
    rose: 'bg-[#202B38] text-[#FFFFFF] border-[#34495E]',
    emerald: 'bg-[#2878B5] text-[#FFFFFF] border-[#34495E]',
    amber: 'bg-[#E8EDF2] text-[#202B38] border-[#34495E]/25',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        variants[variant] || variants.default
      } ${className}`}
    >
      {children}
    </span>
  );
}
