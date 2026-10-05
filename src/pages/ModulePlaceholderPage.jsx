import React from 'react';
import { useLocation } from 'react-router-dom';
import { MODULE_ITEMS } from '../components/layout/Sidebar';
import { Sparkles, Construction, CheckCircle } from 'lucide-react';
import { rahulDemoProfile } from '../demo/rahulDemoData';

export const ModulePlaceholderPage = () => {
  const location = useLocation();

  const currentModule = MODULE_ITEMS.find((m) => m.path === location.pathname) || {
    label: 'DevTrack Module',
    badge: 'Under Development'
  };

  return (
    <div className="module-placeholder-container">
      <div className="section-card" style={{ maxWidth: '800px', margin: '2rem auto', textAlign: 'center', padding: '3.5rem 2rem' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'var(--cream-200)',
          color: 'var(--coffee-850)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto'
        }}>
          <Sparkles size={32} />
        </div>

        <span style={{
          display: 'inline-block',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--coffee-500)',
          marginBottom: '0.5rem'
        }}>
          Architecture Foundation Ready
        </span>

        <h1 style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: 'var(--coffee-950)',
          marginBottom: '0.75rem'
        }}>
          {currentModule.label}
        </h1>

        <p style={{
          fontSize: '1rem',
          color: 'var(--coffee-600)',
          maxWidth: '520px',
          margin: '0 auto 2rem auto',
          lineHeight: 1.5
        }}>
          Centralized demo data for <strong>{rahulDemoProfile.name}</strong> is pre-loaded. Detailed full feature implementation for this module will be introduced in the upcoming phases.
        </p>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: 'var(--cream-150)',
          border: '1px solid var(--cream-300)',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.825rem',
          color: 'var(--coffee-700)',
          fontWeight: 600
        }}>
          <CheckCircle size={15} color="#16a34a" />
          <span>Demo Data Foundation Verified</span>
        </div>
      </div>
    </div>
  );
};
