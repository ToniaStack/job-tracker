import { STATUS_STYLES } from '../utils/helpers';

// Fallback style definitions using the Purple & Green palette
const DEFAULT_PALETTE = {
  applied: {
    bg: 'bg-soft-purple-bg',
    text: 'text-deep-purple',
    dot: 'bg-primary-purple',
  },
  interview: {
    bg: 'bg-light-green-bg',
    text: 'text-accent-green',
    dot: 'bg-accent-green',
  },
  assessment: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
  },
  offer: {
    bg: 'bg-light-green-bg',
    text: 'text-accent-green',
    dot: 'bg-accent-green',
  },
  rejected: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    dot: 'bg-red-500',
  },
};

export default function StatusBadge({ status }) {
  const normalizedKey = (status || 'applied').toLowerCase();
  const style =
    STATUS_STYLES?.[status] ||
    STATUS_STYLES?.[normalizedKey] ||
    DEFAULT_PALETTE[normalizedKey] ||
    DEFAULT_PALETTE.applied;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize transition-colors ${style.bg} ${style.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {status || 'Applied'}
    </span>
  );
}