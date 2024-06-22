import React from 'react';

const Search = ({ onSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for nature, forest, river, mountain..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
