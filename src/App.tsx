import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { JobProvider } from './contexts/JobContext';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Landing from './pages/Landing';
import About from './pages/About';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Subscribe from './pages/Subscribe';
import JobList from './pages/Jobs/JobList';
import JobDetail from './pages/Jobs/JobDetail';
import Dashboard from './pages/Dashboard';
import EditProfile from './pages/Profile/EditProfile';
import BillingSubscription from './pages/Billing/BillingSubscription';
import AccountSettings from './pages/Settings/AccountSettings';
import AdminDashboard from './pages/Admin/AdminDashboard';
import JobForm from './pages/Admin/JobForm';
import { initializeData } from './utils/initializeData';

function App() {
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <AuthProvider>
      <JobProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Landing />} />
              <Route path="about" element={<About />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="subscribe" element={
                <ProtectedRoute>
                  <Subscribe />
                </ProtectedRoute>
              } />
              <Route path="jobs" element={
                <ProtectedRoute>
                  <JobList />
                </ProtectedRoute>
              } />
              <Route path="jobs/:id" element={
                <ProtectedRoute>
                  <JobDetail />
                </ProtectedRoute>
              } />
              <Route path="dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="dashboard/profile" element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              } />
              <Route path="dashboard/billing" element={
                <ProtectedRoute>
                  <BillingSubscription />
                </ProtectedRoute>
              } />
              <Route path="dashboard/settings" element={
                <ProtectedRoute>
                  <AccountSettings />
                </ProtectedRoute>
              } />
              <Route path="admin" element={
                <ProtectedRoute requiresAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="admin/jobs/new" element={
                <ProtectedRoute requiresAdmin>
                  <JobForm />
                </ProtectedRoute>
              } />
              <Route path="admin/jobs/:id/edit" element={
                <ProtectedRoute requiresAdmin>
                  <JobForm />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </Router>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;