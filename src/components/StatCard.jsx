export default function StatCard({ label, value, icon: Icon, iconBg, iconColor }) {
  return (
    <div className="bg-surface-card rounded-2xl border border-border-main p-5 flex items-center gap-4 hover:shadow-md hover:border-light-purple/40 transition-all">
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={20} style={{ color: iconColor }} strokeWidth={2.25} />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-extrabold text-text-primary leading-tight">{value}</p>
        <p className="text-sm text-text-secondary truncate mt-0.5">{label}</p>
      </div>
    </div>
  );
}