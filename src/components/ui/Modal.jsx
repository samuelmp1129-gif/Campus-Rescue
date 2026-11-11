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
        className="fixed inset-0 bg-[#184E77]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className={`relative w-full ${maxWidth} rounded-2xl bg-white shadow-2xl border-2 border-[#76C893] overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col animate-slide-up`}
      >
        {title && (
          <div className="flex items-start justify-between gap-4 px-6 py-4 bg-gradient-to-r from-[#184E77] via-[#1E6091] to-[#1A759F] border-b border-[#34A0A4]/40 shrink-0 text-white">
            <div>
              <h2
                id="modal-title"
                className="text-lg sm:text-xl font-extrabold text-[#D9ED92]"
              >
                {title}
              </h2>
              {subtitle && (
                <p className="text-xs sm:text-sm text-[#B5E48C] mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar ventana"
              className="rounded-xl p-2 text-[#D9ED92] hover:text-white hover:bg-[#168AAD]/50 transition-colors"
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
