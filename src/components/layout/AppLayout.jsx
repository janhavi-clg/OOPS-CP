import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowLeft, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../context/AuthContext';

export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className={`devtrack-app-root ${sidebarOpen ? 'layout-expanded' : 'layout-collapsed'}`}>
      {/* Collapsible Left Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="main-viewport-container">
        {/* Top Header Bar */}
        <header className="app-top-header">
          <div className="header-left">
            {/* Hamburger Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="hamburger-btn"
              title={sidebarOpen ? 'Collapse Sidebar (☰)' : 'Expand Sidebar (☰)'}
              aria-label="Toggle navigation menu"
            >
              <Menu size={20} />
            </button>

            <div className="header-breadcrumbs">
              <span className="crumb-root">DevTrack</span>
              <span className="crumb-separator">/</span>
              <span className="crumb-active">
                {location.pathname === '/app' ? 'Overview' : location.pathname.replace('/app/', '')}
              </span>
            </div>
          </div>

          <div className="header-right">
            {/* Demo Status Indicator */}
            <div className="prototype-status-pill">
              <ShieldCheck size={14} className="pill-icon" />
              <span className="pill-text">Faculty Demonstration Mode</span>
            </div>

            <button
              onClick={() => navigate('/')}
              className="header-link-btn"
              title="Return to Landing Page"
            >
              <ArrowLeft size={15} />
              <span>Landing Page</span>
            </button>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="app-content-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
