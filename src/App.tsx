import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from '@/src/components/ErrorBoundary';
import { testConnection } from '@/src/lib/firebase';
import { initMetaPixel } from '@/src/lib/pixel';
import { LandingPage } from '@/src/pages/LandingPage';
import { PrivacyPage } from '@/src/pages/PrivacyPage';
import { TermsPage } from '@/src/pages/TermsPage';
import { AdminLoginPage } from '@/src/pages/AdminLoginPage';
import { AdminDashboardPage } from '@/src/pages/AdminDashboardPage';

export default function App() {
  useEffect(() => {
    testConnection();
    initMetaPixel();
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
