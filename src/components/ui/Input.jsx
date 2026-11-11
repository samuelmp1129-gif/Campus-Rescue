import React from 'react';
import { AlertCircle } from 'lucide-react';

export function Input({
  label,
  id,
  error,
  helperText,
  required = false,
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-bold uppercase tracking-wider text-[#184E77] mb-1.5"
        >
          {label}
          {required && <span className="text-rose-600 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#34A0A4]">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={id}
          aria-invalid={Boolean(error)}
          className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#184E77] placeholder:text-[#1A759F]/55 transition-all focus:outline-none focus:ring-2 ${
            Icon ? 'pl-10' : ''
          } ${
            error
              ? 'border-rose-500 bg-rose-50/40 focus:border-rose-600 focus:ring-rose-500/20'
              : 'border-[#99D98C] hover:border-[#52B69A] focus:border-[#168AAD] focus:ring-[#34A0A4]/25'
          }`}
          {...props}
        />
      </div>
      {error ? (
        <p
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-rose-600"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : (
        helperText && (
          <p className="mt-1 text-xs text-[#1E6091]/80">{helperText}</p>
        )
      )}
    </div>
  );
}

export function Select({
  label,
  id,
  error,
  required = false,
  icon: Icon,
  children,
  className = '',
  ...props
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-bold uppercase tracking-wider text-[#184E77] mb-1.5"
        >
          {label}
          {required && <span className="text-rose-600 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#34A0A4]">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <select
          id={id}
          aria-invalid={Boolean(error)}
          className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#184E77] transition-all focus:outline-none focus:ring-2 ${
            Icon ? 'pl-10' : ''
          } ${
            error
              ? 'border-rose-500 bg-rose-50/40 focus:border-rose-600 focus:ring-rose-500/20'
              : 'border-[#99D98C] hover:border-[#52B69A] focus:border-[#168AAD] focus:ring-[#34A0A4]/25'
          }`}
          {...props}
        >
          {children}
        </select>
      </div>
      {error && (
        <p
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-rose-600"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export function Textarea({
  label,
  id,
  error,
  helperText,
  required = false,
  rows = 3,
  className = '',
  ...props
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-bold uppercase tracking-wider text-[#184E77] mb-1.5"
        >
          {label}
          {required && <span className="text-rose-600 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#184E77] placeholder:text-[#1A759F]/55 transition-all focus:outline-none focus:ring-2 ${
          error
            ? 'border-rose-500 bg-rose-50/40 focus:border-rose-600 focus:ring-rose-500/20'
            : 'border-[#99D98C] hover:border-[#52B69A] focus:border-[#168AAD] focus:ring-[#34A0A4]/25'
        }`}
        {...props}
      />
      {error ? (
        <p
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-rose-600"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : (
        helperText && (
          <p className="mt-1 text-xs text-[#1E6091]/80">{helperText}</p>
        )
      )}
    </div>
  );
}

export default Input;
