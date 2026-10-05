import React, { useState } from 'react';
import { Plus, Tag, Check } from 'lucide-react';

export const CategoryFilterPills = ({
  activeCategories,
  selectedCategory,
  onSelectCategory,
  onAddCustomCategory
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (newCatName.trim()) {
      onAddCustomCategory(newCatName.trim());
      setNewCatName('');
      setIsAdding(false);
    }
  };

  return (
    <div className="category-pills-container">
      <div className="category-pills-label">
        <Tag size={14} />
        <span>Categories:</span>
      </div>

      <div className="category-pills-scroll">
        <button
          type="button"
          className={`pill-btn ${selectedCategory === 'ALL' ? 'active' : ''}`}
          onClick={() => onSelectCategory('ALL')}
        >
          All Categories
        </button>

        {activeCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </button>
        ))}

        {!isAdding ? (
          <button
            type="button"
            className="pill-btn add-pill-btn"
            onClick={() => setIsAdding(true)}
            title="Activate a new category"
          >
            <Plus size={13} />
            <span>Category</span>
          </button>
        ) : (
          <form onSubmit={handleAddSubmit} className="add-cat-inline-form">
            <input
              type="text"
              placeholder="Category name..."
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              autoFocus
              className="inline-cat-input"
            />
            <button type="submit" className="inline-cat-btn save" title="Activate">
              <Check size={13} />
            </button>
            <button
              type="button"
              className="inline-cat-btn cancel"
              onClick={() => setIsAdding(false)}
            >
              ×
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
