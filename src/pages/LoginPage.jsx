import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Lock, User, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DevTrack3DScene } from '../components/3d/DevTrack3DScene';
import { Toast } from '../components/common/Toast';

export const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Helper for quick faculty demonstration
  const handleAutoFillDemo = () => {
    setIdentifier('Rahul');
    setPassword('Rahul 123');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const result = await login(identifier, password);
      if (result.success) {
        navigate('/app');
      } else {
        setErrorMessage(result.error || 'Invalid demo credentials.');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      {/* Top Bar for Back Navigation */}
      <div className="login-top-nav">
        <Link to="/" className="back-to-home-btn">
          <ArrowLeft size={16} />
          <span>Back to Landing</span>
        </Link>
        <div className="login-brand-monogram">
          <span className="dot"></span>
          <span>DEVTRACK</span>
        </div>
      </div>

      <div className="login-split-container">
        {/* LEFT COLUMN: Login Form */}
        <div className="login-form-column">
          <div className="login-card-inner">
            <div className="login-header-group">
              <span className="login-badge-kicker">Faculty Prototype Access</span>
              <h1 className="login-title">Sign In to DevTrack</h1>
              <p className="login-subtitle">
                Track your student engineering journey, projects, and milestones.
              </p>
            </div>

            {/* Quick Demo Credentials Helper */}
            <div className="demo-credentials-helper">
              <div className="helper-header">
                <Sparkles size={14} className="sparkle-icon" />
                <span className="helper-title">Demo Faculty Account</span>
              </div>
              <p className="helper-desc">
                Use <strong>Rahul</strong> and <strong>Rahul 123</strong> to experience the student dashboard with realistic data.
              </p>
              <button
                type="button"
                onClick={handleAutoFillDemo}
                className="autofill-demo-chip"
                title="Click to auto-populate credentials"
              >
                <span>Quick-Fill: Rahul / Rahul 123</span>
              </button>
            </div>

            {/* Inline Error Toast */}
            {errorMessage && (
              <Toast
                type="error"
                message={errorMessage}
                onClose={() => setErrorMessage('')}
                duration={5000}
              />
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-field-group">
                <label htmlFor="identifier" className="field-label">
                  Student Name or Email
                </label>
                <div className="input-wrap">
                  <User size={18} className="input-icon" />
                  <input
                    id="identifier"
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter 'Rahul'"
                    className="styled-input"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="form-field-group">
                <label htmlFor="password" className="field-label">
                  Password
                </label>
                <div className="input-wrap">
                  <Lock size={18} className="input-icon" />
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter 'Rahul 123'"
                    className="styled-input"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-login-btn"
              >
                <span>{isSubmitting ? 'Authenticating...' : 'Sign In'}</span>
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="login-footer-meta">
              <div className="security-notice">
                <ShieldCheck size={14} />
                <span>Prototype authenticated locally • Safe demonstration mode</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Animation & DevTrack Identity */}
        <div className="login-visual-column">
          <div className="visual-column-inner">
            <div className="visual-column-scene">
              <DevTrack3DScene interactive={true} size="login" />
            </div>

            <div className="visual-overlay-card">
              <span className="quote-mark">“</span>
              <p className="visual-quote">
                Track. Build. Grow.
              </p>
              <span className="visual-student-meta">
                Second Year CSE (AI/ML) Student Portfolio Hub
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
