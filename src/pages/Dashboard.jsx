import { Briefcase, Calendar, Trophy, XCircle, TrendingUp, Target, Sparkles, BellRing, ArrowRight, CheckCircle2 } from 'lucide-react';
import StatCard from '../components/StatCard';
import ApplicationCard from '../components/ApplicationCard';
import EmptyState from '../components/EmptyState';
import { computeStats, computeStatusBreakdown, computeInsights, sortByDateDesc, STATUS_BAR_COLORS } from '../utils/helpers';

export default function Dashboard({ user, applications = [], onViewApplication, onAddClick, onNavigate }) {
  const stats = computeStats(applications);
  const breakdown = computeStatusBreakdown(applications);
  const insights = computeInsights(applications);
  const recent = sortByDateDesc(applications).slice(0, 5);

  const upcomingInterviews = applications.filter(
    (app) => (app.status || '').toLowerCase() === 'interview'
  );

  return (
    // Outer spacious container: fills the full screen instead of stopping mid-length
    <div className="w-full space-y-6">
      {/* Top Banner & Greetings */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
            Welcome back, {user?.name?.split(' ')[0] || 'there'}!
          </h2>
          <p className="text-text-secondary text-sm mt-1">
            Keep your applications organized and move candidates forward.
          </p>
        </div>

        <button
          onClick={onAddClick}
          className="self-start sm:self-auto px-5 py-2.5 rounded-2xl bg-primary-purple hover:bg-deep-purple text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-primary-purple/20 flex items-center gap-2"
        >
          <Sparkles size={16} />
          <span>+ Add Application</span>
        </button>
      </div>

      {/* Active Interview Reminder Banner */}
      {upcomingInterviews.length > 0 && (
        <div className="bg-light-green-bg border border-accent-green/20 rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-accent-green text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <BellRing size={20} className="animate-bounce" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-accent-green">
                Upcoming Interview Alert ({upcomingInterviews.length})
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
                Interviews are scheduled with{' '}
                <span className="font-bold text-text-primary">
                  {upcomingInterviews.map((a) => a.company).join(', ')}
                </span>
                . Review your notes and prepare!
              </p>
            </div>
          </div>

          <button
            onClick={() => onViewApplication(upcomingInterviews[0])}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-green text-white font-semibold text-xs hover:opacity-95 transition-all shadow-xs"
          >
            <span>View Details</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Stat Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Applications" value={stats.total} icon={Briefcase} iconBg="#F0EDFF" iconColor="#6B51ED" />
        <StatCard label="Interviews" value={stats.interviews} icon={Calendar} iconBg="#E8F3E8" iconColor="#57934F" />
        <StatCard label="Offers" value={stats.offers} icon={Trophy} iconBg="#F0EDFF" iconColor="#623DF4" />
        <StatCard label="Rejected" value={stats.rejected} icon={XCircle} iconBg="#FEF2F2" iconColor="#DC2626" />
      </div>

      {/* Grid: Progress Breakdown & Key Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Application Progress */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
          <h3 className="text-base font-bold text-text-primary mb-5">Application Progress Breakdown</h3>
          <div className="space-y-4">
            {breakdown.map(({ status, count, percent }) => (
              <div key={status}>
                <div className="flex items-center justify-between text-xs sm:text-sm mb-1.5">
                  <span className="font-semibold text-text-primary">{status}</span>
                  <span className="text-text-secondary text-xs">{count} ({percent}%)</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percent}%`,
                      backgroundColor:
                        status.toLowerCase() === 'interview' || status.toLowerCase() === 'offer'
                          ? '#57934F'
                          : status.toLowerCase() === 'applied'
                          ? '#6B51ED'
                          : STATUS_BAR_COLORS?.[status] || '#8A6DEE',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Sparkles size={18} className="text-primary-purple" />
            <h3 className="text-base font-bold text-text-primary">Pipeline Insights</h3>
          </div>
          <div className="space-y-3.5 pt-1">
            <InsightRow icon={TrendingUp} label="Interview Rate" value={`${insights.interviewRate}%`} color="#57934F" />
            <InsightRow icon={Trophy} label="Offer Rate" value={`${insights.offerRate}%`} color="#623DF4" />
            <InsightRow icon={Target} label="Total Opportunities" value={insights.totalOpportunities} color="#6B51ED" />
          </div>
        </div>
      </div>

      {/* Recent Applications Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-text-primary">Recent Applications</h3>
          <button
            onClick={() => onNavigate('applications')}
            className="text-xs font-semibold text-primary-purple hover:underline"
          >
            View all →
          </button>
        </div>

        {applications.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="No applications yet"
            description="Add applications manually or explore jobs to start tracking your search."
            actionLabel="+ Add Application"
            onAction={onAddClick}
          />
        ) : (
          <div className="divide-y divide-slate-100">
            {recent.map((app) => (
              <ApplicationCard key={app._id} application={app} onClick={onViewApplication} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function InsightRow({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50/60 border border-slate-100">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color}18` }}
      >
        <Icon size={18} style={{ color }} strokeWidth={2.3} />
      </div>
      <div className="flex-1 flex items-center justify-between">
        <span className="text-xs sm:text-sm font-medium text-text-secondary">{label}</span>
        <span className="text-sm sm:text-base font-extrabold text-text-primary">{value}</span>
      </div>
    </div>
  );
}