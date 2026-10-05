import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  ExternalLink,
  Trash2,
  Filter,
  Plus,
  Layers,
  BookOpen,
  Sparkles,
  Search
} from 'lucide-react';

export const ResourceTable = ({
  resources = [],
  skills = [],
  selectedSkillId = null,
  onToggleComplete,
  onAddResource,
  onDeleteResource
}) => {
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'COMPLETED' | 'IN_PROGRESS'
  const [skillFilter, setSkillFilter] = useState(selectedSkillId || 'ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [groupBySkill, setGroupBySkill] = useState(true);

  // Filtered resources
  const filtered = resources.filter((res) => {
    // Status filter
    if (statusFilter === 'COMPLETED' && !res.completed) return false;
    if (statusFilter === 'IN_PROGRESS' && res.completed) return false;

    // Skill filter
    if (skillFilter !== 'ALL' && res.skillId !== skillFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = res.title?.toLowerCase().includes(q);
      const matchPlatform = res.platform?.toLowerCase().includes(q);
      const matchSkill = res.skillName?.toLowerCase().includes(q);
      if (!matchTitle && !matchPlatform && !matchSkill) return false;
    }

    return true;
  });

  // Group by skill
  const groupedBySkill = {};
  if (groupBySkill) {
    filtered.forEach((res) => {
      const sName = res.skillName || 'Other';
      if (!groupedBySkill[sName]) {
        groupedBySkill[sName] = [];
      }
      groupedBySkill[sName].push(res);
    });
  }

  const getTypeBadgeClass = (type) => {
    switch (type?.toLowerCase()) {
      case 'video': return 'badge-type video';
      case 'playlist': return 'badge-type playlist';
      case 'course': return 'badge-type course';
      case 'documentation': return 'badge-type documentation';
      case 'article': return 'badge-type article';
      default: return 'badge-type default';
    }
  };

  return (
    <div className="devtrack-resources-section">
      {/* Controls & Filter Bar */}
      <div className="resources-controls-bar">
        <div className="controls-left">
          {/* Status Filter Pills */}
          <div className="filter-pill-group">
            <button
              type="button"
              className={`filter-pill ${statusFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setStatusFilter('ALL')}
            >
              All ({resources.length})
            </button>
            <button
              type="button"
              className={`filter-pill ${statusFilter === 'COMPLETED' ? 'active' : ''}`}
              onClick={() => setStatusFilter('COMPLETED')}
            >
              Completed ({resources.filter((r) => r.completed).length})
            </button>
            <button
              type="button"
              className={`filter-pill ${statusFilter === 'IN_PROGRESS' ? 'active' : ''}`}
              onClick={() => setStatusFilter('IN_PROGRESS')}
            >
              In Progress ({resources.filter((r) => !r.completed).length})
            </button>
          </div>

          {/* Skill Dropdown Filter */}
          <div className="skill-filter-select-wrapper">
            <select
              className="resource-filter-select"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
            >
              <option value="ALL">All Skills</option>
              {skills.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="controls-right">
          {/* Search Box */}
          <div className="resource-search-box">
            <Search size={14} className="search-icon" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="resource-search-input"
            />
          </div>

          {/* Group Toggle */}
          <button
            type="button"
            className={`btn-group-toggle ${groupBySkill ? 'active' : ''}`}
            onClick={() => setGroupBySkill(!groupBySkill)}
            title="Toggle grouping by skill"
          >
            <Layers size={14} />
            <span>Group by Skill</span>
          </button>

          {/* Add Resource Button */}
          <button type="button" className="btn-primary" onClick={onAddResource}>
            <Plus size={16} />
            <span>+ Add Learning Resource</span>
          </button>
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="resources-empty-state">
          <BookOpen size={40} className="empty-icon" />
          <h4 className="empty-title">No learning resources found</h4>
          <p className="empty-desc">
            {resources.length === 0
              ? 'Start organizing videos, courses, and documentation for your tracked skills.'
              : 'No resources match your active filter criteria.'}
          </p>
          <button type="button" className="btn-primary" onClick={onAddResource}>
            <Plus size={15} />
            <span>+ Add Learning Resource</span>
          </button>
        </div>
      ) : groupBySkill ? (
        // Grouped by Skill View
        <div className="resources-grouped-list">
          {Object.entries(groupedBySkill).map(([skillName, items]) => {
            const completedCount = items.filter((i) => i.completed).length;
            const pct = Math.round((completedCount / items.length) * 100);

            return (
              <div key={skillName} className="skill-resource-group-block">
                <div className="group-header">
                  <div className="group-title-row">
                    <h3 className="group-title">{skillName}</h3>
                    <span className="group-count-badge">
                      {completedCount}/{items.length} Completed ({pct}%)
                    </span>
                  </div>
                  <div className="group-progress-mini">
                    <div className="group-progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>

                <div className="resource-table-wrapper">
                  <table className="devtrack-resource-table">
                    <thead>
                      <tr>
                        <th className="th-checkbox">Status</th>
                        <th className="th-resource">Learning Resource</th>
                        <th className="th-platform">Platform</th>
                        <th className="th-type">Type</th>
                        <th className="th-actions">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((res) => (
                        <tr
                          key={res.id}
                          className={`resource-table-row ${res.completed ? 'row-completed' : ''}`}
                        >
                          <td className="td-checkbox">
                            <button
                              type="button"
                              className={`btn-checkbox ${res.completed ? 'checked' : ''}`}
                              onClick={() => onToggleComplete(res.id)}
                              aria-label={res.completed ? 'Mark incomplete' : 'Mark completed'}
                            >
                              {res.completed ? (
                                <CheckSquare size={18} className="checkbox-icon checked" />
                              ) : (
                                <Square size={18} className="checkbox-icon unchecked" />
                              )}
                            </button>
                          </td>
                          <td className="td-resource">
                            <div className="resource-info">
                              <span
                                className={`resource-title ${res.completed ? 'completed-text' : ''}`}
                                title={res.title}
                              >
                                {res.title}
                              </span>
                              {res.description && (
                                <span className="resource-desc">{res.description}</span>
                              )}
                            </div>
                          </td>
                          <td className="td-platform">
                            <span className="platform-tag">{res.platform || 'Web'}</span>
                          </td>
                          <td className="td-type">
                            <span className={getTypeBadgeClass(res.type)}>
                              {res.type || 'Video'}
                            </span>
                          </td>
                          <td className="td-actions">
                            <div className="actions-cell">
                              {res.url ? (
                                <a
                                  href={res.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn-open-resource"
                                  title="Open resource in new tab"
                                >
                                  <span>Open</span>
                                  <ExternalLink size={13} />
                                </a>
                              ) : (
                                <span className="text-muted-dash">-</span>
                              )}
                              <button
                                type="button"
                                className="btn-icon-danger"
                                title="Delete resource"
                                onClick={() => onDeleteResource(res)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Flat Unified Table View
        <div className="resource-table-wrapper">
          <table className="devtrack-resource-table">
            <thead>
              <tr>
                <th className="th-checkbox">Status</th>
                <th className="th-resource">Learning Resource</th>
                <th className="th-skill">Skill</th>
                <th className="th-platform">Platform</th>
                <th className="th-type">Type</th>
                <th className="th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((res) => (
                <tr
                  key={res.id}
                  className={`resource-table-row ${res.completed ? 'row-completed' : ''}`}
                >
                  <td className="td-checkbox">
                    <button
                      type="button"
                      className={`btn-checkbox ${res.completed ? 'checked' : ''}`}
                      onClick={() => onToggleComplete(res.id)}
                      aria-label={res.completed ? 'Mark incomplete' : 'Mark completed'}
                    >
                      {res.completed ? (
                        <CheckSquare size={18} className="checkbox-icon checked" />
                      ) : (
                        <Square size={18} className="checkbox-icon unchecked" />
                      )}
                    </button>
                  </td>
                  <td className="td-resource">
                    <div className="resource-info">
                      <span
                        className={`resource-title ${res.completed ? 'completed-text' : ''}`}
                        title={res.title}
                      >
                        {res.title}
                      </span>
                      {res.description && (
                        <span className="resource-desc">{res.description}</span>
                      )}
                    </div>
                  </td>
                  <td className="td-skill">
                    <span className="skill-name-tag">{res.skillName || 'Skill'}</span>
                  </td>
                  <td className="td-platform">
                    <span className="platform-tag">{res.platform || 'Web'}</span>
                  </td>
                  <td className="td-type">
                    <span className={getTypeBadgeClass(res.type)}>
                      {res.type || 'Video'}
                    </span>
                  </td>
                  <td className="td-actions">
                    <div className="actions-cell">
                      {res.url ? (
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-open-resource"
                          title="Open resource in new tab"
                        >
                          <span>Open</span>
                          <ExternalLink size={13} />
                        </a>
                      ) : (
                        <span className="text-muted-dash">-</span>
                      )}
                      <button
                        type="button"
                        className="btn-icon-danger"
                        title="Delete resource"
                        onClick={() => onDeleteResource(res)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
