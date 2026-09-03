export const STATUS_OPTIONS = ['Applied', 'Interview', 'Assessment', 'Offer', 'Rejected'];

// Styles matching your exact purple & green palette
export const STATUS_STYLES = {
  Applied: { bg: 'bg-soft-purple-bg', text: 'text-deep-purple', dot: 'bg-primary-purple' },
  Interview: { bg: 'bg-light-green-bg', text: 'text-accent-green', dot: 'bg-accent-green' },
  Assessment: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  Offer: { bg: 'bg-light-green-bg', text: 'text-accent-green', dot: 'bg-accent-green' },
  Rejected: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
};

export const STATUS_BAR_COLORS = {
  Applied: '#6B51ED',     // Primary Purple
  Interview: '#57934F',   // Accent Green
  Assessment: '#EA580C',  // Warm Amber
  Offer: '#623DF4',       // Deep Purple
  Rejected: '#DC2626',    // Red
};

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  const str = String(dateStr).includes('T') ? dateStr : `${dateStr}T00:00:00`;
  const date = new Date(str);
  if (isNaN(date.getTime())) return String(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getInitial(company) {
  return company?.trim()?.charAt(0)?.toUpperCase() || '?';
}

// Case-insensitive status checker helper
const isStatus = (appStatus, targetStatus) =>
  (appStatus || '').toLowerCase() === targetStatus.toLowerCase();

export function computeStats(applications = []) {
  const total = applications.length;
  const interviews = applications.filter((a) => isStatus(a.status, 'Interview')).length;
  const offers = applications.filter((a) => isStatus(a.status, 'Offer')).length;
  const rejected = applications.filter((a) => isStatus(a.status, 'Rejected')).length;
  return { total, interviews, offers, rejected };
}

export function computeStatusBreakdown(applications = []) {
  const total = applications.length;
  return STATUS_OPTIONS.map((status) => {
    const count = applications.filter((a) => isStatus(a.status, status)).length;
    const percent = total === 0 ? 0 : Math.round((count / total) * 100);
    return { status, count, percent };
  });
}

export function computeInsights(applications = []) {
  const total = applications.length;
  const interviews = applications.filter((a) => isStatus(a.status, 'Interview')).length;
  const offers = applications.filter((a) => isStatus(a.status, 'Offer')).length;

  const interviewRate = total === 0 ? 0 : Math.round((interviews / total) * 100);
  const offerRate = total === 0 ? 0 : Math.round((offers / total) * 100);

  return {
    interviewRate,
    offerRate,
    totalOpportunities: total,
  };
}

export function filterApplications(applications = [], searchTerm, statusFilter) {
  let result = applications;

  if (statusFilter && statusFilter.toLowerCase() !== 'all') {
    result = result.filter((a) => isStatus(a.status, statusFilter));
  }

  if (searchTerm && searchTerm.trim() !== '') {
    const term = searchTerm.trim().toLowerCase();

    result = result.filter(
      (a) =>
        (a.company || '').toLowerCase().includes(term) ||
        (a.position || a.role || '').toLowerCase().includes(term) ||
        (a.location || '').toLowerCase().includes(term)
    );
  }

  return result;
}

export function sortByDateDesc(applications = []) {
  return [...applications].sort((a, b) => {
    const dateA = new Date(a.dateApplied || a.createdAt);
    const dateB = new Date(b.dateApplied || b.createdAt);
    return dateB - dateA;
  });
}