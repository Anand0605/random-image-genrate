import './App.css';
import React, { useState, useEffect } from 'react';

const RandomImage = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchRandomImages = async () => {
      try {
        const urls = [];
        for (let i = 0; i < 20; i++) {
          const response = await fetch(`https://picsum.photos/200/300?random=${i}`);
          console.log(response)
          urls.push(response.url);
        }
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching the images:', error);
      }
    };

    fetchRandomImages();
  }, []);

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value.toLowerCase());
  };

  const filteredImages = imageUrls.filter((url) =>
    url.includes(searchKeyword)
  );

  return (
    <div className='img-search'>
      <h1 className='title'>Random Images Generator</h1>
      <input
        type="text"
        placeholder="Search images"
        value={searchKeyword}
        onChange={handleSearch}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredImages.length > 0 ? (
          filteredImages.map((url, index) => (
            <div
              key={index}
              className='image-container'
              onMouseEnter={(e) => {
                e.currentTarget.classList.add('zoom');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.classList.remove('zoom');
              }}
            >
              <img
                src={url}
                alt={`Random ${index}`}
                className='image'
                loading='lazy' // Lazy loading the images
              />
            </div>
          ))
        ) : (
          <p>No images found.</p>
        )}
      </div>
    </div>
  );
};

export default RandomImage;
