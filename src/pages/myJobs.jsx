import { useState, useEffect } from "react";
import { Plus, Users, Trash2, MapPin, DollarSign, Building, Briefcase, CheckCircle, XCircle, Clock } from "lucide-react";
import { getMyPostedJobs, createJob, deleteJob, updateCandidateStatus } from "../utils/api";

export default function MyJobs({ user, showToast }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingApplicantsJob, setViewingApplicantsJob] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    company: user?.companyName || "",
    location: "Remote",
    type: "Full-time",
    salary: "",
    description: "",
    requirements: "",
  });

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      setLoading(true);
      const data = await getMyPostedJobs();
      setJobs(data || []);
    } catch (err) {
      showToast?.(err.message || "Failed to load your posted jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleDecision = async (applicantId, decisionStatus) => {
    try {
      setUpdatingId(applicantId);
      await updateCandidateStatus(viewingApplicantsJob._id, applicantId, decisionStatus);

      // Update locally
      const updatedApplicants = viewingApplicantsJob.applicants.map((app) =>
        (app._id === applicantId || app.applicant === applicantId)
          ? { ...app, status: decisionStatus }
          : app
      );

      const updatedJob = { ...viewingApplicantsJob, applicants: updatedApplicants };
      setViewingApplicantsJob(updatedJob);
      setJobs((prev) => prev.map((j) => (j._id === updatedJob._id ? updatedJob : j)));

      showToast?.(`Candidate marked as ${decisionStatus}!`);
    } catch (err) {
      showToast?.(err.message || "Failed to update candidate status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.company.trim() || !form.title.trim() || !form.location.trim() || !form.description.trim()) {
      showToast?.("Please complete all required fields.");
      return;
    }
    try {
      const newJob = await createJob(form);
      setJobs((prev) => [newJob, ...prev]);
      showToast?.("Job listing published!");
      setIsModalOpen(false);
    } catch (err) {
      showToast?.(err.message || "Failed to post job");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job listing?")) return;
    try {
      await deleteJob(id);
      setJobs((prev) => prev.filter((j) => j._id !== id));
      showToast?.("Job deleted.");
    } catch (err) {
      showToast?.(err.message || "Failed to delete job");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Manage Job Postings
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Review applicant candidates and decide on interviews, offers, or rejections.
          </p>
        </div>

        <button
          onClick={() => {
            setForm((prev) => ({ ...prev, company: user?.companyName || prev.company }));
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-primary-purple hover:bg-deep-purple text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm shadow-primary-purple/30 self-start sm:self-auto"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Post a Job</span>
        </button>
      </div>

      {/* Posted Jobs Grid */}
      {loading ? (
        <div className="py-20 text-center text-text-muted text-sm">Loading your postings...</div>
      ) : jobs.length === 0 ? (
        <div className="py-20 text-center bg-surface-card border border-border-main rounded-2xl p-6">
          <Briefcase className="mx-auto text-text-muted mb-3" size={36} />
          <p className="text-text-primary font-semibold">You haven't posted any jobs yet</p>
          <p className="text-text-secondary text-sm mt-1">Click "Post a Job" to start collecting applications.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-surface-card border border-border-main rounded-2xl p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">{job.title}</h3>
                    <p className="text-xs text-text-secondary font-medium flex items-center gap-1 mt-0.5">
                      <Building size={13} className="text-text-muted" /> {job.company}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-soft-purple-bg text-deep-purple">
                    {job.type}
                  </span>
                </div>

                <div className="flex flex-wrap gap-y-1 gap-x-4 mt-3 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} /> {job.location}
                  </span>
                  {job.salary && (
                    <span className="flex items-center gap-1 text-accent-green font-medium">
                      <DollarSign size={13} /> {job.salary}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-text-secondary mt-3 line-clamp-2">
                  {job.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-border-main flex items-center justify-between">
                <button
                  onClick={() => setViewingApplicantsJob(job)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-light-green-bg text-accent-green font-semibold text-xs hover:bg-accent-green hover:text-white transition-all shadow-xs"
                >
                  <Users size={14} />
                  <span>Review {job.applicants?.length || 0} Applicants</span>
                </button>

                <button
                  onClick={() => handleDelete(job._id)}
                  className="p-1.5 text-text-muted hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Job"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Applicants Modal with Approve / Reject controls */}
      {viewingApplicantsJob && (
        <div className="fixed inset-0 bg-text-primary/40 z-50 flex items-center justify-center p-4 animate-overlay-in">
          <div className="bg-surface-card border border-border-main rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-start border-b border-border-main pb-3">
              <div>
                <h2 className="text-lg font-bold text-text-primary">
                  Applicants for {viewingApplicantsJob.title}
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  {viewingApplicantsJob.applicants?.length || 0} candidates submitted applications
                </p>
              </div>
              <button
                onClick={() => setViewingApplicantsJob(null)}
                className="text-text-muted hover:text-text-primary text-sm font-semibold"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 divide-y divide-border-main pr-1">
              {viewingApplicantsJob.applicants?.length === 0 ? (
                <p className="text-center py-12 text-text-muted text-sm">No applicants have applied yet.</p>
              ) : (
                viewingApplicantsJob.applicants?.map((app) => {
                  const currentStatus = app.status || "applied";

                  return (
                    <div key={app._id} className="pt-4 first:pt-0 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold text-text-primary">{app.name || "Candidate"}</p>
                          <a href={`mailto:${app.email}`} className="text-xs text-primary-purple hover:underline">
                            {app.email}
                          </a>
                        </div>

                        {/* Status Badge */}
                        <span
                          className={`self-start sm:self-auto px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                            currentStatus === "interview"
                              ? "bg-light-green-bg text-accent-green"
                              : currentStatus === "offer"
                              ? "bg-soft-purple-bg text-deep-purple"
                              : currentStatus === "rejected"
                              ? "bg-red-50 text-red-600"
                              : "bg-surface-main text-text-secondary"
                          }`}
                        >
                          {currentStatus}
                        </span>
                      </div>

                      {app.notes && (
                        <div className="text-xs text-text-secondary bg-surface-main p-3 rounded-xl border border-border-main leading-relaxed">
                          {app.notes}
                        </div>
                      )}

                      {/* Employer Decision Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <span className="text-[11px] text-text-muted">
                          Applied: {new Date(app.appliedAt).toLocaleDateString()}
                        </span>

                        <div className="flex gap-1.5">
                          <button
                            disabled={updatingId === app._id || currentStatus === "interview"}
                            onClick={() => handleDecision(app._id, "interview")}
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-light-green-bg text-accent-green hover:bg-accent-green hover:text-white transition-all disabled:opacity-40"
                          >
                            Interview
                          </button>
                          <button
                            disabled={updatingId === app._id || currentStatus === "offer"}
                            onClick={() => handleDecision(app._id, "offer")}
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-soft-purple-bg text-deep-purple hover:bg-primary-purple hover:text-white transition-all disabled:opacity-40"
                          >
                            Make Offer
                          </button>
                          <button
                            disabled={updatingId === app._id || currentStatus === "rejected"}
                            onClick={() => handleDecision(app._id, "rejected")}
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all disabled:opacity-40"
                          >
                            Disapprove / Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}