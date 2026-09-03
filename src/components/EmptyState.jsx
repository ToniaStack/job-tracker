import { Inbox } from 'lucide-react';

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  description = '',
  actionLabel,
  onAction,
  compact = false,
}) {
  if (compact) {
    return (
      <div className="flex flex-col items-center justify-center py-7 px-4 text-center">
        <Icon size={22} className="text-text-muted mb-1.5" strokeWidth={1.75} />
        <p className="text-xs sm:text-sm text-text-secondary font-medium">{title}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-soft-purple-bg text-deep-purple flex items-center justify-center mb-4 shadow-xs">
        <Icon size={26} strokeWidth={2} />
      </div>
      <h3 className="text-base font-bold text-text-primary mb-1">{title}</h3>
      {description && (
        <p className="text-xs sm:text-sm text-text-secondary max-w-sm mb-6 leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="flex items-center gap-1.5 bg-primary-purple hover:bg-deep-purple text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm shadow-primary-purple/30 active:scale-[0.98]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}