import { Menu, Plus, Search } from 'lucide-react';

const PAGE_META = {
  dashboard: { title: 'Dashboard' },
  applications: { title: 'Applications' },
  kanban: { title: 'Hiring Pipeline' },
  my_jobs: { title: 'My Job Postings' },
  browse_jobs: { title: 'Browse Opportunities' },
  settings: { title: 'Settings' },
};

export default function Header({
  user,
  activePage,
  onOpenMobileMenu,
  onAddClick,
  headerSearch,
  onHeaderSearchChange,
}) {
  const isJobGiver = user?.role === 'job_giver' || user?.role === 'creator';
  const meta = PAGE_META[activePage] || { title: 'Dashboard' };

  return (
    <header className="sticky top-0 z-30 bg-surface-card/95 backdrop-blur border-b border-border-main">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 h-16">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden text-text-secondary hover:text-text-primary p-1.5 -ml-1.5 rounded-lg hover:bg-surface-main flex-shrink-0"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <h1 className="text-lg sm:text-xl font-bold text-text-primary truncate">
            {activePage === 'kanban' && !isJobGiver ? 'My Application Pipeline' : meta.title}
          </h1>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Search bar */}
          <div className="hidden md:flex items-center relative">
            <Search size={16} className="absolute left-3 text-text-muted pointer-events-none" />
            <input
              type="text"
              value={headerSearch || ''}
              onChange={(e) => onHeaderSearchChange(e.target.value)}
              placeholder={isJobGiver ? 'Search applicants or roles...' : 'Search company, role...'}
              className="w-56 lg:w-72 pl-9 pr-3 py-2 rounded-xl border border-border-main bg-surface-main text-sm text-text-primary placeholder:text-text-muted focus:bg-white focus:border-primary-purple transition-all outline-none"
            />
          </div>

          {/* Role-Specific Action Button */}
          <button
            onClick={onAddClick}
            className="flex items-center gap-1.5 bg-primary-purple hover:bg-deep-purple text-white text-sm font-semibold px-3.5 sm:px-4 py-2.5 rounded-xl transition-all shadow-sm shadow-primary-purple/30 active:scale-[0.98]"
          >
            <Plus size={17} strokeWidth={2.5} />
            <span className="hidden sm:inline">
              {isJobGiver ? 'Post a Job' : 'Add Application'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}