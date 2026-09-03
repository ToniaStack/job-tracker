import { MapPin, Pencil, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatDate, getInitial } from '../utils/helpers';

export default function ApplicationTable({ applications, onView, onEdit, onDelete }) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block bg-surface-card rounded-2xl border border-border-main overflow-hidden shadow-xs">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-main text-text-secondary text-xs uppercase tracking-wide border-b border-border-main">
              <th className="text-left font-semibold px-5 py-3.5">Company</th>
              <th className="text-left font-semibold px-5 py-3.5">Role</th>
              <th className="text-left font-semibold px-5 py-3.5">Location</th>
              <th className="text-left font-semibold px-5 py-3.5">Date</th>
              <th className="text-left font-semibold px-5 py-3.5">Status</th>
              <th className="text-right font-semibold px-5 py-3.5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-main">
            {applications.map((app) => {
              const jobRole = app.position || app.role || '—';
              const appliedDate = app.dateApplied || app.createdAt;

              return (
                <tr
                  key={app._id}
                  className="hover:bg-surface-main/60 transition-colors cursor-pointer group"
                  onClick={() => onView(app)}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-soft-purple-bg text-deep-purple flex items-center justify-center font-bold text-xs flex-shrink-0 group-hover:scale-105 transition-transform">
                        {getInitial(app.company)}
                      </div>
                      <span className="font-semibold text-text-primary">{app.company}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-text-secondary">{jobRole}</td>
                  <td className="px-5 py-3.5 text-text-secondary">{app.location || '—'}</td>
                  <td className="px-5 py-3.5 text-text-secondary whitespace-nowrap">
                    {formatDate(appliedDate)}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <div
                      className="flex items-center justify-end gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => onEdit(app)}
                        className="p-1.5 rounded-lg text-text-muted hover:text-primary-purple hover:bg-soft-purple-bg transition-colors"
                        title="Edit application"
                        aria-label={`Edit ${app.company} application`}
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => onDelete(app)}
                        className="p-1.5 rounded-lg text-text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete application"
                        aria-label={`Delete ${app.company} application`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile view cards */}
      <div className="md:hidden space-y-3">
        {applications.map((app) => {
          const jobRole = app.position || app.role || '—';
          const appliedDate = app.dateApplied || app.createdAt;

          return (
            <div
              key={app._id}
              onClick={() => onView(app)}
              className="bg-surface-card rounded-2xl border border-border-main p-4 active:bg-surface-main transition-colors shadow-xs"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-soft-purple-bg text-deep-purple flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {getInitial(app.company)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-text-primary text-sm truncate">{app.company}</p>
                    <p className="text-xs text-text-secondary truncate mt-0.5">{jobRole}</p>
                  </div>
                </div>
                <StatusBadge status={app.status} />
              </div>

              <div className="flex items-center justify-between text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  {app.location || '—'}
                </span>
                <span>{formatDate(appliedDate)}</span>
              </div>

              <div
                className="flex items-center gap-2 mt-3 pt-3 border-t border-border-main"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => onEdit(app)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-text-secondary border border-border-main hover:bg-surface-main transition-colors"
                >
                  <Pencil size={13} /> Edit
                </button>
                <button
                  onClick={() => onDelete(app)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-red-600 border border-red-200 bg-red-50/50 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}