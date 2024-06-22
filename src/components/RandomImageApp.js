import React, { useState } from 'react';
import Search from './Search';
import ImageGallery from './ImageGallery';

const RandomImageApp = () => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = (searchKeyword) => {
    setKeyword(searchKeyword);
  };

  return (
    <div>
      <h1>Random Images</h1>
      <Search onSearch={handleSearch} />
      <ImageGallery keyword={keyword} />
    </div>
  );
};

export default RandomImageApp;
