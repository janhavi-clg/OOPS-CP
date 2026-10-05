import React from 'react';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';
import { PROJECT_CATEGORIES } from '../module4Data';

export const ProjectFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  sortBy,
  onSortChange,
  totalResults
}) => {
  const statusOptions = [
    { id: 'ALL', label: 'All Projects' },
    { id: 'IN_PROGRESS', label: 'In Progress' },
    { id: 'COMPLETED', label: 'Completed' },
    { id: 'PLANNING', label: 'Planning' },
    { id: 'PAUSED', label: 'Paused' }
  ];

  const sortOptions = [
    { id: 'RECENT', label: 'Recently Updated' },
    { id: 'PROGRESS', label: 'Highest Progress' },
    { id: 'ALPHABETICAL', label: 'Alphabetical (A-Z)' },
    { id: 'NEWEST', label: 'Newest First' },
    { id: 'OLDEST', label: 'Oldest First' }
  ];

  const hasActiveFilters =
    searchQuery.trim() !== '' || statusFilter !== 'ALL' || categoryFilter !== 'ALL';

  const handleClearFilters = () => {
    onSearchChange('');
    onStatusChange('ALL');
    onCategoryChange('ALL');
    onSortChange('RECENT');
  };

  return (
    <div className="project-filters-toolbar">
      {/* 1. Search Bar */}
      <div className="search-input-wrapper">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search by project name, tech, role, or category..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
            title="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* 2. Status Filter Pills */}
      <div className="status-pills-row">
        {statusOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`status-filter-pill ${statusFilter === opt.id ? 'active' : ''}`}
            onClick={() => onStatusChange(opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* 3. Category & Sort Selectors */}
      <div className="dropdowns-row">
        <div className="filter-dropdown-group">
          <Filter size={14} className="dropdown-icon" />
          <select
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label="Filter by Category"
          >
            <option value="ALL">All Categories</option>
            {PROJECT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-dropdown-group">
          <ArrowUpDown size={14} className="dropdown-icon" />
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort Projects"
          >
            {sortOptions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className="btn-clear-all"
            onClick={handleClearFilters}
            title="Reset all filters"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectFilters;
