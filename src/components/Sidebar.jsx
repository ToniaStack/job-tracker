import { NavLink } from 'react-router-dom';
import {
  BriefcaseBusiness,
  LayoutDashboard,
  KanbanSquare,
  Settings as SettingsIcon,
  User,
  X,
  LogOut,
  Briefcase,
  Search,
  FileText,
} from 'lucide-react';

export default function Sidebar({
  user,
  onLogout,
  isMobileOpen,
  onCloseMobile,
}) {
  const isJobGiver =
    user?.role === 'job_giver' || user?.role === 'creator';

  const NAV_ITEMS = isJobGiver
    ? [
      {
        path: '/my-jobs',
        label: 'My Job Postings',
        icon: Briefcase,
      },
      {
        path: '/kanban',
        label: 'Hiring Pipeline',
        icon: KanbanSquare,
      },
      {
        path: '/settings',
        label: 'Settings',
        icon: SettingsIcon,
      },
    ]
    : [
      {
        path: '/dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
      },
      {
        path: '/browse-jobs',
        label: 'Find Jobs',
        icon: Search,
      },
      {
        path: '/applications',
        label: 'My Applications',
        icon: FileText,
      },
      {
        path: '/kanban',
        label: 'Pipeline Board',
        icon: KanbanSquare,
      },
      {
        path: '/settings',
        label: 'Settings',
        icon: SettingsIcon,
      },
    ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-dvh w-64 bg-surface-card border-r border-border-main flex flex-col z-50 transform transition-transform duration-200 ease-out
        lg:h-screen lg:translate-x-0 lg:static lg:z-auto
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* ================= BRAND ================= */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-border-main">
          <NavLink
            to={user ? (isJobGiver ? '/my-jobs' : '/dashboard') : '/'}
            onClick={onCloseMobile}
            className="flex items-center gap-2.5"
          >
            {/* Logo */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-purple to-accent-green flex items-center justify-center flex-shrink-0 shadow-sm shadow-primary-purple/20">
              <BriefcaseBusiness
                size={19}
                className="text-white"
                strokeWidth={2.25}
              />
            </div>

            {/* Brand Name */}
            <span className="text-text-primary font-bold text-lg tracking-tight">
              JobTrack
            </span>
          </NavLink>

          {/* Mobile Close */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-main transition-colors"
            aria-label="Close menu"
          >
            <X size={19} />
          </button>
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav className="flex-1 px-3 py-5 space-y-1.5">
          {/* Section Label */}
          <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted">
            {isJobGiver ? 'Hiring' : 'Workspace'}
          </p>

          {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-200 ${isActive
                  ? 'bg-soft-purple-bg text-deep-purple font-semibold shadow-sm'
                  : 'text-text-secondary hover:bg-surface-main hover:text-text-primary'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active Indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary-purple" />
                  )}

                  {/* Icon */}
                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2.4 : 2}
                    className={`transition-colors ${isActive
                      ? 'text-deep-purple'
                      : 'text-text-muted group-hover:text-text-primary'
                      }`}
                  />

                  {/* Label */}
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ================= USER FOOTER ================= */}
        <div className="p-3 border-t border-border-main">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-main border border-border-main">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-soft-purple-bg to-light-green-bg text-deep-purple flex items-center justify-center flex-shrink-0 font-bold text-sm">
              {user?.name ? (
                user.name.charAt(0).toUpperCase()
              ) : (
                <User size={17} />
              )}
            </div>

            {/* User Information */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-text-primary truncate">
                {user?.name || 'Guest User'}
              </p>

              <span className="inline-flex mt-0.5 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-light-green-bg text-accent-green">
                {isJobGiver ? 'Job Giver' : 'Job Seeker'}
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              title="Logout"
              aria-label="Logout"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-red-600 hover:bg-red-50 transition-all duration-200 flex-shrink-0"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
