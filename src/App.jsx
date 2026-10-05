import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardEntryPage } from './pages/DashboardEntryPage';
import { ModulePlaceholderPage } from './pages/ModulePlaceholderPage';

import { Module1Page } from './modules/module1/Module1Page';
import { Module2Page } from './modules/module2/Module2Page';
import { Module3Page } from './modules/module3/Module3Page';
import { Module4Page } from './modules/module4/Module4Page';
import { Module5Page } from './modules/module5/Module5Page';
import { Module6Page } from './modules/module6/Module6Page';
import { Module8Page } from './modules/module8/Module8Page';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing Page is the root entry point */}
          <Route path="/" element={<LandingPage />} />

          {/* Login Page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Main Application with Collapsible Sidebar */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<DashboardEntryPage />} />
            <Route path="profile" element={<Module1Page />} />
            <Route path="skills" element={<Module2Page />} />
            <Route path="coding" element={<Module3Page />} />
            <Route path="projects" element={<Module4Page />} />
            <Route path="certificates" element={<Module5Page />} />
            <Route path="achievements" element={<Navigate to="/app/certificates" replace />} />
            <Route path="resume" element={<Module6Page />} />
            <Route path="analytics" element={<Module8Page />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
