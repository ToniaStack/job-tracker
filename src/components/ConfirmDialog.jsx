import { TriangleAlert } from 'lucide-react';

export default function ConfirmDialog({ isOpen, onCancel, onConfirm, title, description }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-text-primary/40 animate-overlay-in px-4"
      onClick={onCancel}
    >
      <div
        className="animate-modal-in bg-surface-card w-full max-w-sm rounded-2xl shadow-xl p-6 border border-border-main"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
          <TriangleAlert size={20} strokeWidth={2.25} />
        </div>
        <h3 className="text-base font-bold text-text-primary mb-1.5">{title}</h3>
        <p className="text-xs sm:text-sm text-text-secondary mb-6 leading-relaxed">{description}</p>
        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-text-secondary hover:bg-surface-main transition-colors border border-border-main"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-xs"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}