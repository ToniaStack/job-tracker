import { MapPin } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatDate, getInitial } from '../utils/helpers';

export default function ApplicationCard({ application, onClick }) {
  const { company, position, role, dateApplied, createdAt, status, location } = application;
  const jobTitle = position || role || 'Software Role';
  const displayDate = dateApplied || createdAt;

  return (
    <button
      onClick={() => onClick(application)}
      className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl hover:bg-surface-secondary/70 transition-all text-left group"
    >
      <div className="w-10 h-10 rounded-xl bg-soft-purple-bg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
        <span className="text-deep-purple font-bold text-sm">{getInitial(company)}</span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-semibold text-text-primary text-sm truncate">{company}</p>
        <p className="text-sm text-text-secondary truncate">{jobTitle}</p>
        <div className="flex items-center gap-1 text-xs text-text-muted mt-0.5 sm:hidden">
          <MapPin size={11} />
          {location || '—'}
        </div>
      </div>

      <div className="hidden sm:block text-xs text-text-muted flex-shrink-0 w-24">
        {formatDate(displayDate)}
      </div>

      <div className="flex-shrink-0">
        <StatusBadge status={status} />
      </div>
    </button>
  );
}