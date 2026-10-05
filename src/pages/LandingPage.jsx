import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, LogIn } from 'lucide-react';
import { DevTrack3DScene } from '../components/3d/DevTrack3DScene';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="devtrack-landing-root">
      {/* Subtle Warm Ambient Lighting Effect */}
      <div className="ambient-cream-glow" aria-hidden="true" />

      {/* Minimal Top Navigation */}
      <header className="landing-header">
        <div className="landing-brand-group">
          <div className="brand-dot-accent" />
          <span className="brand-title">DEVTRACK</span>
        </div>

        <div className="landing-header-actions">
          {/* Direct Login Button in Header */}
          <button
            onClick={() => navigate('/login')}
            className="landing-nav-login-btn"
            aria-label="Login to DevTrack"
          >
            <LogIn size={15} />
            <span>Login</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="landing-hero-section">
        {/* Left / Top Text & CTA Composition */}
        <div className="hero-content-block">
          <div className="hero-branding-pill">
            <span className="pill-dot"></span>
            <span className="pill-label">STUDENT DEVELOPER PLATFORM</span>
          </div>

          <h1 className="hero-product-name">
            DEVTRACK
          </h1>

          <p className="hero-tagline">
            Track. Build. Grow.
          </p>

          <p className="hero-subtext">
            Your developer journey, organized.
          </p>

          {/* Action Buttons: Get Started & Login */}
          <div className="hero-cta-group">
            <button
              onClick={() => navigate('/app')}
              className="hero-btn-primary"
              id="hero-get-started-btn"
            >
              <span>Get Started</span>
              <ArrowRight size={17} className="btn-arrow" />
            </button>

            <button
              onClick={() => navigate('/login')}
              className="hero-btn-secondary"
              id="hero-login-btn"
            >
              <LogIn size={17} />
              <span>Login</span>
            </button>
          </div>

          <div className="hero-student-meta">
            <span>Engineering Portfolio & Progress Ecosystem</span>
          </div>
        </div>

        {/* Right / Visual Composition: Interactive 3D DevTrack Core */}
        <div className="hero-3d-visual-block">
          <div className="hero-3d-wrapper">
            <DevTrack3DScene interactive={true} size="hero" />
          </div>
        </div>
      </main>

      {/* Minimalist Baseline Footer */}
      <footer className="landing-footer">
        <span className="footer-copyright">© {new Date().getFullYear()} DEVTRACK</span>
        <div className="footer-links">
          <span className="footer-item">Interactive 3D</span>
          <span className="footer-divider">•</span>
          <span className="footer-item">OOP Architecture</span>
          <span className="footer-divider">•</span>
          <span className="footer-item">CSE (AI/ML)</span>
        </div>
      </footer>
    </div>
  );
};
