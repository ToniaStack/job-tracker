import { useMemo, useState } from 'react';
import { ListChecks, ArrowDownUp } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';
import ApplicationTable from '../components/ApplicationTable';
import EmptyState from '../components/EmptyState';
import { filterApplications, STATUS_OPTIONS } from '../utils/helpers';

export default function Applications({ applications, onView, onEdit, onDelete, onAddClick, externalSearch }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  const effectiveSearch = externalSearch !== undefined && externalSearch !== '' ? externalSearch : search;

  // Calculate counts for FilterTabs to fix the undefined counts bug
  const counts = useMemo(() => {
    const map = { All: applications.length };
    STATUS_OPTIONS.forEach((status) => {
      map[status] = applications.filter(
        (a) => (a.status || '').toLowerCase() === status.toLowerCase()
      ).length;
    });
    return map;
  }, [applications]);

  const filtered = useMemo(() => {
    const results = filterApplications(
      applications,
      effectiveSearch,
      statusFilter
    );

    return [...results].sort((a, b) => {
      const dateA = new Date(a.dateApplied || a.createdAt);
      const dateB = new Date(b.dateApplied || b.createdAt);

      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [applications, effectiveSearch, statusFilter, sortOrder]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">My Applications</h2>
        <p className="text-text-secondary text-sm mt-1">Keep track of every opportunity in one place.</p>
      </div>

      <div className="space-y-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search company, job title, location..."
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 overflow-x-auto">
            <FilterTabs
              active={statusFilter}
              onChange={setStatusFilter}
              counts={counts}
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <ArrowDownUp size={15} className="text-text-muted" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-3 py-2 rounded-xl border border-border-main bg-surface-card text-xs sm:text-sm text-text-primary outline-none focus:border-primary-purple shadow-xs"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="bg-surface-card rounded-2xl border border-border-main shadow-xs">
          <EmptyState
            icon={ListChecks}
            title="No applications yet"
            description="Start tracking your job search by adding your first application."
            actionLabel="+ Add Application"
            onAction={onAddClick}
          />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-surface-card rounded-2xl border border-border-main shadow-xs">
          <EmptyState
            icon={ListChecks}
            title="No matching applications"
            description="Try adjusting your search query or filter criteria to find what you're looking for."
          />
        </div>
      ) : (
        <div className="bg-surface-card rounded-2xl border border-border-main overflow-hidden shadow-xs">
          <ApplicationTable applications={filtered} onView={onView} onEdit={onEdit} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
}