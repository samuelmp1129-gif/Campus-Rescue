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
        className={`flex items-start gap-3.5 px-4 py-3.5 rounded-2xl shadow-xl border backdrop-blur-md ${
          isSuccess
            ? 'bg-[#202B38]/95 text-[#FFFFFF] border-[#2878B5] shadow-[#202B38]/35'
            : 'bg-[#34495E]/95 text-[#FFFFFF] border-[#E8EDF2]/30 shadow-[#202B38]/35'
        }`}
      >
        <div
          className={`p-1.5 rounded-xl shrink-0 mt-0.5 ${
            isSuccess
              ? 'bg-[#2878B5] text-[#FFFFFF]'
              : 'bg-[#202B38] text-[#E8EDF2]'
          }`}
        >
          {isSuccess ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <Info className="w-5 h-5" />
          )}
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <p className="text-sm font-bold text-[#FFFFFF]">{toast.title}</p>
          {toast.message && (
            <p className="text-xs text-[#E8EDF2] mt-0.5 leading-relaxed">
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
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#E8EDF2] hover:text-[#FFFFFF] underline underline-offset-2"
            >
              <Undo2 className="w-3.5 h-3.5 text-[#2878B5]" />
              {toast.actionLabel || 'Deshacer'}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar notificación"
          className="text-[#E8EDF2]/70 hover:text-[#FFFFFF] p-1 rounded-lg hover:bg-[#34495E] transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
