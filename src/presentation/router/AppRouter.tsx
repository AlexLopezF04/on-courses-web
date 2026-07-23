import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';
import { Loader } from '../components/Loader';

// Direct Page Imports
import { HomePage } from '../pages/HomePage';
import { CatalogPage } from '../pages/CatalogPage';
import { CourseDetailPage } from '../pages/CourseDetailPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { StudentDashboard } from '../pages/StudentDashboard';
import { LessonPlayerPage } from '../pages/LessonPlayerPage';
import { AdminDashboard } from '../pages/AdminDashboard';
import { CourseManagementPage } from '../pages/CourseManagementPage';
import { LessonManagementPage } from '../pages/LessonManagementPage';
import { CategoryManagementPage } from '../pages/CategoryManagementPage';
import { StudentManagementPage } from '../pages/StudentManagementPage';
import { ProfilePage } from '../pages/ProfilePage';

// Guard for authenticated users with role restrictions
const RequireAuth: React.FC<{ children: React.ReactElement; allowedRoles?: string[] }> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    if (user.role === 'student') {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/admin" replace />;
  }

  return children;
};

// Guard for guest-only pages
const PublicOnly: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user) {
    if (user.role === 'admin' || user.role === 'professor') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export const AppRouter: React.FC = () => {
  const { checkAuth, isLoading } = useAuthStore();
  const { initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
    checkAuth();
  }, [checkAuth, initTheme]);

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CatalogPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />

        {/* Guest Only Routes */}
        <Route
          path="/login"
          element={
            <PublicOnly>
              <LoginPage />
            </PublicOnly>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnly>
              <RegisterPage />
            </PublicOnly>
          }
        />

        {/* Student Private Routes */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth allowedRoles={['student']}>
              <StudentDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/learn/:courseId/lesson/:lessonId"
          element={
            <RequireAuth allowedRoles={['student']}>
              <LessonPlayerPage />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth allowedRoles={['student', 'professor', 'admin']}>
              <ProfilePage />
            </RequireAuth>
          }
        />

        {/* Admin/Teacher Private Routes */}
        <Route
          path="/admin"
          element={
            <RequireAuth allowedRoles={['admin', 'professor']}>
              <AdminDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <RequireAuth allowedRoles={['admin', 'professor']}>
              <CourseManagementPage />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/courses/:courseId/lessons"
          element={
            <RequireAuth allowedRoles={['admin', 'professor']}>
              <LessonManagementPage />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <RequireAuth allowedRoles={['admin', 'professor']}>
              <CategoryManagementPage />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/students"
          element={
            <RequireAuth allowedRoles={['admin', 'professor']}>
              <StudentManagementPage />
            </RequireAuth>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
