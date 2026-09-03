// src/utils/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API_URL = `${API_BASE_URL}/api/applications`;
const JOBS_URL = `${API_BASE_URL}/api/jobs`;
const AUTH_URL = `${API_BASE_URL}/api/auth`;

// Helper to attach JWT Bearer token from localStorage
function getAuthHeaders() {
  const token = localStorage.getItem("jobtrack_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

const openAddForm = () => {
    if (user?.role === 'job_giver' || user?.role === 'creator') {
      setActivePage('my_jobs');
      // If on my_jobs, this opens the modal
      setIsJobPostOpen(true);
    } else {
      setEditingApp(null);
      setIsFormOpen(true);
    }
  };

// ----------------------------------------------------
// AUTHENTICATION
// ----------------------------------------------------

export async function registerUser(userData) {
  const response = await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create account");
  }
  return data;
}

export async function loginUser(credentials) {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Invalid email or password");
  }
  return data;
}

// ----------------------------------------------------
// APPLICATIONS (Protected: Belongs to Logged-in User)
// ----------------------------------------------------

export async function getApplications() {
  const response = await fetch(APPLICATIONS_URL, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch applications");
  }

  return response.json();
}

export async function createApplication(application) {
  const response = await fetch(APPLICATIONS_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(application),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to create application");
  }

  return response.json();
}

export async function updateApplication(id, updates) {
  const response = await fetch(`${APPLICATIONS_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to update application");
  }

  return response.json();
}

export async function deleteApplication(id) {
  const response = await fetch(`${APPLICATIONS_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to delete application");
  }

  return response.json();
}

export async function clearApplications() {
  const response = await fetch(APPLICATIONS_URL, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to clear applications");
  }

  return response.json();
}

export async function importApplications(applications) {
  const response = await fetch(`${APPLICATIONS_URL}/import`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ applications }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to import applications");
  }

  return response.json();
}

// ----------------------------------------------------
// JOBS SYSTEM (Job Givers & Job Seekers)
// ----------------------------------------------------

// Get all jobs (Job Seekers browse, Job Givers view market)
export async function getJobs(search = "") {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  const response = await fetch(`${JOBS_URL}${query}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch jobs");
  }

  return response.json();
}

// Job Giver: View only jobs they posted
export async function getMyPostedJobs() {
  const response = await fetch(`${JOBS_URL}/my-jobs`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch your posted jobs");
  }

  return response.json();
}

// Job Giver: Create a new job post
export async function createJob(jobData) {
  const response = await fetch(JOBS_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to create job posting");
  }

  return response.json();
}

// Job Giver: Update a job post
export async function updateJob(id, updates) {
  const response = await fetch(`${JOBS_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to update job");
  }

  return response.json();
}

// Job Giver: Delete a job post
export async function deleteJob(id) {
  const response = await fetch(`${JOBS_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to delete job");
  }

  return response.json();
}

// Job Seeker: Apply directly to a job post
export async function applyToJob(jobId, applicationNotes = {}) {
  const response = await fetch(`${JOBS_URL}/${jobId}/apply`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(applicationNotes),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to apply to job");
  }

  return response.json();
}

// Job Giver updates candidate's application status (Shortlist, Offer, Reject)
export async function updateCandidateStatus(jobId, applicantId, status) {
  const response = await fetch(`${JOBS_URL}/${jobId}/applicants/${applicantId}/status`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to update candidate status");
  }

  return response.json();
}