import { CheckCircle2, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2.5 max-w-[calc(100vw-2.5rem)]">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-toast-in flex items-center gap-3 bg-text-primary text-white text-xs sm:text-sm font-medium pl-3.5 pr-2.5 py-3 rounded-2xl shadow-xl border border-white/10 min-w-[280px] max-w-md"
        >
          <CheckCircle2 size={18} className="text-accent-green flex-shrink-0" strokeWidth={2.2} />
          <span className="flex-1 leading-snug">{toast.message}</span>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-white/50 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}