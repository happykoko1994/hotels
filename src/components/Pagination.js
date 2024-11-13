import React from 'react';

const Pagination = ({ pageNumbers, currentPage, onPaginate }) => (
  <div className="pagination">
    {pageNumbers.map(number => (
      <button
        key={number}
        onClick={() => onPaginate(number)}
        className={currentPage === number ? 'active' : ''}
      >
        {number}
      </button>
    ))}
  </div>
);

export default Pagination;
