import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpenCheck,
  Code2,
  FolderGit2,
  Award,
  FileText,
  Lock,
  LineChart,
  LogOut,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const MODULE_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/app',
    exact: true,
    icon: LayoutDashboard,
    badge: 'Active'
  },
  {
    id: 'skills',
    label: 'Skills & Learning',
    path: '/app/skills',
    icon: BookOpenCheck,
    badge: '12 Skills'
  },
  {
    id: 'coding',
    label: 'Coding Progress',
    path: '/app/coding',
    icon: Code2,
    badge: '137 Solved'
  },
  {
    id: 'projects',
    label: 'Projects',
    path: '/app/projects',
    icon: FolderGit2,
    badge: '6 Projects'
  },
  {
    id: 'profile',
    label: 'Profile & Portfolio',
    path: '/app/profile',
    icon: BookOpenCheck,
    badge: 'Module 1'
  },
  {
    id: 'certificates',
    label: 'Certificates & Achievements',
    path: '/app/certificates',
    icon: Award,
    badge: '5 Certs'
  },
  {
    id: 'resume',
    label: 'Resume & Portfolio',
    path: '/app/resume',
    icon: FileText,
    badge: 'Ready'
  },
  {
    id: 'placement',
    label: 'Placement Readiness',
    path: '#locked',
    icon: Lock,
    isLocked: true,
    badge: 'Locked'
  },
  {
    id: 'analytics',
    label: 'Progress & Analytics',
    path: '/app/analytics',
    icon: LineChart,
    badge: 'Insights'
  }
];

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [lockedToast, setLockedToast] = React.useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLockedClick = (item) => {
    setLockedToast(`${item.label} is coming soon.`);
    setTimeout(() => setLockedToast(null), 3500);
  };

  return (
    <aside
      className={`devtrack-sidebar ${isOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}
      aria-label="DevTrack Module Navigation"
    >
      {lockedToast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: isOpen ? '280px' : '90px',
          zIndex: 9999,
          background: '#2C1810',
          color: '#FAF7F2',
          padding: '10px 18px',
          borderRadius: '8px',
          boxShadow: '0 8px 24px rgba(44, 24, 16, 0.25)',
          fontSize: '13px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          border: '1px solid rgba(199, 143, 90, 0.3)',
          animation: 'fadeIn 0.2s ease'
        }}>
          <span>🔒</span>
          <span>{lockedToast}</span>
        </div>
      )}
      {/* Sidebar Header Branding */}
      <div className="sidebar-brand-wrapper">
        <div className="sidebar-brand" onClick={() => navigate('/app')}>
          <div className="brand-symbol">
            <span className="brand-dot"></span>
          </div>
          {isOpen && (
            <div className="brand-meta">
              <span className="brand-name">DEVTRACK</span>
              <span className="brand-sub">STUDENT PLATFORM</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Modules (8 Modules) */}
      <nav className="sidebar-nav">
        <div className="nav-group-label">{isOpen ? 'PLATFORM MODULES' : '•••'}</div>
        <ul className="nav-list">
          {MODULE_ITEMS.map((item) => {
            const Icon = item.icon;
            if (item.isLocked) {
              return (
                <li key={item.id} className="nav-item-wrapper locked">
                  <div
                    className="nav-link nav-link-locked"
                    onClick={() => handleLockedClick(item)}
                    style={{ cursor: 'pointer' }}
                    title={isOpen ? 'Module 7: Locked (Coming in Phase 2)' : 'Locked'}
                  >
                    <div className="nav-link-icon-box">
                      <Icon size={18} />
                    </div>
                    {isOpen && (
                      <div className="nav-link-content">
                        <span className="nav-link-text">{item.label}</span>
                        <span className="badge-locked">
                          <Lock size={10} /> Locked
                        </span>
                      </div>
                    )}
                  </div>
                </li>
              );
            }

            return (
              <li key={item.id} className="nav-item-wrapper">
                <NavLink
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'nav-link-active' : ''}`
                  }
                  title={!isOpen ? item.label : undefined}
                >
                  <div className="nav-link-icon-box">
                    <Icon size={18} />
                  </div>
                  {isOpen && (
                    <div className="nav-link-content">
                      <span className="nav-link-text">{item.label}</span>
                      {item.badge && item.id !== 'dashboard' && (
                        <span className="nav-badge">{item.badge}</span>
                      )}
                    </div>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Student Profile Card (Bottom-Left) */}
      <div className="sidebar-footer">
        <div
          className="user-profile-card"
          onClick={() => navigate('/app/profile')}
          style={{ cursor: 'pointer' }}
          title="Open Profile & Portfolio (Module 1)"
        >
          <div className="user-avatar-monogram" title={user?.name || 'Rahul'}>
            <span>{(user?.name || 'R').charAt(0)}</span>
            <span className="online-indicator"></span>
          </div>

          {isOpen && (
            <div className="user-profile-details">
              <div className="user-name-row">
                <span className="user-full-name">{user?.name || 'Rahul'}</span>
                <span className="demo-chip">DEMO</span>
              </div>
              <span className="user-education">
                {user?.year || 'Second Year'} • {user?.branch || 'CSE (AI/ML)'}
              </span>
              <span className="user-college">{user?.college || 'Apex Institute'}</span>
            </div>
          )}

          {isOpen && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLogout();
              }}
              className="sidebar-logout-btn"
              title="Sign Out to Landing Page"
              aria-label="Sign Out"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
