import React from 'react';
import { CheckCircle2, Info, X, Undo2 } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type !== 'info';

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 max-w-md w-[calc(100%-2.5rem)] sm:w-auto animate-slide-up"
    >
      <div
        className={`flex items-start gap-3.5 px-4 py-3.5 rounded-2xl shadow-xl border-2 backdrop-blur-md ${
          isSuccess
            ? 'bg-[#184E77]/95 text-white border-[#76C893] shadow-[#184E77]/35'
            : 'bg-[#1E6091]/95 text-white border-[#34A0A4] shadow-[#184E77]/35'
        }`}
      >
        <div
          className={`p-1.5 rounded-xl shrink-0 mt-0.5 ${
            isSuccess
              ? 'bg-[#52B69A]/30 text-[#D9ED92]'
              : 'bg-[#34A0A4]/30 text-[#B5E48C]'
          }`}
        >
          {isSuccess ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <Info className="w-5 h-5" />
          )}
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <p className="text-sm font-bold text-[#D9ED92]">{toast.title}</p>
          {toast.message && (
            <p className="text-xs text-white/90 mt-0.5 leading-relaxed">
              {toast.message}
            </p>
          )}
          {toast.onAction && (
            <button
              type="button"
              onClick={() => {
                toast.onAction();
                onClose();
              }}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#B5E48C] hover:text-[#D9ED92] underline underline-offset-2"
            >
              <Undo2 className="w-3.5 h-3.5" />
              {toast.actionLabel || 'Deshacer'}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar notificación"
          className="text-[#99D98C] hover:text-white p-1 rounded-lg hover:bg-[#1E6091] transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
