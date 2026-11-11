import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-2xl',
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#202B38]/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className={`relative w-full ${maxWidth} rounded-2xl bg-[#FFFFFF] shadow-2xl border border-[#34495E]/30 overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col animate-slide-up`}
      >
        {title && (
          <div className="flex items-start justify-between gap-4 px-6 py-4 bg-gradient-to-r from-[#202B38] to-[#34495E] border-b border-[#2878B5]/40 shrink-0 text-[#FFFFFF]">
            <div>
              <h2
                id="modal-title"
                className="text-lg sm:text-xl font-extrabold text-[#FFFFFF]"
              >
                {title}
              </h2>
              {subtitle && (
                <p className="text-xs sm:text-sm text-[#E8EDF2] mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar ventana"
              className="rounded-xl p-2 text-[#E8EDF2] hover:text-[#FFFFFF] hover:bg-[#2878B5]/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}
