import React from 'react';

const Sort = ({ sortOrder, onSortChange }) => (
  <div className="sorting">
    <label>Сортировка по цене:</label>
    <select onChange={onSortChange} value={sortOrder}>
      <option value="asc">По возрастанию</option>
      <option value="desc">По убыванию</option>
    </select>
  </div>
);

export default Sort;