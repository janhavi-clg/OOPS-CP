import React from 'react';
import { X, ExternalLink, ShieldCheck, Download, Award, FileText } from 'lucide-react';

export const ProofViewerModal = ({
  isOpen,
  onClose,
  item
}) => {
  if (!isOpen || !item) return null;

  const title = item.certificateName || item.title || 'Proof Document';
  const org = item.issuingOrganization || item.organization || '';
  const fileUrl = item.fileDataOrUrl || item.proofUrl || '';
  const credUrl = item.credentialUrl || item.hackathonUrl || '';
  const isImage = fileUrl.startsWith('data:image') || /\.(jpg|jpeg|png|webp)($|\?)/i.test(fileUrl) || fileUrl.includes('images.unsplash');

  return (
    <div className="devtrack-modal-backdrop" onClick={onClose}>
      <div className="devtrack-modal-card proof-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title">
            <ShieldCheck size={22} className="modal-title-icon verified-accent" />
            <div>
              <h3>{title}</h3>
              <p className="modal-subtitle">{org} • Verified Proof Document</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="proof-modal-body">
          {fileUrl ? (
            <div className="proof-preview-frame">
              {isImage ? (
                <img src={fileUrl} alt={title} className="proof-image-display" />
              ) : (
                <div className="proof-doc-placeholder">
                  <FileText size={48} className="doc-icon" />
                  <p className="doc-name">Attached PDF Credential Document</p>
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary doc-download-btn"
                  >
                    <Download size={15} />
                    <span>Download / Open Document</span>
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="proof-empty-state">
              <Award size={40} />
              <p>No document file was uploaded for this item.</p>
            </div>
          )}

          {credUrl && (
            <div className="proof-external-link-card">
              <div>
                <strong>Official Verification Link</strong>
                <p className="cred-link-text">{credUrl}</p>
              </div>
              <a
                href={credUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary verify-link-btn"
              >
                <ExternalLink size={14} />
                <span>Verify Online</span>
              </a>
            </div>
          )}
        </div>

        <div className="modal-actions-footer">
          <button type="button" className="btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
