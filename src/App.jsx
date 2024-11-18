// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import UsersPanel from './components/UsersPanel';
import AdminPanel from './components/AdminPanel';
import Menubar from './components/Menubar';
import PrivateRoute from './utils/PrivateRoute';
import DonateForm from './components/DonateForm';
import logo from './assets/images/logo.png';
import RFooter from './components/RFooter';
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Menubar logo={logo} />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/my-donations" element={
            <PrivateRoute>
              <UsersPanel />
            </PrivateRoute>
          } />
          <Route path="/donate" element={
            <PrivateRoute>
              <DonateForm />
            </PrivateRoute>
          } />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login by default */}
        </Routes>
        <RFooter logo={logo} />
        <ToastContainer />
      </div>
    </AuthProvider>
  );
}

export default App;
