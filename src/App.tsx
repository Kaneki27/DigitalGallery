import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import AuthPage from './components/Auth/AuthPage';
import AdminLoginPage from './components/Auth/AdminLoginPage';
import LandingPage from './components/Landing/LandingPage';
import ModernHeader from './components/Layout/ModernHeader';
import AdminHeader from './components/Layout/AdminHeader';
import ModernEmployeeDashboard from './components/Dashboard/ModernEmployeeDashboard';
import ModernAdminDashboard from './components/Dashboard/ModernAdminDashboard';
import EventsPage from './components/Events/EventsPage';
import EventDetailPage from './components/Events/EventDetailPage';
import UploadPage from './components/Upload/UploadPage';
import GalleryPage from './components/Gallery/GalleryPage';
import LikedPage from './components/Liked/LikedPage';
import ProfilePage from './components/Profile/ProfilePage';
import SettingsPage from './components/Settings/SettingsPage';
import FeedPage from './components/Feed/FeedPage';
import ModerationPage from './components/Admin/ModerationPage';
import AnalyticsPage from './components/Admin/AnalyticsPage';
import UsersPage from './components/Admin/UsersPage';
import MediaLibraryPage from './components/Admin/MediaLibraryPage';

const AppContent: React.FC = () => {
  const { isAuthenticated, loading, user } = useAuth();
  const { isAuthenticated: isAdminAuthenticated, loading: adminLoading, user: adminUser } = useAdminAuth();
  
  console.log('AppContent user:', user);
  console.log('AppContent adminUser:', adminUser);

  // Check if we're on an admin route
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  const isRootRoute = window.location.pathname === '/';

  if (loading || adminLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-2xl">R</span>
          </div>
          <p className="text-gray-600">Loading Rejoice...</p>
        </div>
      </div>
    );
  }

  // Handle admin routes
  if (isAdminRoute) {
    if (!isAdminAuthenticated) {
      return <AdminLoginPage />;
    }
    
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <Routes>
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<ModernAdminDashboard />} />
          <Route path="/admin/analytics" element={<AnalyticsPage />} />
          <Route path="/admin/moderation" element={<ModerationPage />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/media" element={<MediaLibraryPage />} />
          <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </div>
    );
  }

  // Handle root route (landing page)
  if (isRootRoute) {
    return <LandingPage />;
  }

  // Handle employee routes
  const isEmployeeRoute = window.location.pathname.startsWith('/employee');
  
  if (isEmployeeRoute) {
    if (!isAuthenticated) {
      return <AuthPage />;
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <ModernHeader />
        <Routes>
          <Route path="/employee" element={<Navigate to="/employee/dashboard" replace />} />
          <Route path="/employee/dashboard" element={<ModernEmployeeDashboard />} />
          <Route path="/employee/events" element={<EventsPage />} />
          <Route path="/employee/events/:eventId" element={<EventDetailPage />} />
          <Route path="/employee/upload" element={<UploadPage />} />
          <Route path="/employee/gallery" element={<GalleryPage />} />
          <Route path="/employee/feed" element={<FeedPage />} />
          <Route path="/employee/liked" element={<LikedPage />} />
          <Route path="/employee/profile" element={<ProfilePage />} />
          <Route path="/employee/settings" element={<SettingsPage />} />
          {/* Redirect old top-level routes to /employee/* equivalents */}
          <Route path="/feed" element={<Navigate to="/employee/feed" replace />} />
          <Route path="/events" element={<Navigate to="/employee/events" replace />} />
          <Route path="/events/:eventId" element={<Navigate to="/employee/events/:eventId" replace />} />
          <Route path="/upload" element={<Navigate to="/employee/upload" replace />} />
          <Route path="/gallery" element={<Navigate to="/employee/gallery" replace />} />
          <Route path="/liked" element={<Navigate to="/employee/liked" replace />} />
          <Route path="/profile" element={<Navigate to="/employee/profile" replace />} />
          <Route path="/settings" element={<Navigate to="/employee/settings" replace />} />
          <Route path="/dashboard" element={<Navigate to="/employee/dashboard" replace />} />
          <Route path="/employee/*" element={<Navigate to="/employee/dashboard" replace />} />
        </Routes>
      </div>
    );
  }

  // If not on any specific route, show landing page
  return <LandingPage />;
};

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;