import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Toast from './components/Toast';
import ApplicationModal from './components/ApplicationModal';
import ConfirmDialog from './components/ConfirmDialog';
import ApplicationDetails from './components/ApplicationDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Kanban from './pages/Kanban';
import Settings from './pages/Settings';
import MyJobs from './pages/MyJobs';
import BrowseJobs from './pages/BrowseJobs';


import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  clearApplications,
  importApplications,
  getMyPostedJobs,
} from './utils/api';


export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('jobtrack_user');
    const token = localStorage.getItem('jobtrack_token');
    return savedUser && token ? JSON.parse(savedUser) : null;
  });

  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isJobPostOpen, setIsJobPostOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [viewingApp, setViewingApp] = useState(null);
  const [deletingApp, setDeletingApp] = useState(null);
  const [toasts, setToasts] = useState([]);

  const isJobGiver = user?.role === 'job_giver' || user?.role === 'creator';

  const fetchMyJobsData = async () => {
    if (isJobGiver) {
      try {
        const data = await getMyPostedJobs();
        setJobs(data || []);
      } catch (err) {
        console.error('Failed to load jobs', err);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyJobsData();
    }
  }, [user]);

  useEffect(() => {
    if (!user || isJobGiver) return;

    const fetchApplications = async () => {
      try {
        const data = await getApplications();
        setApplications(data || []);
      } catch (error) {
        console.error('Failed to load applications:', error);
        showToast(error.message || 'Failed to load applications.');
      }
    };

    fetchApplications();
  }, [user, isJobGiver]);

  const showToast = (message) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const dismissToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const handleLogout = () => {
    localStorage.removeItem('jobtrack_token');
    localStorage.removeItem('jobtrack_user');
    setUser(null);
    setApplications([]);
    setJobs([]);
    navigate('/');
    showToast('Logged out successfully.');
  };

  const handleAuthSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
    const giver = authenticatedUser.role === 'job_giver' || authenticatedUser.role === 'creator';
    navigate(giver ? '/my-jobs' : '/dashboard');
    showToast(`Welcome back, ${authenticatedUser.name}!`);
  };

  const openAddAction = () => {
    if (isJobGiver) {
      navigate('/my-jobs');
      setIsJobPostOpen(true);
    } else {
      setEditingApp(null);
      setIsFormOpen(true);
    }
  };

  const openEditForm = (app) => {
    setViewingApp(null);
    setEditingApp(app);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingApp(null);
  };

  const handleSaveForm = async (formData) => {
    try {
      if (editingApp) {
        const updated = await updateApplication(editingApp._id, formData);
        setApplications((prev) =>
          prev.map((app) => (app._id === updated._id ? updated : app))
        );
        showToast('Application updated.');
      } else {
        const newApp = await createApplication(formData);
        setApplications((prev) => [newApp, ...prev]);
        showToast('Application added.');
      }
      closeForm();
    } catch (error) {
      showToast(error.message || 'Failed to save application.');
    }
  };

  const openDetails = (app) => setViewingApp(app);
  const closeDetails = () => setViewingApp(null);

  const requestDelete = (app) => {
    setViewingApp(null);
    setDeletingApp(app);
  };

  const confirmDelete = async () => {
    if (!deletingApp) return;
    try {
      await deleteApplication(deletingApp._id);
      setApplications((prev) => prev.filter((app) => app._id !== deletingApp._id));
      showToast('Application removed.');
      setDeletingApp(null);
    } catch (error) {
      showToast(error.message || 'Failed to delete application.');
    }
  };

  const handleStatusChange = async (app, newStatus) => {
    try {
      const updated = await updateApplication(app._id, { status: newStatus });
      setApplications((prev) =>
        prev.map((a) => (a._id === updated._id ? updated : a))
      );
      showToast(`Application moved to ${newStatus}.`);
    } catch (error) {
      showToast(error.message || 'Failed to move application.');
    }
  };

  const handleImport = async (data) => {
    try {
      const imported = await importApplications(data);
      setApplications((prev) => [...imported, ...prev]);
      showToast(`${imported.length} applications imported.`);
    } catch (error) {
      showToast(error.message || 'Failed to import applications.');
    }
  };

  const handleClearAll = async () => {
    try {
      await clearApplications();
      setApplications([]);
      showToast('All records cleared.');
    } catch (error) {
      showToast(error.message || 'Failed to clear records.');
    }
  };

  // Derive page name for Header
  const currentPath = location.pathname.replace('/', '') || 'dashboard';

  return (
    <>
      <Routes>
        {/* 1. PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to={isJobGiver ? '/my-jobs' : '/dashboard'} replace />
            ) : (
              <LandingPage />
            )
          }
        />

        <Route
          path="/login"
          element={
            user ? (
              <Navigate to={isJobGiver ? '/my-jobs' : '/dashboard'} replace />
            ) : (
              <div className="relative">
                <Login
                  onLogin={handleAuthSuccess}
                  onSwitchToRegister={() => navigate('/register')}
                />
                <button
                  onClick={() => navigate('/')}
                  className="fixed top-4 left-4 z-50 text-xs font-bold text-text-secondary bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200"
                >
                  ← Back to Home
                </button>
              </div>
            )
          }
        />

        <Route
          path="/register"
          element={
            user ? (
              <Navigate to={isJobGiver ? '/my-jobs' : '/dashboard'} replace />
            ) : (
              <div className="relative">
                <Register
                  onRegister={handleAuthSuccess}
                  onSwitchToLogin={() => navigate('/login')}
                />
                <button
                  onClick={() => navigate('/')}
                  className="fixed top-4 left-4 z-50 text-xs font-bold text-text-secondary bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200"
                >
                  ← Back to Home
                </button>
              </div>
            )
          }
        />

        {/* 2. PROTECTED APP ROUTES (Embedded in Canvas UI) */}
        <Route
          path="/*"
          element={
            !user ? (
              <Navigate to="/" replace />
            ) : (
              <div className="flex min-h-screen bg-[#F4F5FB]">
                <Sidebar
                  user={user}
                  onLogout={handleLogout}
                  isMobileOpen={isMobileMenuOpen}
                  onCloseMobile={() => setIsMobileMenuOpen(false)}
                />

                <div className="flex-1 flex flex-col min-w-0 p-3 sm:p-5 lg:p-6 overflow-x-hidden">
                  <div className="flex-1 bg-white rounded-[28px] sm:rounded-[36px] shadow-sm border border-slate-200/70 flex flex-col overflow-hidden">
                    <Header
                      user={user}
                      activePage={currentPath}
                      onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
                      onAddClick={openAddAction}
                      onLogout={handleLogout}
                      headerSearch={headerSearch}
                      onHeaderSearchChange={(val) => {
                        setHeaderSearch(val);
                        if (location.pathname !== '/applications' && !isJobGiver) {
                          navigate('/applications');
                        }
                      }}
                    />

                    <main className="flex-1 p-4 sm:p-7 lg:p-8 overflow-y-auto">
                      <Routes>
                        <Route
                          path="/dashboard"
                          element={
                            isJobGiver ? (
                              <Navigate to="/my-jobs" replace />
                            ) : (
                              <Dashboard
                                user={user}
                                applications={applications}
                                onViewApplication={openDetails}
                                onAddClick={openAddAction}
                                onNavigate={(p) => navigate(`/${p}`)}
                              />
                            )
                          }
                        />

                        <Route
                          path="/browse-jobs"
                          element={
                            <BrowseJobs
                              user={user}
                              onApplicationAdded={(newApp) =>
                                setApplications((prev) => [newApp, ...prev])
                              }
                              showToast={showToast}
                            />
                          }
                        />

                        <Route
                          path="/applications"
                          element={
                            isJobGiver ? (
                              <Navigate to="/my-jobs" replace />
                            ) : (
                              <Applications
                                applications={applications}
                                onView={openDetails}
                                onEdit={openEditForm}
                                onDelete={requestDelete}
                                onAddClick={openAddAction}
                                externalSearch={headerSearch}
                              />
                            )
                          }
                        />

                        <Route
                          path="/kanban"
                          element={
                            <Kanban
                              user={user}
                              applications={applications || []}
                              jobs={jobs || []}
                              onView={openDetails}
                              onStatusChange={handleStatusChange}
                              showToast={showToast}
                              onJobUpdated={fetchMyJobsData}
                            />
                          }
                        />

                        <Route
                          path="/my-jobs"
                          element={
                            <MyJobs
                              user={user}
                              showToast={showToast}
                              isModalOpen={isJobPostOpen}
                              setIsModalOpen={setIsJobPostOpen}
                            />
                          }
                        />

                        <Route
                          path="/settings"
                          element={
                            <Settings
                              user={user}
                              applications={applications}
                              onImport={handleImport}
                              onClearAll={handleClearAll}
                              onLogout={handleLogout}
                            />
                          }
                        />

                        {/* Fallback */}
                        <Route
                          path="*"
                          element={<Navigate to={isJobGiver ? '/my-jobs' : '/dashboard'} replace />}
                        />
                      </Routes>
                    </main>
                  </div>
                </div>
              </div>
            )
          }
        />
      </Routes>

      {/* Shared Modals */}
      <ApplicationModal
        isOpen={isFormOpen}
        onClose={closeForm}
        onSave={handleSaveForm}
        initialData={editingApp}
      />

      <ApplicationDetails
        application={viewingApp}
        onClose={closeDetails}
        onEdit={openEditForm}
        onDelete={requestDelete}
      />

      <ConfirmDialog
        isOpen={!!deletingApp}
        onCancel={() => setDeletingApp(null)}
        onConfirm={confirmDelete}
        title="Delete application?"
        description="Are you sure you want to remove this application? This action cannot be undone."
      />

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}