import React, { useState, useEffect } from 'react';
import { X, FileCheck, Check } from 'lucide-react';

export const ManualVerificationModal = ({
  isOpen,
  onClose,
  profile,
  onSave
}) => {
  const [totalSolved, setTotalSolved] = useState('');
  const [easySolved, setEasySolved] = useState('');
  const [mediumSolved, setMediumSolved] = useState('');
  const [hardSolved, setHardSolved] = useState('');
  const [rating, setRating] = useState('');
  const [badgeTitle, setBadgeTitle] = useState('');
  const [proofUrl, setProofUrl] = useState('');
  const [manualNotes, setManualNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (profile) {
      const stats = profile.statistics?.problemStats;
      const cStats = profile.statistics?.contestStats;
      setTotalSolved(String(stats?.totalSolved || ''));
      setEasySolved(String(stats?.easySolved || ''));
      setMediumSolved(String(stats?.mediumSolved || ''));
      setHardSolved(String(stats?.hardSolved || ''));
      setRating(String(cStats?.rating || ''));
      setBadgeTitle(cStats?.badgeTitle || '');
      setProofUrl(profile.proofUrl || '');
      setManualNotes(profile.manualNotes || '');
    }
    setErrorMsg('');
  }, [profile, isOpen]);

  if (!isOpen || !profile) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setErrorMsg('');

      await onSave(profile.id, {
        totalSolved: parseInt(totalSolved, 10) || 0,
        easySolved: parseInt(easySolved, 10) || 0,
        mediumSolved: parseInt(mediumSolved, 10) || 0,
        hardSolved: parseInt(hardSolved, 10) || 0,
        rating: parseInt(rating, 10) || 0,
        badgeTitle: badgeTitle.trim(),
        proofUrl: proofUrl.trim(),
        manualNotes: manualNotes.trim()
      });

      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update manual verification data.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="devtrack-modal-overlay" onClick={onClose}>
      <div className="devtrack-modal-card modal-manual-verify" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon-box">
              <FileCheck size={20} className="modal-icon" />
            </div>
            <div>
              <h3 className="modal-title">Manual Verification: {profile.platform}</h3>
              <p className="modal-subtitle">
                Update verified metrics, contest rank, and proof references for @{profile.username}.
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {errorMsg && (
          <div className="form-error-banner">
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="verify-form">
          <div className="modal-body modal-scrollable-body">
            <div className="form-row-3">
              <div className="form-group">
                <label className="form-label" htmlFor="mv-easy">
                  Easy Solved
                </label>
                <input
                  id="mv-easy"
                  type="number"
                  min="0"
                  className="form-input"
                  value={easySolved}
                  onChange={(e) => {
                    setEasySolved(e.target.value);
                    const eVal = parseInt(e.target.value, 10) || 0;
                    const mVal = parseInt(mediumSolved, 10) || 0;
                    const hVal = parseInt(hardSolved, 10) || 0;
                    setTotalSolved(String(eVal + mVal + hVal));
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="mv-med">
                  Medium Solved
                </label>
                <input
                  id="mv-med"
                  type="number"
                  min="0"
                  className="form-input"
                  value={mediumSolved}
                  onChange={(e) => {
                    setMediumSolved(e.target.value);
                    const eVal = parseInt(easySolved, 10) || 0;
                    const mVal = parseInt(e.target.value, 10) || 0;
                    const hVal = parseInt(hardSolved, 10) || 0;
                    setTotalSolved(String(eVal + mVal + hVal));
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="mv-hard">
                  Hard Solved
                </label>
                <input
                  id="mv-hard"
                  type="number"
                  min="0"
                  className="form-input"
                  value={hardSolved}
                  onChange={(e) => {
                    setHardSolved(e.target.value);
                    const eVal = parseInt(easySolved, 10) || 0;
                    const mVal = parseInt(mediumSolved, 10) || 0;
                    const hVal = parseInt(e.target.value, 10) || 0;
                    setTotalSolved(String(eVal + mVal + hVal));
                  }}
                />
              </div>
            </div>

            <div className="form-row-3">
              <div className="form-group">
                <label className="form-label" htmlFor="mv-total">
                  Total Solved
                </label>
                <input
                  id="mv-total"
                  type="number"
                  min="0"
                  className="form-input"
                  value={totalSolved}
                  onChange={(e) => setTotalSolved(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="mv-rating">
                  Contest Rating
                </label>
                <input
                  id="mv-rating"
                  type="number"
                  className="form-input"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="mv-badge">
                  Rank / Badge Title
                </label>
                <input
                  id="mv-badge"
                  type="text"
                  className="form-input"
                  placeholder="e.g. 3-Star, Division 2"
                  value={badgeTitle}
                  onChange={(e) => setBadgeTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="mv-proof">
                Proof URL (Screenshot / Certificate Link)
              </label>
              <input
                id="mv-proof"
                type="url"
                className="form-input"
                placeholder="https://..."
                value={proofUrl}
                onChange={(e) => setProofUrl(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="mv-notes">
                Manual Verification Notes
              </label>
              <textarea
                id="mv-notes"
                className="form-textarea"
                rows={2}
                placeholder="Details of verification..."
                value={manualNotes}
                onChange={(e) => setManualNotes(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              <Check size={16} />
              <span>{isSubmitting ? 'Saving...' : 'Save Verified Stats'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
