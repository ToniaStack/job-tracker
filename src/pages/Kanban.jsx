import { useState, useMemo } from 'react';
import KanbanColumn from '../components/KanbanColumn';
import { STATUS_OPTIONS } from '../utils/helpers';
import { updateCandidateStatus } from '../utils/api';

export default function Kanban({
  user,
  applications = [],
  jobs = [],
  onView,
  onStatusChange,
  showToast,
  onJobUpdated,
}) {
  const isJobGiver = user?.role === 'job_giver' || user?.role === 'creator';
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverStatus, setDragOverStatus] = useState(null);

  // If user is a Job Giver, convert all applicants across their jobs into Kanban items
  const giverCandidates = useMemo(() => {
    if (!isJobGiver) return [];
    const list = [];
    const safeJobs = Array.isArray(jobs) ? jobs : [];

    safeJobs.forEach((job) => {
      (job?.applicants || []).forEach((app) => {
        list.push({
          _id: app._id,
          applicantId: app.applicant?._id || app.applicant || app._id,
          jobId: job._id,
          company: app.name || 'Candidate', // Shows applicant's name
          position: job.title || 'Role',    // Shows the job applied to
          location: job.location || '—',
          dateApplied: app.appliedAt,
          status: app.status || 'applied',
          notes: app.notes || '',
          email: app.email,
        });
      });
    });
    return list;
  }, [jobs, isJobGiver]);

  // Ensure items is ALWAYS an array, never undefined
  const items = useMemo(() => {
    if (isJobGiver) {
      return giverCandidates;
    }
    return Array.isArray(applications) ? applications : [];
  }, [isJobGiver, giverCandidates, applications]);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverStatus(null);
  };

  const handleDrop = async (e, targetStatus) => {
    e.preventDefault();
    if (!draggedItem) return;

    const currentStatus = (draggedItem.status || '').toLowerCase();
    const newStatus = targetStatus.toLowerCase();

    if (currentStatus === newStatus) {
      setDraggedItem(null);
      setDragOverStatus(null);
      return;
    }

    if (isJobGiver) {
      // Job Giver updates candidate stage
      try {
        await updateCandidateStatus(draggedItem.jobId, draggedItem._id, newStatus);
        showToast?.(`Candidate moved to ${targetStatus}`);
        onJobUpdated?.(); // Refetches jobs so counts and pipeline sync
      } catch (err) {
        showToast?.(err.message || 'Failed to update candidate status');
      }
    } else {
      // Job Seeker updates personal application
      onStatusChange?.(draggedItem, newStatus);
    }

    setDraggedItem(null);
    setDragOverStatus(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-full space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
          {isJobGiver ? 'Candidate Hiring Pipeline' : 'Application Pipeline'}
        </h2>
        <p className="text-text-secondary text-sm mt-1">
          {isJobGiver
            ? 'Drag applicants across stages to organize candidate interviews, offers, and rejections.'
            : 'Track your personal application milestones and interview progress.'}
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 pt-1">
        {STATUS_OPTIONS.map((status) => {
          // Safe filtering with fallback
          const columnApps = (items || []).filter(
            (a) => (a?.status || '').toLowerCase() === status.toLowerCase()
          );

          return (
            <KanbanColumn
              key={status}
              status={status}
              applications={columnApps}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
              onCardClick={onView}
              draggedId={draggedItem?._id}
              isDragOver={dragOverStatus === status}
              onDragEnter={setDragOverStatus}
              onDragLeave={() => setDragOverStatus(null)}
            />
          );
        })}
      </div>
    </div>
  );
}