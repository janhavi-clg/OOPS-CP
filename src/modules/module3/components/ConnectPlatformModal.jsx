import React, { useState } from 'react';
import {
  X,
  Plus,
  Link,
  ShieldCheck,
  FileCheck,
  Info,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { SUPPORTED_PLATFORMS_METADATA } from '../module3Data.js';

export const ConnectPlatformModal = ({
  isOpen,
  onClose,
  connectedPlatforms = [],
  onConnect
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState('LeetCode');
  const [username, setUsername] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [isManualMode, setIsManualMode] = useState(false);

  // Manual Stats State
  const [totalSolved, setTotalSolved] = useState('');
  const [easySolved, setEasySolved] = useState('');
  const [mediumSolved, setMediumSolved] = useState('');
  const [hardSolved, setHardSolved] = useState('');
  const [rating, setRating] = useState('');
  const [globalRanking, setGlobalRanking] = useState('');
  const [proofUrl, setProofUrl] = useState('');
  const [manualNotes, setManualNotes] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentMeta = SUPPORTED_PLATFORMS_METADATA.find(
    (p) => p.id === selectedPlatform
  ) || SUPPORTED_PLATFORMS_METADATA[0];

  const hasOfficialApi = currentMeta.officialApi;
  const effectiveManual = isManualMode || !hasOfficialApi;

  const handlePlatformChange = (pId) => {
    setSelectedPlatform(pId);
    const meta = SUPPORTED_PLATFORMS_METADATA.find((p) => p.id === pId);
    if (meta && username) {
      setProfileUrl(`${meta.baseUrl}${username}`);
    } else {
      setProfileUrl('');
    }
    setErrorMsg('');
  };

  const handleUsernameChange = (val) => {
    setUsername(val);
    if (currentMeta && val.trim()) {
      setProfileUrl(`${currentMeta.baseUrl}${val.trim()}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorMsg('Username/handle is required.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg('');

      await onConnect({
        platform: selectedPlatform,
        username: username.trim(),
        profileUrl: profileUrl.trim() || `${currentMeta.baseUrl}${username.trim()}`,
        isManual: effectiveManual,
        totalSolved: totalSolved ? parseInt(totalSolved, 10) : 0,
        easySolved: easySolved ? parseInt(easySolved, 10) : 0,
        mediumSolved: mediumSolved ? parseInt(mediumSolved, 10) : 0,
        hardSolved: hardSolved ? parseInt(hardSolved, 10) : 0,
        rating: rating ? parseInt(rating, 10) : 0,
        globalRanking: globalRanking.trim(),
        proofUrl: proofUrl.trim(),
        manualNotes: manualNotes.trim()
      });

      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to connect coding platform.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="devtrack-modal-overlay" onClick={onClose}>
      <div className="devtrack-modal-card modal-connect-platform" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon-box">
              <Link size={20} className="modal-icon" />
            </div>
            <div>
              <h3 className="modal-title">Connect Coding Platform</h3>
              <p className="modal-subtitle">
                Link LeetCode, GitHub, CodeChef, or competitive programming handles.
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

        <form onSubmit={handleSubmit} className="connect-form">
          <div className="modal-body modal-scrollable-body">
            {/* Platform Selection */}
            <div className="form-group">
              <label className="form-label" htmlFor="platform-select">
                Select Platform <span className="req">*</span>
              </label>
              <select
                id="platform-select"
                className="form-select"
                value={selectedPlatform}
                onChange={(e) => handlePlatformChange(e.target.value)}
              >
                {SUPPORTED_PLATFORMS_METADATA.map((p) => {
                  const isConnected = connectedPlatforms.some(
                    (cp) => cp.platform.toLowerCase() === p.id.toLowerCase()
                  );
                  return (
                    <option key={p.id} value={p.id} disabled={isConnected}>
                      {p.name} {p.officialApi ? '(Automated Sync)' : '(Manual Verification)'}{' '}
                      {isConnected ? '— Already Connected' : ''}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* API Capability Info Banner */}
            <div className={`platform-api-banner ${hasOfficialApi ? 'api-supported' : 'api-manual'}`}>
              <Info size={16} className="banner-icon" />
              <div className="banner-text">
                <strong>{currentMeta.name}: </strong>
                <span>{currentMeta.description}</span>
              </div>
            </div>

            {/* Username / Handle */}
            <div className="form-group">
              <label className="form-label" htmlFor="platform-username">
                Username / Profile Handle <span className="req">*</span>
              </label>
              <input
                id="platform-username"
                type="text"
                className="form-input"
                placeholder={currentMeta.profilePlaceholder}
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                required
                autoFocus
              />
            </div>

            {/* Profile URL */}
            <div className="form-group">
              <label className="form-label" htmlFor="platform-url">
                Public Profile URL
              </label>
              <input
                id="platform-url"
                type="url"
                className="form-input"
                placeholder={`${currentMeta.baseUrl}username`}
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
              />
            </div>

            {/* Manual Verification Option if platform has API */}
            {hasOfficialApi && (
              <div className="form-checkbox-row">
                <label className="checkbox-label" htmlFor="force-manual-check">
                  <input
                    id="force-manual-check"
                    type="checkbox"
                    checked={isManualMode}
                    onChange={(e) => setIsManualMode(e.target.checked)}
                  />
                  <span>Enter statistics manually instead of automated sync</span>
                </label>
              </div>
            )}

            {/* Manual Verification Input Fields */}
            {effectiveManual && (
              <div className="manual-verification-fields-block">
                <h4 className="manual-fields-title">Manual Verification Metrics</h4>
                <p className="manual-fields-sub">
                  Provide your verified problem counts and contest stats. This will be labeled as "Manual Data".
                </p>

                <div className="form-row-3">
                  <div className="form-group">
                    <label className="form-label" htmlFor="m-easy">
                      Easy Solved
                    </label>
                    <input
                      id="m-easy"
                      type="number"
                      min="0"
                      className="form-input"
                      placeholder="0"
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
                    <label className="form-label" htmlFor="m-medium">
                      Medium Solved
                    </label>
                    <input
                      id="m-medium"
                      type="number"
                      min="0"
                      className="form-input"
                      placeholder="0"
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
                    <label className="form-label" htmlFor="m-hard">
                      Hard Solved
                    </label>
                    <input
                      id="m-hard"
                      type="number"
                      min="0"
                      className="form-input"
                      placeholder="0"
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

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="m-total">
                      Total Solved
                    </label>
                    <input
                      id="m-total"
                      type="number"
                      min="0"
                      className="form-input"
                      placeholder="0"
                      value={totalSolved}
                      onChange={(e) => setTotalSolved(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="m-rating">
                      Contest Rating / Stars
                    </label>
                    <input
                      id="m-rating"
                      type="number"
                      className="form-input"
                      placeholder="e.g. 1540"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="m-proof">
                    Verification Proof URL (Optional Screenshot / Certificate link)
                  </label>
                  <input
                    id="m-proof"
                    type="url"
                    className="form-input"
                    placeholder="https://imgur.com/... or public verification link"
                    value={proofUrl}
                    onChange={(e) => setProofUrl(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="m-notes">
                    Verification Notes
                  </label>
                  <textarea
                    id="m-notes"
                    className="form-textarea"
                    rows={2}
                    placeholder="e.g., Solved on university portal, Div 2 contest certificate..."
                    value={manualNotes}
                    onChange={(e) => setManualNotes(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting || !username.trim()}
            >
              <Plus size={16} />
              <span>{isSubmitting ? 'Connecting...' : `Connect ${selectedPlatform}`}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
