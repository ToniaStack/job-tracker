import { X, MapPin, Calendar, Wallet, Link as LinkIcon, FileText, Pencil, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatDate, getInitial } from '../utils/helpers';

export default function ApplicationDetails({ application, onClose, onEdit, onDelete }) {
  if (!application) return null;
  const { company, position, role, location, dateApplied, createdAt, status, salary, jobUrl, notes } = application;
  const jobTitle = position || role || 'Software Role';
  const appliedDate = dateApplied || createdAt;

  return (
    <div
      className="fixed inset-0 z-[85] flex items-end sm:items-center justify-center bg-text-primary/40 animate-overlay-in px-0 sm:px-4"
      onClick={onClose}
    >
      <div
        className="animate-modal-in bg-surface-card w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-xl max-h-[90vh] overflow-y-auto border border-border-main"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-border-main">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-soft-purple-bg text-deep-purple flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-xs">
              <span>{getInitial(company)}</span>
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-text-primary truncate">{company}</h2>
              <p className="text-xs sm:text-sm text-text-secondary truncate mt-0.5">{jobTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary p-1.5 rounded-lg hover:bg-surface-main flex-shrink-0 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 pt-4 pb-1">
          <StatusBadge status={status} />
        </div>

        <div className="px-6 py-4 space-y-4">
          <DetailRow icon={MapPin} label="Location" value={location || '—'} />
          <DetailRow icon={Calendar} label="Date Applied" value={formatDate(appliedDate)} />
          <DetailRow icon={Wallet} label="Salary" value={salary || 'Not specified'} />

          {jobUrl && (
            <div className="flex items-start gap-3">
              <LinkIcon size={16} className="text-text-muted mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-text-muted mb-0.5">Job URL</p>
                <a
                  href={jobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-semibold text-primary-purple hover:text-deep-purple hover:underline"
                >
                  View Job Posting &rarr;
                </a>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <FileText size={16} className="text-text-muted mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-text-muted mb-0.5">Notes</p>
              <p className="text-xs sm:text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
                {notes || 'No notes added.'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-6 py-4 border-t border-border-main">
          <button
            onClick={() => onEdit(application)}
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-text-primary border border-border-main hover:bg-surface-main transition-colors"
          >
            <Pencil size={15} />
            Edit
          </button>
          <button
            onClick={() => onDelete(application)}
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-red-600 border border-red-200 bg-red-50/60 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} className="text-text-muted mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-xs text-text-muted mb-0.5">{label}</p>
        <p className="text-xs sm:text-sm text-text-primary font-medium">{value}</p>
      </div>
    </div>
  );
}