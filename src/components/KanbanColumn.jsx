import KanbanCard from './KanbanCard';
import EmptyState from './EmptyState';
import { STATUS_BAR_COLORS } from '../utils/helpers';
import { Inbox } from 'lucide-react';

export default function KanbanColumn({
  status,
  applications,
  onDragStart,
  onDragEnd,
  onDrop,
  onCardClick,
  draggedId,
  isDragOver,
  onDragEnter,
  onDragLeave,
}) {
  const color = STATUS_BAR_COLORS[status] || '#6B51ED';

  return (
    <div
      className={`flex flex-col bg-surface-secondary/40 border border-border-main rounded-2xl w-72 sm:w-80 flex-shrink-0 transition-all ${
        isDragOver ? 'bg-soft-purple-bg/60 ring-2 ring-primary-purple/40 border-primary-purple' : ''
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => onDragEnter(status)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, status)}
    >
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-border-main/60">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-xs" style={{ backgroundColor: color }} />
          <h3 className="text-sm font-bold text-text-primary">{status}</h3>
        </div>
        <span className="text-xs font-semibold text-text-secondary bg-surface-card px-2.5 py-0.5 rounded-full border border-border-main shadow-xs">
          {applications.length}
        </span>
      </div>

      <div className="flex-1 px-3 py-3 space-y-2.5 min-h-[140px] max-h-[calc(100vh-250px)] overflow-y-auto">
        {applications.length === 0 ? (
          <div className="border border-dashed border-border-main rounded-xl p-3 bg-surface-card/40">
            <EmptyState icon={Inbox} title="No applications here" compact />
          </div>
        ) : (
          applications.map((app) => (
            <KanbanCard
              key={app._id}
              application={app}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onClick={onCardClick}
              isDragging={draggedId === app._id}
            />
          ))
        )}
      </div>
    </div>
  );
}