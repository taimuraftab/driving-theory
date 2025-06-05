import React from 'react';
import './CategorySelector.css';

const emojiMap = {
  'Incidents, Accidents & Emergencies': '🚑',
  'Alertness': '👀',
  'Attitude': '🙂',
  'Essestial documents': '📄',
  'Hazard awareness': '⚠️',
  'Motorway rules': '🛣️',
  'Other types of vehicles': '🚛',
  'Vulnerable road users': '🚶‍♂️',
  'Rules of the road': '📜',
  'Safety and your vehicle': '🔧',
  'Safety margins': '📏',
  'Vehicle handling': '🚗',
  'Vehicle loading': '📦'
};

const CategorySelector = ({ categories, onSelect }) => {
  return (
    <div className="category-grid">
      {categories.map(([cat, count], index) => {
        const emoji = emojiMap[cat] || '📘';

        return (
          <div
            key={index}
            className="category-card"
            onClick={() => onSelect(cat)}
          >
            <span className="category-label">{emoji} {cat}</span>
            <div className="category-footer">📚 {count} Questions</div>
          </div>
        );
      })}
    </div>
  );
};

export default CategorySelector;
