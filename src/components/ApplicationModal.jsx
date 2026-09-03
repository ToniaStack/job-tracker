import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { STATUS_OPTIONS } from '../utils/helpers';

const EMPTY_FORM = {
  company: '',
  position: '',
  location: '',
  dateApplied: new Date().toISOString().split('T')[0],
  status: 'applied',
  jobUrl: '',
  salary: '',
  notes: '',
};

export default function ApplicationModal({ isOpen, onClose, onSave, initialData }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm({
          ...EMPTY_FORM,
          ...initialData,
          position: initialData.position || initialData.role || '',
          dateApplied: initialData.dateApplied
            ? new Date(initialData.dateApplied).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
          status: (initialData.status || 'applied').toLowerCase(),
          jobUrl: initialData.jobUrl || '',
          salary: initialData.salary || '',
          location: initialData.location || '',
        });
      } else {
        setForm(EMPTY_FORM);
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.company || !form.company.trim()) {
      newErrors.company = 'Company name is required.';
    }

    if (!form.position || !form.position.trim()) {
      newErrors.position = 'Job title is required.';
    }

    // Compulsory Location
    if (!form.location || !form.location.trim()) {
      newErrors.location = 'Location is required (e.g. Remote, Lagos, Abuja).';
    }

    if (!form.dateApplied) {
      newErrors.dateApplied = 'Application date is required.';
    }

    if (!form.status) {
      newErrors.status = 'Status is required.';
    }

    // Compulsory Job URL + validation
    if (!form.jobUrl || !form.jobUrl.trim()) {
      newErrors.jobUrl = 'Job URL is required.';
    } else {
      try {
        new URL(form.jobUrl.trim().startsWith('http') ? form.jobUrl.trim() : `https://${form.jobUrl.trim()}`);
      } catch {
        newErrors.jobUrl = 'Please enter a valid web link.';
      }
    }

    // Compulsory Salary
    if (!form.salary || !form.salary.trim()) {
      newErrors.salary = 'Salary range is required (e.g. ₦350,000 / mo or $90k/yr).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Normalize URL format
    let cleanUrl = form.jobUrl.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = `https://${cleanUrl}`;
    }

    onSave({
      ...form,
      company: form.company.trim(),
      role: form.position.trim(),
      position: form.position.trim(),
      location: form.location.trim(),
      salary: form.salary.trim(),
      jobUrl: cleanUrl,
      status: form.status.toLowerCase(),
    });
  };

  const inputClass = (field) =>
    `w-full px-3.5 py-2.5 rounded-xl border text-sm text-text-primary placeholder:text-text-muted bg-surface-main outline-none transition-all focus:bg-white focus:border-primary-purple ${
      errors[field] ? 'border-red-500 ring-1 ring-red-500' : 'border-border-main'
    }`;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-text-primary/40 animate-overlay-in px-0 sm:px-4"
      onClick={onClose}
    >
      <div
        className="animate-modal-in bg-surface-card w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-xl max-h-[92vh] flex flex-col border border-border-main"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border-main flex-shrink-0">
          <h2 className="text-base sm:text-lg font-bold text-text-primary">
            {initialData ? 'Edit Application' : 'Add Application'}
          </h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary p-1.5 rounded-lg hover:bg-surface-main transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form
          id="application-modal-form"
          onSubmit={handleSubmit}
          className="overflow-y-auto px-5 sm:px-6 py-5 space-y-4 flex-1"
        >
          {/* Company Name */}
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="e.g. Stripe"
              className={inputClass('company')}
            />
            {errors.company && <p className="text-xs text-red-500 mt-1 font-medium">{errors.company}</p>}
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">
              Job Title / Position <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.position}
              onChange={(e) => handleChange('position', e.target.value)}
              placeholder="e.g. Frontend Engineer"
              className={inputClass('position')}
            />
            {errors.position && <p className="text-xs text-red-500 mt-1 font-medium">{errors.position}</p>}
          </div>

          {/* Location - NOW COMPULSORY */}
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="e.g. Remote / Abuja / Lagos"
              className={inputClass('location')}
            />
            {errors.location && <p className="text-xs text-red-500 mt-1 font-medium">{errors.location}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {/* Date Applied */}
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1.5">
                Application Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={form.dateApplied}
                onChange={(e) => handleChange('dateApplied', e.target.value)}
                className={inputClass('dateApplied')}
              />
              {errors.dateApplied && <p className="text-xs text-red-500 mt-1 font-medium">{errors.dateApplied}</p>}
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1.5">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                value={form.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className={`${inputClass('status')} capitalize`}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s.toLowerCase()}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Job URL - NOW COMPULSORY */}
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">
              Job URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.jobUrl}
              onChange={(e) => handleChange('jobUrl', e.target.value)}
              placeholder="https://company.com/careers/job-id"
              className={inputClass('jobUrl')}
            />
            {errors.jobUrl && <p className="text-xs text-red-500 mt-1 font-medium">{errors.jobUrl}</p>}
          </div>

          {/* Salary - NOW COMPULSORY */}
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">
              Salary Range <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.salary}
              onChange={(e) => handleChange('salary', e.target.value)}
              placeholder="e.g. $90k - $110k or ₦450,000/mo"
              className={inputClass('salary')}
            />
            {errors.salary && <p className="text-xs text-red-500 mt-1 font-medium">{errors.salary}</p>}
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5">Notes (Optional)</label>
            <textarea
              value={form.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Recruiter contact, referral, tech stack, interview stages..."
              rows={3}
              className={`${inputClass('notes')} resize-none`}
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 sm:px-6 py-4 border-t border-border-main flex-shrink-0">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-text-secondary hover:bg-surface-main transition-colors border border-border-main"
          >
            Cancel
          </button>
          <button
            form="application-modal-form"
            type="submit"
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-primary-purple hover:bg-deep-purple transition-all shadow-sm shadow-primary-purple/30 active:scale-[0.98]"
          >
            Save Application
          </button>
        </div>
      </div>
    </div>
  );
}