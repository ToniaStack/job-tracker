import { useState, useEffect } from "react";
import { Search, MapPin, DollarSign, CheckCircle2, Send, Building, Briefcase, X } from "lucide-react";
import { getJobs, applyToJob } from "../utils/api";

export default function BrowseJobs({ user, onApplicationAdded, showToast }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  // State for the candidate application modal
  const [applyingJob, setApplyingJob] = useState(null);
  const [applicantData, setApplicantData] = useState({
    name: "",
    email: "",
    resumeLink: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await getJobs();
      setJobs(data || []);
    } catch (err) {
      showToast?.(err.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const openApplyModal = (job) => {
    setApplyingJob(job);
    setApplicantData({
      name: user?.name || "",
      email: user?.email || "",
      resumeLink: "",
      notes: "",
    });
  };

  const handleConfirmApply = async (e) => {
    e.preventDefault();
    if (!applyingJob) return;

    try {
      setSubmitting(true);

      const payload = {
        name: applicantData.name.trim(),
        email: applicantData.email.trim(),
        notes: [
          applicantData.resumeLink ? `Resume/Portfolio: ${applicantData.resumeLink}` : "",
          applicantData.notes ? `Note: ${applicantData.notes}` : "",
        ]
          .filter(Boolean)
          .join(" | "),
      };

      const result = await applyToJob(applyingJob._id, payload);

      // Mark as applied locally
      setJobs((prev) =>
        prev.map((j) =>
          j._id === applyingJob._id
            ? { ...j, applicants: [...(j.applicants || []), { applicant: user.id || user._id }] }
            : j
        )
      );

      // Add to seeker's own tracker dashboard
      if (result.application && onApplicationAdded) {
        onApplicationAdded(result.application);
      }

      showToast?.(`Application submitted to ${applyingJob.company}!`);
      setApplyingJob(null);
    } catch (err) {
      showToast?.(err.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === "All" || job.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Explore Job Openings
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Browse vacancies posted by employers and apply directly with your profile.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface-card border border-border-main p-4 rounded-2xl shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search role, company, or city..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-border-main text-sm text-text-primary outline-none focus:border-primary-purple bg-surface-main"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {["All", "Full-time", "Part-time", "Contract", "Remote", "Internship"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedType === type
                  ? "bg-primary-purple text-white shadow-xs shadow-primary-purple/30"
                  : "bg-surface-main text-text-secondary hover:text-text-primary"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <div className="py-20 text-center text-text-muted text-sm">Loading available opportunities...</div>
      ) : filteredJobs.length === 0 ? (
        <div className="py-20 text-center bg-surface-card border border-border-main rounded-2xl p-6">
          <Briefcase className="mx-auto text-text-muted mb-3" size={36} />
          <p className="text-text-primary font-semibold">No open jobs found</p>
          <p className="text-text-secondary text-sm mt-1">Check back later or try different search terms.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => {
            const currentUserId = user?.id || user?._id;
            const hasApplied = job.applicants?.some(
              (app) => String(app.applicant?._id || app.applicant) === String(currentUserId)
            );

            return (
              <div
                key={job._id}
                className="bg-surface-card border border-border-main rounded-2xl p-5 shadow-xs hover:border-light-purple transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-text-primary">{job.title}</h3>
                      <div className="flex items-center gap-1.5 text-text-secondary text-sm font-medium mt-0.5">
                        <Building size={14} className="text-text-muted" />
                        <span>{job.company}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-soft-purple-bg text-deep-purple">
                      {job.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-y-1.5 gap-x-4 mt-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <MapPin size={13} /> {job.location}
                    </span>
                    {job.salary && (
                      <span className="flex items-center gap-1 text-accent-green font-medium">
                        <DollarSign size={13} /> {job.salary}
                      </span>
                    )}
                  </div>

                  <p className="text-text-secondary text-xs sm:text-sm mt-3 line-clamp-3 leading-relaxed">
                    {job.description}
                  </p>

                  {job.requirements?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {job.requirements.map((req, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-surface-main text-text-secondary text-[11px]">
                          {req}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-border-main">
                  {hasApplied ? (
                    <div className="flex items-center gap-1.5 text-accent-green text-xs font-semibold bg-light-green-bg px-3 py-2 rounded-xl justify-center">
                      <CheckCircle2 size={15} /> Application Submitted
                    </div>
                  ) : (
                    <button
                      onClick={() => openApplyModal(job)}
                      className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-primary-purple hover:bg-deep-purple text-white text-xs sm:text-sm font-semibold transition-all shadow-xs shadow-primary-purple/30"
                    >
                      <Send size={14} /> Apply Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Candidate Apply Modal */}
      {applyingJob && (
        <div className="fixed inset-0 bg-text-primary/40 z-50 flex items-center justify-center p-4">
          <div className="bg-surface-card border border-border-main rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-text-primary">Apply to {applyingJob.title}</h2>
                <p className="text-xs text-text-secondary mt-0.5">{applyingJob.company} • {applyingJob.location}</p>
              </div>
              <button
                onClick={() => setApplyingJob(null)}
                className="text-text-muted hover:text-text-primary p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleConfirmApply} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={applicantData.name}
                  onChange={(e) => setApplicantData({ ...applicantData, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-border-main bg-surface-main text-text-primary outline-none focus:border-primary-purple"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  value={applicantData.email}
                  onChange={(e) => setApplicantData({ ...applicantData, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-border-main bg-surface-main text-text-primary outline-none focus:border-primary-purple"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">Portfolio or Resume Link (URL)</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/... or drive link"
                  value={applicantData.resumeLink}
                  onChange={(e) => setApplicantData({ ...applicantData, resumeLink: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-border-main bg-surface-main text-text-primary outline-none focus:border-primary-purple"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">Short Cover Note (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Briefly introduce your background..."
                  value={applicantData.notes}
                  onChange={(e) => setApplicantData({ ...applicantData, notes: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-border-main bg-surface-main text-text-primary outline-none focus:border-primary-purple resize-none"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setApplyingJob(null)}
                  className="px-4 py-2 rounded-xl border border-border-main text-text-secondary hover:bg-surface-main text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl bg-accent-green hover:opacity-90 text-white text-xs font-semibold shadow-xs disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}