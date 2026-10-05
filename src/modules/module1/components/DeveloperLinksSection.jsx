import {
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  Code2,
  Globe,
  Award,
  Link as LinkIcon
} from 'lucide-react';
import { DeveloperLinkModal } from './DeveloperLinkModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';

export const DeveloperLinksSection = ({ links = [], onAddLink, onEditLink, onDeleteLink }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [deletingLink, setDeletingLink] = useState(null);

  const handleOpenAdd = () => {
    setEditingLink(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (link) => {
    setEditingLink(link);
    setModalOpen(true);
  };

  const handleSave = async (linkData) => {
    if (editingLink) {
      await onEditLink(editingLink.id, linkData);
    } else {
      await onAddLink(linkData);
    }
    setModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (deletingLink) {
      await onDeleteLink(deletingLink.id);
      setDeletingLink(null);
    }
  };

  // Helper icon for platform
  const getPlatformIcon = (platform = '') => {
    const p = platform.toLowerCase();
    if (p.includes('github')) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );
    }
    if (p.includes('linkedin')) {
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    }
    if (p.includes('leetcode') || p.includes('codechef') || p.includes('codeforces')) return <Code2 size={18} />;
    if (p.includes('hackerrank')) return <Award size={18} />;
    if (p.includes('portfolio') || p.includes('website')) return <Globe size={18} />;
    return <LinkIcon size={18} />;
  };

  return (
    <div className="section-card developer-links-section">
      <div className="section-card-header flex-header">
        <div>
          <h2 className="section-title">Developer Presence & Profiles</h2>
          <p className="section-sub">Public coding profiles, repositories, and technical portfolios</p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="btn-primary-action btn-sm"
          id="btn-add-dev-link"
        >
          <Plus size={15} />
          <span>Add Link</span>
        </button>
      </div>

      {links.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-icon-wrap">
            <LinkIcon size={24} />
          </div>
          <h3 className="empty-title">No Developer Links Yet</h3>
          <p className="empty-sub">Connect your GitHub, LeetCode, or portfolio to display your work.</p>
          <button type="button" onClick={handleOpenAdd} className="btn-primary-action btn-sm">
            <Plus size={14} /> Add First Link
          </button>
        </div>
      ) : (
        <div className="developer-links-grid">
          {links.map((link) => (
            <div key={link.id} className="developer-link-card">
              <div className="link-card-top">
                <div className="link-platform-identity">
                  <div className="platform-icon-box">
                    {getPlatformIcon(link.platform)}
                  </div>
                  <div>
                    <h4 className="link-platform-name">{link.platform}</h4>
                    {link.username && (
                      <span className="link-username">@{link.username}</span>
                    )}
                  </div>
                </div>

                <div className="link-actions">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(link)}
                    className="action-icon-btn"
                    title={`Edit ${link.platform} link`}
                    aria-label={`Edit ${link.platform} link`}
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeletingLink(link)}
                    className="action-icon-btn delete-btn"
                    title={`Delete ${link.platform} link`}
                    aria-label={`Delete ${link.platform} link`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="link-card-bottom">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-url-pill"
                  title={link.url}
                >
                  <span className="link-url-text">{link.url}</span>
                  <ExternalLink size={13} className="ext-icon" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <DeveloperLinkModal
        isOpen={modalOpen}
        linkToEdit={editingLink}
        onSave={handleSave}
        onCancel={() => setModalOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingLink}
        title="Delete Developer Link"
        message={`Are you sure you want to remove your ${deletingLink?.platform} link? This action will remove it from your student profile.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingLink(null)}
      />
    </div>
  );
};
