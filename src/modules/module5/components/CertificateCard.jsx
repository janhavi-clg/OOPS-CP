import React from 'react';
import { Award, ExternalLink, Eye, Edit3, Trash2, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export const CertificateCard = ({
  certificate,
  onView,
  onEdit,
  onDelete
}) => {
  const hasProof = Boolean(certificate.credentialUrl || certificate.fileDataOrUrl);

  return (
    <div className="devtrack-cert-card">
      <div className="cert-card-header">
        <div className="cert-icon-wrapper">
          <Award size={20} className="cert-icon" />
        </div>
        <div className="cert-meta-tags">
          <span className="skill-chip">{certificate.relatedSkill || 'Skill'}</span>
          {hasProof ? (
            <span className="proof-badge verified" title="Proof/Credential attached">
              <ShieldCheck size={12} />
              <span>Verified / Proof Added</span>
            </span>
          ) : (
            <span className="proof-badge unverified" title="No proof uploaded yet">
              <span>No Proof Added</span>
            </span>
          )}
        </div>
      </div>

      <div className="cert-card-body">
        <h4 className="cert-name" title={certificate.certificateName}>
          {certificate.certificateName}
        </h4>
        <div className="cert-org-row">
          <span className="cert-org">{certificate.issuingOrganization}</span>
          {certificate.issueDate && (
            <span className="cert-date">• {certificate.issueDate}</span>
          )}
        </div>

        {certificate.credentialId && (
          <div className="cert-cred-row">
            <span className="cred-label">Credential ID:</span>
            <span className="cred-val">{certificate.credentialId}</span>
          </div>
        )}

        {certificate.description && (
          <p className="cert-desc">{certificate.description}</p>
        )}
      </div>

      <div className="cert-card-footer">
        <div className="cert-left-actions">
          {certificate.fileDataOrUrl && (
            <button
              type="button"
              className="cert-btn view-file"
              onClick={() => onView(certificate)}
              title="View / Download Proof File"
            >
              <Eye size={14} />
              <span>View Proof</span>
            </button>
          )}

          {certificate.credentialUrl && (
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-btn open-cred"
              title="Open Official Credential Verification Page"
            >
              <ExternalLink size={14} />
              <span>Verify</span>
            </a>
          )}
        </div>

        <div className="cert-right-actions">
          <button
            type="button"
            className="action-icon-btn"
            onClick={() => onEdit(certificate)}
            title="Edit Certificate"
          >
            <Edit3 size={15} />
          </button>
          <button
            type="button"
            className="action-icon-btn danger"
            onClick={() => onDelete(certificate.id)}
            title="Delete Certificate"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
