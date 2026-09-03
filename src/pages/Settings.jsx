import { useRef } from 'react';
import { Download, Upload, Trash2, User, LogOut, Building, ShieldCheck } from 'lucide-react';

export default function Settings({ user, applications, onImport, onClearAll, onLogout }) {
  const fileInputRef = useRef(null);
  const isJobGiver = user?.role === 'job_giver';

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(applications, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jobtrack-data-${user?.name || 'export'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (Array.isArray(data)) onImport(data);
      } catch (err) {
        console.error('Invalid JSON file', err);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">Settings</h2>
        <p className="text-text-secondary text-sm mt-1">Manage your account profile and data synchronization.</p>
      </div>

      {/* Profile Card */}
      <div className="bg-surface-card rounded-2xl border border-border-main p-5 sm:p-6 shadow-xs">
        <h3 className="text-base font-bold text-text-primary mb-4">Account Profile</h3>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-soft-purple-bg text-deep-purple font-extrabold text-xl flex items-center justify-center flex-shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : <User size={24} />}
            </div>
            <div>
              <p className="font-bold text-base text-text-primary">{user?.name || 'Account User'}</p>
              <p className="text-xs text-text-secondary">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-light-green-bg text-accent-green">
                  <ShieldCheck size={12} />
                  {isJobGiver ? 'Job Giver (Employer)' : 'Job Seeker'}
                </span>
                {user?.companyName && (
                  <span className="inline-flex items-center gap-1 text-xs text-text-muted">
                    <Building size={12} /> {user.companyName}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-surface-card rounded-2xl border border-border-main p-5 sm:p-6 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-text-primary">Database Sync & Backups</h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          All your records are stored in MongoDB. You can export a JSON backup to your local device, restore past data, or clear all your records.
        </p>

        <div className="flex flex-wrap gap-2.5 pt-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-text-primary border border-border-main bg-surface-main hover:border-primary-purple transition-all"
          >
            <Download size={15} /> Export Data
          </button>
          <button
            onClick={handleImportClick}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-text-primary border border-border-main bg-surface-main hover:border-primary-purple transition-all"
          >
            <Upload size={15} /> Import Data
          </button>
          <input type="file" accept="application/json" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          <button
            onClick={onClearAll}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 transition-all"
          >
            <Trash2 size={15} /> Clear All Records
          </button>
        </div>
      </div>
    </div>
  );
}