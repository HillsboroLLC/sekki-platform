import React, { useState } from 'react';
import './SearchFilter.css';

export default function SearchFilter({ onSearch, onCategoryChange, categories }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState('all');

  const handleSearch = e => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleCategory = e => {
    const cat = e.target.value;
    setSelected(cat);
    onCategoryChange(cat);
  };

  return (
    <section className="search-filter">
      <div className="filter-row">
        <div className="search-box">
          <input
            id="search-input"
            type="search"
            placeholder="Search articles, topics, strategies..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="category-filter">
          <select
            id="category-filter"
            value={selected}
            onChange={handleCategory}
            aria-label="Filter by category"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
