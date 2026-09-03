import { MapPin, Calendar } from 'lucide-react';
import { getInitial, formatDate } from '../utils/helpers';

export default function KanbanCard({ application, onDragStart, onDragEnd, onClick, isDragging }) {
  const jobTitle = application.position || application.role || '—';
  const appliedDate = application.dateApplied || application.createdAt;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, application)}
      onDragEnd={onDragEnd}
      onClick={() => onClick(application)}
      className={`bg-surface-card rounded-xl border border-border-main p-3.5 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-light-purple/60 transition-all ${
        isDragging ? 'opacity-40 scale-95' : 'opacity-100'
      }`}
    >
      <div className="flex items-center gap-2.5 mb-2.5">
        <div className="w-8 h-8 rounded-lg bg-soft-purple-bg text-deep-purple flex items-center justify-center flex-shrink-0 font-bold text-xs">
          {getInitial(application.company)}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-text-primary text-sm truncate">{application.company}</p>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-text-secondary mb-2.5 truncate font-medium">{jobTitle}</p>

      <div className="flex items-center justify-between text-xs text-text-muted pt-1 border-t border-border-main/50">
        <span className="flex items-center gap-1 truncate max-w-[60%]">
          <MapPin size={11} className="flex-shrink-0" />
          <span className="truncate">{application.location || '—'}</span>
        </span>
        <span className="flex items-center gap-1 flex-shrink-0">
          <Calendar size={11} />
          {formatDate(appliedDate)}
        </span>
      </div>
    </div>
  );
}